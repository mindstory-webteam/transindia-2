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

const STEPS = [
  { num: "01", title: "Choose your category", desc: "Pick what you want to protect — family, health, wealth, or business.", icon: "🎯" },
  { num: "02", title: "Select a plan",         desc: "Compare plans side by side. Every feature, no jargon.",             icon: "📋" },
  { num: "03", title: "Fill details in 2 min", desc: "Basic info only. No medical tests for most plans.",                 icon: "✏️" },
  { num: "04", title: "Pay & get policy",      desc: "Instant policy document. Coverage starts the same day.",            icon: "✅" },
];

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
function AnimatedButton({ label, bg, layers, onClick }: {
  label: string; bg: string; layers: [string, string, string]; onClick?: () => void;
}) {
  return (
    <button className="fi-uv-btn" style={{ "--btn-bg": bg } as React.CSSProperties} onClick={onClick}>
      <span className="fi-uv-bg">
        <span className="fi-uv-layers">
          <span className="fi-uv-layer fi-uv-l1" style={{ background: layers[0] }} />
          <span className="fi-uv-layer fi-uv-l2" style={{ background: layers[1] }} />
          <span className="fi-uv-layer fi-uv-l3" style={{ background: layers[2] }} />
        </span>
      </span>
      <span className="fi-uv-inner">
        <span className="fi-uv-static">{label}</span>
        <span className="fi-uv-hover">{label}</span>
      </span>
    </button>
  );
}

