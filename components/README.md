# JKV Prime — Animated Connectivity Topology (Next.js)

A drop-in React/Next.js component recreating the supplied screenshot. The laptop photography is a lightweight WebP, while the screen is **fully editable SVG**: heading, logo, 8 infrastructure cards, connections, icons, status ribbon, flowing particles, failover, and subtle glows.

## Install

1. Copy `components/JKVConnectivity.tsx` and `components/JKVConnectivity.module.css` to your Next.js project's `src/components/` (or `components/` if not using `src`).
2. Copy both files in `public/images/` into your Next.js project's `public/images/`.
3. Import and render the component:

   ```tsx
   import JKVConnectivity from "@/components/JKVConnectivity";

   export default function Page() {
     return <JKVConnectivity />;
   }
   ```

No npm packages are required. Works in App Router and Pages Router. `"use client"` is included in the component.

### Optional variants

```tsx
<JKVConnectivity animated={false} />
<JKVConnectivity className="my-custom-class" />
```

## Architecture

- Laptop: `public/images/jkv-connectivity-laptop.webp` (same perspective / hardware as your provided reference)
- Logo: `public/images/jkv-connectivity-logo.png` (cropped from your reference to preserve the original mark)
- White display: React SVG `viewBox="0 0 1230 695"`
- Responsive: the entire laptop and its live SVG dashboard scale proportionally to the available width on desktop, tablet, and mobile; **no horizontal scroll**
- Effects: CSS animated emerald glows + SVG animated route points + moving dashed highlights
- Accessibility: semantic wrapper and a detailed SVG alternative text label

## Customize

- Text/cards: edit `EndpointCard` props and header strings in `JKVConnectivity.tsx`.
- Network paths: edit the `routes` array at the top of `JKVConnectivity.tsx`.
- Colors: edit SVG gradients, strokes, fills, and CSS classes. Brand colors currently use #F3F9F6, #FFFFFF, #E6F6F2 family, #071F1B, #103A32, and #16B8A6.
- Animation: edit `lineTravel`, `endpointBreath`, and `coreBreath` in the CSS module.
- Width: wrap with a parent max-width container, e.g. `<div className="mx-auto max-w-[1672px]"><JKVConnectivity /></div>`.

## Important visual note

This preserves the original photographic laptop via an image asset and recreates its **entire screen** as live SVG. Therefore it closely follows the provided reference without the impractical work of modeling physically accurate keyboard hardware in CSS. You can replace the photo with a separately licensed laptop image later, provided screen coordinates and proportions are adjusted.

## Performance note

The photo uses a compressed WebP. The animated SVG uses small numbers of layers and no JS animation loop. Honor reduced-motion by passing `animated={false}` if needed. Animated SVG `<animateMotion>` is supported by modern Chromium/Firefox/Safari. CSS transitions support card hover emphasis.

## Mobile and tablet behavior (updated)

The entire laptop, including its screen and keyboard, **fits inside its parent container at every breakpoint**. No minimum-width restriction, clipping, or sideways swipe is used. It automatically scales down on tablets and phones, keeping the exact 1672:941 composition. Because the full desktop dashboard is reduced proportionally, its smallest text is naturally harder to read on narrow phones.

For pages using CSS Grid or Flexbox, ensure the **parent column** may shrink, too (for example, Tailwind `min-w-0` on the grid/flex item). Don't force a fixed pixel width on the parent.

```tsx
<section className="w-full min-w-0 overflow-hidden">
  <JKVConnectivity />
</section>
```
