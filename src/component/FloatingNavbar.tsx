"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
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

const NAV_LINKS = [
  { label: "Insurance",  accent: B.teal },
  { label: "Investment", accent: B.teal },
  { label: "Claims",     accent: B.teal },
  { label: "About",      accent: B.teal },
  { label: "Support",    accent: B.teal },
];

// ─── Nav Link — Outfit font, QuoteCompare pill style ─────────────────────────
function NavLinkItem({
  link,
  active,
  onClick,
}: {
  link: typeof NAV_LINKS[0];
  active: boolean;
  onClick: () => void;
}) {
  const [shuffleKey, setShuffleKey] = useState(0);
  const [isHovered,  setIsHovered]  = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShuffleKey((k) => k + 1);
  };
  const handleMouseLeave = () => setIsHovered(false);

  const isActive = active || isHovered;

  return (
    <li className="nav-link-item">
      <button
        className={`nav-link-btn${isActive ? " nav-link-btn-active" : ""}`}
        style={{ "--link-accent": link.accent } as React.CSSProperties}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {/* pill background — same as qc-pill hover */}
        <span className="nav-link-pill" />
        <ShuffleText
          key={shuffleKey}
          text={link.label}
          tag="span"
          className={`nav-link-text${isActive ? " nav-link-text-active" : ""}`}
          shuffleDirection="right"
          duration={0.38}
          stagger={0.04}
          animationMode="evenodd"
          triggerOnce={false}
          triggerOnHover={false}
          rootMargin="0px"
          threshold={0}
        />
        {/* dot indicator */}
        <span className="nav-link-dot" style={{ background: link.accent }} />
      </button>
    </li>
  );
}

// ─── Drawer Link ──────────────────────────────────────────────────────────────
function DrawerLinkItem({
  link,
  active,
  onClick,
}: {
  link: typeof NAV_LINKS[0];
  active: boolean;
  onClick: () => void;
}) {
  const [shuffleKey, setShuffleKey] = useState(0);
  const [isHovered,  setIsHovered]  = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShuffleKey((k) => k + 1);
  };
  const handleMouseLeave = () => setIsHovered(false);

  const isActive = active || isHovered;

  return (
    <div
      className={`nav-drawer-link${isActive ? " nav-drawer-link-active" : ""}`}
      style={{ "--link-accent": link.accent } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <ShuffleText
        key={shuffleKey}
        text={link.label}
        tag="span"
        className="nav-drawer-link-text"
        shuffleDirection="right"
        duration={0.42}
        stagger={0.045}
        animationMode="evenodd"
        triggerOnce={false}
        triggerOnHover={false}
        rootMargin="0px"
        threshold={0}
      />
      <span className="nav-drawer-link-arrow">→</span>
    </div>
  );
}

