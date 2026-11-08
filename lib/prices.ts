// Indicative price simulation for the homepage ticker (demo data, not live quotes).
export type Quote = { symbol: string; bid: number; ask: number; change: number; digits: number };

const BASE: { symbol: string; mid: number; spread: number; digits: number }[] = [
  { symbol: "EUR/USD", mid: 1.0842, spread: 0.00001, digits: 5 },
  { symbol: "GBP/USD", mid: 1.2715, spread: 0.00002, digits: 5 },
  { symbol: "USD/JPY", mid: 151.42, spread: 0.002, digits: 3 },
  { symbol: "AUD/USD", mid: 0.6578, spread: 0.00002, digits: 5 },
  { symbol: "USD/CHF", mid: 0.8823, spread: 0.00002, digits: 5 },
  { symbol: "USD/CAD", mid: 1.3741, spread: 0.00002, digits: 5 },
  { symbol: "XAU/USD", mid: 2384.6, spread: 0.12, digits: 2 },
  { symbol: "EUR/GBP", mid: 0.8527, spread: 0.00002, digits: 5 },
];

export function quotes(t = Date.now()): Quote[] {
  return BASE.map((b, i) => {
    // deterministic-ish wave so all clients see similar movement
    const w = Math.sin(t / 9000 + i * 1.7) * 0.0009 + Math.sin(t / 2300 + i) * 0.0003;
    const mid = b.mid * (1 + w);
    const half = b.spread / 2;
    return {
      symbol: b.symbol,
      bid: +(mid - half).toFixed(b.digits),
      ask: +(mid + half).toFixed(b.digits),
      change: +(w * 100).toFixed(2),
      digits: b.digits,
    };
  });
}
