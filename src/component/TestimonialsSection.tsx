"use client";

import React, { useRef, useEffect, useState } from "react";
import ShuffleText from "./Shuffletext";

// ─── Brand Palette ─────────────────────────────────────────────────────────────
const B = {
  teal:     "#2DBFBF",
  charcoal: "#1A1A1A",
  gray:     "#B5B5B5",
  offwhite: "#F4F4EF",
  white:    "#FFFFFF",
  border:   "rgba(0,0,0,0.07)",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "The claims process was incredibly smooth. I had my car back from the garage in 3 days, and TransIndia handled everything with the workshop directly. Truly effortless.",
    name: "Rahul S.",
    role: "Car Insurance Policyholder",
    avatar: "/images/avatar-1.jpg",
    highlight: "The claims",
  },
  {
    quote: "Switching to TransIndia was the best decision for my family's health cover. Their app is so intuitive, and the customer support is always there when you need them.",
    name: "Ananya K.",
    role: "Health Insurance Policyholder",
    avatar: "/images/avatar-2.jpg",
    highlight: "Switching",
  },
  {
    quote: "Transparency is what I value most. No hidden clauses, and clear protection. TransIndia is the helpful expert I needed for my life insurance journey.",
    name: "Vikram M.",
    role: "Life Insurance Policyholder",
    avatar: "/images/avatar-3.jpg",
    highlight: "Transparency",
  },
  {
    quote: "Got my two-wheeler insurance renewed in under 5 minutes. The comparison tool helped me save ₹1,200 on my premium without compromising on coverage.",
    name: "Priya R.",
    role: "Two-Wheeler Insurance Policyholder",
    avatar: "/images/avatar-4.jpg",
    highlight: "Got my",
  },
  {
    quote: "As a senior citizen, I was worried about finding the right health plan. TransIndia's advisor patiently explained every option. I feel genuinely protected now.",
    name: "Suresh N.",
    role: "Senior Health Insurance Policyholder",
    avatar: "/images/avatar-5.jpg",
    highlight: "As a senior",
  },
];

// ─── Intersection hook ─────────────────────────────────────────────────────────
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

// ─── Nav Arrow Button ──────────────────────────────────────────────────────────
function ArrowBtn({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      className={`tm-arrow${disabled ? " tm-arrow-disabled" : ""}`}
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {dir === "prev"
          ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  );
}

// ─── Quote Icon ────────────────────────────────────────────────────────────────
function QuoteIcon() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="tm-quote-icon">
      <path d="M0 24V14.4C0 10.56 0.906667 7.28 2.72 4.56C4.58667 1.84 7.28 0.213333 10.8 0L12 2.88C9.86667 3.36 8.13333 4.4 6.8 6C5.52 7.6 4.88 9.44 4.88 11.52H9.6V24H0ZM19.2 24V14.4C19.2 10.56 20.1067 7.28 21.92 4.56C23.7867 1.84 26.48 0.213333 30 0L31.2 2.88C29.0667 3.36 27.3333 4.4 26 6C24.72 7.6 24.08 9.44 24.08 11.52H28.8V24H19.2Z" fill="currentColor"/>
    </svg>
  );
}