// ─── Floating Navbar ──────────────────────────────────────────────────────────
export default function FloatingNavbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [hidden,       setHidden]       = useState(false);
  const [activeLink,   setActiveLink]   = useState<string | null>(null);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [mobileActive, setMobileActive] = useState<string | null>(null);
  const lastY = useRef(0);

  const onScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 60);
    setHidden(y > lastY.current && y > 120);
    lastY.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ══ WRAPPER ═══════════════════════════════════════════════════ */
        .nav-wrap {
          position: fixed;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 100%; max-width: 100%;
          z-index: 1000; padding: 0;
          transition:
            width     0.5s cubic-bezier(0.22,1,0.36,1),
            max-width 0.5s cubic-bezier(0.22,1,0.36,1),
            padding   0.5s cubic-bezier(0.22,1,0.36,1),
            transform 0.45s cubic-bezier(0.22,1,0.36,1),
            opacity   0.35s ease,
            top       0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-wrap-scrolled {
          top: 16px;
          width: calc(100% - 48px);
          max-width: 1200px;
        }
        .nav-wrap-hidden {
          transform: translateX(-50%) translateY(-120%);
          opacity: 0; pointer-events: none;
        }

        /* ══ PILL ══════════════════════════════════════════════════════ */
        .nav-pill {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 32px 0 24px;
          height: 68px; border-radius: 0;
          background: ${B.white};
          border: none; border-bottom: 1px solid ${B.border};
          box-shadow: none;
          transition:
            border-radius 0.5s cubic-bezier(0.22,1,0.36,1),
            background    0.4s ease,
            box-shadow    0.4s ease,
            border        0.4s ease,
            height        0.5s cubic-bezier(0.22,1,0.36,1);
          position: relative; overflow: hidden;
        }
        .nav-pill-scrolled {
          border-radius: 999px; height: 62px;
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 8px 44px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05);
        }

        /* ══ LOGO ══════════════════════════════════════════════════════ */
        .nav-logo {
          display: flex; align-items: center;
          text-decoration: none; flex-shrink: 0; cursor: pointer;
        }
        .nav-logo-img-wrap {
          height: 42px; width: auto; flex-shrink: 0;
          display: flex; align-items: center; justify-content: flex-start;
          background: transparent; border: none; overflow: visible;
        }
        .nav-logo-img {
          height: 42px; width: auto; max-width: 160px;
          object-fit: contain; object-position: left center; display: block;
        }

        /* ══ LINKS LIST ════════════════════════════════════════════════ */
        .nav-links {
          display: flex; align-items: center; gap: 2px;
          list-style: none; margin: 0; padding: 0;
        }
        @media (max-width: 760px) { .nav-links { display: none; } }

        .nav-link-item { position: relative; }

        /* ── The button that wraps each link ── */
        .nav-link-btn {
          all: unset;
          display: flex; align-items: center;
          gap: 0;
          padding: 9px 16px;
          border-radius: 999px;
          cursor: pointer;
          position: relative;
          overflow: visible;
          transition: none;
        }

        /* ── Floating pill bg (same effect as qc-pill hover) ── */
        .nav-link-pill {
          position: absolute; inset: 0; border-radius: 999px;
          background: ${B.white};
          border: 1.5px solid rgba(0,0,0,0.07);
          box-shadow: 0 6px 24px rgba(0,0,0,0.07);
          opacity: 0;
          transform: scale(0.84);
          transition:
            opacity  0.28s ease,
            transform 0.32s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }
        .nav-link-btn-active .nav-link-pill {
          opacity: 1;
          transform: scale(1);
        }

        /* ── Link text — Outfit, same weight as qc-pill-label ── */
        .nav-link-text {
          font-family: 'Outfit', sans-serif !important;
          font-size: 13.5px !important;
          font-weight: 700 !important;
          color: ${B.charcoal} !important;
          letter-spacing: 0em !important;
          font-style: normal !important;
          position: relative; z-index: 1;
          line-height: 1.2 !important;
          display: inline-block !important;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        /* Active / hover state — accent colour like qc-pill-label hover */
        .nav-link-text-active {
          color: var(--link-accent) !important;
        }
        /* Target individual chars rendered by ShuffleText */
        .nav-link-btn-active .nav-link-text .shuffle-char {
          color: var(--link-accent) !important;
        }

        /* ── Dot indicator ── */
        .nav-link-dot {
          position: absolute; bottom: 4px; left: 50%;
          transform: translateX(-50%) scale(0);
          width: 4px; height: 4px; border-radius: 50%;
          transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1);
          z-index: 1;
        }
        .nav-link-btn-active .nav-link-dot {
          transform: translateX(-50%) scale(1);
        }

        /* ══ RIGHT SIDE ════════════════════════════════════════════════ */
        .nav-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

        .nav-ghost {
          all: unset;
          font-family: 'Outfit', sans-serif; font-size: 13.5px; font-weight: 600;
          color: ${B.charcoal}; cursor: pointer;
          padding: 10px 22px; border-radius: 999px;
          border: 1.5px solid rgba(26,26,26,0.18);
          transition: border-color 0.25s, color 0.25s; white-space: nowrap;
        }
        .nav-ghost:hover { border-color: ${B.teal}; color: ${B.teal}; }
        @media (max-width: 560px) { .nav-ghost { display: none; } }

        /* ── CTA button (same layer animation as QuoteCompare) ── */
        .nav-cta {
          all: unset; position: relative; display: inline-flex;
          height: 44px; align-items: center; border-radius: 9999px; padding: 0 24px;
          font-family: 'Outfit', sans-serif; font-size: 13.5px; font-weight: 600;
          color: #fff; cursor: pointer; user-select: none; white-space: nowrap;
        }
        .nav-cta-bg {
          position: absolute; inset: 0; border-radius: 9999px;
          background: ${B.teal};
          box-shadow: 0 4px 18px rgba(45,191,191,0.40); overflow: hidden;
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .nav-cta:hover .nav-cta-bg { transform: scale(1.05); }
        .nav-cta-layers {
          position: absolute; left: 50%; top: -60%; transform: translate(-50%);
          aspect-ratio: 1/1; width: max(200%, 10rem);
        }
        .nav-cta-layer {
          display: block; border-radius: 9999px;
          position: absolute; inset: 0; transform: scale(0);
        }
        .nav-cta:hover .nav-cta-layer { transition: transform 1.3s cubic-bezier(0.19,1,0.22,1); }
        .nav-cta:hover .nav-cta-l1 { transform: scale(1); }
        .nav-cta:hover .nav-cta-l2 { transition-delay: .1s; transform: scale(1); }
        .nav-cta:hover .nav-cta-l3 { transition-delay: .2s; transform: scale(1); }
        .nav-cta-inner {
          position: relative; z-index: 1; display: block;
          overflow: hidden; height: 1.25em;
        }
        .nav-cta-static, .nav-cta-hover {
          display: block;
          transition: transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
        }
        .nav-cta-hover { position: absolute; top: 0; left: 0; transform: translateY(100%); opacity: 0; }
        .nav-cta:hover .nav-cta-static { transform: translateY(-100%); opacity: 0; }
        .nav-cta:hover .nav-cta-hover  { transform: translateY(0); opacity: 1; }

        /* ══ HAMBURGER ═════════════════════════════════════════════════ */
        .nav-burger {
          all: unset;
          width: 42px; height: 42px; border-radius: 50%;
          display: none; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          background: ${B.offwhite}; border: 1px solid ${B.border};
          transition: background 0.25s, border-color 0.25s;
        }
        .nav-burger:hover { background: ${B.white}; border-color: ${B.teal}; }
        @media (max-width: 760px) { .nav-burger { display: flex; } }

        .nav-burger-lines { display: flex; flex-direction: column; gap: 5px; width: 18px; }
        .nav-burger-line {
          height: 1.5px; border-radius: 999px; background: ${B.charcoal};
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease, width 0.3s ease;
        }
        .nav-burger-open .nav-burger-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-burger-open .nav-burger-line:nth-child(2) { opacity: 0; width: 0; }
        .nav-burger-open .nav-burger-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ══ MOBILE DRAWER ═════════════════════════════════════════════ */
        .nav-drawer { position: fixed; inset: 0; z-index: 999; pointer-events: none; }
        .nav-drawer-backdrop {
          position: absolute; inset: 0;
          background: rgba(26,26,26,0.22); backdrop-filter: blur(4px);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none;
        }
        .nav-drawer-open .nav-drawer-backdrop { opacity: 1; pointer-events: auto; }
        .nav-drawer-panel {
          position: absolute; top: 0; right: 0;
          width: min(340px, 88vw); height: 100%;
          background: ${B.white};
          box-shadow: -8px 0 52px rgba(0,0,0,0.10);
          transform: translateX(100%);
          transition: transform 0.44s cubic-bezier(0.22,1,0.36,1);
          display: flex; flex-direction: column;
          pointer-events: auto; overflow-y: auto;
        }
        .nav-drawer-open .nav-drawer-panel { transform: translateX(0); }
        .nav-drawer-open { pointer-events: auto; }

        .nav-drawer-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 22px 18px; border-bottom: 1px solid ${B.border}; flex-shrink: 0;
        }
        .nav-drawer-close {
          all: unset; width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: ${B.offwhite}; border: 1px solid ${B.border};
          cursor: pointer; font-size: 16px; color: ${B.charcoal};
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .nav-drawer-close:hover { border-color: ${B.coral}; color: ${B.coral}; }

        .nav-drawer-links { flex: 1; padding: 8px 0; }
        .nav-drawer-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid ${B.border};
          cursor: pointer; transition: background 0.2s; position: relative; overflow: hidden;
        }
        .nav-drawer-link::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: ${B.teal};
          transform: scaleY(0); transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
          transform-origin: bottom;
        }
        .nav-drawer-link:hover::before,
        .nav-drawer-link-active::before { transform: scaleY(1); }
        .nav-drawer-link:hover { background: ${B.offwhite}; }
        .nav-drawer-link-active { background: ${B.offwhite}; }

        /* ── Drawer link text — Outfit, bold, matching QuoteCompare label ── */
        .nav-drawer-link-text {
          font-family: 'Outfit', sans-serif !important;
          font-size: 22px !important;
          font-weight: 800 !important;
          color: ${B.charcoal} !important;
          letter-spacing: -0.02em !important;
          font-style: normal !important;
          visibility: visible !important;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .nav-drawer-link:hover .nav-drawer-link-text,
        .nav-drawer-link-active .nav-drawer-link-text { color: ${B.teal} !important; }
        .nav-drawer-link:hover .nav-drawer-link-text .shuffle-char,
        .nav-drawer-link-active .nav-drawer-link-text .shuffle-char { color: ${B.teal} !important; }

        .nav-drawer-link-arrow {
          font-size: 18px; color: ${B.gray};
          transition: transform 0.3s ease, color 0.2s;
        }
        .nav-drawer-link:hover .nav-drawer-link-arrow { transform: translateX(4px); color: ${B.teal}; }

        .nav-drawer-footer {
          padding: 20px 22px 36px; display: flex; flex-direction: column; gap: 10px;
          border-top: 1px solid ${B.border}; flex-shrink: 0;
        }
        .nav-drawer-cta {
          all: unset; display: flex; align-items: center; justify-content: center;
          height: 52px; border-radius: 999px; background: ${B.teal};
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600; color: #fff;
          cursor: pointer; box-shadow: 0 4px 20px rgba(45,191,191,0.34);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .nav-drawer-cta:hover { box-shadow: 0 6px 30px rgba(45,191,191,0.50); transform: translateY(-1px); }
        .nav-drawer-ghost {
          all: unset; display: flex; align-items: center; justify-content: center;
          height: 52px; border-radius: 999px;
          border: 1.5px solid rgba(26,26,26,0.18);
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 500; color: ${B.charcoal};
          cursor: pointer; transition: border-color 0.25s, color 0.25s;
        }
        .nav-drawer-ghost:hover { border-color: ${B.teal}; color: ${B.teal}; }
      `}</style>

      {/* ── Navbar ── */}
      <header className={`nav-wrap${scrolled ? " nav-wrap-scrolled" : ""}${hidden ? " nav-wrap-hidden" : ""}`}>
        <nav className={`nav-pill${scrolled ? " nav-pill-scrolled" : ""}`}>

          {/* ── Logo ── */}
          <a className="nav-logo" href="/">
            <div className="nav-logo-img-wrap">
              <img
                src="/Logo/Transindia (1).png"
                alt="TransIndia"
                className="nav-logo-img"
              />
            </div>
          </a>

          {/* ── Desktop links ── */}
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <NavLinkItem
                key={link.label}
                link={link}
                active={activeLink === link.label}
                onClick={() => setActiveLink(activeLink === link.label ? null : link.label)}
              />
            ))}
          </ul>

          {/* ── Right side ── */}
          <div className="nav-right">
            <button className="nav-ghost">Log in</button>
            <button className="nav-cta">
              <span className="nav-cta-bg">
                <span className="nav-cta-layers">
                  <span className="nav-cta-layer nav-cta-l1" style={{ background: "#17f1d1" }} />
                  <span className="nav-cta-layer nav-cta-l2" style={{ background: "#0aa898" }} />
                  <span className="nav-cta-layer nav-cta-l3" style={{ background: B.teal }} />
                </span>
              </span>
              <span className="nav-cta-inner">
                <span className="nav-cta-static">Get Free Quote</span>
                <span className="nav-cta-hover">Get Free Quote</span>
              </span>
            </button>

            <button
              className={`nav-burger${menuOpen ? " nav-burger-open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <div className="nav-burger-lines">
                <div className="nav-burger-line" />
                <div className="nav-burger-line" />
                <div className="nav-burger-line" />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <div className={`nav-drawer${menuOpen ? " nav-drawer-open" : ""}`}>
        <div className="nav-drawer-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="nav-drawer-panel">
          <div className="nav-drawer-header">
            <a className="nav-logo" href="/">
              <div className="nav-logo-img-wrap">
                <img
                  src="/Logo/Transindia (1).png"
                  alt="TransIndia"
                  className="nav-logo-img"
                />
              </div>
            </a>
            <button className="nav-drawer-close" onClick={() => setMenuOpen(false)}>✕</button>
          </div>

          <div className="nav-drawer-links">
            {NAV_LINKS.map((link) => (
              <DrawerLinkItem
                key={link.label}
                link={link}
                active={mobileActive === link.label}
                onClick={() => setMobileActive(mobileActive === link.label ? null : link.label)}
              />
            ))}
          </div>

          <div className="nav-drawer-footer">
            <button className="nav-drawer-cta">Get Free Quote →</button>
            <button className="nav-drawer-ghost">Log in</button>
          </div>
        </div>
      </div>
    </>
  );
}