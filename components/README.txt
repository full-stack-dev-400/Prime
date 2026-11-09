JKV Prime Infrastructure component

1. Copy Infrastructure.tsx and Infrastructure.module.css into your existing components/ directory.
2. In app/page.tsx, import Infrastructure from '@/components/Infrastructure' (adjust path to your project).
3. Render <Infrastructure /> after your Solutions section.
4. The component renders <section id="infrastructure">, matching the Navbar's href="#infrastructure".

No additional React packages, fonts, image assets or animation libraries required.
Uses your site's existing font-family automatically.
The floating stock marks are stylized inline SVG badges and FX pair text (no external logos or API calls).

Sequence:
- First: scroll expanding sticky market panel (230svh) with pointer-reactive badges
- Then: 4-step sticky-heading scroll timeline with active progress rail
- Then: LD4 / LD5 topology and 4 supplied service targets

The targets and descriptions are used as supplied by you, not independently verified operational metrics.
