"use client";

import { useId, type CSSProperties } from "react";
import styles from "./JKVGlobalBank.module.css";

/**
 * JKV Global Bank — responsive, fully vector illustration.
 *
 * No external images, 3D libraries or animation dependencies.
 * The artwork has a transparent canvas and scales as a single SVG.
 */
export type JKVGlobalBankProps = {
  className?: string;
  /** Turn the ambient, hover and currency-tile animations on/off. */
  animated?: boolean;
  /** CSS width. Examples: "100%", 720, "min(100%, 900px)". */
  width?: CSSProperties["width"];
  /** Optional label for screen readers. */
  title?: string;
};

type Paint = (name: string) => string;

function Column({ x, paint }: { x: number; paint: Paint }) {
  return (
    <g transform={`translate(${x} 0)`}>
      {/* Green bounce lighting behind a metallic column. */}
      <rect x="9" y="307" width="54" height="224" fill={paint("behindColumn")} opacity=".48" />

      {/* Capital, stepped ornamental rim and cylindrical neck. */}
      <path d="M-3 294 H70 L66 302 H0 Z" fill={paint("silverEdge")} stroke="#6B8F88" strokeWidth="1.3" />
      <path d="M2 300 H65 L61 307 H6 Z" fill={paint("chrome")} stroke="#527E75" strokeWidth=".9" />
      <ellipse cx="34" cy="308" rx="29" ry="5" fill={paint("chrome")} stroke="#72948D" strokeWidth="1" />
      <path d="M10 309 C15 317 14 319 14 328 H53 C53 319 53 316 58 309 Z" fill={paint("chrome")} stroke="#789D95" strokeWidth="1.1" />
      <path d="M15 322 H53 V508 H15 Z" fill={paint("pillar")} stroke="#79978F" strokeWidth="1.2" />
      <path d="M18 324 V506 M25 324 V506 M39 324 V506 M47 324 V506" fill="none" stroke="#FCFFFD" strokeOpacity=".57" strokeWidth="2" />
      <path d="M21 326 V506 M33 326 V506 M44 326 V506" fill="none" stroke="#254C43" strokeOpacity=".22" strokeWidth="3" />
      <path d="M15 327 H53 V505 H15 Z" fill={paint("columnGreenReflections")} opacity=".55" />
      {/* Moving glint visible only inside the shaft. */}
      <path className={styles.columnGleam} d="M24 325 V504" stroke="#FFFFFF" strokeOpacity=".42" strokeWidth="5" />

      {/* Foot: torus-like transitions, plinth and metallic edge. */}
      <path d="M14 503 H54 L56 513 H12 Z" fill={paint("silverEdge")} stroke="#64887F" strokeWidth="1" />
      <path d="M9 511 H60 L63 518 H6 Z" fill={paint("chrome")} stroke="#537F73" strokeWidth="1.2" />
      <path d="M4 518 H65 L68 526 H1 Z" fill={paint("chrome")} stroke="#87A9A3" strokeWidth="1.2" />
      <rect x="1" y="526" width="67" height="11" rx="2" fill={paint("silverEdge")} stroke="#587A74" strokeWidth="1" />
      <path d="M2 528 H67" fill="none" stroke="#F4FFFD" strokeOpacity=".84" strokeWidth="1.3" />
    </g>
  );
}

const currencyTiles = [
  { symbol: "$", x: 213, y: 538, title: "US dollar" },
  { symbol: "€", x: 325, y: 543, title: "Euro" },
  { symbol: "£", x: 444, y: 546, title: "Pound sterling" },
  { symbol: "¥", x: 560, y: 545, title: "Japanese yen" },
];

function CurrencyTile({
  x,
  y,
  symbol,
  title,
  index,
  paint,
}: {
  x: number;
  y: number;
  symbol: string;
  title: string;
  index: number;
  paint: Paint;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`${styles.currencyTile} ${styles[`currency${index + 1}`]}`}>
        <title>{title}</title>
        <rect x="0" y="5" width="88" height="88" rx="18" fill="#023D34" opacity=".38" filter={paint("tileShadow")} />
        <rect x="0" y="1" width="88" height="84" rx="17" fill={paint("tileEdge")} stroke="#719F95" strokeWidth="1.3" />
        <rect x="4" y="3" width="80" height="78" rx="15" fill={paint("tileFront")} stroke="#CCFFF1" strokeOpacity=".8" strokeWidth="1.1" />
        <path d="M19 5 H68 Q82 5 82 21 V25 Q60 11 8 21 V20 Q8 5 19 5 Z" fill="#FFFFFF" opacity=".12" />
        <path d="M9 70 Q44 79 80 67" fill="none" stroke="#CCFFF1" strokeWidth="1.5" strokeOpacity=".32" />
        <path d="M8 16 Q8 8 17 8 H70" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity=".57" />
        <text
          x="44"
          y="55"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize={symbol === "¥" ? "49" : "52"}
          fontWeight="500"
          fill="#F8FFFD"
          stroke="#C7FFF0"
          strokeOpacity=".4"
          strokeWidth=".35"
          paintOrder="stroke fill"
          filter={paint("symbolGlow")}
        >
          {symbol}
        </text>
        <rect className={styles.tileHighlight} x="5" y="5" width="78" height="74" rx="14" fill="none" stroke="#9BFFDF" strokeWidth="1.7" />
      </g>
    </g>
  );
}