// ─── Testimonials Section ──────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const [headingKey, setHeadingKey] = useState(0);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const VISIBLE = 3;
  const maxIndex = TESTIMONIALS.length - VISIBLE;

  useEffect(() => {
    if (headIn) setHeadingKey((k) => k + 1);
  }, [headIn]);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ══ ROOT ══════════════════════════════════════════════════════ */
        .tm-root {
          font-family: 'Outfit', sans-serif;
          background: ${B.white};
          width: 100%;
          overflow: hidden;
          color: ${B.charcoal};
          padding: 90px 0 100px;
        }

        /* ══ HEADER ROW ════════════════════════════════════════════════ */
        .tm-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          padding: 0 7vw 56px;
          flex-wrap: wrap;
        }

        .tm-header-left { flex: 1; min-width: 260px; }

        /* ── Eyebrow — same as AboutSection ── */
        .tm-eyebrow-inline {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 18px;
        }
        .tm-eyebrow-dash {
          display: block; width: 32px; height: 2px;
          background: ${B.teal}; border-radius: 2px; flex-shrink: 0;
        }
        .tm-eyebrow-text {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: ${B.teal};
        }

        /* ── Heading ── */
        .tm-heading-wrap { overflow: visible; padding: 4px 0 0; }
        .tm-heading-line {
          display: block;
          font-family: 'Outfit', sans-serif !important;
          font-size: clamp(32px, 4vw, 56px) !important;
          font-weight: 800 !important;
          line-height: 1.10 !important;
          letter-spacing: -0.025em !important;
          color: ${B.charcoal} !important;
          overflow: visible !important;
          padding-bottom: 4px !important;
        }
        .tm-heading-accent {
          color: ${B.teal} !important;
        }

        /* ── Sub copy ── */
        .tm-sub {
          font-size: 14.5px; font-weight: 400; color: #777;
          line-height: 1.75; margin: 16px 0 0; max-width: 400px;
        }

        /* ── Arrow buttons ── */
        .tm-arrows {
          display: flex; gap: 10px; align-items: center;
          flex-shrink: 0; padding-bottom: 4px;
        }
        .tm-arrow {
          all: unset; cursor: pointer;
          width: 44px; height: 44px; border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.18);
          display: flex; align-items: center; justify-content: center;
          color: ${B.charcoal};
          transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .tm-arrow:hover {
          border-color: ${B.teal};
          background: ${B.teal};
          color: ${B.white};
          transform: scale(1.06);
        }
        .tm-arrow-disabled {
          opacity: 0.32; pointer-events: none;
        }

        /* ══ TRACK WRAPPER ═════════════════════════════════════════════ */
        .tm-track-outer {
          padding: 0 7vw;
          overflow: hidden;
        }

        .tm-track {
          display: flex;
          gap: 24px;
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        /* ══ CARD ══════════════════════════════════════════════════════ */
        .tm-card {
          flex: 0 0 calc((100% - 48px) / 3);
          background: ${B.offwhite};
          border-radius: 20px;
          padding: 36px 32px 32px;
          display: flex; flex-direction: column;
          border: 1px solid ${B.border};
          position: relative;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
        }
        .tm-card-in {
          animation: tmCardUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes tmCardUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .tm-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(45,191,191,0.10), 0 4px 16px rgba(0,0,0,0.06);
          border-color: rgba(45,191,191,0.25);
        }

        /* Teal accent top bar */
        .tm-card::before {
          content: '';
          position: absolute; top: 0; left: 32px; right: 32px;
          height: 2px; border-radius: 0 0 2px 2px;
          background: ${B.teal};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .tm-card:hover::before { transform: scaleX(1); }

        /* ── Quote icon ── */
        .tm-quote-icon {
          color: ${B.teal};
          opacity: 0.18;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        /* ── Quote text ── */
        .tm-quote {
          font-size: 14.5px; font-weight: 400; color: #555;
          line-height: 1.80; margin: 0 0 auto;
          flex: 1;
        }
        .tm-quote-highlight {
          color: ${B.charcoal}; font-weight: 600;
          font-style: italic;
        }

        /* ── Divider ── */
        .tm-divider {
          width: 100%; height: 1px;
          background: ${B.border};
          margin: 24px 0 20px;
          flex-shrink: 0;
        }

        /* ── Author ── */
        .tm-author {
          display: flex; align-items: center; gap: 12px;
          flex-shrink: 0;
        }
        .tm-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          object-fit: cover; flex-shrink: 0;
          border: 2px solid rgba(45,191,191,0.25);
          background: ${B.teal}22;
        }
        /* Fallback avatar */
        .tm-avatar-fallback {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, ${B.teal} 0%, #178080 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700; color: white;
          flex-shrink: 0;
        }
        .tm-author-info { display: flex; flex-direction: column; gap: 2px; }
        .tm-author-name {
          font-size: 14px; font-weight: 700; color: ${B.charcoal};
          line-height: 1.2;
        }
        .tm-author-role {
          font-size: 11px; font-weight: 500; color: ${B.gray};
          letter-spacing: 0.04em;
        }

        /* ── Rating dots ── */
        .tm-rating {
          margin-left: auto; display: flex; gap: 3px; align-items: center;
        }
        .tm-star {
          width: 12px; height: 12px;
          color: #F5A623;
        }

        /* ══ DOTS ══════════════════════════════════════════════════════ */
        .tm-dots {
          display: flex; justify-content: center; gap: 8px;
          margin-top: 44px;
        }
        .tm-dot {
          all: unset; cursor: pointer;
          width: 6px; height: 6px; border-radius: 999px;
          background: rgba(0,0,0,0.14);
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1), background 0.25s ease;
        }
        .tm-dot-active {
          width: 24px;
          background: ${B.teal};
        }

        /* ══ RESPONSIVE ════════════════════════════════════════════════ */
        @media (max-width: 960px) {
          .tm-card { flex: 0 0 calc((100% - 24px) / 2); }
        }
        @media (max-width: 600px) {
          .tm-root { padding: 64px 0 72px; }
          .tm-header { padding: 0 6vw 40px; }
          .tm-track-outer { padding: 0 6vw; }
          .tm-card { flex: 0 0 85vw; }
          .tm-dots { margin-top: 32px; }
        }
      `}</style>

      <section className="tm-root">

        {/* ── HEADER ── */}
        <div ref={headRef} className="tm-header">
          <div className="tm-header-left">
            <div className="tm-eyebrow-inline">
              <span className="tm-eyebrow-dash" />
              <span className="tm-eyebrow-text">Customer Stories</span>
            </div>
            <div className="tm-heading-wrap">
              {headIn && (
                <>
                  <ShuffleText
                    key={`tm-h1-${headingKey}`}
                    text="Voices of"
                    tag="span"
                    className="tm-heading-line"
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
                    key={`tm-h2-${headingKey}`}
                    text="Trust."
                    tag="span"
                    className="tm-heading-line tm-heading-accent"
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
            <p className="tm-sub">
              Don't just take our word for it. See how we've helped thousands of families protect what matters most.
            </p>
          </div>

          {/* Arrow buttons — same circular style */}
          <div className="tm-arrows">
            <ArrowBtn dir="prev" onClick={prev} disabled={current === 0} />
            <ArrowBtn dir="next" onClick={next} disabled={current >= maxIndex} />
          </div>
        </div>

        {/* ── CARDS TRACK ── */}
        <div className="tm-track-outer">
          <div
            ref={trackRef}
            className="tm-track"
            style={{ transform: `translateX(calc(-${current} * (100% / ${VISIBLE} + 8px)))` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard
                key={t.name}
                data={t}
                index={i}
                inView={headIn}
              />
            ))}
          </div>
        </div>

        {/* ── DOTS ── */}
        <div className="tm-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`tm-dot${current === i ? " tm-dot-active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </section>
    </>
  );
}

// ─── Card sub-component ────────────────────────────────────────────────────────
function TestimonialCard({ data, index, inView }: {
  data: typeof TESTIMONIALS[0];
  index: number;
  inView: boolean;
}) {
  const firstWord = data.highlight;
  const rest = data.quote.slice(firstWord.length);

  return (
    <div
      className={`tm-card${inView ? " tm-card-in" : ""}`}
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      <QuoteIcon />

      <p className="tm-quote">
        <span className="tm-quote-highlight">{firstWord}</span>
        {rest}
      </p>

      <div className="tm-divider" />

      <div className="tm-author">
        {/* Avatar with fallback initial */}
        <div className="tm-avatar-fallback" aria-hidden="true">
          {data.name.charAt(0)}
        </div>
        <div className="tm-author-info">
          <span className="tm-author-name">{data.name}</span>
          <span className="tm-author-role">{data.role}</span>
        </div>
        {/* 5-star rating */}
        <div className="tm-rating" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="tm-star" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0.5L7.545 4.09L11.427 4.635L8.713 7.28L9.382 11.145L6 9.315L2.618 11.145L3.287 7.28L0.573 4.635L4.455 4.09L6 0.5Z"/>
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}