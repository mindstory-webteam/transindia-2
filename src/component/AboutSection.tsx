"use client";

import React, { useRef, useEffect, useState } from "react";
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

// ─── Image for right panel ────────────────────────────────────────────────────

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "50+",     label: "Insurance Partners" },
  { value: "2Cr+",    label: "Happy Customers"    },
  { value: "₹500Cr+", label: "Claims Settled"     },
  { value: "4.8★",    label: "App Rating"         },
];

const FAQS = [
  {
    num: "01",
    title: "Radical Transparency",
    desc: "No hidden clauses. No pushy upsells. We show you exactly what you're buying — in plain language. Every policy detail is laid out clearly before you commit.",
  },
  {
    num: "02",
    title: "Expert-Led Guidance",
    desc: "Every recommendation is backed by licensed advisors who earn nothing from pushing a particular plan. Our experts work for you, not the insurers.",
  },
  {
    num: "03",
    title: "Technology That Cares",
    desc: "Our AI compares plans in seconds — but a human is always one call away when you need real advice. Smart tools, human touch.",
  },
  {
    num: "04",
    title: "Instant Claims Support",
    desc: "File a claim in minutes with our digital-first process. Our dedicated claims team follows up at every step so you're never left waiting or wondering.",
  },
];

// ─── Intersection hook ────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
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

// ─── Heading using ShuffleText ────────────────────────────────────────────────
// Replace the AnimatedHeading component and the eyebrow paragraph with this:

