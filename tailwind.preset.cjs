/**
 * Eidotter Tailwind CSS Preset
 * AUTO-GENERATED - Do not edit manually
 *
 * Generated from: src/tokens/base.tokens.json
 * Run: npm run build-tokens
 *
 * Includes all design tokens plus optional React Aria and animate plugins.
 *
 * Usage:
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('eidotter/tailwind.preset')],
 *   }
 */

let reactAriaPlugin;
try {
  reactAriaPlugin = require('tailwindcss-react-aria-components');
} catch {
  // tailwindcss-react-aria-components not installed — skip
  reactAriaPlugin = null;
}

let animatePlugin;
try {
  animatePlugin = require('tailwindcss-animate');
} catch {
  // tailwindcss-animate not installed — skip
  animatePlugin = null;
}

const preset = {
  "theme": {
    "extend": {
      "colors": {
        "cga-black": "#020003",
        "cga-blue": "#2c1203",
        "cga-green": "#411f06",
        "cga-cyan": "#552d0a",
        "cga-red": "#65360c",
        "cga-magenta": "#713e0d",
        "cga-brown": "#5f340e",
        "cga-light-gray": "#b87c1a",
        "cga-dark-gray": "#010103",
        "cga-bright-blue": "#c38a23",
        "cga-bright-green": "#cb9529",
        "cga-bright-cyan": "#d4a030",
        "cga-bright-red": "#dca934",
        "cga-bright-magenta": "#ddb030",
        "cga-yellow": "#e5b936",
        "cga-white": "#ba8225",
        "cga-amber": "#ffb000",
        "cga-amber-bright": "#fdca9f",
        "cga-amber-dim": "#9a5700",
        "cga-amber-glow": "#ffb00080",
        "cga-red-glow": "#ff555580",
        "cga-green-glow": "#55ff5580",
        "cga-cyan-glow": "#55ffff80",
        "cga-magenta-glow": "#ff55ff80",
        "cga-blue-glow": "#5555ff80",
        "cga-white-glow": "#fff5e080",
        "dos-bg-primary": "var(--color-semantic-background-primary)",
        "dos-bg-secondary": "var(--color-semantic-background-secondary)",
        "dos-bg-accent": "var(--color-semantic-background-accent)",
        "dos-bg-tertiary": "var(--color-semantic-background-tertiary)",
        "dos-bg-brand": "var(--color-semantic-background-brand)",
        "dos-bg-brand-bright": "var(--color-semantic-background-brand-bright)",
        "dos-bg-brand-dim": "var(--color-semantic-background-brand-dim)",
        "dos-bg-error": "var(--color-semantic-background-error)",
        "dos-bg-success": "var(--color-semantic-background-success)",
        "dos-text-ai-draft": "var(--color-semantic-text-ai-draft)",
        "dos-text-primary": "var(--color-semantic-text-primary)",
        "dos-text-secondary": "var(--color-semantic-text-secondary)",
        "dos-text-accent": "var(--color-semantic-text-accent)",
        "dos-text-disabled": "var(--color-semantic-text-disabled)",
        "dos-text-muted": "var(--color-semantic-text-muted)",
        "dos-text-tertiary": "var(--color-semantic-text-tertiary)",
        "dos-text-brand": "var(--color-semantic-text-brand)",
        "dos-text-brand-bright": "var(--color-semantic-text-brand-bright)",
        "dos-text-on-brand": "var(--color-semantic-text-on-brand)",
        "dos-text-error": "var(--color-semantic-text-error)",
        "dos-text-warning": "var(--color-semantic-text-warning)",
        "dos-text-success": "var(--color-semantic-text-success)",
        "dos-text-info": "var(--color-semantic-text-info)",
        "dos-text-white": "var(--color-semantic-text-white)",
        "dos-border-default": "var(--color-semantic-border-default)",
        "dos-border-focus": "var(--color-semantic-border-focus)",
        "dos-border-hover": "var(--color-semantic-border-hover)",
        "dos-border-disabled": "var(--color-semantic-border-disabled)",
        "dos-border-brand": "var(--color-semantic-border-brand)",
        "dos-border-brand-bright": "var(--color-semantic-border-brand-bright)",
        "dos-border-brand-dim": "var(--color-semantic-border-brand-dim)",
        "dos-border-error": "var(--color-semantic-border-error)",
        "dos-border-success": "var(--color-semantic-border-success)",
        "dos-link": "var(--color-semantic-link-default)",
        "dos-link-hover": "var(--color-semantic-link-hover)",
        "dos-link-active": "var(--color-semantic-link-active)",
        "dos-link-visited": "var(--color-semantic-link-visited)",
        "dos-success": "var(--color-semantic-status-success)",
        "dos-warning": "var(--color-semantic-status-warning)",
        "dos-error": "var(--color-semantic-status-error)",
        "dos-info": "var(--color-semantic-status-info)",
        "dos-alert-info": "var(--color-semantic-alert-info)",
        "dos-alert-success": "var(--color-semantic-alert-success)",
        "dos-alert-warning": "var(--color-semantic-alert-warning)",
        "dos-alert-error": "var(--color-semantic-alert-error)"
      },
      "fontFamily": {
        "dos": [
          "\"Perfect DOS VGA 437\"",
          "monospace"
        ],
        "dos-fallback": [
          "monospace"
        ]
      },
      "fontSize": {
        "dos-text-xs": "1.125rem",
        "dos-text-sm": "1.25rem",
        "dos-text-md": "1.375rem",
        "dos-text-lg": "1.5rem",
        "dos-text-xl": "1.625rem",
        "dos-display-xs": "1.875rem",
        "dos-display-sm": "2.25rem",
        "dos-display-md": "2.625rem",
        "dos-display-lg": "3.5rem",
        "dos-display-xl": "4.125rem",
        "dos-display-2xl": "4.875rem"
      },
      "lineHeight": {
        "dos-text-xs": "1.125rem",
        "dos-text-sm": "1.25rem",
        "dos-text-md": "1.5rem",
        "dos-text-lg": "1.75rem",
        "dos-text-xl": "1.875rem",
        "dos-display-xs": "2rem",
        "dos-display-sm": "2.375rem",
        "dos-display-md": "2.75rem",
        "dos-display-lg": "3.75rem",
        "dos-display-xl": "4.5rem",
        "dos-display-2xl": "5.625rem"
      },
      "fontWeight": {
        "dos-regular": "400",
        "dos-semibold": "400",
        "dos-bold": "400"
      },
      "spacing": {
        "dos-0": "0px",
        "dos-1": "4px",
        "dos-2": "8px",
        "dos-3": "12px",
        "dos-4": "16px",
        "dos-5": "20px",
        "dos-6": "24px",
        "dos-8": "32px",
        "dos-10": "40px",
        "dos-12": "48px",
        "dos-16": "64px"
      },
      "borderRadius": {
        "dos-none": "0px",
        "dos-sm": "2px",
        "dos-base": "4px"
      },
      "boxShadow": {
        "dos-none": "none",
        "dos-drop": "2px 2px 0px 0px #080500",
        "dos-glowXs": "0px 0px 8px 0px #FFB00080",
        "dos-glowSm": "0px 0px 10px 0px #FFB00080",
        "dos-glowMd": "0px 0px 20px 0px #FFB00080",
        "dos-glowLg": "0px 0px 30px 0px #FFB00080",
        "dos-glowXsRed": "0px 0px 8px 0px #FF555580",
        "dos-glowSmRed": "0px 0px 10px 0px #FF555580",
        "dos-glowMdRed": "0px 0px 20px 0px #FF555580",
        "dos-glowLgRed": "0px 0px 30px 0px #FF555580",
        "dos-glowXsGreen": "0px 0px 8px 0px #55FF5580",
        "dos-glowSmGreen": "0px 0px 10px 0px #55FF5580",
        "dos-glowMdGreen": "0px 0px 20px 0px #55FF5580",
        "dos-glowLgGreen": "0px 0px 30px 0px #55FF5580",
        "dos-glowXsCyan": "0px 0px 8px 0px #55FFFF80",
        "dos-glowSmCyan": "0px 0px 10px 0px #55FFFF80",
        "dos-glowMdCyan": "0px 0px 20px 0px #55FFFF80",
        "dos-glowLgCyan": "0px 0px 30px 0px #55FFFF80",
        "dos-glowXsMagenta": "0px 0px 8px 0px #FF55FF80",
        "dos-glowSmMagenta": "0px 0px 10px 0px #FF55FF80",
        "dos-glowMdMagenta": "0px 0px 20px 0px #FF55FF80",
        "dos-glowLgMagenta": "0px 0px 30px 0px #FF55FF80",
        "dos-glowXsBlue": "0px 0px 8px 0px #5555FF80",
        "dos-glowSmBlue": "0px 0px 10px 0px #5555FF80",
        "dos-glowMdBlue": "0px 0px 20px 0px #5555FF80",
        "dos-glowLgBlue": "0px 0px 30px 0px #5555FF80",
        "dos-glowXsWhite": "0px 0px 8px 0px #FFFFFF80",
        "dos-glowSmWhite": "0px 0px 10px 0px #FFFFFF80",
        "dos-glowMdWhite": "0px 0px 20px 0px #FFFFFF80",
        "dos-glowLgWhite": "0px 0px 30px 0px #FFFFFF80"
      }
    }
  }
};

preset.plugins = [
  ...(preset.plugins || []),
  ...(reactAriaPlugin ? [reactAriaPlugin] : []),
  ...(animatePlugin ? [animatePlugin] : []),
];

module.exports = preset;
