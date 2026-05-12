"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ShuffleText from "./Shuffletext";

// ─── TransIndia Brand Palette ─────────────────────────────────────────────────
const B = {
  coral:    "#E8503A",
  coral50:  "#FADFDB",
  coral100: "#F3ABA0",
  teal:     "#2DBFBF",
  teal100:  "#9AE0E0",
  teal200:  "#BBEAEA",
  teal400:  "#EEF9F9",
  charcoal: "#1A1A1A",
  gray:     "#B5B5B5",
  offwhite: "#F4F4EF",
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface Slide {
  id: number;
  badge: string;
  headline: string;
  accentLine: string;
  accentColor: string;
  sub: string;
  cta: string;
  ctaBg: string;
  ctaLayers: [string, string, string];
  videoSrc: string;
  poster?: string;
  overlayOpacity?: number;
}

// ─── Slide Data ───────────────────────────────────────────────────────────────

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: "🏆 India's Most Trusted Platform",
    headline: "Insurance",
    accentLine: "made simple",
    accentColor: B.teal,
    sub: "Compare 50+ insurers in seconds. Right experts, smart tech — zero jargon.",
    cta: "Get a Free Quote",
    ctaBg: B.teal,
    ctaLayers: ["#17f1d1", "#a374ff", B.teal],
    videoSrc: "/videos/8798153-uhd_4096_2160_25fps.mp4",
    poster: "https://your-cdn.com/slide1-poster.jpg",
    overlayOpacity: 0.5,
  },
  {
    id: 2,
    badge: "🚗 Best Car & Bike Insurance Deals",
    headline: "Drive safe,",
    accentLine: "insure smarter",
    accentColor: B.coral,
    sub: "Zero-depreciation, cashless garages & instant claim support. On road in minutes.",
    cta: "Compare Motor Plans",
    ctaBg: B.coral,
    ctaLayers: ["#a374ff", "#17f1d1", B.coral],
    videoSrc: "/videos/GettyImages-951707120.mp4",
    poster: "https://your-cdn.com/slide2-poster.jpg",
    overlayOpacity: 0.48,
  },
  {
    id: 3,
    badge: "❤️ Health Cover for Every Family",
    headline: "Your health,",
    accentLine: "fully covered",
    accentColor: "#5CE0C6",
    sub: "Individual, floater & senior plans from ₹500/month. 10,000+ network hospitals.",
    cta: "Explore Health Plans",
    ctaBg: B.teal,
    ctaLayers: ["#17f1d1", "#a374ff", "#5CE0C6"],
    videoSrc: "https://your-cdn.com/slide3.mp4",
    poster: "https://your-cdn.com/slide3-poster.jpg",
    overlayOpacity: 0.5,
  },
  {
    id: 4,
    badge: "📈 Smart Investment + Tax Saving",
    headline: "Grow wealth,",
    accentLine: "save tax smartly",
    accentColor: "#F9A85D",
    sub: "ULIPs, endowment & money-back plans. Save up to ₹1.5L under Section 80C.",
    cta: "Start Investing",
    ctaBg: B.coral,
    ctaLayers: ["#ffd074", "#17f1d1", B.coral],
    videoSrc: "https://your-cdn.com/slide4.mp4",
    poster: "https://your-cdn.com/slide4-poster.jpg",
    overlayOpacity: 0.52,
  },
];

// ─── Uiverse Animated Button ──────────────────────────────────────────────────

function AnimatedButton({
  label, bg, layers,
}: {
  label: string; bg: string; layers: [string, string, string];
}) {
  return (
    <button className="ti-uv-btn" style={{ "--btn-bg": bg } as React.CSSProperties}>
      <span className="ti-uv-bg">
        <span className="ti-uv-layers">
          <span className="ti-uv-layer ti-uv-l1" style={{ background: layers[0] }} />
          <span className="ti-uv-layer ti-uv-l2" style={{ background: layers[1] }} />
          <span className="ti-uv-layer ti-uv-l3" style={{ background: layers[2] }} />
        </span>
      </span>
      <span className="ti-uv-inner">
        <span className="ti-uv-static">{label}</span>
        <span className="ti-uv-hover">{label}</span>
      </span>
    </button>
  );
}

