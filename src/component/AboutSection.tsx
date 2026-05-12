"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import ShuffleText from "./Shuffletext";

// ─── Brand Palette ─────────────────────────────────────────────────────────────
const B = {
  coral:    "#E8503A",
  teal:     "#2DBFBF",
  teal100:  "#9AE0E0",
  teal200:  "#BBEAEA",
  charcoal: "#1A1A1A",
  gray:     "#B5B5B5",
  offwhite: "#F4F4EF",
  white:    "#FFFFFF",
  border:   "rgba(0,0,0,0.07)",
};

// ─── Image Sets for each mosaic card ─────────────────────────────────────────
// Replace with your real brand images. Each card cycles independently.

const MAIN_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&q=80",
    alt: "Happy Indian family protected by insurance",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    alt: "Family together — trust and security",
  },
  {
    src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80",
    alt: "Indian couple planning their future",
  },
  {
    src: "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80",
    alt: "Parents with child — life insurance peace of mind",
  },
];

const TOP_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80",
    alt: "Professional advisory team",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
    alt: "Modern insurance office",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80",
    alt: "Expert team collaboration",
  },
];

const BOTTOM_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=600&q=80",
    alt: "Customer support specialist",
  },
  {
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80",
    alt: "Claims settlement team",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    alt: "Digital insurance platform",
  },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "50+",     label: "Insurance Partners" },
  { value: "2Cr+",    label: "Happy Customers"    },
  { value: "₹500Cr+", label: "Claims Settled"     },
  { value: "4.8★",    label: "App Rating"         },
];

const PILLARS = [
  {
    num: "01",
    title: "Radical Transparency",
    desc: "No hidden clauses. No pushy upsells. We show you exactly what you're buying — in plain language.",
  },
  {
    num: "02",
    title: "Expert-Led Guidance",
    desc: "Every recommendation is backed by licensed advisors who earn nothing from pushing a particular plan.",
  },
  {
    num: "03",
    title: "Technology That Cares",
    desc: "Our AI compares plans in seconds — but a human is always one call away when you need real advice.",
  },
];

// ─── Intersection hook ────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Animated Image Slot ──────────────────────────────────────────────────────
// Each card independently cycles through its image array.
// Animation: the exiting image slides out while the entering image slides in.
// Direction alternates each transition for variety.

type AnimDir = "up" | "down" | "left" | "right";

interface AnimImage {
  src: string;
  alt: string;
}

