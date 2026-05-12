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

// ─── Animated Button ──────────────────────────────────────────────────────────
function AnimatedButton({ label, bg, layers, variant = "fill" }: {
  label: string;
  bg: string;
  layers: [string, string, string];
  variant?: "fill" | "ghost";
}) {
  if (variant === "ghost") {
    return (
      <button className="cta-ghost-btn">
        <span className="cta-ghost-bg" />
        <span className="cta-btn-inner">
          <span className="cta-btn-static">{label}</span>
          <span className="cta-btn-hover">{label}</span>
        </span>
      </button>
    );
  }
  return (
    <button className="cta-fill-btn" style={{ "--btn-bg": bg } as React.CSSProperties}>
      <span className="cta-fill-bg">
        <span className="cta-fill-layers">
          <span className="cta-fill-layer cta-l1" style={{ background: layers[0] }} />
          <span className="cta-fill-layer cta-l2" style={{ background: layers[1] }} />
          <span className="cta-fill-layer cta-l3" style={{ background: layers[2] }} />
        </span>
      </span>
      <span className="cta-btn-inner">
        <span className="cta-btn-static">{label}</span>
        <span className="cta-btn-hover">{label}</span>
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
          padding: 80px 9vw;
          background: transparent;
          position: relative;
          z-index: 1;
        }

        /* ══ BANNER CARD ═══════════════════════════════════════════════ */
        .cta-banner {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          min-height: 260px;
          display: flex;
          align-items: center;

          /* Base teal gradient — left to right, fades to slightly darker teal */
          background: linear-gradient(
            115deg,
            #1aafaf 0%,
            #2DBFBF 35%,
            #22b0b0 60%,
            #178080 100%
          );

          /* Entrance animation */
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

        /* ── Noise texture overlay for depth ── */
        .cta-banner::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          pointer-events: none; z-index: 1; opacity: 0.4;
          border-radius: inherit;
        }

        /* ── Right image with fading mask ── */
        .cta-image-wrap {
          position: absolute;
          top: 0; right: 0;
          width: 55%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .cta-image {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          /* Fade: left edge fully transparent, right edge visible */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0,0,0,0.15) 20%,
            rgba(0,0,0,0.55) 42%,
            rgba(0,0,0,0.82) 65%,
            rgba(0,0,0,0.95) 85%,
            rgba(0,0,0,1)  100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0,0,0,0.15) 20%,
            rgba(0,0,0,0.55) 42%,
            rgba(0,0,0,0.82) 65%,
            rgba(0,0,0,0.95) 85%,
            rgba(0,0,0,1)  100%
          );
          /* Blend into the teal behind it */
          mix-blend-mode: luminosity;
          opacity: 0.25;
        }

        /* ── Decorative circle blobs ── */
        .cta-blob-1 {
          position: absolute; top: -60px; right: 30%;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 1;
        }
        .cta-blob-2 {
          position: absolute; bottom: -80px; right: 10%;
          width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 1;
        }

        /* ── Teal-to-image gradient transition ── */
        .cta-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to right,
            #2DBFBF 0%,
            #2DBFBF 38%,
            rgba(45,191,191,0.88) 50%,
            rgba(45,191,191,0.45) 68%,
            rgba(45,191,191,0.10) 85%,
            transparent 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        /* ── Subtle bottom gradient ── */
        .cta-bottom-grad {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 60px;
          background: linear-gradient(to top, rgba(23,130,130,0.35), transparent);
          pointer-events: none; z-index: 2;
        }

        /* ══ CONTENT ═══════════════════════════════════════════════════ */
        .cta-content {
          position: relative; z-index: 3;
          padding: 52px 56px;
          max-width: 640px;
          display: flex; flex-direction: column; gap: 0;
        }
        @media (max-width: 680px) {
          .cta-content { padding: 40px 32px; }
        }

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
        }
        .cta-heading-coral { color: #ffcfc9 !important; }

        /* ── Sub text ── */
        .cta-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 14.5px;
          font-weight: 400;
          color: rgba(255,255,255,0.72);
          line-height: 1.65;
          margin: 0 0 32px;
          max-width: 420px;
        }
        .cta-sub strong { color: rgba(255,255,255,0.95); font-weight: 600; }

        /* ── Button row ── */
        .cta-btn-row {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }

        /* ── Fill button ── */
        .cta-fill-btn {
          all: unset; position: relative; display: inline-flex;
          height: 50px; align-items: center; border-radius: 9999px; padding: 0 28px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
          color: ${B.teal}; cursor: pointer; user-select: none; white-space: nowrap;
        }
        .cta-fill-bg {
          overflow: hidden; border-radius: 9999px; position: absolute; inset: 0;
          background: ${B.white};
          box-shadow: 0 4px 24px rgba(0,0,0,.18);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .cta-fill-btn:hover .cta-fill-bg { transform: scale(1.04); }
        .cta-fill-layers {
          display: block; position: absolute; left: 50%; top: -60%; transform: translate(-50%);
          aspect-ratio: 1/1; width: max(200%,10rem);
        }
        .cta-fill-layer {
          display: block; border-radius: 9999px; position: absolute; inset: 0; transform: scale(0);
        }
        .cta-fill-btn:hover .cta-fill-layer { transition: transform 1.3s cubic-bezier(0.19,1,0.22,1); }
        .cta-fill-btn:hover .cta-l1 { transform: scale(1); }
        .cta-fill-btn:hover .cta-l2 { transition-delay: .1s; transform: scale(1); }
        .cta-fill-btn:hover .cta-l3 { transition-delay: .2s; transform: scale(1); }

        /* ── Ghost button ── */
        .cta-ghost-btn {
          all: unset; position: relative; display: inline-flex;
          height: 50px; align-items: center; border-radius: 9999px; padding: 0 24px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
          color: rgba(255,255,255,0.90); cursor: pointer; user-select: none; white-space: nowrap;
        }
        .cta-ghost-bg {
          position: absolute; inset: 0; border-radius: 9999px;
          border: 1.5px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(4px);
          transition:
            border-color 0.28s ease,
            background 0.28s ease,
            transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .cta-ghost-btn:hover .cta-ghost-bg {
          border-color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.16);
          transform: scale(1.04);
        }

        /* ── Shared btn inner ── */
        .cta-btn-inner { position: relative; display: block; pointer-events: none; }
        .cta-btn-static, .cta-btn-hover { display: block; pointer-events: none; }
        .cta-btn-hover {
          position: absolute; top: 0; left: 0;
          opacity: 0; transform: translateY(70%);
        }
        .cta-fill-btn:hover .cta-btn-static,
        .cta-ghost-btn:hover .cta-btn-static {
          opacity: 0; transform: translateY(-70%);
          transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity .3s linear;
        }
        .cta-fill-btn:hover .cta-btn-hover,
        .cta-ghost-btn:hover .cta-btn-hover {
          opacity: 1; transform: translateY(0);
          transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 1.4s cubic-bezier(0.19,1,0.22,1);
        }

        /* ── Trust strip ── */
        .cta-trust {
          margin-top: 28px;
          display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
        }
        .cta-trust-item {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.60);
          letter-spacing: 0.02em;
        }
        .cta-trust-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.40);
          flex-shrink: 0;
        }

        @media (max-width: 560px) {
          .cta-section { padding: 48px 5vw; }
          .cta-image-wrap { width: 70%; opacity: 0.6; }
          .cta-banner { min-height: 320px; }
        }
      `}</style>

      <section className="cta-section">
        <div
          ref={ref}
          className={`cta-banner${inView ? " cta-banner-in" : ""}`}
        >
          {/* ── Background image (right side, fading) ── */}
          <div className="cta-image-wrap">
            <img
              src="/images/img-6.jpg"
              alt=""
              className="cta-image"
              aria-hidden="true"
              draggable={false}
            />
          </div>

          {/* ── Overlay gradients ── */}
          <div className="cta-overlay" />
          <div className="cta-bottom-grad" />

          {/* ── Decorative blobs ── */}
          <div className="cta-blob-1" />
          <div className="cta-blob-2" />

          {/* ── Content ── */}
          <div className="cta-content">
            <p className="cta-eyebrow">Ready to get started?</p>

            <div className="cta-heading-wrap">
              {inView && (
                <>
                  <ShuffleText
                    key={`cta-h1-${inView}`}
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
                    key={`cta-h2-${inView}`}
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
              <AnimatedButton
                label="View plans →"
                bg={B.white}
                layers={["rgba(255,255,255,0.85)", "rgba(255,255,255,0.70)", B.white]}
                variant="fill"
              />
              <AnimatedButton
                label="Advisor & experts"
                bg="transparent"
                layers={["transparent", "transparent", "transparent"]}
                variant="ghost"
              />
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