function GhostButton({ label }: { label: string }) {
  return (
    <button className="ti-uv-ghost">
      <span className="ti-uv-ghost-bg">
        <span className="ti-uv-layers">
          <span className="ti-uv-layer ti-uv-l1" style={{ background: "rgba(255,255,255,0.4)" }} />
          <span className="ti-uv-layer ti-uv-l2" style={{ background: "rgba(255,255,255,0.25)" }} />
          <span className="ti-uv-layer ti-uv-l3" style={{ background: "rgba(255,255,255,0.15)" }} />
        </span>
      </span>
      <span className="ti-uv-inner">
        <span className="ti-uv-static">{label}</span>
        <span className="ti-uv-hover">{label}</span>
      </span>
    </button>
  );
}

// ─── Slide Panel ──────────────────────────────────────────────────────────────

const SHUFFLE_INTERVAL = 5000;

function SlidePanel({ slide, active, index }: { slide: Slide; active: boolean; index: number }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [shuffleKey, setShuffleKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const vid = vidRef.current;
    if (!vid) return;
    if (active) { vid.currentTime = 0; vid.play().catch(() => {}); }
    else vid.pause();
  }, [active]);

  useEffect(() => {
    if (!active) {
      if (timerRef.current) clearInterval(timerRef.current);
      setShuffleKey(0);
      return;
    }
    timerRef.current = setInterval(() => setShuffleKey((k) => k + 1), SHUFFLE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active]);

  const overlay = slide.overlayOpacity ?? 0.45;

  return (
    <div className="ti-slide">
      <video
        ref={vidRef} className="ti-video-bg"
        src={slide.videoSrc} poster={slide.poster}
        muted loop playsInline
        preload={active ? "auto" : "none"}
      />
      <div className="ti-overlay" style={{
        background: `linear-gradient(110deg,
          rgba(10,10,10,${overlay + 0.18}) 0%,
          rgba(10,10,10,${overlay}) 48%,
          rgba(10,10,10,${Math.max(overlay - 0.2, 0)}) 100%)`,
      }} />
      <div className={`ti-content${active ? " ti-content-in" : ""}`}>
        <span className="ti-badge">{slide.badge}</span>

        {/* ── ShuffleText headlines ── */}
        <div className="ti-headline-wrap">
          {active && (
            <>
              <ShuffleText
                key={`h-${index}-${slide.id}-${shuffleKey}`}
                text={slide.headline}
                tag="span"
                className="ti-shuffle-line ti-shuffle-white"
                shuffleDirection="right"
                duration={0.45}
                stagger={0.04}
                animationMode="evenodd"
                triggerOnce={false}
                triggerOnHover={false}
                rootMargin="0px"
                threshold={0}
              />
              <ShuffleText
                key={`a-${index}-${slide.id}-${shuffleKey}`}
                text={slide.accentLine}
                tag="span"
                className="ti-shuffle-line ti-shuffle-accent"
                style={{ color: slide.accentColor }}
                shuffleDirection="right"
                duration={0.45}
                stagger={0.04}
                animationMode="evenodd"
                triggerOnce={false}
                triggerOnHover={false}
                rootMargin="0px"
                threshold={0}
              />
            </>
          )}
        </div>

        <p className="ti-sub">{slide.sub}</p>
        <div className="ti-btns">
          <AnimatedButton label={slide.cta} bg={slide.ctaBg} layers={slide.ctaLayers} />
          <GhostButton label="Compare Plans →" />
        </div>
      </div>
    </div>
  );
}

// ─── Vertical Nav ─────────────────────────────────────────────────────────────

