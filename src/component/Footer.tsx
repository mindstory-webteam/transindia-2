"use client";

import React, { useState } from "react";

// ─── Brand Palette (matches Navbar & QuoteCompare) ────────────────────────────
const B = {
  coral:    "#E8503A",
  teal:     "#2DBFBF",
  charcoal: "#1A1A1A",
  gray:     "#B5B5B5",
  offwhite: "#F4F4EF",
  white:    "#FFFFFF",
  border:   "rgba(0,0,0,0.07)",
  // Footer dark theme
  dark:     "#0D1117",
  darkCard: "#141B24",
  darkBorder:"rgba(255,255,255,0.07)",
  darkGray: "rgba(255,255,255,0.45)",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const INSURANCE_LINKS = [
  { label: "Life Insurance",   href: "/insurance/term" },
  { label: "Health Insurance", href: "/insurance/health" },
  { label: "Car Insurance",    href: "/insurance/car" },
  { label: "Bike Insurance",   href: "/insurance/bike" },
  { label: "Travel Insurance", href: "/insurance/travel" },
  { label: "Home Insurance",   href: "/insurance/home" },
];

const COMPANY_LINKS = [
  { label: "About Us",          href: "/about" },
  { label: "Careers",           href: "/careers" },
  { label: "Privacy Policy",    href: "/privacy" },
  { label: "Terms & Conditions",href: "/terms" },
  { label: "Claims",            href: "/claims" },
  { label: "Support",           href: "/support" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Twitter/X",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
];

// ─── Footer Link with hover underline ────────────────────────────────────────
function FooterLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className="footer-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="footer-link-arrow" style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-6px)" }}>
        →
      </span>
      <span className="footer-link-label" style={{ color: hovered ? B.teal : undefined }}>
        {label}
      </span>
      <span className="footer-link-line" style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }} />
    </a>
  );
}

