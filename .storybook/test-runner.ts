import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { injectAxe, getViolations, configureAxe } from 'axe-playwright';
import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const REPORT_PATH = process.env.A11Y_REPORT_PATH ?? 'solutions/best-practices/storybook-a11y-baseline-2026-05-05.json';

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
  },
};

export default config;