function VerticalNav({ total, current, accentColor, onChange }: {
  total: number; current: number; accentColor: string; onChange: (i: number) => void;
}) {
  return (
    <div className="ti-vnav">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={`ti-vline${i === current ? " ti-vline-active" : ""}`}
          style={i === current ? ({ "--accent": accentColor } as React.CSSProperties) : {}}
          onClick={() => onChange(i)}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

// ─── Auto-advance ─────────────────────────────────────────────────────────────

function useAutoAdvance(current: number, total: number, paused: boolean, go: (i: number) => void, interval = 6000) {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (paused) { if (timer.current) clearInterval(timer.current); return; }
    timer.current = setInterval(() => go(current + 1), interval);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [current, paused, go, interval]);
}

// ─── Scroll hook ──────────────────────────────────────────────────────────────

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InsuranceBanner() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const scrolled = useScrolled(60);

  const go = useCallback((i: number) => setCur((i + SLIDES.length) % SLIDES.length), []);
  useAutoAdvance(cur, SLIDES.length, paused, go);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        /* ── Root ── */
        .ti-root {
          font-family:'Outfit',sans-serif;
          width:100%;
          background:${B.offwhite};
          padding:0;
          transition:padding 0.65s cubic-bezier(0.77,0,0.175,1);
        }
        .ti-root.ti-scrolled { padding:20px 20px 0; }

        /* ── Carousel shell ── */
        .ti-carousel {
          position:relative;
          width:100%;
          overflow:hidden;
          border-radius:0px;
          transition:
            border-radius 0.65s cubic-bezier(0.77,0,0.175,1),
            box-shadow    0.65s cubic-bezier(0.77,0,0.175,1);
        }
        .ti-root.ti-scrolled .ti-carousel {
          border-radius:32px;
          box-shadow:0 36px 90px rgba(0,0,0,0.24), 0 8px 28px rgba(0,0,0,0.13);
        }

        .ti-track {
          display:flex;
          transition:transform 0.88s cubic-bezier(0.77,0,0.175,1);
        }

        /* ── Slide ── */
        .ti-slide {
          min-width:100%;
          height:100vh; min-height:600px;
          position:relative;
          display:flex; align-items:center;
          padding:0 9vw;
          overflow:hidden;
          background:#0a0a0a;
        }
        @media(max-width:768px){ .ti-slide { min-height:520px; padding:0 24px; } }

        .ti-video-bg {
          position:absolute; inset:0;
          width:100%; height:100%;
          object-fit:cover; z-index:0;
        }
        .ti-overlay { position:absolute; inset:0; z-index:1; pointer-events:none; }

        /* ── Content ── */
        .ti-content {
          position:relative; z-index:2; max-width:700px;
          opacity:0; transform:translateY(24px);
          transition:opacity .55s .08s ease, transform .55s .08s ease;
        }
        .ti-content-in { opacity:1; transform:translateY(0); }

        .ti-badge {
          display:inline-block;
          background:rgba(255,255,255,.12);
          backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
          border:1px solid rgba(255,255,255,.2);
          border-radius:999px; padding:7px 20px;
          font-family:'Outfit',sans-serif;
          font-size:12px; font-weight:500; letter-spacing:.05em;
          text-transform:uppercase; color:#fff; margin-bottom:28px;
        }

        .ti-headline-wrap {
          display:block; margin-bottom:24px; min-height:180px;
        }

        /* ── HEADING STYLE: Bold Outfit sans-serif (matches AboutSection) ── */
        .ti-shuffle-line {
          display:block;
          font-family:'Outfit', sans-serif !important;
          font-size:clamp(48px, 6.8vw, 92px) !important;
          font-weight:800 !important;
          line-height:1.08 !important;
          letter-spacing:-0.028em !important;
        }
        .ti-shuffle-white { color:#fff !important; }

        /* accent line inherits color from inline style (slide.accentColor) */
        .ti-shuffle-accent { font-style:normal !important; }

        .ti-sub {
          font-family:'Outfit',sans-serif;
          font-size:17px; font-weight:400;
          color:rgba(255,255,255,.78); line-height:1.75;
          margin-bottom:40px; max-width:520px;
        }

        .ti-btns { display:flex; gap:14px; flex-wrap:wrap; align-items:center; }

        /* ── Uiverse Primary Button ── */
        .ti-uv-btn {
          all:unset;
          position:relative; display:inline-flex;
          height:54px; align-items:center;
          border-radius:9999px; padding:0 34px;
          font-family:'Outfit',sans-serif; font-size:15px; font-weight:600;
          color:#fff; letter-spacing:0.01em; cursor:pointer; user-select:none;
        }
        .ti-uv-bg {
          overflow:hidden; border-radius:9999px;
          position:absolute; inset:0;
          background:var(--btn-bg);
          box-shadow:0 4px 24px rgba(0,0,0,.3);
          transition:transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .ti-uv-btn:hover .ti-uv-bg { transform:scale(1.04); }
        .ti-uv-layers {
          display:block; position:absolute;
          left:50%; top:-60%; transform:translate(-50%);
          aspect-ratio:1/1; width:max(200%,10rem);
        }
        .ti-uv-layer {
          display:block; border-radius:9999px;
          position:absolute; inset:0; transform:scale(0);
        }
        .ti-uv-btn:hover .ti-uv-layer { transition:transform 1.3s cubic-bezier(0.19,1,0.22,1), opacity 0.3s linear; }
        .ti-uv-btn:hover .ti-uv-l1 { transform:scale(1); }
        .ti-uv-btn:hover .ti-uv-l2 { transition-delay:0.1s; transform:scale(1); }
        .ti-uv-btn:hover .ti-uv-l3 { transition-delay:0.2s; transform:scale(1); }
        .ti-uv-inner { position:relative; display:block; pointer-events:none; }
        .ti-uv-static, .ti-uv-hover { display:block; pointer-events:none; }
        .ti-uv-hover { position:absolute; top:0; left:0; opacity:0; transform:translateY(70%); }
        .ti-uv-btn:hover .ti-uv-static { opacity:0; transform:translateY(-70%); transition:transform 1.4s cubic-bezier(0.19,1,0.22,1),opacity 0.3s linear; }
        .ti-uv-btn:hover .ti-uv-hover { opacity:1; transform:translateY(0); transition:transform 1.4s cubic-bezier(0.19,1,0.22,1),opacity 1.4s cubic-bezier(0.19,1,0.22,1); }

        /* ── Ghost Button ── */
        .ti-uv-ghost {
          all:unset;
          position:relative; display:inline-flex;
          height:54px; align-items:center;
          border-radius:9999px; padding:0 28px;
          font-family:'Outfit',sans-serif; font-size:15px; font-weight:500;
          color:#fff; cursor:pointer; user-select:none;
        }
        .ti-uv-ghost-bg {
          overflow:hidden; border-radius:9999px;
          position:absolute; inset:0;
          background:rgba(255,255,255,.11);
          border:1.5px solid rgba(255,255,255,.3);
          backdrop-filter:blur(8px);
          transition:transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .ti-uv-ghost:hover .ti-uv-ghost-bg { transform:scale(1.04); }
        .ti-uv-ghost .ti-uv-layers { display:block; position:absolute; left:50%; top:-60%; transform:translate(-50%); aspect-ratio:1/1; width:max(200%,10rem); }
        .ti-uv-ghost:hover .ti-uv-layer { transition:transform 1.3s cubic-bezier(0.19,1,0.22,1); }
        .ti-uv-ghost:hover .ti-uv-l1 { transform:scale(1); }
        .ti-uv-ghost:hover .ti-uv-l2 { transition-delay:0.1s; transform:scale(1); }
        .ti-uv-ghost:hover .ti-uv-l3 { transition-delay:0.2s; transform:scale(1); }
        .ti-uv-ghost:hover .ti-uv-static { opacity:0; transform:translateY(-70%); transition:transform 1.4s cubic-bezier(0.19,1,0.22,1),opacity 0.3s linear; }
        .ti-uv-ghost:hover .ti-uv-hover { opacity:1; transform:translateY(0); transition:transform 1.4s cubic-bezier(0.19,1,0.22,1),opacity 1.4s cubic-bezier(0.19,1,0.22,1); }

        /* ── Vertical nav lines ── */
        .ti-vnav {
          position:absolute; right:22px; top:50%;
          transform:translateY(-50%); z-index:20;
          display:flex; flex-direction:column; gap:9px; align-items:flex-end;
        }
        @media(max-width:640px){ .ti-vnav { right:12px; } }
        .ti-vline {
          display:block; width:2px; height:26px;
          border-radius:999px; background:rgba(255,255,255,.22);
          border:none; cursor:pointer; padding:0;
          transition:height 0.4s cubic-bezier(0.77,0,0.175,1), background 0.35s ease, box-shadow 0.35s ease;
        }
        .ti-vline:hover { background:rgba(255,255,255,.48); height:32px; }
        .ti-vline-active {
          height:60px !important; width:2px !important;
          background:var(--accent, ${B.teal}) !important;
          box-shadow:0 0 10px var(--accent,${B.teal}), 0 0 24px var(--accent,rgba(45,191,191,0.4));
        }

        /* ── Slide counter ── */
        .ti-counter {
          position:absolute; top:28px; right:52px; z-index:20;
          font-size:12px; font-weight:500; letter-spacing:.1em;
          color:rgba(255,255,255,.5); text-transform:uppercase;
          font-family:'Outfit',sans-serif;
        }
      `}</style>

      <div className={`ti-root${scrolled ? " ti-scrolled" : ""}`}>

        {/* ══ CAROUSEL ══════════════════════════════════════════════════════ */}
        <div
          className="ti-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="ti-counter">
            {String(cur + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </div>

          <div className="ti-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
            {SLIDES.map((s, i) => (
              <SlidePanel key={s.id} slide={s} active={i === cur} index={i} />
            ))}
          </div>

          <VerticalNav
            total={SLIDES.length}
            current={cur}
            accentColor={SLIDES[cur].accentColor}
            onChange={setCur}
          />
        </div>

      </div>
    </>
  );
}