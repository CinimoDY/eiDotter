import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LegalPage } from './LegalPage';
import {
  ImpressumAddress,
  ImpressumContact,
  ImpressumResponsible,
  ImpressumLiabilityContent,
  ImpressumLiabilityLinks,
  DatenschutzController,
  DatenschutzHosting,
  DatenschutzPostHog,
  DatenschutzFonts,
  DatenschutzEncryption,
  DatenschutzRights,
} from './clauses';

const meta = {
  title: 'Components/LegalPage',
  component: LegalPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LegalPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Impressum: Story = {
  args: {
    title: 'Impressum',
    date: 'Stand: April 2026',
    home: <a href="/">← Home</a>,
    children: (
      <>
        <ImpressumAddress />
        <ImpressumContact email="hello@example.com" />
        <ImpressumResponsible />
        <ImpressumLiabilityContent />
        <ImpressumLiabilityLinks />
      </>
    ),
  },
};

export const Datenschutz: Story = {
  args: {
    title: 'Datenschutzerklärung',
    date: 'Stand: April 2026',
    intro:
      'Diese Erklärung beschreibt, welche Daten auf dieser Website erhoben und wie sie verwendet werden.',
    home: <a href="/">← Home</a>,
    children: (
      <>
        <DatenschutzController email="hello@example.com" />
        <DatenschutzHosting />
        <DatenschutzPostHog />
        <DatenschutzFonts />
        <DatenschutzEncryption />
        <DatenschutzRights email="hello@example.com" />
      </>
    ),
  },
};

export const WithoutBackLink: Story = {
  args: {
    title: 'Impressum',
    date: 'Stand: April 2026',
    children: (
      <>
        <ImpressumAddress />
        <ImpressumContact email="hello@example.com" />
        <ImpressumLiabilityContent />
      </>
    ),
  },
};

export const FreeformBody: Story = {
  args: {
    title: 'About this page',
    date: 'Stand: April 2026',
    intro: 'A short example showing freeform body content rather than canned clauses.',
    children: (
      <>
        <h2>Section A</h2>
        <p>The body styles work for any h2 + p + ul content, not just the canned clauses.</p>
        <h2>Section B</h2>
        <ul>
          <li>List items render with a DOS-style "&gt;" bullet.</li>
          <li>List spacing matches paragraph rhythm.</li>
        </ul>
      </>
    ),
  },
};
