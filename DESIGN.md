---
name: Lex Sovereign
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c6cf'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9198'
  outline-variant: '#43474e'
  surface-tint: '#afc8f0'
  primary: '#afc8f0'
  on-primary: '#163152'
  primary-container: '#001f3f'
  on-primary-container: '#6f88ad'
  inverse-primary: '#476083'
  secondary: '#e9c176'
  on-secondary: '#412d00'
  secondary-container: '#604403'
  on-secondary-container: '#dab36a'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#1d1f1f'
  on-tertiary-container: '#858687'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#afc8f0'
  on-primary-fixed: '#001c3a'
  on-primary-fixed-variant: '#2f486a'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-x: 32px
  section-padding: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is engineered to evoke an atmosphere of absolute authority, heritage, and contemporary precision. Targeting high-net-worth individuals and corporate entities, the UI must feel like a bespoke digital atelier rather than a generic service provider.

The aesthetic direction is **Corporate / Modern** with a **High-End Minimalist** finish. It prioritizes clarity and expansive whitespace to allow the premium typography to breathe. Subtle influences of **Glassmorphism** are used sparingly on interactive overlays to maintain a modern edge, while the overall structure remains grounded in traditional grid systems to project stability and trust.

## Colors

The palette is anchored by **Deep Navy Blue**, providing a sophisticated alternative to pure black, serving as the primary background and structural color. **Gold** is utilized strictly as a "prestige accent"—reserved for call-to-action elements, icons, and subtle borders to signify value and success. 

**White** is used for primary content to ensure high legibility against the dark background. A secondary **Neutral** (Dark Charcoal) is used for container backgrounds to create subtle depth without breaking the dark-mode immersion.

## Typography

This design system utilizes a high-contrast typographic pairing to balance tradition and modernity. **Playfair Display** provides the editorial, authoritative voice required for legal branding, used exclusively for headings and key pull-quotes. 

**Inter** serves as the functional workhorse for body copy and UI labels, ensuring maximum readability across digital screens. Large display headings should utilize negative letter-spacing for a tighter, more "designed" look, while labels utilize expanded tracking and uppercase styling to denote categorization.

## Layout & Spacing

The layout follows a **Fixed 12-Column Grid** on desktop to maintain a structured, institutional feel. Generous vertical padding (120px+) between sections is mandatory to enforce the premium, unhurried pace of the brand experience.

On mobile, the grid collapses to a single column with 20px side margins. Content reflows to prioritize the consultation form and core service pillars. Spacing follows a strict 8px base unit to ensure mathematical harmony across all components.

## Elevation & Depth

To maintain a "Sleek & Modern" feel, depth is achieved through **Tonal Layering** rather than heavy shadows. 
- **Base Level:** Deep Navy (#00152B).
- **Surface Level:** Slightly lighter Navy (#001F3F) or Dark Charcoal for cards.
- **Floating Level:** 1px Gold or Low-opacity White borders are used instead of shadows for a crisp, high-end feel.

Where shadows are necessary (e.g., dropdowns or modals), use **Ambient Shadows**: extra-diffused, 15% opacity black with a 20px blur and no offset, creating a soft glow that feels integrated rather than "pasted on."

## Shapes

The design system employs a **Soft (0.25rem)** roundedness. This subtle curve softens the harshness of the dark palette while maintaining the "sharp" professional look of a law firm. Excessive rounding (pills) should be avoided to prevent the UI from appearing too casual or "tech-startup."

## Components

### Buttons
Primary buttons use the Gold (#C5A059) background with dark navy text, featuring a 1px inset border of a lighter gold for a metallic sheen. Secondary buttons use a ghost style: white text with a 1px white or gold border.

### Cards
Legal service cards should have a subtle background shift on hover and a 1px top-border in Gold. Icons within cards should be "Line Art" style in Gold to maintain a sophisticated look.

### Accordions (FAQs)
FAQs utilize a "minimalist divide" style—no background fill, just thin horizontal white lines (10% opacity) separating items. The expansion icon is a simple chevron in Gold.

### Consultation Forms
Forms are high-contrast: White backgrounds or very light grey fields to pop against the dark UI. Focus states use a 2px Gold border. Labels are always "Inter" in Uppercase (label-caps) for a formal, organized structure.

### Lists
Lists for "Practice Areas" should use a Gold "Justice Scale" or simple "Bullet" icon, with Inter Medium for the list item text to ensure weight and importance.