function AnimatedHeading({ inView, headingKey }: { inView: boolean; headingKey: string | number }) {

  return (
    <div className="ab-heading-wrap">
      {/* Eyebrow line — dash + label */}
      <div className="ab-eyebrow-inline">
        <span className="ab-eyebrow-dash" />
        <span className="ab-eyebrow-text">About TransIndia</span>
      </div>

      {inView && (
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
  );
}

// ─── Buttons (preserved original style + wave animation) ─────────────────────
function AnimatedButton({ label, bg, layers }) {
  return (
    <button className="ab-uv-btn" style={{ "--btn-bg": bg }}>
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

function GhostButton({ label }) {
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
          <span className="ab-stat-val">{s.value}</span>
          <span className="ab-stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Right Image Panel (full-bleed to right edge) ────────────────────────────
function RightImage() {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`ab-right-img${inView ? " ab-right-img-in" : ""}`}
    >
      <img
        src="/images/img-5.webp"
        alt="Happy Indian family protected by insurance"
        className="ab-right-photo"
      />
      {/* Subtle gradient overlay on left for blending with content */}
      <div className="ab-right-overlay" />
      {/* Floating badge */}
      <div className="ab-right-badge">
        <span className="ab-right-badge-num">12+</span>
        <span className="ab-right-badge-label">Years of Trust</span>
      </div>
    </div>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
export default function AboutSection() {
  const { ref: leftRef, inView: leftIn } = useInView(0.1);
  const [headingKey, setHeadingKey] = useState(0);
  const [openFaq, setOpenFaq] = useState(0); // first item open by default

  useEffect(() => {
    if (leftIn) setHeadingKey((k) => k + 1);
  }, [leftIn]);

  const toggle = (i) => setOpenFaq((cur) => (cur === i ? null : i));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ══ ROOT ══ */
        .ab-root {
          font-family: 'Outfit', sans-serif;
          background: ${B.white};
          width: 100%;
          overflow: hidden;
          color: ${B.charcoal};
        }

        /* ══ MAIN GRID — left content + flush-right image ══ */
        .ab-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: stretch;
          min-height: 680px;
        }
        @media (max-width: 960px) {
          .ab-main { grid-template-columns: 1fr; }
        }

        /* Left content column gets the padding */
        .ab-left-col {
          padding: 90px 7vw 80px;
        }
        @media (max-width: 960px) {
          .ab-left-col { padding: 64px 6vw 60px; }
        }

        /* ── Eyebrow pill badge (matching screenshot) ── */
        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 500; letter-spacing: .01em;
          color: #1A6B5A;
          background: #E0F5EF;
          border: 1px solid #B6E8D8;
          border-radius: 999px;
          padding: 5px 14px;
          margin-bottom: 20px;
        }
        .ab-eyebrow::before {
          content: ''; display: block; width: 7px; height: 7px;
          background: ${B.teal}; border-radius: 50%;
        }

        /* ── Heading — bold sans-serif matching screenshot ── */
        .ab-heading-wrap {
          padding: 4px 0 16px;
          overflow: visible;
        }



        /* ── Eyebrow — dash + small caps label (matches screenshot style) ── */
.ab-eyebrow-inline {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}
.ab-eyebrow-dash {
  display: block;
  width: 32px;
  height: 2px;
  background: #2DBFBF;
  border-radius: 2px;
  flex-shrink: 0;
}
.ab-eyebrow-text {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #2DBFBF;
}
        .ab-heading-line {
          display: block;
          font-family: 'Outfit', sans-serif !important;
          font-size: clamp(36px, 4.6vw, 64px) !important;
          font-weight: 800 !important;
          line-height: 1.10 !important;
          letter-spacing: -0.025em !important;
          color: ${B.charcoal} !important;
          overflow: visible !important;
          padding-bottom: 4px !important;
        }
        .ab-heading-accent {
          color: ${B.teal} !important;
          font-style: normal !important;
        }

        .ab-body {
          font-size: 15.5px; font-weight: 400; color: #666;
          line-height: 1.82; margin: 22px 0 36px; max-width: 480px;
        }
        .ab-body strong { color: ${B.charcoal}; font-weight: 600; }

        /* ── FAQ Accordion ── */
        .ab-faqs { display: flex; flex-direction: column; margin-top: 4px; }

        .ab-faq {
          border-top: 1px solid ${B.border};
          overflow: hidden;
        }
        .ab-faq:last-child { border-bottom: 1px solid ${B.border}; }

        .ab-faq-trigger {
          all: unset; width: 100%; cursor: pointer;
          display: flex; align-items: center; gap: 16px;
          padding: 20px 0;
          user-select: none;
        }
        .ab-faq-trigger:focus-visible { outline: 2px solid ${B.teal}; border-radius: 4px; }

        .ab-faq-num {
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700;
          color: ${B.teal}; letter-spacing: .12em; flex-shrink: 0; width: 24px;
        }
        .ab-faq-title {
          font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700;
          color: ${B.charcoal}; flex: 1; line-height: 1.3;
          transition: color 0.2s ease;
        }
        .ab-faq-open .ab-faq-title { color: ${B.teal}; }

        .ab-faq-icon {
          width: 24px; height: 24px; flex-shrink: 0; border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.15);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ab-faq-open .ab-faq-icon {
          background: ${B.teal}; border-color: ${B.teal};
          transform: rotate(45deg);
        }
        .ab-faq-icon svg { display: block; }
        .ab-faq-icon-line { transition: stroke 0.25s ease; }
        .ab-faq-open .ab-faq-icon-line { stroke: #fff; }

        .ab-faq-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.38s cubic-bezier(0.4,0,0.2,1);
        }
        .ab-faq-open .ab-faq-body { grid-template-rows: 1fr; }

        .ab-faq-inner {
          overflow: hidden;
          padding: 0 0 0 40px;
        }
        .ab-faq-desc {
          font-size: 14px; color: #777; line-height: 1.78;
          padding-bottom: 20px; margin: 0;
        }

        /* slide-in on scroll */
        .ab-faq {
          opacity: 0; transform: translateX(-14px);
          transition: opacity 0.55s ease, transform 0.55s ease,
                      border-top-color 0.2s ease;
        }
        .ab-faq-in { opacity: 1 !important; transform: translateX(0) !important; }

        /* ── CTA Row ── */
        .ab-cta-row {
          display: flex; align-items: center; gap: 14px;
          margin-top: 36px; flex-wrap: wrap;
        }

        /* ══ RIGHT IMAGE PANEL (flush to right edge) ══ */
        .ab-right-img {
          position: relative;
          width: 100%; height: 80%; min-height: 580px;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.9s ease 0.2s;
          margin-top: 106px;
          
          
        }
        .ab-right-img-in { opacity: 1; }

        .ab-right-photo {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 30%;
        }
        /* Left-edge fade so image blends into the white content area */
        .ab-right-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, ${B.white} 0%, rgba(255,255,255,0.15) 28%, transparent 50%);
          z-index: 1; pointer-events: none;
        }
        /* Floating trust badge bottom-left of image */
        .ab-right-badge {
          position: absolute; bottom: 36px; left: 32px;
          display: flex; flex-direction: column; gap: 2px;
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 16px; padding: 14px 20px; z-index: 2;
          pointer-events: none;
        }
        .ab-right-badge-num {
          font-family: 'Outfit', sans-serif;
          font-size: 30px; font-weight: 800; color: #fff; line-height: 1;
        }
        .ab-right-badge-label {
          font-size: 10px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,0.7);
        }
        @media (max-width: 960px) {
          .ab-right-img { min-height: 360px; }
          .ab-right-overlay { background: linear-gradient(to bottom, ${B.white} 0%, transparent 30%); }
        }

        /* ══ BUTTON STYLES (preserved exactly) ══ */
        .ab-uv-btn {
          all: unset;
          position: relative; display: inline-flex;
          height: 50px; align-items: center;
          border-radius: 9999px; padding: 0 30px;
          font-family: 'Outfit', sans-serif; font-size: 14.5px; font-weight: 600;
          color: #fff; letter-spacing: 0.01em; cursor: pointer; user-select: none;
        }
        .ab-uv-bg {
          overflow: hidden; border-radius: 9999px;
          position: absolute; inset: 0;
          background: var(--btn-bg);
          box-shadow: 0 4px 20px rgba(0,0,0,.14);
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

        .ab-uv-ghost {
          all: unset;
          position: relative; display: inline-flex;
          height: 50px; align-items: center;
          border-radius: 9999px; padding: 0 26px;
          font-family: 'Outfit', sans-serif; font-size: 14.5px; font-weight: 500;
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

        /* ══ STATS BAR ══ */
        .ab-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: ${B.offwhite};
          border-top: 1px solid ${B.border};
        }
        @media (max-width: 640px) { .ab-stats { grid-template-columns: repeat(2,1fr); } }

        .ab-stat {
          display: flex; flex-direction: column; align-items: center; gap: 7px;
          padding: 40px 16px;
          border-right: 1px solid ${B.border};
          opacity: 0; transform: translateY(16px);
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
        .ab-stat-in::after { width: 52%; }
        @keyframes abFadeUp { to { opacity: 1; transform: translateY(0); } }

        .ab-stat-val {
         font-family: 'Outfit', sans-serif;
          font-size: clamp(28px, 3.5vw, 46px);
          font-weight: 800;
          color: ${B.charcoal};
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .ab-stat-label {
          font-size: 11px; font-weight: 600;
          color: ${B.gray}; letter-spacing: .12em; text-transform: uppercase;
        }
      `}</style>

      <section className="ab-root">
        <div className="ab-main">

          {/* ── LEFT COLUMN ── */}
          <div ref={leftRef} className="ab-left-col">
            {/* <p className="ab-eyebrow">About TransIndia</p> */}

            <AnimatedHeading inView={leftIn} headingKey={headingKey} />

            <p className="ab-body">
              TransIndia was founded on a simple belief — that every Indian family deserves
              <strong> honest, affordable protection</strong> without the confusion.
              We built a platform that replaces jargon with clarity, and sales pressure
              with <strong>genuine guidance</strong>. Today, over 2 crore customers trust
              us with what matters most.
            </p>

            {/* FAQ Accordion */}
            <div className="ab-faqs">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={faq.num}
                    className={`ab-faq${isOpen ? " ab-faq-open" : ""}${leftIn ? " ab-faq-in" : ""}`}
                    style={{ transitionDelay: leftIn ? `${0.25 + i * 0.1}s` : "0s" }}
                  >
                    <button
                      className="ab-faq-trigger"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                    >
                      <span className="ab-faq-num">{faq.num}</span>
                      <span className="ab-faq-title">{faq.title}</span>
                      <span className="ab-faq-icon" aria-hidden="true">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <line className="ab-faq-icon-line" x1="5" y1="1" x2="5" y2="9" stroke={isOpen ? "#fff" : "#555"} strokeWidth="1.5" strokeLinecap="round"/>
                          <line className="ab-faq-icon-line" x1="1" y1="5" x2="9" y2="5" stroke={isOpen ? "#fff" : "#555"} strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </span>
                    </button>
                    <div className="ab-faq-body">
                      <div className="ab-faq-inner">
                        <p className="ab-faq-desc">{faq.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
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

          {/* ── RIGHT: Full-bleed image to right edge ── */}
          <RightImage />

        </div>

        <StatsBar />
      </section>
    </>
  );
}