function AnimatedImageSlot({
  images,
  interval = 4000,
  className = "",
  style,
  children,
}: {
  images: AnimImage[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const [current, setCurrent] = useState(0);
  const [next, setNext]       = useState<number | null>(null);
  const [phase, setPhase]     = useState<"idle" | "animating">("idle");
  const [dir, setDir]         = useState<AnimDir>("up");
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef              = useRef(phase);
  phaseRef.current = phase;

  const DIRS: AnimDir[] = ["up", "left", "down", "right"];
  const dirRef = useRef(0);

  const advance = useCallback(() => {
    if (phaseRef.current === "animating") return;
    const nextDir = DIRS[dirRef.current % DIRS.length];
    dirRef.current += 1;
    setDir(nextDir);
    setCurrent((c) => {
      const n = (c + 1) % images.length;
      setNext(n);
      return c;
    });
    setPhase("animating");
  }, [images.length]);

  // After animation completes (~650ms), commit the next image as current
  useEffect(() => {
    if (phase !== "animating" || next === null) return;
    const t = setTimeout(() => {
      setCurrent(next);
      setNext(null);
      setPhase("idle");
    }, 700);
    return () => clearTimeout(t);
  }, [phase, next]);

  // Auto-advance timer — only runs when idle
  useEffect(() => {
    if (images.length <= 1) return;
    const tick = () => {
      advance();
      timerRef.current = setTimeout(tick, interval);
    };
    timerRef.current = setTimeout(tick, interval);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [advance, interval, images.length]);

  // CSS translate values for slide-out (current) and slide-in (next)
  const exitTranslate: Record<AnimDir, string> = {
    up:    "translate(-50%,-50%) translateY(-108%)",
    down:  "translate(-50%,-50%) translateY(108%)",
    left:  "translate(-50%,-50%) translateX(-108%)",
    right: "translate(-50%,-50%) translateX(108%)",
  };
  const enterFrom: Record<AnimDir, string> = {
    up:    "translate(-50%,-50%) translateY(108%)",
    down:  "translate(-50%,-50%) translateY(-108%)",
    left:  "translate(-50%,-50%) translateX(108%)",
    right: "translate(-50%,-50%) translateX(-108%)",
  };
  const center = "translate(-50%,-50%) translateY(0%) translateX(0%)";

  return (
    <div className={`aimg-slot ${className}`} style={style}>
      {/* Current image — slides OUT when animating */}
      <img
        key={`cur-${current}`}
        src={images[current].src}
        alt={images[current].alt}
        className="aimg-photo"
        style={{
          transform: phase === "animating" ? exitTranslate[dir] : center,
          transition: phase === "animating"
            ? "transform 0.68s cubic-bezier(0.77,0,0.175,1), opacity 0.5s ease"
            : "none",
          opacity: phase === "animating" ? 0 : 1,
          zIndex: 1,
        }}
      />

      {/* Next image — slides IN when animating */}
      {phase === "animating" && next !== null && (
        <img
          key={`next-${next}`}
          src={images[next].src}
          alt={images[next].alt}
          className="aimg-photo"
          style={{
            transform: center,
            animation: `aimg-enter-${dir} 0.68s cubic-bezier(0.22,1,0.36,1) both`,
            zIndex: 2,
          }}
        />
      )}

      {/* Progress dots */}
      {images.length > 1 && (
        <div className="aimg-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`aimg-dot${i === (next ?? current) ? " aimg-dot-active" : ""}`}
            />
          ))}
        </div>
      )}

      {/* Slot children (overlays, badges etc.) */}
      {children}
    </div>
  );
}

// ─── Hero Buttons ─────────────────────────────────────────────────────────────

function AnimatedButton({ label, bg, layers }: {
  label: string; bg: string; layers: [string, string, string];
}) {
  return (
    <button className="ab-uv-btn" style={{ "--btn-bg": bg } as React.CSSProperties}>
      <span className="ab-uv-bg">
        <span className="ab-uv-layers">
          <span className="ab-uv-layer ab-uv-l1" style={{ background: layers[0] }} />
          <span className="ab-uv-layer ab-uv-l2" style={{ background: layers[1] }} />
          <span className="ab-uv-layer ab-uv-l3" style={{ background: layers[2] }} />
        </span>
      </span>
      <span className="ab-uv-inner">
        <span className="ab-uv-static">{label}</span>
        <span className="ab-uv-hover">{label}</span>
      </span>
    </button>
  );
}

