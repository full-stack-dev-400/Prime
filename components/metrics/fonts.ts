import { Archivo } from "next/font/google";

// Display face for the metric values. Kept separate from the hero's font module
// so this section has no dependency on hero files. Browsers fetch the shared
// font files once.
export const metricsDisplay = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-metrics-display",
  display: "swap",
});
