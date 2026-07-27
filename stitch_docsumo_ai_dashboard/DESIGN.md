---
name: Lumina Document Intelligence
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#4fdbc8'
  on-secondary: '#003731'
  secondary-container: '#04b4a2'
  on-secondary-container: '#003f38'
  tertiary: '#adc6ff'
  on-tertiary: '#002e6a'
  tertiary-container: '#71a1ff'
  on-tertiary-container: '#00367a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#71f8e4'
  secondary-fixed-dim: '#4fdbc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-mono:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1280px
---

## Brand & Style

The brand identity centers on clarity, velocity, and futuristic intelligence. It targets high-productivity professionals and researchers who need to distill complex information instantly.

The design system employs a **Glassmorphism** aesthetic to evoke a sense of depth and digital sophistication. This style utilizes multi-layered semi-transparent surfaces, high-grade backdrop blurs, and luminous accents to simulate a high-tech "heads-up display" environment. The emotional response is one of precision, calm efficiency, and cutting-edge reliability.

## Colors

The palette is anchored in a deep **Dark Slate (#0f172a)** base to maximize contrast for the glass effects and vibrant accents. 

- **Primary Emerald (#10b981)**: Used for high-intent actions, success states, and primary AI-generated insights.
- **Secondary Teal (#14b8a6)**: Used for supporting interactive elements and data visualization.
- **Tertiary Blue (#3b82f6)**: Reserved for informational highlights and link states to differentiate from primary tasks.
- **Surface Palette**: Backgrounds utilize `slate-900` (#0f172a), while elevated glass panels use `slate-800/40` with a 12px backdrop blur.
- **Border Palette**: All borders on glass elements must use a semi-transparent `slate-700/50` to maintain the illusion of thin glass edges.

## Typography

This design system utilizes **Geist** for its technical precision and exceptional legibility in dark interfaces. 

- **Headlines**: Use tighter letter spacing for large display text to create a compact, modern feel.
- **Body Text**: Maintain standard spacing and use `slate-300` for primary content to reduce eye strain against the dark background.
- **Hierarchy**: Use font weight (600 vs 400) rather than scale alone to establish importance within dense document views.
- **Monospace**: Geist Mono is used for metadata, timestamps, and document ID references to lean into the "AI/Data" narrative.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a 12-column structure for desktop and a 4-column structure for mobile.

- **Internal Spacing**: Use a 4px base unit. Component padding should generally follow `16px` (4 units) or `24px` (6 units) for consistency.
- **Glass Panels**: Maintain a minimum of `24px` gap between floating panels to allow the background gradients and blurs to remain visible.
- **Responsive Behavior**: On mobile, glass panels should lose their external margins and become full-width "sheets" that slide from the bottom to maximize readability.

## Elevation & Depth

Depth is established through transparency and blur rather than traditional opacity stacks.

- **Level 1 (Base)**: Dark Slate #0f172a.
- **Level 2 (Panels)**: Surface color of `rgba(30, 41, 59, 0.4)` with `backdrop-filter: blur(12px)`.
- **Level 3 (Modals/Popovers)**: Surface color of `rgba(51, 65, 85, 0.6)` with `backdrop-filter: blur(20px)` and a soft primary-tinted outer glow (`0 20px 25px -5px rgba(16, 185, 129, 0.1)`).
- **Edge Treatment**: Every elevated panel must have a 1px solid border at `rgba(71, 85, 105, 0.5)` to define the glass edge against the dark background.

## Shapes

The shape language is sophisticated and approachable, utilizing generous corner radii to soften the technical aesthetic.

- **Base Radius**: `0.5rem (8px)` for small components like inputs and tags.
- **Large Radius**: `1rem (16px)` for standard cards and glass panels.
- **Extra Large Radius**: `1.5rem (24px)` for main dashboard containers and large hero sections.
- **Pill**: Used exclusively for status indicators and high-pill buttons.

## Components

- **Buttons**: Primary buttons use a linear gradient from Emerald to Teal with a subtle outer glow on hover. Ghost buttons use the transparent glass border treatment.
- **Input Fields**: Backgrounds are `slate-950/50`. On focus, the border transitions to Primary Emerald with a 2px outer glow.
- **Glass Cards**: The signature component. Feature a 1px top-light border (slightly brighter than the bottom border) to simulate light hitting the edge of the glass.
- **Chips/Tags**: Small, semi-transparent capsules with high-contrast text. Use `emerald-500/10` background with `emerald-400` text.
- **Progress Bars**: Use a glowing Teal-to-Emerald gradient for active AI processing states, accompanied by a subtle pulse animation.
- **Document Lists**: Rows are separated by thin `slate-800` lines. Hovering over a row applies a `white/5` highlight effect and shifts the glass panel depth slightly.