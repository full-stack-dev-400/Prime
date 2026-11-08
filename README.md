# JKV Prime – Website

Next.js 14 (App Router) + Node.js API routes + Supabase. Marketing site for JKV Global, a liquidity provider.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional – the site runs without Supabase
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm start`. Needs Node 18.17 or newer.

## Connect Supabase

1. Create a project at https://supabase.com.
2. Open **SQL Editor**, paste `supabase/schema.sql` and run it. This creates the `leads` and `subscribers` tables with RLS turned on.
3. Copy the Project URL, the anon key and the service-role key (**Project Settings → API**) into `.env.local`.
4. Restart `npm run dev`. Contact-form enquiries now appear in **Table Editor → leads**.

Without Supabase keys the forms still work. Submissions are logged to the server console and the API returns `stored: false`.

## Structure

```
app/
  layout.tsx            fonts (Manrope, JetBrains Mono), metadata
  page.tsx              homepage
  globals.css           Tailwind + glass-slab 3D styles
  api/contact/route.ts  POST → validates input, inserts into Supabase `leads`
  api/subscribe/route.ts POST → upsert into `subscribers`
  api/prices/route.ts   GET → indicative FX quotes for the ticker (simulated)
components/
  GlassArchitecture.tsx hero "Liquidity Architecture" (CSS 3D, cursor tilt, slabs separate on scroll)
  Hero, Navbar, PriceTicker, Solutions, Infrastructure, Clients, Onboarding, Contact, ContactForm, Footer, Logo
lib/
  supabase.ts           server-only Supabase client (service role)
  prices.ts             price simulation
supabase/schema.sql     database schema
tailwind.config.ts      JKV Prime colour palette as Tailwind tokens
public/brand/           original logo, hero reference, favicon
```

## Content to check before launch

These figures and details are **placeholders**. Replace them with JKV's real numbers:
- Hero stats (`<1ms`, `40+ LPs`, `24/5`) in `components/Hero.tsx`
- Infrastructure metrics and the NY4/TY3 "Planned" sites in `components/Infrastructure.tsx`
- Email addresses and office in `components/Contact.tsx`
- Ticker prices come from a simulation in `lib/prices.ts`. Connect a real feed there if needed.

The header logo is a vector recreation in `components/Logo.tsx`. For pixel-perfect branding, swap in an official SVG or transparent PNG.
