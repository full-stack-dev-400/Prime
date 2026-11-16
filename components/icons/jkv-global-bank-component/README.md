# JKV Global — Animated Bank SVG for Next.js

A transparent, scalable, vector recreation of the supplied JKV Global institutional bank illustration. Built from SVG paths, gradients, masks, text and CSS keyframe animations. **No raster image or third-party animation library required.**

## Installation

Copy the two files to `src/components/` (or `components/` if you do not use `src`):

- `components/JKVGlobalBank.tsx`
- `components/JKVGlobalBank.module.css`

Then use:

```tsx
import JKVGlobalBank from "@/components/JKVGlobalBank";

export default function LiquiditySection() {
  return (
    <section className="w-full overflow-hidden bg-[#F3F9F6] py-10">
      <JKVGlobalBank width="min(100%, 900px)" />
    </section>
  );
}
```

### Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `animated` | `boolean` | `true` | Disable all ambient animations and tile hovers |
| `width` | CSS width | `100%` | e.g. `740`, `"70vw"`, `"min(100%, 900px)"` |
| `className` | `string` | `""` | Append your own Tailwind/CSS classes |
| `title` | `string` | Illustration description | Screen reader label |

## Animation

- Currency tiles: a gentle staggered floating animation; stronger emerald glow on hover.
- Bank interior: softly breathing green ambience.
- Silver columns: slowly varying reflective glints.
- Roof and lower silver base: quiet light accents.
- `prefers-reduced-motion` is respected automatically.

## Responsiveness

The SVG has a 1080×810 viewBox and scales down to the containing element's width. **No fixed minimum width, no internal horizontal scroll**. The background is transparent. Place it on a dark or mint section.

## Fidelity note

This is an original vector redraw of your supplied reference, not an automated pixel-for-pixel vector trace. The layout, chrome columns, emerald walls, roof geometry, logo lettering, plinth and currencies are recreated as editable SVG shapes. The logo mark is an approximation; if exact brand fidelity is required, replace the mark with your official SVG artwork.