export default function JKVGlobalBank({
  className = "",
  animated = true,
  width = "100%",
  title = "JKV Global institutional bank with four metallic columns and currency symbols",
}: JKVGlobalBankProps) {
  // SVG paint IDs must be unique when the component is used more than once.
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${uid}-${name}`;
  const paint: Paint = (name) => `url(#${id(name)})`;

  return (
    <div
      className={`${styles.root} ${!animated ? styles.still : ""} ${className}`.trim()}
      style={{ width }}
    >
      <svg
        className={styles.artwork}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1080 810"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={title}
      >
        <defs>
          <linearGradient id={id("chrome")} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#5D7E77" />
            <stop offset=".08" stopColor="#EBF8F4" />
            <stop offset=".18" stopColor="#91A9A4" />
            <stop offset=".27" stopColor="#FFFFFF" />
            <stop offset=".36" stopColor="#A6BEBA" />
            <stop offset=".47" stopColor="#547E72" />
            <stop offset=".61" stopColor="#F5FFFC" />
            <stop offset=".73" stopColor="#AFC6C0" />
            <stop offset=".86" stopColor="#FCFFFE" />
            <stop offset="1" stopColor="#62847B" />
          </linearGradient>
          <linearGradient id={id("pillar")} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#657E78" />
            <stop offset=".09" stopColor="#F5FAF8" />
            <stop offset=".19" stopColor="#A4BEB6" />
            <stop offset=".32" stopColor="#FAFFFD" />
            <stop offset=".47" stopColor="#86A69E" />
            <stop offset=".59" stopColor="#EDF9F5" />
            <stop offset=".72" stopColor="#73938B" />
            <stop offset=".84" stopColor="#E6F5EE" />
            <stop offset="1" stopColor="#52766C" />
          </linearGradient>
          <linearGradient id={id("silverEdge")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FCFFFE" />
            <stop offset=".18" stopColor="#C6DBD5" />
            <stop offset=".4" stopColor="#78958E" />
            <stop offset=".57" stopColor="#F2FBF8" />
            <stop offset=".8" stopColor="#93ABA4" />
            <stop offset="1" stopColor="#3E695D" />
          </linearGradient>
          <linearGradient id={id("roofWhite")} x1=".2" x2=".82" y1="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset=".24" stopColor="#EAF5F2" />
            <stop offset=".6" stopColor="#FCFFFD" />
            <stop offset="1" stopColor="#9BB6AE" />
          </linearGradient>
          <linearGradient id={id("roofCap")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F7FFFC" />
            <stop offset=".28" stopColor="#789A91" />
            <stop offset=".5" stopColor="#F0FBF6" />
            <stop offset=".75" stopColor="#92ADA6" />
            <stop offset="1" stopColor="#466B62" />
          </linearGradient>
          <linearGradient id={id("roofRight")} x1="0" x2="1" y1="0" y2=".6">
            <stop offset="0" stopColor="#F4FFFC" />
            <stop offset=".4" stopColor="#7C9F95" />
            <stop offset="1" stopColor="#3F7161" />
          </linearGradient>
          <linearGradient id={id("greenWall")} x1="0" x2="1" y1="0" y2=".35">
            <stop offset="0" stopColor="#0A5D45" />
            <stop offset=".18" stopColor="#238F6C" />
            <stop offset=".37" stopColor="#0B493B" />
            <stop offset=".64" stopColor="#178363" />
            <stop offset=".85" stopColor="#063D32" />
            <stop offset="1" stopColor="#1B6D56" />
          </linearGradient>
          <linearGradient id={id("sideWall")} x1="0" x2="1" y1="0" y2=".1">
            <stop offset="0" stopColor="#155C47" />
            <stop offset=".25" stopColor="#2EA17D" />
            <stop offset=".65" stopColor="#0E5943" />
            <stop offset="1" stopColor="#0B3F34" />
          </linearGradient>
          <linearGradient id={id("behindColumn")} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#00D79E" stopOpacity=".4" />
            <stop offset=".5" stopColor="#D6FFE9" stopOpacity=".24" />
            <stop offset="1" stopColor="#008B60" stopOpacity=".3" />
          </linearGradient>
          <linearGradient id={id("columnGreenReflections")} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#056F4E" stopOpacity=".36" />
            <stop offset=".28" stopColor="#E2FFF1" stopOpacity="0" />
            <stop offset=".7" stopColor="#11A36D" stopOpacity=".2" />
            <stop offset="1" stopColor="#065C45" stopOpacity=".4" />
          </linearGradient>
          <linearGradient id={id("baseSilver")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F3FFF9" />
            <stop offset=".2" stopColor="#B2CDC4" />
            <stop offset=".49" stopColor="#FCFFFD" />
            <stop offset=".66" stopColor="#6C9A8A" />
            <stop offset=".83" stopColor="#DDEFE9" />
            <stop offset="1" stopColor="#3E6C5C" />
          </linearGradient>
          <linearGradient id={id("baseTop")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#E9FFF7" />
            <stop offset=".56" stopColor="#97B7AA" />
            <stop offset="1" stopColor="#588777" />
          </linearGradient>
          <linearGradient id={id("plinthFront")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#D7F7EC" />
            <stop offset=".15" stopColor="#408C72" />
            <stop offset=".3" stopColor="#0C6A4A" />
            <stop offset=".56" stopColor="#0D5C42" />
            <stop offset=".76" stopColor="#3A9E7A" />
            <stop offset="1" stopColor="#053D2E" />
          </linearGradient>
          <linearGradient id={id("tileEdge")} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#D1FFF0" />
            <stop offset=".2" stopColor="#4DB99A" />
            <stop offset=".7" stopColor="#036344" />
            <stop offset="1" stopColor="#D4FFF4" />
          </linearGradient>
          <linearGradient id={id("tileFront")} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#389F7B" />
            <stop offset=".2" stopColor="#1B8667" />
            <stop offset=".52" stopColor="#076148" />
            <stop offset=".86" stopColor="#0A6F52" />
            <stop offset="1" stopColor="#178E6F" />
          </linearGradient>
          <radialGradient id={id("innerGlow")}> 
            <stop offset="0" stopColor="#B1FFDB" stopOpacity=".44" />
            <stop offset=".58" stopColor="#50E7B1" stopOpacity=".11" />
            <stop offset="1" stopColor="#52D89F" stopOpacity="0" />
          </radialGradient>
          <filter id={id("groundShadow")} x="-40%" y="-300%" width="180%" height="700%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <filter id={id("tileShadow")} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id={id("symbolGlow")} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="1.6" floodColor="#00291E" floodOpacity=".42" />
          </filter>
          <filter id={id("auraBlur")} x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
        </defs>

        {/* No background rect: transparent SVG by design. */}
        <ellipse cx="526" cy="659" rx="416" ry="23" fill="#05291E" opacity=".22" filter={paint("groundShadow")} />

        {/* Architectural green back wall. */}
        <path d="M278 284 L725 278 L822 300 L822 536 L727 549 L277 540 Z" fill={paint("greenWall")} stroke="#1B7259" strokeWidth="2" />
        <path d="M725 279 L822 301 L822 535 L725 548 Z" fill={paint("sideWall")} stroke="#1B5C49" strokeWidth="2" />
        <path d="M734 295 V536 M751 298 V540 M783 303 V539 M808 303 V536" stroke="#003D2E" strokeWidth="4" strokeOpacity=".44" />
        <path d="M742 299 V534 M772 304 V535 M796 305 V534" stroke="#93FFE0" strokeWidth="2" strokeOpacity=".18" />
        <rect x="284" y="302" width="431" height="232" fill={paint("innerGlow")} className={styles.wallLight} />
        <path d="M291 305 V531 M386 305 V531 M494 305 V531 M608 305 V531 M709 301 V535" fill="none" stroke="#9DFFE0" strokeWidth="1.5" strokeOpacity=".2" />

        {/* Four modeled silver columns. */}
        {[295, 404, 510, 614].map((x) => (
          <Column key={x} x={x} paint={paint} />
        ))}

        {/* Pediment: perspective right wing, triangular front and crown. */}
        <path d="M718 249 L852 286 L848 310 L719 277 Z" fill={paint("roofRight")} stroke="#6B9689" strokeWidth="2" />
        <path d="M723 258 L850 289 L842 295 L723 267 Z" fill="#E7FCF5" opacity=".7" />
        <path d="M247 257 L493 120 L729 253 L724 284 L257 300 L249 281 Z" fill={paint("roofCap")} stroke="#7F9D94" strokeWidth="2.2" />
        <path d="M268 260 L494 134 L713 256 L704 267 L281 270 Z" fill={paint("roofWhite")} stroke="#406E63" strokeWidth="2" />
        <path d="M281 259 L494 142 L699 255" fill="none" stroke="#B9DFD3" strokeWidth="3.2" />
        <path d="M267 261 L494 127 L720 258" fill="none" stroke="#F9FFFD" strokeOpacity=".96" strokeWidth="3.3" />
        <path d="M275 261 L495 137 L708 256" fill="none" stroke="#125340" strokeOpacity=".53" strokeWidth="3.8" />
        <path className={styles.roofShimmer} d="M297 253 L494 145 L685 251" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2" />

        {/* Stylized vector representation of the JKV Global brand mark. */}
        <g aria-hidden="true">
          <path d="M420 230 L445 193 H460 L436 230 Z" fill="#0FBD85" />
          <path d="M438 230 L463 193 H477 L452 230 Z" fill="#0A7B60" />
          <path d="M420 230 L438 230 L461 194 L444 194 Z" fill="#37D5A7" opacity=".55" />
          <path d="M441 232 L453 232 L474 202 L463 202 Z" fill="#D5FBEF" opacity=".36" />
          <text x="480" y="216" fill="#073C30" fontSize="39" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="-2">JKV</text>
          <text x="479" y="237" fill="#12362F" fontSize="13.7" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="5.5">GLOBAL</text>
        </g>

        {/* Overhanging long roof cornice with multiple polished layers. */}
        <path d="M251 263 L725 263 L848 290 L848 305 L722 278 L255 284 Z" fill={paint("roofCap")} stroke="#416E63" strokeWidth="1.7" />
        <path d="M258 266 L720 265 L840 292" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeOpacity=".85" />
        <path d="M258 278 L720 276 L843 301" fill="none" stroke="#215E4F" strokeWidth="2" opacity=".8" />
        <path d="M255 285 L721 280 L845 306 L844 316 L718 296 L258 306 Z" fill={paint("silverEdge")} stroke="#5A8276" strokeWidth="1.7" />
        <path d="M258 290 L719 285 L842 310" fill="none" stroke="#F8FFFB" strokeWidth="2" opacity=".88" />
        <path d="M258 302 L718 293 L842 317" fill="none" stroke="#07553D" strokeWidth="2.3" opacity=".6" />

        {/* Lower architectural platform: back top, bevel and front steps. */}
        <path d="M185 554 L827 545 L893 573 L894 598 L178 594 L177 576 Z" fill={paint("baseSilver")} stroke="#60897E" strokeWidth="1.9" />
        <path d="M178 570 L826 557 L890 575 L831 586 L183 586 Z" fill={paint("baseTop")} stroke="#AECAC0" strokeWidth="1.2" />
        <path d="M179 585 L888 585 L891 609 L181 608 Z" fill={paint("silverEdge")} stroke="#668D82" strokeWidth="1.2" />
        <path d="M181 603 L892 604" stroke="#F8FFFB" strokeWidth="2.2" strokeOpacity=".75" />

        {/* Deep beveled bottom slab: three-dimensional green/silver front edge. */}
        <path d="M116 617 L185 597 L894 601 L961 622 L959 656 L903 678 L121 661 Z" fill={paint("baseSilver")} stroke="#8CAFA3" strokeWidth="2" />
        <path d="M118 619 L179 606 L897 605 L959 622 L901 634 L175 630 Z" fill={paint("baseTop")} stroke="#C6E9DC" strokeWidth="1.2" />
        <path d="M118 627 L179 634 L901 634 L961 622 L957 651 L903 663 L123 652 Z" fill={paint("plinthFront")} stroke="#336B55" strokeWidth="2" />
        <path d="M121 632 L181 639 L901 639 L957 628" fill="none" stroke="#9EFFD4" strokeWidth="2" strokeOpacity=".68" />
        <path d="M121 649 L184 656 L902 658 L960 646" fill="none" stroke="#D3FFF0" strokeWidth="2" strokeOpacity=".74" />
        <path d="M122 658 L902 673 L958 651" fill="none" stroke="#0B6348" strokeWidth="7" opacity=".86" />
        <path d="M122 659 L902 675 L958 654" fill="none" stroke="#D5FFF1" strokeWidth="1.5" opacity=".61" />
        <path className={styles.plinthGleam} d="M168 634 L912 636" fill="none" stroke="#DBFFF5" strokeOpacity=".5" strokeWidth="2" />

        {/* Currency tiles are independent animated SVG groups. */}
        {currencyTiles.map((tile, index) => (
          <CurrencyTile key={tile.symbol} {...tile} index={index} paint={paint} />
        ))}
      </svg>
    </div>
  );
}
