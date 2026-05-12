"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
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

// ─── GIF Map ──────────────────────────────────────────────────────────────────
const GIF_MAP: Record<string, string> = {
  bike:       "/icon-gif/Bike.gif",
  car:        "/icon-gif/Car moving.gif",
  health:     "/icon-gif/Insurance.gif",
  term:       "/icon-gif/term.gif",
  investment: "/icon-gif/Invest.gif",
  child:      "/icon-gif/child.gif",
  pension:    "/icon-gif/insurance (1).gif",
  travel:     "/icon-gif/travel.gif",
  home:       "/icon-gif/home.gif",
  business:   "/icon-gif/business.gif",
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

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ cat, index, inView }: {
  cat: typeof CATEGORIES[0]; index: number; inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const gifSrc = GIF_MAP[cat.id];

  const handleClick = () => {
    router.push(`/insurance/${cat.id}`);
  };

  return (
    <div
      className={`qc-card${inView ? " qc-card-in" : ""}`}
      style={{
        animationDelay: inView ? `${index * 0.07}s` : "0s",
        "--card-accent": cat.accent,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div className="qc-icon-wrap" style={{ background: cat.bg }}>
        <div className={`qc-icon-shimmer${hovered ? " qc-icon-shimmer-in" : ""}`} />
        {gifSrc && (
          <img
            src={gifSrc}
            alt={cat.label}
            className="qc-icon-img"
            draggable={false}
          />
        )}
        <span className="qc-icon-dot" style={{ background: cat.accent }} />
      </div>
      <div className="qc-label-wrap">
        <span className="qc-label-top">{cat.label}</span>
        <span className="qc-label-sub">{cat.sublabel}</span>
      </div>
      <div className="qc-card-line" style={{ background: cat.accent }} />
    </div>
  );
}

// ─── Card Track ───────────────────────────────────────────────────────────────
function CardTrack({ inView }: { inView: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <div className="qc-track-outer">
      <button
        className={`qc-arrow qc-arrow-left${canLeft ? " qc-arrow-visible" : ""}`}
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div ref={trackRef} className="qc-track">
        {CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.id} cat={cat} index={i} inView={inView} />
        ))}
      </div>
      <button
        className={`qc-arrow qc-arrow-right${canRight ? " qc-arrow-visible" : ""}`}
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .qc-root {
          font-family: 'Outfit', sans-serif;
          background: ${B.white};
          width: 100%; overflow: hidden;
          padding: 96px 0 80px;
          position: relative;
        }
        .qc-root::before {
          content:''; position:absolute; top:-60px; right:-80px;
          width:520px; height:520px; border-radius:50%;
          background:radial-gradient(circle,rgba(45,191,191,0.07) 0%,transparent 70%);
          pointer-events:none; z-index:0;
        }
        .qc-root::after {
          content:''; position:absolute; bottom:-40px; left:-60px;
          width:360px; height:360px; border-radius:50%;
          background:radial-gradient(circle,rgba(232,80,58,0.05) 0%,transparent 70%);
          pointer-events:none; z-index:0;
        }

        /* Header */
        .qc-header {
          padding:0 9vw; margin-bottom:52px;
          display:flex; align-items:flex-end; justify-content:space-between;
          gap:32px; flex-wrap:wrap; position:relative; z-index:1;
        }
        .qc-eyebrow {
          display:inline-flex; align-items:center; gap:10px;
          font-size:11px; font-weight:700; letter-spacing:.14em;
          text-transform:uppercase; color:${B.teal}; margin-bottom:16px;
        }
        .qc-eyebrow::before {
          content:''; display:block; width:28px; height:2px;
          background:${B.teal}; border-radius:999px;
        }
        .qc-heading-wrap { padding:2px 0 12px; overflow:visible; clip-path:none; }
        .qc-heading-line {
          display:block;
          font-family:'Playfair Display',serif !important;
          font-size:clamp(36px,4.4vw,60px) !important;
          font-weight:800 !important; line-height:1.1 !important;
          letter-spacing:-0.01em !important; color:${B.charcoal} !important;
          overflow:visible !important; padding-bottom:6px !important;
        }
        .qc-heading-accent { color:${B.teal} !important; font-style:italic !important; }
        .qc-header-right { display:flex; align-items:center; gap:12px; flex-shrink:0; padding-bottom:10px; }
        @media(max-width:680px){
          .qc-header{flex-direction:column;align-items:flex-start;}
          .qc-header-right{padding-bottom:0;}
        }

        /* Track */
        .qc-track-outer { position:relative; padding:0 9vw; }
        .qc-track-outer::before,.qc-track-outer::after {
          content:''; position:absolute; top:0; bottom:0; width:80px; z-index:2; pointer-events:none;
        }
        .qc-track-outer::before { left:0; background:linear-gradient(to right,${B.white},transparent); }
        .qc-track-outer::after  { right:0; background:linear-gradient(to left,${B.white},transparent); }
        .qc-track {
          display:flex; gap:18px;
          overflow-x:auto; scroll-snap-type:x mandatory;
          -webkit-overflow-scrolling:touch;
          padding:12px 4px 28px; scrollbar-width:none;
        }
        .qc-track::-webkit-scrollbar { display:none; }

        /* Arrows */
        .qc-arrow {
          all:unset; position:absolute; top:50%; transform:translateY(-50%);
          width:42px; height:42px; border-radius:50%;
          background:${B.white}; border:1px solid ${B.border};
          box-shadow:0 4px 20px rgba(0,0,0,.10);
          display:flex; align-items:center; justify-content:center;
          color:${B.charcoal}; cursor:pointer; z-index:10;
          opacity:0; pointer-events:none;
          transition:opacity .3s ease, transform .3s ease, box-shadow .3s ease, background .3s ease, color .3s;
        }
        .qc-arrow-visible { opacity:1; pointer-events:auto; }
        .qc-arrow-left  { left:calc(9vw - 21px); }
        .qc-arrow-right { right:calc(9vw - 21px); }
        .qc-arrow:hover {
          background:${B.teal}; color:#fff; border-color:${B.teal};
          box-shadow:0 6px 24px rgba(45,191,191,.30);
          transform:translateY(-50%) scale(1.08);
        }

        /* Card */
        .qc-card {
          flex:0 0 auto; width:140px;
          display:flex; flex-direction:column; align-items:center; gap:14px;
          scroll-snap-align:start; cursor:pointer;
          opacity:0; transform:translateY(24px);
          position:relative;
        }
        .qc-card-in { animation:qcCardIn 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes qcCardIn { to { opacity:1; transform:translateY(0); } }

        /* Hover lift on the whole card */
        .qc-card:hover { transform:translateY(-4px); }
        .qc-card-in:hover { animation:none; opacity:1; transform:translateY(-4px); }

        /* Icon bubble */
        .qc-icon-wrap {
          width:128px; height:128px; border-radius:28px;
          position:relative; display:flex; align-items:center; justify-content:center;
          border:1.5px solid rgba(0,0,0,0.06);
          box-shadow:0 4px 16px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.8);
          overflow:hidden;
          transition:transform .45s cubic-bezier(0.22,1,0.36,1), box-shadow .45s ease;
        }
        .qc-card:hover .qc-icon-wrap {
          transform:translateY(-6px) scale(1.04);
          box-shadow:0 16px 40px rgba(0,0,0,.12), 0 4px 12px var(--card-accent,${B.teal})44, inset 0 1px 0 rgba(255,255,255,.8);
        }

        /* Shimmer */
        .qc-icon-shimmer {
          position:absolute; inset:0;
          background:linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.55) 50%, rgba(255,255,255,0) 70%);
          background-size:200% 200%; background-position:-100% -100%;
          transition:background-position .6s ease;
          pointer-events:none; z-index:1; border-radius:28px;
        }
        .qc-icon-shimmer-in { background-position:200% 200%; }

        /* GIF image */
        .qc-icon-img {
          width:80px; height:80px;
          object-fit:contain;
          position:relative; z-index:2;
          display:block;
          image-rendering:auto;
        }

        /* Accent dot */
        .qc-icon-dot {
          position:absolute; top:12px; right:12px;
          width:8px; height:8px; border-radius:50%;
          opacity:0; transform:scale(0);
          transition:opacity .3s ease, transform .3s ease; z-index:3;
        }
        .qc-card:hover .qc-icon-dot { opacity:1; transform:scale(1); }

        /* Label */
        .qc-label-wrap { display:flex; flex-direction:column; align-items:center; gap:1px; text-align:center; }
        .qc-label-top {
          font-family:'Outfit',sans-serif; font-size:14px; font-weight:600;
          color:${B.charcoal}; line-height:1.3; transition:color .25s ease;
        }
        .qc-label-sub {
          font-family:'Outfit',sans-serif; font-size:13px; font-weight:400;
          color:${B.gray}; line-height:1.3;
        }
        .qc-card:hover .qc-label-top { color:var(--card-accent,${B.teal}); }

        /* Bottom accent line */
        .qc-card-line {
          position:absolute; bottom:-2px; left:50%; width:0; height:2px;
          border-radius:999px; transform:translateX(-50%);
          transition:width .4s cubic-bezier(0.77,0,0.175,1);
        }
        .qc-card:hover .qc-card-line { width:40px; }

        /* Buttons */
        .qc-uv-btn {
          all:unset; position:relative; display:inline-flex;
          height:50px; align-items:center; border-radius:9999px; padding:0 30px;
          font-family:'Outfit',sans-serif; font-size:14px; font-weight:600;
          color:#fff; letter-spacing:.01em; cursor:pointer; user-select:none;
        }
        .qc-uv-bg {
          overflow:hidden; border-radius:9999px; position:absolute; inset:0;
          background:var(--btn-bg); box-shadow:0 4px 20px rgba(0,0,0,.14);
          transition:transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .qc-uv-btn:hover .qc-uv-bg { transform:scale(1.04); }
        .qc-uv-layers {
          display:block; position:absolute; left:50%; top:-60%; transform:translate(-50%);
          aspect-ratio:1/1; width:max(200%,10rem);
        }
        .qc-uv-layer {
          display:block; border-radius:9999px; position:absolute; inset:0; transform:scale(0);
        }
        .qc-uv-btn:hover .qc-uv-layer { transition:transform 1.3s cubic-bezier(0.19,1,0.22,1),opacity .3s linear; }
        .qc-uv-btn:hover .qc-uv-l1 { transform:scale(1); }
        .qc-uv-btn:hover .qc-uv-l2 { transition-delay:.1s; transform:scale(1); }
        .qc-uv-btn:hover .qc-uv-l3 { transition-delay:.2s; transform:scale(1); }
        .qc-uv-inner { position:relative; display:block; pointer-events:none; }
        .qc-uv-static,.qc-uv-hover { display:block; pointer-events:none; }
        .qc-uv-hover { position:absolute; top:0; left:0; opacity:0; transform:translateY(70%); }
        .qc-uv-btn:hover .qc-uv-static { opacity:0; transform:translateY(-70%); transition:transform 1.4s cubic-bezier(0.19,1,0.22,1),opacity .3s linear; }
        .qc-uv-btn:hover .qc-uv-hover  { opacity:1; transform:translateY(0); transition:transform 1.4s cubic-bezier(0.19,1,0.22,1),opacity 1.4s cubic-bezier(0.19,1,0.22,1); }

        .qc-uv-ghost {
          all:unset; position:relative; display:inline-flex;
          height:50px; align-items:center; border-radius:9999px; padding:0 24px;
          font-family:'Outfit',sans-serif; font-size:14px; font-weight:500;
          color:${B.charcoal}; cursor:pointer; user-select:none;
        }
        .qc-uv-ghost-bg {
          overflow:hidden; border-radius:9999px; position:absolute; inset:0;
          background:transparent; border:1.5px solid rgba(26,26,26,.20);
          transition:transform 1.8s cubic-bezier(0.19,1,0.22,1),border-color .3s;
        }
        .qc-uv-ghost:hover .qc-uv-ghost-bg { transform:scale(1.04); border-color:${B.teal}; }
        .qc-uv-ghost .qc-uv-layers {
          display:block; position:absolute; left:50%; top:-60%; transform:translate(-50%);
          aspect-ratio:1/1; width:max(200%,10rem);
        }
        .qc-uv-ghost:hover .qc-uv-layer { transition:transform 1.3s cubic-bezier(0.19,1,0.22,1); }
        .qc-uv-ghost:hover .qc-uv-l1 { transform:scale(1); }
        .qc-uv-ghost:hover .qc-uv-l2 { transition-delay:.1s; transform:scale(1); }
        .qc-uv-ghost:hover .qc-uv-l3 { transition-delay:.2s; transform:scale(1); }
        .qc-uv-ghost:hover .qc-uv-static { opacity:0; transform:translateY(-70%); transition:transform 1.4s cubic-bezier(0.19,1,0.22,1),opacity .3s linear; }
        .qc-uv-ghost:hover .qc-uv-hover  { opacity:1; transform:translateY(0); transition:transform 1.4s cubic-bezier(0.19,1,0.22,1),opacity 1.4s cubic-bezier(0.19,1,0.22,1); }

        /* Bottom strip */
        .qc-strip {
          margin:48px 9vw 0; padding:20px 28px;
          background:${B.offwhite}; border-radius:16px; border:1px solid ${B.border};
          display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap;
          position:relative; z-index:1;
        }
        .qc-strip-left { display:flex; align-items:center; gap:12px; }
        .qc-strip-icon { font-size:28px; line-height:1; flex-shrink:0; }
        .qc-strip-title { display:block; font-size:15px; font-weight:600; color:${B.charcoal}; }
        .qc-strip-sub   { display:block; font-size:13px; color:${B.gray}; margin-top:2px; }
        .qc-strip-pills { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .qc-strip-pill {
          font-family:'Outfit',sans-serif; font-size:12px; font-weight:600;
          padding:5px 14px; border-radius:999px;
          background:${B.white}; border:1px solid ${B.border}; color:${B.charcoal}; letter-spacing:.03em;
          transition:border-color .25s, color .25s, box-shadow .25s; cursor:pointer;
        }
        .qc-strip-pill:hover { border-color:${B.teal}; color:${B.teal}; box-shadow:0 0 0 3px rgba(45,191,191,.12); }
      `}</style>

      <section className="qc-root">
        <div ref={sectionRef} className="qc-header">
          <div>
            <p className="qc-eyebrow">Insurance Products</p>
            <div className="qc-heading-wrap">
              {inView && (
                <>
                  <ShuffleText
                    key={`qc-h1-${headingKey}`}
                    text="Get a quote or"
                    tag="span"
                    className="qc-heading-line"
                    shuffleDirection="right"
                    duration={0.48} stagger={0.032}
                    animationMode="evenodd"
                    triggerOnce={false} triggerOnHover={false}
                    rootMargin="0px" threshold={0}
                  />
                  <ShuffleText
                    key={`qc-h2-${headingKey}`}
                    text="compare plans."
                    tag="span"
                    className="qc-heading-line qc-heading-accent"
                    shuffleDirection="right"
                    duration={0.48} stagger={0.032}
                    animationMode="evenodd"
                    triggerOnce={false} triggerOnHover={false}
                    rootMargin="0px" threshold={0}
                  />
                </>
              )}
            </div>
          </div>
          <div className="qc-header-right">
            <AnimatedButton label="Get Free Quote →" bg={B.teal} layers={["#17f1d1","#a374ff",B.teal]}/>
            <GhostButton label="Compare All"/>
          </div>
        </div>

        <CardTrack inView={inView}/>

        <div className="qc-strip">
          <div className="qc-strip-left">
            <span className="qc-strip-icon">⚡</span>
            <div>
              <span className="qc-strip-title">Instant policy issuance</span>
              <span className="qc-strip-sub">Get your policy document in under 5 minutes — no paperwork.</span>
            </div>
          </div>
          <div className="qc-strip-pills">
            {["Zero Hidden Fees","50+ Insurers","Expert Support 24/7","Cashless Claims"].map((t) => (
              <span key={t} className="qc-strip-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}