function GhostButton({ label }: { label: string }) {
  return (
    <button className="ab-uv-ghost">
      <span className="ab-uv-ghost-bg">
        <span className="ab-uv-layers">
          <span className="ab-uv-layer ab-uv-l1" style={{ background: "rgba(26,26,26,0.09)" }} />
          <span className="ab-uv-layer ab-uv-l2" style={{ background: "rgba(26,26,26,0.06)" }} />
          <span className="ab-uv-layer ab-uv-l3" style={{ background: "rgba(26,26,26,0.04)" }} />
        </span>
      </span>
      <span className="ab-uv-inner">
        <span className="ab-uv-static">{label}</span>
        <span className="ab-uv-hover">{label}</span>
      </span>
    </button>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const { ref, inView } = useInView(0.2);
  return (
    <div ref={ref} className="ab-stats">
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className={`ab-stat${inView ? " ab-stat-in" : ""}`}
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          {inView && (
            <ShuffleText
              key={`stat-${s.value}-${i}`}
              text={s.value}
              tag="span"
              className="ab-stat-val"
              shuffleDirection="right"
              duration={0.5}
              stagger={0.045}
              animationMode="evenodd"
              triggerOnce={false}
              triggerOnHover={false}
              rootMargin="0px"
              threshold={0}
            />
          )}
          <span className="ab-stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Image Mosaic (animated) ─────────────────────────────────────────────────
function ImageMosaic() {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={`ab-mosaic${inView ? " ab-mosaic-in" : ""}`}>

      <div className="ab-mglow ab-mglow-teal" />
      <div className="ab-mglow ab-mglow-coral" />

      {/* ── Primary card — cycles every 4 s ── */}
      <AnimatedImageSlot
        images={MAIN_IMAGES}
        interval={4000}
        className="ab-mcard ab-mcard-main"
      >
        <div className="ab-mimg-badge">
          <span className="ab-mimg-badge-num">12+</span>
          <span className="ab-mimg-badge-label">Years of Trust</span>
        </div>
        <div className="ab-mimg-accent" />
      </AnimatedImageSlot>

      {/* ── Top-right card — offset start, cycles every 5 s ── */}
      <AnimatedImageSlot
        images={TOP_IMAGES}
        interval={5200}
        className="ab-mcard ab-mcard-top"
      >
        <div className="ab-mimg-pill">
          <span className="ab-mimg-pill-dot" />
          Est. 2012
        </div>
      </AnimatedImageSlot>

      {/* ── Bottom-right card — cycles every 4.6 s ── */}
      <AnimatedImageSlot
        images={BOTTOM_IMAGES}
        interval={4600}
        className="ab-mcard ab-mcard-bottom"
      >
        <div className="ab-mimg-award">
          🏆 <span>Best InsurTech India 2024</span>
        </div>
      </AnimatedImageSlot>

      <div className="ab-mdots" />
      <div className="ab-morbit" />
      <div className="ab-mline" />

    </div>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
export default function AboutSection() {
  const { ref: leftRef, inView: leftIn } = useInView(0.1);
  const [headingKey, setHeadingKey] = useState(0);

  useEffect(() => {
    if (leftIn) setHeadingKey((k) => k + 1);
  }, [leftIn]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Outfit:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* ══ ROOT ══════════════════════════════════════════════════════════ */
        .ab-root {
          font-family: 'Outfit', sans-serif;
          background: ${B.white};
          width: 100%;
          overflow: hidden;
          color: ${B.charcoal};
        }

        /* ══ MAIN GRID ═════════════════════════════════════════════════════ */
        .ab-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          padding: 110px 9vw 100px;
          align-items: center;
        }
        @media (max-width: 960px) {
          .ab-main { grid-template-columns: 1fr; gap: 64px; padding: 72px 6vw 80px; }
        }

        /* ── Eyebrow ── */
        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: ${B.teal}; margin-bottom: 24px;
        }
        .ab-eyebrow::before {
          content: ''; display: block; width: 28px; height: 2px;
          background: ${B.teal}; border-radius: 999px;
        }

        /* ── Heading — overflow:visible fixes ShuffleText glyph clipping ── */
        .ab-heading-wrap {
          padding: 4px 0 16px;
          overflow: visible;
          clip-path: none;
        }
        .ab-heading-line {
          display: block;
          font-family: 'Playfair Display', serif !important;
          font-size: clamp(48px, 5.8vw, 82px) !important;
          font-weight: 800 !important;
          line-height: 1.12 !important;
          letter-spacing: -0.01em !important;
          color: ${B.charcoal} !important;
          overflow: visible !important;
          padding-bottom: 8px !important;
        }
        .ab-heading-accent {
          color: ${B.teal} !important;
          font-style: italic !important;
        }

        .ab-body {
          font-size: 17px; font-weight: 400; color: #666;
          line-height: 1.82; margin: 28px 0 44px; max-width: 480px;
        }
        .ab-body strong { color: ${B.charcoal}; font-weight: 600; }

        /* ── Pillars ── */
        .ab-pillars { display: flex; flex-direction: column; }
        .ab-pillar {
          display: flex; align-items: flex-start; gap: 20px;
          padding: 22px 0; border-bottom: 1px solid ${B.border};
          opacity: 0; transform: translateX(-20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ab-pillar:first-child { border-top: 1px solid ${B.border}; }
        .ab-pillar-in { opacity: 1 !important; transform: translateX(0) !important; }
        .ab-pillar-num {
          font-family: 'Playfair Display', serif; font-size: 12px; font-weight: 700;
          color: ${B.teal}; letter-spacing: .08em; flex-shrink: 0; padding-top: 4px;
        }
        .ab-pillar-title {
          font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700;
          color: ${B.charcoal}; margin-bottom: 5px;
        }
        .ab-pillar-desc { font-size: 14.5px; color: #888; line-height: 1.72; }

        /* ── CTA Row ── */
        .ab-cta-row {
          display: flex; align-items: center; gap: 14px;
          margin-top: 44px; flex-wrap: wrap;
        }

        /* ══ UIVERSE BUTTON ════════════════════════════════════════════════ */
        .ab-uv-btn {
          all: unset;
          position: relative; display: inline-flex;
          height: 54px; align-items: center;
          border-radius: 9999px; padding: 0 34px;
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
          color: #fff; letter-spacing: 0.01em; cursor: pointer; user-select: none;
        }
        .ab-uv-bg {
          overflow: hidden; border-radius: 9999px;
          position: absolute; inset: 0;
          background: var(--btn-bg);
          box-shadow: 0 4px 24px rgba(0,0,0,.16);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .ab-uv-btn:hover .ab-uv-bg { transform: scale(1.04); }
        .ab-uv-layers {
          display: block; position: absolute;
          left: 50%; top: -60%; transform: translate(-50%);
          aspect-ratio: 1/1; width: max(200%, 10rem);
        }
        .ab-uv-layer {
          display: block; border-radius: 9999px;
          position: absolute; inset: 0; transform: scale(0);
        }
        .ab-uv-btn:hover .ab-uv-layer { transition: transform 1.3s cubic-bezier(0.19,1,0.22,1), opacity 0.3s linear; }
        .ab-uv-btn:hover .ab-uv-l1 { transform: scale(1); }
        .ab-uv-btn:hover .ab-uv-l2 { transition-delay: 0.1s; transform: scale(1); }
        .ab-uv-btn:hover .ab-uv-l3 { transition-delay: 0.2s; transform: scale(1); }
        .ab-uv-inner { position: relative; display: block; pointer-events: none; }
        .ab-uv-static, .ab-uv-hover { display: block; pointer-events: none; }
        .ab-uv-hover { position: absolute; top: 0; left: 0; opacity: 0; transform: translateY(70%); }
        .ab-uv-btn:hover .ab-uv-static { opacity: 0; transform: translateY(-70%); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 0.3s linear; }
        .ab-uv-btn:hover .ab-uv-hover  { opacity: 1; transform: translateY(0); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 1.4s cubic-bezier(0.19,1,0.22,1); }

        /* Ghost */
        .ab-uv-ghost {
          all: unset;
          position: relative; display: inline-flex;
          height: 54px; align-items: center;
          border-radius: 9999px; padding: 0 28px;
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 500;
          color: ${B.charcoal}; cursor: pointer; user-select: none;
        }
        .ab-uv-ghost-bg {
          overflow: hidden; border-radius: 9999px;
          position: absolute; inset: 0;
          background: transparent;
          border: 1.5px solid rgba(26,26,26,0.22);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1), border-color 0.3s ease;
        }
        .ab-uv-ghost:hover .ab-uv-ghost-bg { transform: scale(1.04); border-color: ${B.teal}; }
        .ab-uv-ghost .ab-uv-layers { display: block; position: absolute; left: 50%; top: -60%; transform: translate(-50%); aspect-ratio: 1/1; width: max(200%, 10rem); }
        .ab-uv-ghost:hover .ab-uv-layer { transition: transform 1.3s cubic-bezier(0.19,1,0.22,1); }
        .ab-uv-ghost:hover .ab-uv-l1 { transform: scale(1); }
        .ab-uv-ghost:hover .ab-uv-l2 { transition-delay: 0.1s; transform: scale(1); }
        .ab-uv-ghost:hover .ab-uv-l3 { transition-delay: 0.2s; transform: scale(1); }
        .ab-uv-ghost:hover .ab-uv-static { opacity: 0; transform: translateY(-70%); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 0.3s linear; }
        .ab-uv-ghost:hover .ab-uv-hover  { opacity: 1; transform: translateY(0); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 1.4s cubic-bezier(0.19,1,0.22,1); }

        /* ══ IMAGE MOSAIC SHELL ════════════════════════════════════════════ */
        .ab-mosaic {
          position: relative;
          width: 100%; max-width: 540px;
          height: 620px;
          margin: 0 auto;
          opacity: 0;
          transition: opacity 0.8s ease 0.15s;
        }
        .ab-mosaic-in { opacity: 1; }

        .ab-mglow {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .ab-mglow-teal  { width: 260px; height: 260px; background: rgba(45,191,191,0.10); top: 0%;    left: 0%;  }
        .ab-mglow-coral { width: 160px; height: 160px; background: rgba(232,80,58,0.07);  bottom: 0%; right: 0%; }

        /* ══ ANIMATED IMAGE SLOT ══════════════════════════════════════════ */
        /*
          Each .aimg-slot is the bounding box for one mosaic card.
          Images are absolutely positioned and clip inside the rounded frame.
          Progress dots sit at the bottom of the slot.
        */
        .aimg-slot {
          position: absolute;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06);
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
          /* Dark gradient base so overlays are readable before image loads */
          background: linear-gradient(155deg, #0f2020 0%, #1a3535 100%);
        }

        /* Each image is centered and fills the slot */
        .aimg-photo {
          position: absolute;
          top: 50%; left: 50%;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          transform: translate(-50%, -50%);
          will-change: transform, opacity;
        }

        /* Progress dots */
        .aimg-dots {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 5px; z-index: 10;
        }
        .aimg-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.35);
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .aimg-dot-active {
          background: ${B.teal};
          transform: scale(1.4);
          box-shadow: 0 0 6px ${B.teal};
        }

        /* ── Keyframes for the 4 enter directions ── */
        @keyframes aimg-enter-up {
          from { transform: translate(-50%,-50%) translateY(108%); opacity: 0.4; }
          to   { transform: translate(-50%,-50%) translateY(0%);   opacity: 1;   }
        }
        @keyframes aimg-enter-down {
          from { transform: translate(-50%,-50%) translateY(-108%); opacity: 0.4; }
          to   { transform: translate(-50%,-50%) translateY(0%);    opacity: 1;   }
        }
        @keyframes aimg-enter-left {
          from { transform: translate(-50%,-50%) translateX(108%); opacity: 0.4; }
          to   { transform: translate(-50%,-50%) translateX(0%);   opacity: 1;   }
        }
        @keyframes aimg-enter-right {
          from { transform: translate(-50%,-50%) translateX(-108%); opacity: 0.4; }
          to   { transform: translate(-50%,-50%) translateX(0%);    opacity: 1;   }
        }

        /* ── Mosaic card positions ── */
        .ab-mcard-main {
          width: 66%; height: 72%;
          top: 0; left: 0; z-index: 2;
        }
        .ab-mosaic-in .ab-mcard-main {
          animation: abImgLeft 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        .ab-mcard-main:hover { transform: translate(5px, -5px); }

        .ab-mcard-top {
          width: 38%; height: 44%;
          top: 0; right: 0; z-index: 3;
        }
        .ab-mosaic-in .ab-mcard-top {
          animation: abImgRight 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s both;
        }
        .ab-mcard-top:hover { transform: translate(-4px, 4px); }

        .ab-mcard-bottom {
          width: 50%; height: 36%;
          bottom: 0; right: 0; z-index: 3;
        }
        .ab-mosaic-in .ab-mcard-bottom {
          animation: abImgBottom 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s both;
        }
        .ab-mcard-bottom:hover { transform: translate(-4px, -4px); }

        /* Mosaic entry animations */
        @keyframes abImgLeft   { from { opacity:0; transform:translate(-28px, 20px); }  to { opacity:1; transform:translate(0,0); } }
        @keyframes abImgRight  { from { opacity:0; transform:translate(28px, -20px); }  to { opacity:1; transform:translate(0,0); } }
        @keyframes abImgBottom { from { opacity:0; transform:translate(20px, 28px); }   to { opacity:1; transform:translate(0,0); } }

        /* ── Overlays that sit above the images ── */
        .ab-mimg-badge {
          position: absolute; bottom: 20px; left: 20px;
          display: flex; flex-direction: column; gap: 2px;
          background: rgba(255,255,255,0.13);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 16px; padding: 12px 18px; z-index: 10;
          pointer-events: none;
        }
        .ab-mimg-badge-num {
          font-family: 'Playfair Display', serif;
          font-size: 32px; font-weight: 900; color: #fff; line-height: 1;
        }
        .ab-mimg-badge-label {
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,0.65);
        }
        .ab-mimg-accent {
          position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, ${B.teal}, transparent);
          z-index: 10; pointer-events: none;
        }
        .ab-mimg-pill {
          position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px; padding: 5px 14px;
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 600;
          color: #fff; letter-spacing: .04em; white-space: nowrap; z-index: 10;
          pointer-events: none;
        }
        .ab-mimg-pill-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: ${B.teal}; flex-shrink: 0;
          box-shadow: 0 0 6px ${B.teal};
          animation: abPulse 1.8s ease-in-out infinite;
        }
        @keyframes abPulse {
          0%, 100% { box-shadow: 0 0 6px ${B.teal}; }
          50%       { box-shadow: 0 0 14px ${B.teal}, 0 0 24px rgba(45,191,191,0.5); }
        }
        .ab-mimg-award {
          position: absolute; bottom: 14px; left: 12px; right: 12px;
          display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.13);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 12px; padding: 8px 13px; z-index: 10;
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 600;
          color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          pointer-events: none;
        }
        .ab-mimg-award span { overflow: hidden; text-overflow: ellipsis; }

        /* Decorative */
        .ab-mdots {
          position: absolute; bottom: -14px; left: -14px;
          width: 100px; height: 100px; z-index: 0;
          background-image: radial-gradient(circle, rgba(45,191,191,0.30) 1.5px, transparent 1.5px);
          background-size: 13px 13px; pointer-events: none;
        }
        .ab-morbit {
          position: absolute; width: 380px; height: 380px; border-radius: 50%;
          border: 1px dashed rgba(45,191,191,0.14);
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          pointer-events: none; animation: abOrbit 30s linear infinite;
        }
        @keyframes abOrbit { to { transform: translate(-50%,-50%) rotate(360deg); } }
        .ab-mline {
          position: absolute; top: 44%; right: 50%; width: 2px; height: 48px;
          background: linear-gradient(to bottom, transparent, ${B.teal}, transparent);
          z-index: 5; pointer-events: none;
        }

        /* Responsive */
        @media (max-width: 960px) { .ab-mosaic { height: 480px; max-width: 100%; } }
        @media (max-width: 560px) {
          .ab-mosaic { height: 400px; }
          .ab-mcard-main { width: 70%; height: 70%; }
        }

        /* ══ STATS BAR — BOTTOM ════════════════════════════════════════════ */
        .ab-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: ${B.offwhite};
          border-top: 1px solid ${B.border};
        }
        @media (max-width: 640px) { .ab-stats { grid-template-columns: repeat(2,1fr); } }

        .ab-stat {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 44px 16px;
          border-right: 1px solid ${B.border};
          opacity: 0; transform: translateY(18px);
          position: relative;
        }
        .ab-stat:last-child { border-right: none; }
        .ab-stat::after {
          content: '';
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 0; height: 2.5px; background: ${B.teal};
          transition: width 0.65s cubic-bezier(0.77,0,0.175,1) 0.3s; border-radius: 999px;
        }
        .ab-stat-in { animation: abFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .ab-stat-in::after { width: 56%; }
        @keyframes abFadeUp { to { opacity: 1; transform: translateY(0); } }

        .ab-stat-val {
          font-family: 'Playfair Display', serif !important;
          font-size: clamp(32px, 4vw, 52px) !important;
          font-weight: 800 !important;
          color: ${B.charcoal} !important;
          line-height: 1.1 !important;
          letter-spacing: -0.02em !important;
          overflow: visible !important;
          padding: 4px 2px !important;
        }
        .ab-stat-label {
          font-size: 11px; font-weight: 600;
          color: ${B.gray}; letter-spacing: .12em; text-transform: uppercase;
        }
      `}</style>

      <section className="ab-root">

        <div className="ab-main">

          {/* ── LEFT ── */}
          <div ref={leftRef}>

            <p className="ab-eyebrow">About TransIndia</p>

            <div className="ab-heading-wrap">
              {leftIn && (
                <>
                  <ShuffleText
                    key={`about-h1-${headingKey}`}
                    text="We make insurance"
                    tag="span"
                    className="ab-heading-line"
                    shuffleDirection="right"
                    duration={0.5}
                    stagger={0.035}
                    animationMode="evenodd"
                    triggerOnce={false}
                    triggerOnHover={false}
                    rootMargin="0px"
                    threshold={0}
                  />
                  <ShuffleText
                    key={`about-h2-${headingKey}`}
                    text="work for you."
                    tag="span"
                    className="ab-heading-line ab-heading-accent"
                    shuffleDirection="right"
                    duration={0.5}
                    stagger={0.035}
                    animationMode="evenodd"
                    triggerOnce={false}
                    triggerOnHover={false}
                    rootMargin="0px"
                    threshold={0}
                  />
                </>
              )}
            </div>

            <p className="ab-body">
              TransIndia was founded on a simple belief — that every Indian family deserves
              <strong> honest, affordable protection</strong> without the confusion.
              We built a platform that replaces jargon with clarity, and sales pressure
              with <strong>genuine guidance</strong>. Today, over 2 crore customers trust
              us with what matters most.
            </p>

            <div className="ab-pillars">
              {PILLARS.map((p, i) => (
                <div
                  key={p.num}
                  className={`ab-pillar${leftIn ? " ab-pillar-in" : ""}`}
                  style={{ transitionDelay: leftIn ? `${0.3 + i * 0.15}s` : "0s" }}
                >
                  <span className="ab-pillar-num">{p.num}</span>
                  <div>
                    <p className="ab-pillar-title">{p.title}</p>
                    <p className="ab-pillar-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ab-cta-row">
              <AnimatedButton
                label="Our Story →"
                bg={B.teal}
                layers={["#17f1d1", "#a374ff", B.teal]}
              />
              <GhostButton label="Meet the Team" />
            </div>

          </div>

          {/* ── RIGHT: Animated Image Mosaic ── */}
          <ImageMosaic />

        </div>

        {/* Stats bar at bottom */}
        <StatsBar />

      </section>
    </>
  );
}