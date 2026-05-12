"use client";

import React, { useRef, useEffect, useState } from "react";
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

// ─── Cards Data ───────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: "health",
    label: "Health Insurance",
    desc: "Cashless treatment at 10,000+ hospitals nationwide with instant claim processing.",
    accent: B.coral,
    iconBg: "linear-gradient(145deg,#fdf0ee 0%,#faddd9 100%)",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=80",
    icon: (color: string) => (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3C13 3 5.5 7 5.5 13.5C5.5 17.366 8.634 20.5 12.5 20.5H13.5C17.366 20.5 20.5 17.366 20.5 13.5C20.5 7 13 3 13 3Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M13 9.5V16.5M9.5 13H16.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    featured: false,
  },
  {
  id: "life",
  label: "Life Insurance",
  desc: "Ensure your family's standard of living is maintained even in your absence.",
  accent: "#2DBFBF",                                          // teal accent instead of white
  iconBg: "linear-gradient(145deg,#eef9f9 0%,#d4f2f2 100%)", // soft teal bg like corporate
  image: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=900&q=80",
  icon: (color: string) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 4L7 8.5V13.5C7 17.09 9.686 20.4 13 21C16.314 20.4 19 17.09 19 13.5V8.5L13 4Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M10 13L12 15L16 11" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  featured: false,   // ← key change
},
  {
    id: "motor",
    label: "Motor Insurance",
    desc: "Comprehensive protection for your vehicle with 24/7 roadside assistance.",
    accent: "#F9A85D",
    iconBg: "linear-gradient(145deg,#fff8f0 0%,#fdecd6 100%)",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80",
    icon: (color: string) => (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="9" width="20" height="10" rx="3" stroke={color} strokeWidth="1.8"/>
        <path d="M6 9L8.5 5H17.5L20 9" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="8.5" cy="19" r="2.5" stroke={color} strokeWidth="1.8"/>
        <circle cx="17.5" cy="19" r="2.5" stroke={color} strokeWidth="1.8"/>
      </svg>
    ),
    featured: false,
  },
  {
    id: "travel",
    label: "Travel Insurance",
    desc: "Travel the world without worries. Coverage for medical emergencies and cancellations.",
    accent: "#7C6EF5",
    iconBg: "linear-gradient(145deg,#f3f0ff 0%,#e4deff 100%)",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80",
    icon: (color: string) => (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M4 18L22 18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M13 4C11.343 4 10 5.343 10 7C10 9.5 13 13 13 13C13 13 16 9.5 16 7C16 5.343 14.657 4 13 4Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M5 14L8 8L11 11L14.5 7L19 10" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    featured: false,
  },
  {
    id: "corporate",
    label: "Corporate",
    desc: "Tailored risk management and employee benefits for your business.",
    accent: B.teal,
    iconBg: "linear-gradient(145deg,#eef9f9 0%,#d4f2f2 100%)",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    icon: (color: string) => (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="4" y="10" width="18" height="12" rx="2" stroke={color} strokeWidth="1.8"/>
        <path d="M9 10V8C9 6.895 9.895 6 11 6H15C16.105 6 17 6.895 17 8V10" stroke={color} strokeWidth="1.8"/>
        <path d="M4 15H22" stroke={color} strokeWidth="1.8"/>
        <path d="M11 15V18M15 15V18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    featured: false,
  },
];

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&q=80";

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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
    <button className="cv-uv-btn" style={{ "--btn-bg": bg } as React.CSSProperties}>
      <span className="cv-uv-bg">
        <span className="cv-uv-layers">
          <span className="cv-uv-layer cv-uv-l1" style={{ background: layers[0] }} />
          <span className="cv-uv-layer cv-uv-l2" style={{ background: layers[1] }} />
          <span className="cv-uv-layer cv-uv-l3" style={{ background: layers[2] }} />
        </span>
      </span>
      <span className="cv-uv-inner">
        <span className="cv-uv-static">{label}</span>
        <span className="cv-uv-hover">{label}</span>
      </span>
    </button>
  );
}

