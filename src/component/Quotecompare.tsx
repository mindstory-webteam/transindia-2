"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShuffleText from "./Shuffletext";

// ─── Brand Palette ────────────────────────────────────────────────────────────
const B = {
  coral:    "#E8503A",
  teal:     "#2DBFBF",
  charcoal: "#1A1A1A",
  gray:     "#B5B5B5",
  offwhite: "#F4F4EF",
  white:    "#FFFFFF",
  border:   "rgba(0,0,0,0.07)",
};

// ─── Image Map (replace with your actual image paths) ─────────────────────────
const IMG_MAP: Record<string, string> = {
   health:      "/images/icons/health_18725220.svg",
  life:        "/images/icons/health-insurance_15341171.svg",
  car:         "/images/icons/car_416772.svg",
  bike:        "/images/icons/motor-sports_324247.svg",
  home:        "/images/icons/home_1299859.svg",
  travel:      "/images/icons/suitcase_4988833.svg",
  term:        "/images/icons/document_2280730.svg",
  investment:  "/images/icons/active_11135146.svg",
  business:    "/images/icons/business-presentation_6818222.svg",
  critical:    "/images/icons/attentiveness_18331657.svg",
  child:       "/images/icons/baby_15540358.svg",
  pension:     "/images/icons/retirement-plan_10496565.svg",
};

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:"bike",       label:"Bike",        sublabel:"Insurance",    accent:B.teal,      bg:"linear-gradient(145deg,#eef9f9 0%,#d4f2f2 100%)" },
  { id:"car",        label:"Car",         sublabel:"Insurance",    accent:"#F9A85D",   bg:"linear-gradient(145deg,#fff8f0 0%,#fdecd6 100%)" },
  { id:"health",     label:"Health",      sublabel:"Insurance",    accent:B.coral,     bg:"linear-gradient(145deg,#fdf0ee 0%,#faddd9 100%)" },
  { id:"term",       label:"Term",        sublabel:"Life Cover",   accent:"#7C6EF5",   bg:"linear-gradient(145deg,#f3f0ff 0%,#e4deff 100%)" },
  { id:"investment", label:"Investment",  sublabel:"Tax Planning", accent:B.teal,      bg:"linear-gradient(145deg,#eef9f9 0%,#d4f2f2 100%)" },
  { id:"child",      label:"Saving For",  sublabel:"Child",        accent:"#F9A85D",   bg:"linear-gradient(145deg,#fff8f0 0%,#fdecd6 100%)" },
  { id:"pension",    label:"Pension &",   sublabel:"Retirement",   accent:"#5CE0C6",   bg:"linear-gradient(145deg,#edfcf8 0%,#d0f6ee 100%)" },
  { id:"travel",     label:"Travel",      sublabel:"Insurance",    accent:"#7C6EF5",   bg:"linear-gradient(145deg,#f3f0ff 0%,#e4deff 100%)" },
  { id:"home",       label:"Home",        sublabel:"Protection",   accent:B.coral,     bg:"linear-gradient(145deg,#fdf0ee 0%,#faddd9 100%)" },
  { id:"business",   label:"Business",    sublabel:"Cover",        accent:B.charcoal,  bg:"linear-gradient(145deg,#f2f2f2 0%,#e2e2e2 100%)" },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Animated Button ──────────────────────────────────────────────────────────
function AnimatedButton({ label, bg, layers }: {
  label: string; bg: string; layers: [string, string, string];
}) {
  return (
    <button className="qc-uv-btn" style={{ "--btn-bg": bg } as React.CSSProperties}>
      <span className="qc-uv-bg">
        <span className="qc-uv-layers">
          <span className="qc-uv-layer qc-uv-l1" style={{ background: layers[0] }} />
          <span className="qc-uv-layer qc-uv-l2" style={{ background: layers[1] }} />
          <span className="qc-uv-layer qc-uv-l3" style={{ background: layers[2] }} />
        </span>
      </span>
      <span className="qc-uv-inner">
        <span className="qc-uv-static">{label}</span>
        <span className="qc-uv-hover">{label}</span>
      </span>
    </button>
  );
}