// ─── Steps Panel ─────────────────────────────────────────────────────────────
function StepsPanel({ inView }: { inView: boolean }) {
  return (
    <div className="fi-steps">
      {STEPS.map((step, i) => (
        <div
          key={step.num}
          className={`fi-step${inView ? " fi-step-in" : ""}`}
          style={{ transitionDelay: inView ? `${0.15 + i * 0.13}s` : "0s" }}
        >
          {/* Left: icon + connector line */}
          <div className="fi-step-left">
            <div className="fi-step-icon-wrap">
              <span className="fi-step-icon">{step.icon}</span>
            </div>
            {i < STEPS.length - 1 && <div className="fi-step-connector" />}
          </div>

          {/* Right: text */}
          <div className="fi-step-body">
            <div className="fi-step-num">{step.num}</div>
            <p className="fi-step-title">{step.title}</p>
            <p className="fi-step-desc">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function HowItWorksSection() {
  const { ref: headRef, inView: headIn } = useInView(0.08);
  const { ref: bodyRef, inView: bodyIn } = useInView(0.06);
  const [headingKey, setHeadingKey] = useState(0);

  useEffect(() => { if (headIn) setHeadingKey((k) => k + 1); }, [headIn]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ══ ROOT ══════════════════════════════════════════════════════ */
        .fi-root {
          font-family: 'Outfit', sans-serif;
          background: ${B.offwhite};
          width: 100%; overflow: hidden;
          color: ${B.charcoal}; position: relative;
        }
        .fi-root::before {
          content: ''; position: absolute; top: -80px; left: -80px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(45,191,191,0.07) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .fi-root::after {
          content: ''; position: absolute; bottom: -60px; right: -60px;
          width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,80,58,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* ══ HEADER ════════════════════════════════════════════════════ */
        .fi-header {
          padding: 96px 9vw 0;
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 40px; flex-wrap: wrap; position: relative; z-index: 1;
        }
        .fi-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: ${B.teal}; margin-bottom: 20px;
        }
        .fi-eyebrow::before {
          content: ''; display: block; width: 28px; height: 2px;
          background: ${B.teal}; border-radius: 999px;
        }
        .fi-heading-wrap { padding: 4px 0 0; overflow: visible; clip-path: none; }
        .fi-heading-line {
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
        .fi-heading-accent { color: ${B.teal} !important; font-style: normal !important; }

        /* Right side of header */
        .fi-header-right { padding-bottom: 8px; max-width: 380px; }
        .fi-header-sub {
          font-size: 15px; color: #888; line-height: 1.75; margin: 0 0 28px;
        }
        .fi-header-sub strong { color: ${B.charcoal}; font-weight: 600; }

        @media (max-width: 860px) {
          .fi-header { flex-direction: column; align-items: flex-start; padding: 68px 6vw 0; }
          .fi-header-right { max-width: 100%; padding-bottom: 0; }
        }

        /* ══ BODY ══════════════════════════════════════════════════════ */
        .fi-body {
          padding: 72px 9vw 100px;
          position: relative; z-index: 1;
        }
        @media (max-width: 860px) {
          .fi-body { padding: 48px 6vw 80px; }
        }

        .fi-section-label {
          font-size: 11px; font-weight: 700; letter-spacing: .13em;
          text-transform: uppercase; color: ${B.gray};
          margin-bottom: 36px;
          display: flex; align-items: center; gap: 10px;
        }
        .fi-section-label::after {
          content: ''; flex: 1; max-width: 60px; height: 1px;
          background: ${B.border}; border-radius: 999px;
        }

        /* ══ STEPS ═════════════════════════════════════════════════════ */
        .fi-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }

        /* Horizontal connector line behind all steps */
        .fi-steps::before {
          content: '';
          position: absolute;
          top: 23px;                       /* vertically centred on the icon */
          left: calc(12.5% + 23px);        /* starts at centre of icon 1 */
          right: calc(12.5% + 23px);       /* ends at centre of icon 4 */
          height: 2px;
          background: linear-gradient(90deg, ${B.teal}55, ${B.teal}22);
          border-radius: 999px;
          z-index: 0;
          pointer-events: none;
        }

        @media (max-width: 860px) {
          .fi-steps {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .fi-steps::before { display: none; }
        }

        /* ── Individual step ── */
        .fi-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 16px 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1);
          position: relative; z-index: 1;
        }
        .fi-step-in { opacity: 1; transform: translateY(0); }

        /* Mobile: horizontal layout */
        @media (max-width: 860px) {
          .fi-step {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            padding: 0 0 32px;
            gap: 20px;
          }
        }

        /* ── Left column (icon + vertical connector on mobile) ── */
        .fi-step-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .fi-step-icon-wrap {
          width: 52px; height: 52px; border-radius: 15px;
          background: ${B.white};
          border: 1.5px solid ${B.border};
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,.07);
          font-size: 22px; flex-shrink: 0;
          transition: border-color .3s ease, box-shadow .3s ease, transform .35s cubic-bezier(0.22,1,0.36,1);
          position: relative; z-index: 1;
        }
        .fi-step:hover .fi-step-icon-wrap {
          border-color: ${B.teal};
          box-shadow: 0 6px 24px rgba(45,191,191,.22);
          transform: translateY(-3px);
        }

        /* Mobile vertical connector */
        .fi-step-connector {
          width: 2px; flex: 1; min-height: 24px;
          background: linear-gradient(to bottom, ${B.teal}55, rgba(45,191,191,0.04));
          border-radius: 999px;
          margin: 5px 0;
          display: none;
        }
        @media (max-width: 860px) {
          .fi-step-connector { display: block; }
        }

        /* ── Step body ── */
        .fi-step-body {
          padding-top: 16px;
        }
        @media (max-width: 860px) {
          .fi-step-body { padding-top: 8px; padding-bottom: 0; }
        }

        .fi-step-num {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 700;
          color: ${B.teal}; letter-spacing: .12em;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .fi-step-title {
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 700;
          color: ${B.charcoal}; margin: 0 0 8px;
          line-height: 1.3;
          transition: color .2s;
        }
        .fi-step:hover .fi-step-title { color: ${B.teal}; }

        .fi-step-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px; color: #888; line-height: 1.7; margin: 0;
        }

        /* ── Step number badge — desktop top-right corner ── */
        .fi-step-badge {
          position: absolute;
          top: 0; right: 0;
          font-size: 64px; font-weight: 800;
          color: rgba(45,191,191,0.05);
          line-height: 1;
          font-family: 'Outfit', sans-serif;
          letter-spacing: -0.04em;
          pointer-events: none;
          user-select: none;
        }
        @media (max-width: 860px) { .fi-step-badge { display: none; } }

        /* ══ ANIMATED BUTTON ═══════════════════════════════════════════ */
        .fi-uv-btn {
          all: unset; position: relative; display: inline-flex;
          height: 50px; align-items: center; border-radius: 9999px; padding: 0 30px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
          color: #fff; letter-spacing: .01em; cursor: pointer; user-select: none;
        }
        .fi-uv-bg {
          overflow: hidden; border-radius: 9999px; position: absolute; inset: 0;
          background: var(--btn-bg); box-shadow: 0 4px 20px rgba(0,0,0,.14);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .fi-uv-btn:hover .fi-uv-bg { transform: scale(1.04); }
        .fi-uv-layers {
          display: block; position: absolute; left: 50%; top: -60%; transform: translate(-50%);
          aspect-ratio: 1/1; width: max(200%, 10rem);
        }
        .fi-uv-layer {
          display: block; border-radius: 9999px;
          position: absolute; inset: 0; transform: scale(0);
        }
        .fi-uv-btn:hover .fi-uv-layer { transition: transform 1.3s cubic-bezier(0.19,1,0.22,1), opacity .3s linear; }
        .fi-uv-btn:hover .fi-uv-l1 { transform: scale(1); }
        .fi-uv-btn:hover .fi-uv-l2 { transition-delay: .1s; transform: scale(1); }
        .fi-uv-btn:hover .fi-uv-l3 { transition-delay: .2s; transform: scale(1); }
        .fi-uv-inner { position: relative; display: block; pointer-events: none; }
        .fi-uv-static, .fi-uv-hover { display: block; pointer-events: none; }
        .fi-uv-hover { position: absolute; top: 0; left: 0; opacity: 0; transform: translateY(70%); }
        .fi-uv-btn:hover .fi-uv-static { opacity: 0; transform: translateY(-70%); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity .3s linear; }
        .fi-uv-btn:hover .fi-uv-hover  { opacity: 1; transform: translateY(0); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 1.4s cubic-bezier(0.19,1,0.22,1); }
      `}</style>

      <section className="fi-root">

        {/* ── Header ── */}
        <div ref={headRef} className="fi-header">
          <div>
            <p className="fi-eyebrow">Smart Insurance Finder</p>
            <div className="fi-heading-wrap">
              {headIn && (
                <>
                  <ShuffleText
                    key={`fi-h1-${headingKey}`}
                    text="Find the right"
                    tag="span" className="fi-heading-line"
                    shuffleDirection="right" duration={0.48} stagger={0.032}
                    animationMode="evenodd" triggerOnce={false}
                    triggerOnHover={false} rootMargin="0px" threshold={0}
                  />
                  <ShuffleText
                    key={`fi-h2-${headingKey}`}
                    text="insurance."
                    tag="span" className="fi-heading-line fi-heading-accent"
                    shuffleDirection="right" duration={0.48} stagger={0.032}
                    animationMode="evenodd" triggerOnce={false}
                    triggerOnHover={false} rootMargin="0px" threshold={0}
                  />
                </>
              )}
            </div>
          </div>

          <div className="fi-header-right">
            <p className="fi-header-sub">
              Browse plans across every category. Compare, choose, and
              <strong> buy in under 5 minutes</strong> — no branch visits, no paperwork.
            </p>
            <AnimatedButton
              label="Talk to an Advisor →"
              bg={B.teal}
              layers={["#17f1d1", "#a374ff", B.teal]}
            />
          </div>
        </div>

        {/* ── Steps ── */}
        <div ref={bodyRef} className="fi-body">
          <p className="fi-section-label">How it works</p>
          <StepsPanel inView={bodyIn} />
        </div>

      </section>
    </>
  );
}