// ─── Newsletter Form ──────────────────────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail]     = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return submitted ? (
    <div className="footer-nl-success">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.teal} strokeWidth="2.5" strokeLinecap="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>You're in! Watch your inbox.</span>
    </div>
  ) : (
    <form className={`footer-nl-form${focused ? " footer-nl-form-focused" : ""}`} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="footer-nl-input"
        required
      />
      <button type="submit" className="footer-nl-btn">
        <span className="footer-nl-btn-inner">
          <span className="footer-nl-static">Join</span>
          <span className="footer-nl-hover">→</span>
        </span>
      </button>
    </form>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ══ ROOT ══════════════════════════════════════════════════════ */
        .footer-root {
          font-family: 'Outfit', sans-serif;
          background: ${B.dark};
          color: ${B.white};
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background glow — same radial trick as QuoteCompare */
        .footer-root::before {
          content: '';
          position: absolute; top: -120px; left: -80px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(45,191,191,0.07) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .footer-root::after {
          content: '';
          position: absolute; bottom: -60px; right: -60px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,80,58,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* ══ TOP DIVIDER LINE ══════════════════════════════════════════ */
        .footer-topline {
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            ${B.teal}55 30%,
            ${B.teal}55 70%,
            transparent 100%
          );
          position: relative; z-index: 1;
        }

        /* ══ MAIN GRID ═════════════════════════════════════════════════ */
        .footer-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 9vw 48px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.4fr;
          gap: 48px;
          position: relative; z-index: 1;
        }
        @media (max-width: 960px) {
          .footer-main { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 560px) {
          .footer-main { grid-template-columns: 1fr; gap: 32px; padding: 48px 6vw 36px; }
        }

        /* ══ BRAND COLUMN ══════════════════════════════════════════════ */
        .footer-brand { display: flex; flex-direction: column; gap: 18px; }

        .footer-logo-wrap {
          display: flex; align-items: center;
          text-decoration: none;
        }
        .footer-logo-img {
          height: 36px; width: auto; max-width: 140px;
          object-fit: contain; object-position: left center;
          display: block;
          /* Invert to white on dark bg — remove if your logo is already light */
          filter: brightness(0) invert(1);
        }

        .footer-tagline {
          font-size: 13.5px;
          font-weight: 400;
          line-height: 1.65;
          color: ${B.darkGray};
          max-width: 220px;
        }
        .footer-tagline strong {
          color: rgba(255,255,255,0.75);
          font-weight: 600;
        }

        /* ── Social icons ── */
        .footer-socials { display: flex; gap: 10px; margin-top: 4px; }
        .footer-social-btn {
          all: unset;
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid ${B.darkBorder};
          color: ${B.darkGray};
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s;
        }
        .footer-social-btn:hover {
          background: rgba(45,191,191,0.12);
          border-color: rgba(45,191,191,0.45);
          color: ${B.teal};
          transform: translateY(-2px);
        }

        /* ══ COLUMN HEADING ════════════════════════════════════════════ */
        .footer-col { display: flex; flex-direction: column; gap: 18px; }

        .footer-col-heading {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.90);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-col-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: ${B.darkBorder};
          border-radius: 999px;
        }

        /* ══ FOOTER LINKS ══════════════════════════════════════════════ */
        .footer-links-list {
          display: flex; flex-direction: column; gap: 2px;
        }

        .footer-link {
          position: relative;
          display: inline-flex; align-items: center; gap: 6px;
          text-decoration: none;
          padding: 6px 0;
          width: fit-content;
          cursor: pointer;
          overflow: hidden;
        }
        .footer-link-arrow {
          font-size: 12px;
          color: ${B.teal};
          flex-shrink: 0;
          transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.22,1,0.36,1);
          line-height: 1;
        }
        .footer-link-label {
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: ${B.darkGray};
          line-height: 1.2;
          transition: color 0.22s ease;
          position: relative;
        }
        /* Underline sweep */
        .footer-link-line {
          position: absolute; bottom: 3px; left: 0; right: 0;
          height: 1px;
          background: ${B.teal};
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
          border-radius: 999px;
        }

        /* ══ NEWSLETTER ════════════════════════════════════════════════ */
        .footer-nl-desc {
          font-size: 13.5px;
          font-weight: 400;
          line-height: 1.6;
          color: ${B.darkGray};
        }

        .footer-nl-form {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid ${B.darkBorder};
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .footer-nl-form-focused {
          border-color: rgba(45,191,191,0.50);
          box-shadow: 0 0 0 3px rgba(45,191,191,0.10);
        }

        .footer-nl-input {
          all: unset;
          flex: 1;
          padding: 12px 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: ${B.white};
          min-width: 0;
        }
        .footer-nl-input::placeholder { color: rgba(255,255,255,0.30); }

        .footer-nl-btn {
          all: unset;
          display: flex; align-items: center; justify-content: center;
          height: 44px; min-width: 52px;
          background: ${B.teal};
          cursor: pointer;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          transition: background 0.25s;
        }
        .footer-nl-btn:hover { background: #25a8a8; }
        .footer-nl-btn-inner {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 100%;
          overflow: hidden;
        }
        .footer-nl-static,
        .footer-nl-hover {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          display: block;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease;
          padding: 0 16px;
        }
        .footer-nl-hover {
          position: absolute; top: 0; left: 0; right: 0;
          display: flex; align-items: center; justify-content: center;
          height: 100%;
          transform: translateY(100%); opacity: 0;
        }
        .footer-nl-btn:hover .footer-nl-static { transform: translateY(-100%); opacity: 0; }
        .footer-nl-btn:hover .footer-nl-hover  { transform: translateY(0);     opacity: 1; }

        .footer-nl-success {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          background: rgba(45,191,191,0.08);
          border: 1px solid rgba(45,191,191,0.25);
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: ${B.teal};
        }

        /* Trust badges */
        .footer-badges {
          display: flex; flex-direction: column; gap: 8px; margin-top: 4px;
        }
        .footer-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid ${B.darkBorder};
          border-radius: 8px;
          width: fit-content;
          font-family: 'Outfit', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.02em;
        }
        .footer-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: ${B.teal};
          flex-shrink: 0;
          animation: badgePulse 2.4s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
        }

        /* ══ BOTTOM BAR ════════════════════════════════════════════════ */
        .footer-bottom {
          border-top: 1px solid ${B.darkBorder};
          position: relative; z-index: 1;
        }
        .footer-bottom-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 20px 9vw;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
        }
        .footer-copy {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255,255,255,0.28);
          line-height: 1.5;
        }
        .footer-copy span {
          display: block;
          margin-top: 2px;
          font-size: 11px;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.02em;
        }
        .footer-bottom-links {
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
        }
        .footer-bottom-link {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.30);
          text-decoration: none;
          transition: color 0.22s;
        }
        .footer-bottom-link:hover { color: ${B.teal}; }

        /* ── IRDAI badge ── */
        .footer-irdai {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px;
          background: rgba(45,191,191,0.06);
          border: 1px solid rgba(45,191,191,0.18);
          border-radius: 999px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(45,191,191,0.70);
          letter-spacing: 0.03em;
        }
        .footer-irdai-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: ${B.teal};
          flex-shrink: 0;
        }

        @media (max-width: 560px) {
          .footer-bottom-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-topline" />

        {/* ── Main grid ── */}
        <div className="footer-main">

          {/* ── Brand column ── */}
          <div className="footer-brand">
            <a href="/" className="footer-logo-wrap">
              <img
                src="/Logo/Transindia (1).png"
                alt="TransIndia"
                className="footer-logo-img"
              />
            </a>

            <p className="footer-tagline">
              India's most <strong>trusted</strong> insurance comparison platform.
              We bring you the best deals from top insurers.
            </p>

            {/* Trust badges */}
            <div className="footer-badges">
              <span className="footer-badge">
                <span className="footer-badge-dot" />
                IRDAI Licensed Broker
              </span>
              <span className="footer-badge">
                <span className="footer-badge-dot" />
                50+ Insurer Partners
              </span>
            </div>

            {/* Social icons */}
            <div className="footer-socials">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer-social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Insurance column ── */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Insurance</h4>
            <div className="footer-links-list">
              {INSURANCE_LINKS.map((l) => (
                <FooterLink key={l.label} label={l.label} href={l.href} />
              ))}
            </div>
          </div>

          {/* ── Company column ── */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Company</h4>
            <div className="footer-links-list">
              {COMPANY_LINKS.map((l) => (
                <FooterLink key={l.label} label={l.label} href={l.href} />
              ))}
            </div>
          </div>

          {/* ── Newsletter column ── */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Newsletter</h4>
            <p className="footer-nl-desc">
              Get the latest updates on insurance policies, tips, and exclusive offers.
            </p>
            <NewsletterForm />
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <div className="footer-copy">
              © 2024 TransIndia Insurance Broker Private Limited. All rights reserved.
              <span>IRDAI License No: 123456 | CIN: U12345MH2012PTC123456</span>
            </div>

            <div className="footer-bottom-links">
              <span className="footer-irdai">
                <span className="footer-irdai-dot" />
                IRDAI Reg. Broker
              </span>
              <a href="/privacy" className="footer-bottom-link">Privacy</a>
              <a href="/terms"   className="footer-bottom-link">Terms</a>
              <a href="/sitemap" className="footer-bottom-link">Sitemap</a>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}