function GhostButton({ label }: { label: string }) {
  return (
    <button className="qc-uv-ghost">
      <span className="qc-uv-ghost-bg">
        <span className="qc-uv-layers">
          <span className="qc-uv-layer qc-uv-l1" style={{ background:"rgba(26,26,26,0.09)" }} />
          <span className="qc-uv-layer qc-uv-l2" style={{ background:"rgba(26,26,26,0.06)" }} />
          <span className="qc-uv-layer qc-uv-l3" style={{ background:"rgba(26,26,26,0.04)" }} />
        </span>
      </span>
      <span className="qc-uv-inner">
        <span className="qc-uv-static">{label}</span>
        <span className="qc-uv-hover">{label}</span>
      </span>
    </button>
  );
}

// ─── Pill Card ────────────────────────────────────────────────────────────────
function PillCard({ cat, index, inView }: {
  cat: typeof CATEGORIES[0]; index: number; inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const imgSrc = IMG_MAP[cat.id];

  return (
    <div
      className={`qc-pill${inView ? " qc-pill-in" : ""}`}
      style={{
        "--pill-accent": cat.accent,
        "--pill-bg":     cat.bg,
        animationDelay:  inView ? `${index * 0.055}s` : "0s",
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/insurance/${cat.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && router.push(`/insurance/${cat.id}`)}
    >
      {/* coloured icon swatch */}
      <div className="qc-pill-icon" style={{ background: cat.bg }}>
        <div className={`qc-pill-shimmer${hovered ? " qc-pill-shimmer-in" : ""}`} />
        {imgSrc && (
          <img src={imgSrc} alt={cat.label} className="qc-pill-img" draggable={false} />
        )}
      </div>

      {/* text */}
      <div className="qc-pill-text">
        <span className="qc-pill-label">{cat.label}</span>
        <span className="qc-pill-sub">{cat.sublabel}</span>
      </div>

      {/* tiny arrow that appears on hover */}
      <span className="qc-pill-arrow" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M2 5.5H9M6.5 3L9 5.5L6.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
}

// ─── Pill Grid (5 per row) ────────────────────────────────────────────────────
function PillGrid({ inView }: { inView: boolean }) {
  return (
    <div className="qc-pill-grid">
      {CATEGORIES.map((cat, i) => (
        <PillCard key={cat.id} cat={cat} index={i} inView={inView} />
      ))}
    </div>
  );
}

// ─── Quote & Compare Section ──────────────────────────────────────────────────
export default function QuoteCompare() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const [headingKey, setHeadingKey] = useState(0);

  useEffect(() => {
    if (inView) setHeadingKey((k) => k + 1);
  }, [inView]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ══ ROOT ══════════════════════════════════════════════════════ */
        .qc-root {
          font-family: 'Outfit', sans-serif;
          background: ${B.white};
          width: 100%; overflow: hidden;
          padding: 96px 0 88px;
          position: relative;
        }
        .qc-root::before {
          content: ''; position: absolute; top: -60px; right: -80px;
          width: 520px; height: 520px; border-radius: 50%;
          background: radial-gradient(circle, rgba(45,191,191,0.07) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .qc-root::after {
          content: ''; position: absolute; bottom: -40px; left: -60px;
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,80,58,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* ══ HEADER ════════════════════════════════════════════════════ */
        .qc-header {
          padding: 0 9vw; margin-bottom: 48px;
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 32px; flex-wrap: wrap; position: relative; z-index: 1;
        }
        .qc-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: ${B.teal}; margin-bottom: 16px;
        }
        .qc-eyebrow::before {
          content: ''; display: block; width: 28px; height: 2px;
          background: ${B.teal}; border-radius: 999px;
        }
        .qc-heading-wrap { padding: 2px 0 12px; overflow: visible; clip-path: none; }
        .qc-heading-line {
          display: block;
          font-family: 'Outfit', sans-serif !important;
          font-size: clamp(32px, 4.2vw, 58px) !important;
          font-weight: 800 !important;
          line-height: 1.10 !important;
          letter-spacing: -0.025em !important;
          color: ${B.charcoal} !important;
          overflow: visible !important;
          padding-bottom: 4px !important;
        }
        .qc-heading-accent { color: ${B.teal} !important; font-style: normal !important; }

        .qc-header-right {
          display: flex; align-items: center; gap: 12px;
          flex-shrink: 0; padding-bottom: 10px;
        }
        @media (max-width: 680px) {
          .qc-header { flex-direction: column; align-items: flex-start; }
          .qc-header-right { padding-bottom: 0; }
        }

        /* ══ PILL GRID — 5 columns ═════════════════════════════════════ */
        .qc-pill-grid {
          padding: 0 9vw;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          position: relative; z-index: 1;
        }

        /* Responsive: 2 columns on mobile */
        @media (max-width: 900px) {
          .qc-pill-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 560px) {
          .qc-pill-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 5vw;
          }
        }

        /* ══ PILL CARD ═════════════════════════════════════════════════ */
        .qc-pill {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          padding: 10px 14px 10px 10px;
          border-radius: 16px;
          border: 1.5px solid rgba(0,0,0,0.07);
          background: ${B.white};
          cursor: pointer;
          user-select: none;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(14px) scale(0.97);
          transition:
            transform .32s cubic-bezier(0.22,1,0.36,1),
            box-shadow .32s ease,
            border-color .22s ease,
            background .22s ease;
        }
        .qc-pill-in {
          animation: qcPillIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes qcPillIn {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .qc-pill:hover {
          border-color: var(--pill-accent);
          background: var(--pill-bg);
          box-shadow:
            0 6px 24px rgba(0,0,0,.07),
            0 2px 8px rgba(0,0,0,0.04);
          transform: translateY(-2px) scale(1.02);
        }
        .qc-pill:active { transform: scale(0.98); }
        .qc-pill:focus-visible {
          outline: 2px solid var(--pill-accent);
          outline-offset: 2px;
        }

        /* icon swatch */
        .qc-pill-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          border: 1px solid rgba(0,0,0,0.05);
          transition: transform .35s cubic-bezier(0.22,1,0.36,1);
        }
        .qc-pill:hover .qc-pill-icon {
          transform: scale(1.08) rotate(-2deg);
        }
        .qc-pill-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.6) 50%, rgba(255,255,255,0) 70%);
          background-size: 200% 200%; background-position: -100% -100%;
          transition: background-position .55s ease;
          pointer-events: none; z-index: 1;
        }
        .qc-pill-shimmer-in { background-position: 200% 200%; }
        .qc-pill-img {
          width: 28px; height: 28px;
          object-fit: contain;
          position: relative; z-index: 2;
          display: block;
        }

        /* text */
        .qc-pill-text {
          display: flex; flex-direction: column; gap: 1px;
          position: relative; z-index: 2;
          min-width: 0;
        }
        .qc-pill-label {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 700;
          color: ${B.charcoal}; line-height: 1.2;
          transition: color .2s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .qc-pill:hover .qc-pill-label { color: var(--pill-accent); }

        .qc-pill-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 400;
          color: ${B.gray}; line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* arrow — hidden until hover */
        .qc-pill-arrow {
          display: flex; align-items: center;
          color: var(--pill-accent);
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity .22s ease, transform .3s cubic-bezier(0.22,1,0.36,1);
          flex-shrink: 0;
          margin-left: auto;
          position: relative; z-index: 2;
        }
        .qc-pill:hover .qc-pill-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ══ BUTTONS ═══════════════════════════════════════════════════ */
        .qc-uv-btn {
          all: unset; position: relative; display: inline-flex;
          height: 50px; align-items: center; border-radius: 9999px; padding: 0 30px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
          color: #fff; letter-spacing: .01em; cursor: pointer; user-select: none;
        }
        .qc-uv-bg {
          overflow: hidden; border-radius: 9999px; position: absolute; inset: 0;
          background: var(--btn-bg); box-shadow: 0 4px 20px rgba(0,0,0,.14);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .qc-uv-btn:hover .qc-uv-bg { transform: scale(1.04); }
        .qc-uv-layers {
          display: block; position: absolute; left: 50%; top: -60%; transform: translate(-50%);
          aspect-ratio: 1/1; width: max(200%,10rem);
        }
        .qc-uv-layer {
          display: block; border-radius: 9999px; position: absolute; inset: 0; transform: scale(0);
        }
        .qc-uv-btn:hover .qc-uv-layer { transition: transform 1.3s cubic-bezier(0.19,1,0.22,1), opacity .3s linear; }
        .qc-uv-btn:hover .qc-uv-l1 { transform: scale(1); }
        .qc-uv-btn:hover .qc-uv-l2 { transition-delay: .1s; transform: scale(1); }
        .qc-uv-btn:hover .qc-uv-l3 { transition-delay: .2s; transform: scale(1); }
        .qc-uv-inner { position: relative; display: block; pointer-events: none; }
        .qc-uv-static, .qc-uv-hover { display: block; pointer-events: none; }
        .qc-uv-hover { position: absolute; top: 0; left: 0; opacity: 0; transform: translateY(70%); }
        .qc-uv-btn:hover .qc-uv-static { opacity: 0; transform: translateY(-70%); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity .3s linear; }
        .qc-uv-btn:hover .qc-uv-hover  { opacity: 1; transform: translateY(0); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 1.4s cubic-bezier(0.19,1,0.22,1); }

        .qc-uv-ghost {
          all: unset; position: relative; display: inline-flex;
          height: 50px; align-items: center; border-radius: 9999px; padding: 0 24px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 500;
          color: ${B.charcoal}; cursor: pointer; user-select: none;
        }
        .qc-uv-ghost-bg {
          overflow: hidden; border-radius: 9999px; position: absolute; inset: 0;
          background: transparent; border: 1.5px solid rgba(26,26,26,.20);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1), border-color .3s;
        }
        .qc-uv-ghost:hover .qc-uv-ghost-bg { transform: scale(1.04); border-color: ${B.teal}; }
        .qc-uv-ghost .qc-uv-layers {
          display: block; position: absolute; left: 50%; top: -60%; transform: translate(-50%);
          aspect-ratio: 1/1; width: max(200%,10rem);
        }
        .qc-uv-ghost:hover .qc-uv-layer { transition: transform 1.3s cubic-bezier(0.19,1,0.22,1); }
        .qc-uv-ghost:hover .qc-uv-l1 { transform: scale(1); }
        .qc-uv-ghost:hover .qc-uv-l2 { transition-delay: .1s; transform: scale(1); }
        .qc-uv-ghost:hover .qc-uv-l3 { transition-delay: .2s; transform: scale(1); }
        .qc-uv-ghost:hover .qc-uv-static { opacity: 0; transform: translateY(-70%); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity .3s linear; }
        .qc-uv-ghost:hover .qc-uv-hover  { opacity: 1; transform: translateY(0); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 1.4s cubic-bezier(0.19,1,0.22,1); }
      `}</style>

      <section className="qc-root">

        {/* ── Header ── */}
        <div ref={sectionRef} className="qc-header">
          <div>
            <p className="qc-eyebrow">Insurance Products</p>
            <div className="qc-heading-wrap">
              {inView && (
                <>
                  <ShuffleText
                    key={`qc-h1-${headingKey}`}
                    text="Get a quote or"
                    tag="span" className="qc-heading-line"
                    shuffleDirection="right" duration={0.48} stagger={0.032}
                    animationMode="evenodd" triggerOnce={false}
                    triggerOnHover={false} rootMargin="0px" threshold={0}
                  />
                  <ShuffleText
                    key={`qc-h2-${headingKey}`}
                    text="compare plans."
                    tag="span" className="qc-heading-line qc-heading-accent"
                    shuffleDirection="right" duration={0.48} stagger={0.032}
                    animationMode="evenodd" triggerOnce={false}
                    triggerOnHover={false} rootMargin="0px" threshold={0}
                  />
                </>
              )}
            </div>
          </div>
          <div className="qc-header-right">
            <AnimatedButton label="Get Free Quote →" bg={B.teal} layers={["#17f1d1","#a374ff",B.teal]} />
            <GhostButton label="Compare All" />
          </div>
        </div>

        {/* ── Pill Grid ── */}
        <PillGrid inView={inView} />

      </section>
    </>
  );
}