function GhostButton({ label }: { label: string }) {
  return (
    <button className="cv-uv-ghost">
      <span className="cv-uv-ghost-bg">
        <span className="cv-uv-layers">
          <span className="cv-uv-layer cv-uv-l1" style={{ background: "rgba(26,26,26,0.09)" }} />
          <span className="cv-uv-layer cv-uv-l2" style={{ background: "rgba(26,26,26,0.06)" }} />
          <span className="cv-uv-layer cv-uv-l3" style={{ background: "rgba(26,26,26,0.04)" }} />
        </span>
      </span>
      <span className="cv-uv-inner">
        <span className="cv-uv-static">{label} →</span>
        <span className="cv-uv-hover">{label} →</span>
      </span>
    </button>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function CoverageCard({ card, index, inView, onHover, onLeave }: {
  card: typeof CARDS[0];
  index: number;
  inView: boolean;
  onHover: (image: string) => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`cv-card${card.featured ? " cv-card-feat" : ""}${inView ? " cv-card-in" : ""}`}
      style={{
        "--card-accent": card.featured ? B.white : card.accent,
        "--card-bar":    card.featured ? "rgba(255,255,255,.4)" : card.accent,
        background:      card.featured ? B.teal : B.white,
        animationDelay:  inView ? `${index * 0.08}s` : "0s",
      } as React.CSSProperties}
      onMouseEnter={() => { setHovered(true); onHover(card.image); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
    >
      <div className={`cv-shimmer${hovered ? " cv-shimmer-on" : ""}`} />
      <div className="cv-card-icon" style={{ background: card.iconBg }}>
        {card.icon(card.featured ? B.white : card.accent)}
      </div>
      <p className="cv-card-title">{card.label}</p>
      <p className="cv-card-desc">{card.desc}</p>
      <div className="cv-card-arrow">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M2 6.5H11M7.5 3L11 6.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="cv-card-bar" />
    </div>
  );
}

// ─── Image Cell ───────────────────────────────────────────────────────────────
function ImageCell({ activeImage, inView }: { activeImage: string; inView: boolean }) {
  const [displayed, setDisplayed] = useState(activeImage);
  const [next, setNext]           = useState(activeImage);
  const [fading, setFading]       = useState(false);

  useEffect(() => {
    if (activeImage === displayed) return;
    setNext(activeImage);
    setFading(true);
    const t = setTimeout(() => { setDisplayed(activeImage); setFading(false); }, 420);
    return () => clearTimeout(t);
  }, [activeImage]);

  return (
    <div className={`cv-img-cell${inView ? " cv-card-in" : ""}`}
      style={{ animationDelay: inView ? "0.08s" : "0s" }}>
      {/* base layer */}
      <img src={displayed} alt="Insurance" className="cv-img-base" />
      {/* fade-in layer */}
      <img
        src={next}
        alt=""
        className={`cv-img-next${fading ? " cv-img-next-in" : ""}`}
        aria-hidden="true"
      />
      {/* label overlay */}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CoverageSection() {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: gridRef, inView: gridIn } = useInView(0.07);
  const [headingKey, setHeadingKey]      = useState(0);
  const [activeImage, setActiveImage]    = useState(DEFAULT_IMAGE);

  useEffect(() => { if (headIn) setHeadingKey((k) => k + 1); }, [headIn]);

  const handleHover  = (img: string) => setActiveImage(img);
  const handleLeave  = ()            => setActiveImage(DEFAULT_IMAGE);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .cv-root {
          font-family: 'Outfit', sans-serif;
          background: ${B.white};
          width: 100%; overflow: hidden;
          color: ${B.charcoal};
          padding: 96px 9vw 100px;
          position: relative;
        }
        .cv-root::before {
          content: ''; position: absolute; top: -80px; right: -80px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(45,191,191,0.055) 0%, transparent 70%);
          pointer-events: none;
        }

        /* HEADER */
        .cv-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 32px; flex-wrap: wrap; margin-bottom: 48px;
          position: relative; z-index: 1;
        }
        .cv-header-left { flex: 1; min-width: 240px; }

        .cv-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: ${B.teal}; margin-bottom: 14px;
        }
        .cv-eyebrow::before {
          content: ''; display: block; width: 28px; height: 2px;
          background: ${B.teal}; border-radius: 999px;
        }

        .cv-heading-wrap { padding: 2px 0 10px; overflow: visible; }
        .cv-heading-line {
          display: block;
          font-family: 'Outfit', sans-serif !important;
          font-size: clamp(30px, 3.8vw, 52px) !important;
          font-weight: 800 !important;
          line-height: 1.10 !important;
          letter-spacing: -0.025em !important;
          color: ${B.charcoal} !important;
          overflow: visible !important;
          padding-bottom: 4px !important;
        }
        .cv-heading-accent { color: ${B.teal} !important; font-style: normal !important; }

        .cv-sub {
          font-size: 14.5px; color: #888; line-height: 1.78;
          max-width: 400px; margin-top: 6px;
        }

        .cv-header-right {
          display: flex; align-items: center; gap: 12px;
          flex-shrink: 0; padding-bottom: 6px;
        }
        @media (max-width: 720px) {
          .cv-header { flex-direction: column; align-items: flex-start; }
          .cv-header-right { padding-bottom: 0; }
        }

        /* GRID */
        .cv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 300px auto;
          gap: 16px;
          position: relative; z-index: 1;
        }
        @media (max-width: 860px) {
          .cv-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
          .cv-img-cell { display: none; }
        }
        @media (max-width: 520px) {
          .cv-grid { grid-template-columns: 1fr; }
        }

        /* IMAGE CELL */
        .cv-img-cell {
          border-radius: 20px; overflow: hidden;
          border: 1.5px solid ${B.border};
          opacity: 0; transform: translateY(20px);
          position: relative;
        }
        .cv-img-cell.cv-card-in {
          animation: cvIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* base image — always visible */
        .cv-img-base {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 20%;
          display: block;
        }

        /* next image — fades in on top */
        .cv-img-next {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 20%;
          display: block;
          opacity: 0;
          transition: opacity 0.42s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }
        .cv-img-next-in { opacity: 1; }

        /* CARD */
        .cv-card {
          border-radius: 20px;
          border: 1.5px solid ${B.border};
          padding: 24px 22px 20px;
          display: flex; flex-direction: column;
          gap: 10px;
          position: relative; overflow: hidden; cursor: pointer;
          opacity: 0; transform: translateY(20px);
          transition:
            transform .38s cubic-bezier(0.22,1,0.36,1),
            box-shadow .38s ease,
            border-color .25s ease;
        }
        .cv-card-in { animation: cvIn 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes cvIn { to { opacity: 1; transform: translateY(0); } }

        .cv-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 44px rgba(0,0,0,.08), 0 3px 10px var(--card-accent)1a;
          border-color: var(--card-accent);
        }
        .cv-card-feat { border-color: ${B.teal} !important; }
        .cv-card-feat:hover { box-shadow: 0 14px 44px rgba(45,191,191,.28) !important; }

        .cv-shimmer {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: linear-gradient(135deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.45) 50%,rgba(255,255,255,0) 70%);
          background-size: 200% 200%; background-position: -100% -100%;
          transition: background-position .6s ease; border-radius: 20px;
        }
        .cv-shimmer-on { background-position: 200% 200%; }

        .cv-card-icon {
          width: 44px; height: 44px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative; z-index: 2;
          transition: transform .35s cubic-bezier(0.22,1,0.36,1);
        }
        .cv-card:hover .cv-card-icon { transform: scale(1.08); }

        .cv-card-title {
          font-family: 'Outfit', sans-serif; font-size: 15.5px; font-weight: 700;
          color: ${B.charcoal}; line-height: 1.25; margin: 0;
          position: relative; z-index: 2; transition: color .2s;
        }
        .cv-card-feat .cv-card-title { color: ${B.white}; }
        .cv-card:not(.cv-card-feat):hover .cv-card-title { color: var(--card-accent); }

        .cv-card-desc {
          font-size: 13px; line-height: 1.68; margin: 0;
          color: #888; position: relative; z-index: 2;
        }
        .cv-card-feat .cv-card-desc { color: rgba(255,255,255,.78); }

        .cv-card-arrow {
          display: flex; align-items: center; margin-top: auto;
          color: ${B.gray}; position: relative; z-index: 2;
          transition: color .25s, transform .3s cubic-bezier(0.22,1,0.36,1);
        }
        .cv-card:not(.cv-card-feat):hover .cv-card-arrow {
          color: var(--card-accent); transform: translateX(4px);
        }
        .cv-card-feat .cv-card-arrow { color: rgba(255,255,255,.6); }
        .cv-card-feat:hover .cv-card-arrow { color: ${B.white}; transform: translateX(4px); }

        .cv-card-bar {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 0; height: 2.5px; border-radius: 999px;
          background: var(--card-bar, ${B.teal});
          transition: width .45s cubic-bezier(0.77,0,0.175,1);
        }
        .cv-card:hover .cv-card-bar { width: 55%; }

        /* BUTTONS */
        .cv-uv-btn {
          all: unset; position: relative; display: inline-flex;
          height: 50px; align-items: center; border-radius: 9999px; padding: 0 30px;
          font-family: 'Outfit', sans-serif; font-size: 14.5px; font-weight: 600;
          color: #fff; letter-spacing: .01em; cursor: pointer; user-select: none;
        }
        .cv-uv-bg {
          overflow: hidden; border-radius: 9999px; position: absolute; inset: 0;
          background: var(--btn-bg); box-shadow: 0 4px 20px rgba(45,191,191,.32);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .cv-uv-btn:hover .cv-uv-bg { transform: scale(1.04); }
        .cv-uv-layers {
          display: block; position: absolute; left: 50%; top: -60%;
          transform: translate(-50%); aspect-ratio: 1/1; width: max(200%, 10rem);
        }
        .cv-uv-layer {
          display: block; border-radius: 9999px;
          position: absolute; inset: 0; transform: scale(0);
        }
        .cv-uv-btn:hover .cv-uv-layer { transition: transform 1.3s cubic-bezier(0.19,1,0.22,1), opacity .3s linear; }
        .cv-uv-btn:hover .cv-uv-l1 { transform: scale(1); }
        .cv-uv-btn:hover .cv-uv-l2 { transition-delay: .1s; transform: scale(1); }
        .cv-uv-btn:hover .cv-uv-l3 { transition-delay: .2s; transform: scale(1); }
        .cv-uv-inner { position: relative; display: block; pointer-events: none; }
        .cv-uv-static, .cv-uv-hover { display: block; pointer-events: none; }
        .cv-uv-hover { position: absolute; top: 0; left: 0; opacity: 0; transform: translateY(70%); }
        .cv-uv-btn:hover .cv-uv-static { opacity: 0; transform: translateY(-70%); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity .3s linear; }
        .cv-uv-btn:hover .cv-uv-hover  { opacity: 1; transform: translateY(0); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 1.4s cubic-bezier(0.19,1,0.22,1); }

        .cv-uv-ghost {
          all: unset; position: relative; display: inline-flex;
          height: 50px; align-items: center; border-radius: 9999px; padding: 0 26px;
          font-family: 'Outfit', sans-serif; font-size: 14.5px; font-weight: 500;
          color: ${B.teal}; cursor: pointer; user-select: none;
        }
        .cv-uv-ghost-bg {
          overflow: hidden; border-radius: 9999px; position: absolute; inset: 0;
          background: transparent; border: 1.5px solid rgba(45,191,191,.35);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1), border-color .3s;
        }
        .cv-uv-ghost:hover .cv-uv-ghost-bg { transform: scale(1.04); border-color: ${B.teal}; background: rgba(45,191,191,.06); }
        .cv-uv-ghost .cv-uv-layers { display: block; position: absolute; left: 50%; top: -60%; transform: translate(-50%); aspect-ratio: 1/1; width: max(200%, 10rem); }
        .cv-uv-ghost:hover .cv-uv-layer { transition: transform 1.3s cubic-bezier(0.19,1,0.22,1); }
        .cv-uv-ghost:hover .cv-uv-l1 { transform: scale(1); }
        .cv-uv-ghost:hover .cv-uv-l2 { transition-delay: .1s; transform: scale(1); }
        .cv-uv-ghost:hover .cv-uv-l3 { transition-delay: .2s; transform: scale(1); }
        .cv-uv-ghost:hover .cv-uv-static { opacity: 0; transform: translateY(-70%); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity .3s linear; }
        .cv-uv-ghost:hover .cv-uv-hover  { opacity: 1; transform: translateY(0); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 1.4s cubic-bezier(0.19,1,0.22,1); }
      `}</style>

      <section className="cv-root">

        {/* ── Header ── */}
        <div ref={headRef} className="cv-header">
          <div className="cv-header-left">
            <p className="cv-eyebrow">Our Products</p>
            <div className="cv-heading-wrap">
              {headIn && (
                <>
                  <ShuffleText
                    key={`cv-h1-${headingKey}`}
                    text="Comprehensive Coverage"
                    tag="span" className="cv-heading-line"
                    shuffleDirection="right" duration={0.5} stagger={0.028}
                    animationMode="evenodd" triggerOnce={false}
                    triggerOnHover={false} rootMargin="0px" threshold={0}
                  />
                  <ShuffleText
                    key={`cv-h2-${headingKey}`}
                    text="for Every Need."
                    tag="span" className="cv-heading-line cv-heading-accent"
                    shuffleDirection="right" duration={0.5} stagger={0.028}
                    animationMode="evenodd" triggerOnce={false}
                    triggerOnHover={false} rootMargin="0px" threshold={0}
                  />
                </>
              )}
            </div>
            <p className="cv-sub">
              Explore our wide range of insurance products designed to provide
              total peace of mind for you and your loved ones.
            </p>
          </div>

          <div className="cv-header-right">
            <AnimatedButton
              label="Get a Quote →"
              bg={B.teal}
              layers={["#17f1d1", "#a374ff", B.teal]}
            />
            <GhostButton label="Explore all products" />
          </div>
        </div>

        {/* ── Grid ── */}
        <div ref={gridRef} className="cv-grid">

          {/* Row 1 */}
          <CoverageCard card={CARDS[0]} index={0} inView={gridIn} onHover={handleHover} onLeave={handleLeave} />

          <ImageCell activeImage={activeImage} inView={gridIn} />

          <CoverageCard card={CARDS[1]} index={2} inView={gridIn} onHover={handleHover} onLeave={handleLeave} />

          {/* Row 2 */}
          <CoverageCard card={CARDS[2]} index={3} inView={gridIn} onHover={handleHover} onLeave={handleLeave} />
          <CoverageCard card={CARDS[3]} index={4} inView={gridIn} onHover={handleHover} onLeave={handleLeave} />
          <CoverageCard card={CARDS[4]} index={5} inView={gridIn} onHover={handleHover} onLeave={handleLeave} />

        </div>
      </section>
    </>
  );
}