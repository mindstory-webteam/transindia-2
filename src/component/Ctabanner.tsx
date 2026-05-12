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

// ─── Fill Button ──────────────────────────────────────────────────────────────
function FillButton({ label, bg, layers }: {
  label: string;
  bg: string;
  layers: [string, string, string];
}) {
  return (
    <button className="cta-uv-btn" style={{ "--btn-bg": bg } as React.CSSProperties}>
      <span className="cta-uv-bg">
        <span className="cta-uv-layers">
          <span className="cta-uv-layer cta-uv-l1" style={{ background: layers[0] }} />
          <span className="cta-uv-layer cta-uv-l2" style={{ background: layers[1] }} />
          <span className="cta-uv-layer cta-uv-l3" style={{ background: layers[2] }} />
        </span>
      </span>
      <span className="cta-uv-inner">
        <span className="cta-uv-static">{label}</span>
        <span className="cta-uv-hover">{label}</span>
      </span>
    </button>
  );
}

// ─── Ghost Button ─────────────────────────────────────────────────────────────
function GhostButton({ label }: { label: string }) {
  return (
    <button className="cta-uv-ghost">
      <span className="cta-uv-ghost-bg">
        <span className="cta-uv-layers">
          <span className="cta-uv-layer cta-uv-l1" style={{ background: "rgba(255,255,255,0.12)" }} />
          <span className="cta-uv-layer cta-uv-l2" style={{ background: "rgba(255,255,255,0.08)" }} />
          <span className="cta-uv-layer cta-uv-l3" style={{ background: "rgba(255,255,255,0.05)" }} />
        </span>
      </span>
      <span className="cta-uv-inner">
        <span className="cta-uv-static">{label}</span>
        <span className="cta-uv-hover">{label}</span>
      </span>
    </button>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
export default function CTABanner() {
  const { ref, inView } = useInView(0.12);
  const [headingKey, setHeadingKey] = useState(0);

  useEffect(() => {
    if (inView) setHeadingKey((k) => k + 1);
  }, [inView]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ══ SECTION WRAPPER ═══════════════════════════════════════════ */
        .cta-section {
          font-family: 'Outfit', sans-serif;
          padding: 80px 0 0;
          background: transparent;
          position: relative;
          z-index: 1;
        }

        /* ══ BANNER CARD ═══════════════════════════════════════════════ */
        .cta-banner {
          position: relative;
          border-radius: 0;
          overflow: hidden;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            115deg,
            #1aafaf 0%,
            #2DBFBF 35%,
            #22b0b0 60%,
            #178080 100%
          );
          opacity: 0;
          transform: translateY(24px) scale(0.99);
          transition:
            opacity 0.6s cubic-bezier(0.22,1,0.36,1),
            transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .cta-banner-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* ── Noise texture overlay ── */
        .cta-banner::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          pointer-events: none; z-index: 1; opacity: 0.4;
          border-radius: inherit;
        }

        /* ── Right image ── */
        .cta-image-wrap {
          position: absolute;
          top: 0; right: 0;
          width: 55%; height: 100%;
          z-index: 0; pointer-events: none;
        }
        .cta-image {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top; display: block;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.82) 65%, rgba(0,0,0,0.95) 85%, rgba(0,0,0,1) 100%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.82) 65%, rgba(0,0,0,0.95) 85%, rgba(0,0,0,1) 100%);
          mix-blend-mode: luminosity; opacity: 0.25;
        }

        /* ── Left image (mirrored) ── */
        .cta-image-wrap-left {
          position: absolute;
          top: 0; left: 0;
          width: 55%; height: 100%;
          z-index: 0; pointer-events: none;
        }
       

        /* ── Blobs ── */
        .cta-blob-1 { position: absolute; top: -60px; right: 30%; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%); pointer-events: none; z-index: 1; }
        .cta-blob-2 { position: absolute; bottom: -80px; right: 10%; width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%); pointer-events: none; z-index: 1; }

        /* ── Overlay — fades both edges toward center ── */
        .cta-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(45,191,191,0.45) 18%,
            rgba(45,191,191,0.88) 32%,
            #2DBFBF 42%,
            #2DBFBF 58%,
            rgba(45,191,191,0.88) 68%,
            rgba(45,191,191,0.45) 82%,
            transparent 100%
          );
          z-index: 2; pointer-events: none;
        }
        .cta-bottom-grad {
          position: absolute; bottom: 0; left: 0; right: 0; height: 60px;
          background: linear-gradient(to top, rgba(23,130,130,0.35), transparent);
          pointer-events: none; z-index: 2;
        }

        /* ══ CONTENT — centered ════════════════════════════════════════ */
        .cta-content {
          position: relative; z-index: 3;
          padding: 52px 56px;
          max-width: 640px;
          width: 100%;
          display: flex; flex-direction: column; gap: 0;
          align-items: center;
          text-align: center;
        }
        @media (max-width: 680px) { .cta-content { padding: 40px 32px; } }

        /* ── Eyebrow ── */
        .cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: .13em;
          text-transform: uppercase; color: rgba(255,255,255,0.70);
          margin-bottom: 18px;
        }
        .cta-eyebrow::before {
          content: ''; display: block; width: 22px; height: 1.5px;
          background: rgba(255,255,255,0.60); border-radius: 999px;
        }

        /* ── Heading ── */
        .cta-heading-wrap { margin-bottom: 14px; overflow: visible; }
        .cta-heading-line {
          display: block;
          font-family: 'Outfit', sans-serif !important;
          font-size: clamp(28px, 3.6vw, 48px) !important;
          font-weight: 800 !important;
          line-height: 1.08 !important;
          letter-spacing: -0.025em !important;
          color: ${B.white} !important;
          overflow: visible !important;
          padding-bottom: 4px !important;
          text-align: center !important;
        }
        .cta-heading-coral { color: #ffcfc9 !important; }

        /* ── Sub text ── */
        .cta-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 14.5px; font-weight: 400;
          color: rgba(255,255,255,0.72);
          line-height: 1.65; margin: 0 0 32px; max-width: 420px;
          text-align: center;
        }
        .cta-sub strong { color: rgba(255,255,255,0.95); font-weight: 600; }

        /* ── Button row ── */
        .cta-btn-row {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
          justify-content: center;
        }

        /* ══ FILL BUTTON (wave) ════════════════════════════════════════ */
        .cta-uv-btn {
          all: unset;
          position: relative; display: inline-flex;
          height: 50px; align-items: center;
          border-radius: 9999px; padding: 0 30px;
          font-family: 'Outfit', sans-serif; font-size: 14.5px; font-weight: 700;
          color: ${B.teal}; letter-spacing: 0.01em; cursor: pointer; user-select: none;
          white-space: nowrap;
        }
        .cta-uv-bg {
          overflow: hidden; border-radius: 9999px;
          position: absolute; inset: 0;
          background: var(--btn-bg);
          box-shadow: 0 4px 24px rgba(0,0,0,.18);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .cta-uv-btn:hover .cta-uv-bg { transform: scale(1.04); }

        /* ══ GHOST BUTTON (wave) ═══════════════════════════════════════ */
        .cta-uv-ghost {
          all: unset;
          position: relative; display: inline-flex;
          height: 50px; align-items: center;
          border-radius: 9999px; padding: 0 26px;
          font-family: 'Outfit', sans-serif; font-size: 14.5px; font-weight: 600;
          color: rgba(255,255,255,0.90); cursor: pointer; user-select: none;
          white-space: nowrap;
        }
        .cta-uv-ghost-bg {
          overflow: hidden; border-radius: 9999px;
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.35);
          backdrop-filter: blur(4px);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1), border-color 0.3s ease, background 0.3s ease;
        }
        .cta-uv-ghost:hover .cta-uv-ghost-bg {
          transform: scale(1.04);
          border-color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.16);
        }

        /* ══ SHARED WAVE LAYERS ════════════════════════════════════════ */
        .cta-uv-layers {
          display: block; position: absolute;
          left: 50%; top: -60%; transform: translate(-50%);
          aspect-ratio: 1/1; width: max(200%, 10rem);
        }
        .cta-uv-layer {
          display: block; border-radius: 9999px;
          position: absolute; inset: 0; transform: scale(0);
        }
        .cta-uv-btn:hover .cta-uv-layer,
        .cta-uv-ghost:hover .cta-uv-layer {
          transition: transform 1.3s cubic-bezier(0.19,1,0.22,1);
        }
        .cta-uv-btn:hover .cta-uv-l1,
        .cta-uv-ghost:hover .cta-uv-l1 { transform: scale(1); }
        .cta-uv-btn:hover .cta-uv-l2,
        .cta-uv-ghost:hover .cta-uv-l2 { transition-delay: 0.1s; transform: scale(1); }
        .cta-uv-btn:hover .cta-uv-l3,
        .cta-uv-ghost:hover .cta-uv-l3 { transition-delay: 0.2s; transform: scale(1); }

        /* ══ SHARED TEXT SLIDE ═════════════════════════════════════════ */
        .cta-uv-inner { position: relative; display: block; pointer-events: none; }
        .cta-uv-static, .cta-uv-hover { display: block; pointer-events: none; }
        .cta-uv-hover { position: absolute; top: 0; left: 0; opacity: 0; transform: translateY(70%); }

        .cta-uv-btn:hover .cta-uv-static,
        .cta-uv-ghost:hover .cta-uv-static {
          opacity: 0; transform: translateY(-70%);
          transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 0.3s linear;
        }
        .cta-uv-btn:hover .cta-uv-hover,
        .cta-uv-ghost:hover .cta-uv-hover {
          opacity: 1; transform: translateY(0);
          transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 1.4s cubic-bezier(0.19,1,0.22,1);
        }

        /* ── Trust strip ── */
        .cta-trust {
          margin-top: 28px; display: flex; align-items: center;
          gap: 18px; flex-wrap: wrap;
          justify-content: center;
        }
        .cta-trust-item {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.60); letter-spacing: 0.02em;
        }
        .cta-trust-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.40); flex-shrink: 0; }

        @media (max-width: 560px) {
          .cta-section { padding: 48px 5vw 0; }
          .cta-image-wrap,
          .cta-image-wrap-left { width: 70%; opacity: 0.6; }
          .cta-banner { min-height: 320px; }
        }
      `}</style>

      <section className="cta-section">
        <div ref={ref} className={`cta-banner${inView ? " cta-banner-in" : ""}`}>

          {/* ── Left image ── */}
          <div className="cta-image-wrap-left">
            <img src="/images/img-6.jpg" alt="" className="cta-image-left" aria-hidden="true" draggable={false} />
          </div>

          {/* ── Right image ── */}
          <div className="cta-image-wrap">
            <img src="/images/img-6.jpg" alt="" className="cta-image" aria-hidden="true" draggable={false} />
          </div>

          <div className="cta-overlay" />
          <div className="cta-bottom-grad" />
          <div className="cta-blob-1" />
          <div className="cta-blob-2" />

          <div className="cta-content">
            <p className="cta-eyebrow">Ready to get started?</p>

            <div className="cta-heading-wrap">
              {inView && (
                <>
                  <ShuffleText
                    key={`cta-h1-${headingKey}`}
                    text="Ready for a"
                    tag="span"
                    className="cta-heading-line"
                    shuffleDirection="right"
                    duration={0.46}
                    stagger={0.032}
                    animationMode="evenodd"
                    triggerOnce={false}
                    triggerOnHover={false}
                    rootMargin="0px"
                    threshold={0}
                  />
                  <ShuffleText
                    key={`cta-h2-${headingKey}`}
                    text="simpler journey?"
                    tag="span"
                    className="cta-heading-line cta-heading-coral"
                    shuffleDirection="right"
                    duration={0.46}
                    stagger={0.032}
                    animationMode="evenodd"
                    triggerOnce={false}
                    triggerOnHover={false}
                    rootMargin="0px"
                    threshold={0}
                  />
                </>
              )}
            </div>

            <p className="cta-sub">
              Experience the TransIndia difference today. <strong>Great coverage</strong>, honest prices, and a
              team that genuinely cares.
            </p>

            <div className="cta-btn-row">
              <FillButton
                label="View plans →"
                bg={B.white}
                layers={["rgba(240,240,240,0.9)", "rgba(220,220,220,0.7)", B.white]}
              />
              <GhostButton label="Advisor & experts" />
            </div>

            <div className="cta-trust">
              {["IRDAI Regulated", "50+ Insurers", "5-min Policy"].map((t, i) => (
                <span key={t} className="cta-trust-item">
                  {i > 0 && <span className="cta-trust-dot" />}
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}