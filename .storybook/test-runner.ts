import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { injectAxe, getViolations, configureAxe } from 'axe-playwright';
import { writeFileSync, appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

const REPORT_PATH = process.env.A11Y_REPORT_PATH ?? 'solutions/best-practices/storybook-a11y-baseline-2026-05-05.json';

// Ratchet for the CI gate — story id → axe rule ids that are known to fail
// (pre-existing, tracked under DMNC-1012). See the gate block in postVisit.
const knownFailures: Record<string, string[]> = JSON.parse(
  readFileSync(new URL('a11y-known-failures.json', import.meta.url), 'utf-8'),
);

const reportDir = dirname(REPORT_PATH);
if (!existsSync(reportDir)) mkdirSync(reportDir, { recursive: true });
if (!existsSync(REPORT_PATH)) writeFileSync(REPORT_PATH, '');

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    // Layout guard (DMNC-1617): a story with `parameters.noOverflowAt: [320, 390]`
    // must not scroll sideways at those viewport widths. Always on, not tied
    // to the a11y gate. Restores the viewport afterwards for the axe scan.
    const widths: number[] | undefined = storyContext.parameters?.noOverflowAt;
    if (widths?.length) {
      const original = page.viewportSize();
      try {
        for (const width of widths) {
          await page.setViewportSize({ width, height: 800 });
          await page.waitForTimeout(100);
          const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
          if (scrollWidth > width) {
            throw new Error(
              `layout: "${context.title} › ${context.name}" scrolls sideways at ${width}px (scrollWidth ${scrollWidth}px)`,
            );
          }
          // `noHeaderEndClip: true` also requires every Header end slot to
          // show its content whole at these widths (DMNC-1619): the slot is
          // built to clip when the row runs out of room.
          if (storyContext.parameters?.noHeaderEndClip) {
            const clipped = await page.evaluate(() =>
              Array.from(document.querySelectorAll('.eidotter-header__end')).flatMap((slot) => {
                const box = slot.getBoundingClientRect();
                return Array.from(slot.children)
                  .map((child) => child.getBoundingClientRect())
                  .filter((r) => r.width > 0 && (r.right > box.right + 0.5 || r.left < box.left - 0.5))
                  .map((r) => `${Math.round(r.left)}–${Math.round(r.right)} in ${Math.round(box.left)}–${Math.round(box.right)}`);
              }),
            );
            if (clipped.length) {
              throw new Error(
                `layout: "${context.title} › ${context.name}" clips Header end content at ${width}px (${clipped.join('; ')})`,
              );
            }
          }
        }
      } finally {
        if (original) await page.setViewportSize(original);
      }
    }

    const a11y = storyContext.parameters?.a11y;
    if (a11y?.disable) return;

    await configureAxe(page, { rules: a11y?.config?.rules });

    const violations = await getViolations(page, '#storybook-root', {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
      },
    });

    const slim = violations.map((v: any) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl,
      nodeCount: v.nodes?.length ?? 0,
      sample: v.nodes?.[0]?.target ?? null,
      sampleHtml: v.nodes?.[0]?.html ?? null,
    }));

    appendFileSync(
      REPORT_PATH,
      JSON.stringify({
        id: context.id,
        title: context.title,
        name: context.name,
        status: violations.length === 0 ? 'pass' : 'fail',
        violationCount: violations.length,
        violations: slim,
      }) + '\n',
    );

    // CI gate (DMNC-1011): report-only by default so local baseline runs
    // keep collecting; with A11Y_FAIL_ON_VIOLATION set, violations fail the
    // story's test and therefore the CI job — except those in the ratchet
    // file. a11y-known-failures.json pins the pre-existing violations (the
    // 2026-05-05 audit's "story-level / amber-aesthetic" backlog, worked off
    // under DMNC-1012): a known story may keep its known rule ids, but any
    // NEW story violation or new rule on a known story fails. Shrink the
    // file as entries get fixed — never grow it without a tracking issue.
    if (process.env.A11Y_FAIL_ON_VIOLATION && violations.length > 0) {
      const allowedRules: string[] = knownFailures[context.id] ?? [];
      const fresh = slim.filter((v: { id: string }) => !allowedRules.includes(v.id));
      if (fresh.length > 0) {
        throw new Error(
          `axe: ${fresh.length} new WCAG violation(s) in "${context.title} › ${context.name}": ` +
            fresh.map((v: { id: string; impact: string }) => `${v.id} (${v.impact})`).join(', ') +
            (allowedRules.length ? ` (allowlisted here: ${allowedRules.join(', ')})` : ''),
        );
      }
    }
  },
};

export default config;
