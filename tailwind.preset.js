/**
 * Eidotter Tailwind CSS Preset
 * AUTO-GENERATED - Do not edit manually
 *
 * Generated from: src/tokens/base.tokens.json
 * Run: npm run build-tokens
 *
 * Usage:
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('eidotter/tailwind.preset')],
 *   }
 */

module.exports = {
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
        "cga-white-glow": "#ffffff80",
        "dos-bg-primary": "var(--color-semantic-background-primary)",
        "dos-bg-secondary": "var(--color-semantic-background-secondary)",
        "dos-bg-accent": "var(--color-semantic-background-accent)",
        "dos-text-primary": "var(--color-semantic-text-primary)",
        "dos-text-secondary": "var(--color-semantic-text-secondary)",
        "dos-text-accent": "var(--color-semantic-text-accent)",
        "dos-text-disabled": "var(--color-semantic-text-disabled)",
        "dos-border-default": "var(--color-semantic-border-default)",
        "dos-border-focus": "var(--color-semantic-border-focus)",
        "dos-border-hover": "var(--color-semantic-border-hover)",
        "dos-border-disabled": "var(--color-semantic-border-disabled)",
        "dos-link": "var(--color-semantic-link-default)",
        "dos-link-hover": "var(--color-semantic-link-hover)",
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
          "\"JetBrains Mono\"",
          "\"JetBrainsMono Nerd Font\"",
          "Consolas",
          "Monaco",
          "monospace"
        ],
        "dos-fallback": [
          "Consolas",
          "Monaco",
          "\"Courier New\"",
          "monospace"
        ]
      },
      "fontSize": {
        "dos-xs": "12px",
        "dos-sm": "14px",
        "dos-base": "16px",
        "dos-lg": "18px",
        "dos-xl": "20px",
        "dos-2xl": "24px",
        "dos-3xl": "30px",
        "dos-4xl": "36px"
      },
      "lineHeight": {
        "dos-tight": "1.2",
        "dos-normal": "1.5",
        "dos-loose": "1.8"
      },
      "fontWeight": {
        "dos-regular": "400",
        "dos-semibold": "600",
        "dos-bold": "700"
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
        "dos-drop": "2px 2px 0px 0px #000000",
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
