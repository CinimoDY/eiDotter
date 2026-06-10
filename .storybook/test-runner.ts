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
