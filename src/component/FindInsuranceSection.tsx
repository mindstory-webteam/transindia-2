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

// ─── Data ─────────────────────────────────────────────────────────────────────
const NEEDS = [
  { id: "family",     label: "Family",      accent: B.teal,     bg: "linear-gradient(145deg,#eef9f9 0%,#d4f2f2 100%)", icon: "👨‍👩‍👧‍👦", tag: "Popular"   },
  { id: "health",     label: "Health",      accent: B.coral,    bg: "linear-gradient(145deg,#fdf0ee 0%,#faddd9 100%)", icon: "❤️",        tag: null        },
  { id: "invest",     label: "Investment",  accent: "#7C6EF5",  bg: "linear-gradient(145deg,#f3f0ff 0%,#e4deff 100%)", icon: "📈",        tag: "Tax Save"  },
  { id: "retirement", label: "Retirement",  accent: "#5CE0C6",  bg: "linear-gradient(145deg,#edfcf8 0%,#d0f6ee 100%)", icon: "🧓",        tag: null        },
  { id: "travel",     label: "Travel",      accent: "#F9A85D",  bg: "linear-gradient(145deg,#fff8f0 0%,#fdecd6 100%)", icon: "✈️",        tag: null        },
  { id: "business",   label: "Business",    accent: B.charcoal, bg: "linear-gradient(145deg,#f2f2f2 0%,#e2e2e2 100%)", icon: "💼",        tag: null        },
];

const PLANS: Record<string, {
  name: string; price: string; per: string; badge: string | null;
  features: string[]; accent: string; recommended: boolean;
}[]> = {
  family: [
    { name: "Essential",    price: "₹499",  per: "/mo", badge: null,          accent: B.gray,    recommended: false, features: ["₹5L cover","2 adults","Cashless hospitals","Basic OPD"] },
    { name: "Shield Plus",  price: "₹899",  per: "/mo", badge: "Most Bought", accent: B.teal,    recommended: true,  features: ["₹15L cover","2A + 2 kids","1000+ hospitals","OPD + dental","No-claim bonus"] },
    { name: "Elite",        price: "₹1,499",per: "/mo", badge: "Best Value",  accent: "#7C6EF5", recommended: false, features: ["₹50L cover","4 members","Pan-India network","Zero waiting period","International cover"] },
  ],
  health: [
    { name: "Basic Care",   price: "₹299",  per: "/mo", badge: null,          accent: B.gray,    recommended: false, features: ["₹3L cover","Hospitalisation","Day-care","Ambulance"] },
    { name: "Active Plus",  price: "₹649",  per: "/mo", badge: "Most Bought", accent: B.coral,   recommended: true,  features: ["₹10L cover","OPD visits","Mental health","Wellness rewards","Annual health check"] },
    { name: "Total Health", price: "₹1,199",per: "/mo", badge: null,          accent: "#7C6EF5", recommended: false, features: ["₹1Cr cover","Maternity","Critical illness","Global treatment","Premium waiver"] },
  ],
  invest: [
    { name: "Starter SIP",  price: "₹500",  per: "/mo", badge: null,          accent: B.gray,    recommended: false, features: ["Min ₹500/mo","Tax 80C benefit","5yr lock-in","ELSS linked"] },
    { name: "Growth Plan",  price: "₹2,000",per: "/mo", badge: "Best Returns",accent: "#7C6EF5", recommended: true,  features: ["Min ₹2000/mo","₹1.5L 80C limit","ULIP + debt mix","Life cover included","Partial withdrawal"] },
    { name: "Wealth Plus",  price: "₹5,000",per: "/mo", badge: null,          accent: B.teal,    recommended: false, features: ["Unlimited invest","Portfolio advisory","Guaranteed returns","Bonus loyalty","Legacy planning"] },
  ],
  retirement: [
    { name: "Pension Lite", price: "₹1,000",per: "/mo", badge: null,          accent: B.gray,    recommended: false, features: ["Annuity from 60","Fixed monthly","Spouse cover","80CCC benefit"] },
    { name: "NPS Plus",     price: "₹2,500",per: "/mo", badge: "Recommended", accent: "#5CE0C6", recommended: true,  features: ["Market-linked","Higher corpus","Tax 80CCD benefit","Flexible withdrawal","Life cover"] },
    { name: "Retire Rich",  price: "₹5,000",per: "/mo", badge: null,          accent: "#7C6EF5", recommended: false, features: ["Guaranteed income","Inflation-indexed","Joint annuity","Critical illness","Wealth transfer"] },
  ],
  travel: [
    { name: "Trip Shield",  price: "₹299",  per: "/trip",badge: null,         accent: B.gray,    recommended: false, features: ["₹2L medical","Trip cancellation","Lost baggage","Passport loss"] },
    { name: "Explorer",     price: "₹599",  per: "/trip",badge: "Most Bought",accent: "#F9A85D", recommended: true,  features: ["₹10L medical","Flight delay","Adventure sports","24/7 assistance","Home burglary"] },
    { name: "Globe Elite",  price: "₹1,299",per: "/trip",badge: null,         accent: "#7C6EF5", recommended: false, features: ["Unlimited medical","Business travel","Pre-existing cover","Evacuation","Concierge"] },
  ],
  business: [
    { name: "SME Protect",  price: "₹2,499",per: "/mo", badge: null,          accent: B.gray,    recommended: false, features: ["₹25L liability","Fire & theft","Employee cover","Legal expenses"] },
    { name: "Biz Shield",   price: "₹4,999",per: "/mo", badge: "Most Bought", accent: B.charcoal,recommended: true,  features: ["₹1Cr liability","Cyber risk","Key person cover","Business interruption","Group health"] },
    { name: "Enterprise",   price: "Custom",per: "",     badge: "Enterprise",  accent: "#7C6EF5", recommended: false, features: ["Unlimited liability","D&O cover","Trade credit","Customised SLA","Dedicated RM"] },
  ],
};

const STEPS = [
  { num: "01", title: "Choose your category", desc: "Pick what you want to protect — family, health, wealth, or business.", icon: "🎯" },
  { num: "02", title: "Select a plan",         desc: "Compare plans side by side. Every feature, no jargon.",             icon: "📋" },
  { num: "03", title: "Fill details in 2 min", desc: "Basic info only. No medical tests for most plans.",                 icon: "✏️" },
  { num: "04", title: "Pay & get policy",      desc: "Instant policy document. Coverage starts the same day.",            icon: "✅" },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
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

// ─── Category Tab ─────────────────────────────────────────────────────────────
function CategoryTab({ need, active, inView, index, onClick }: {
  need: typeof NEEDS[0]; active: boolean; inView: boolean; index: number; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`fi-tab${active ? " fi-tab-active" : ""}${inView ? " fi-tab-in" : ""}`}
      style={{
        "--tab-accent": need.accent,
        animationDelay: inView ? `${index * 0.06}s` : "0s",
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="fi-tab-bg" style={{ background: need.bg }} />
      <div className={`fi-tab-shimmer${hovered || active ? " fi-tab-shimmer-in" : ""}`} />
      {need.tag && <span className="fi-tab-tag" style={{ background: need.accent }}>{need.tag}</span>}
      <span className="fi-tab-icon">{need.icon}</span>
      <span className="fi-tab-label">{need.label}</span>
      {active && <div className="fi-tab-active-bar" style={{ background: need.accent }} />}
    </button>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────
function PlanCard({ plan, index, onBuy }: {
  plan: typeof PLANS["family"][0]; index: number; onBuy: () => void;
}) {
  return (
    <div
      className={`fi-plan${plan.recommended ? " fi-plan-rec" : ""}`}
      style={{
        "--plan-accent": plan.accent,
        animationDelay: `${index * 0.1}s`,
      } as React.CSSProperties}
    >
      {plan.badge && (
        <div className="fi-plan-badge" style={{ background: plan.recommended ? plan.accent : B.offwhite, color: plan.recommended ? "#fff" : B.charcoal }}>
          {plan.badge}
        </div>
      )}

      <div className="fi-plan-header">
        <p className="fi-plan-name">{plan.name}</p>
        <div className="fi-plan-price-row">
          <span className="fi-plan-price">{plan.price}</span>
          <span className="fi-plan-per">{plan.per}</span>
        </div>
      </div>

      <div className="fi-plan-divider" style={{ background: plan.accent }} />

      <ul className="fi-plan-features">
        {plan.features.map((f) => (
          <li key={f} className="fi-plan-feature">
            <span className="fi-plan-check" style={{ color: plan.accent }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="fi-plan-actions">
        <button
          className="fi-plan-buy"
          style={{ background: plan.accent, boxShadow: `0 4px 20px ${plan.accent}44` }}
          onClick={onBuy}
        >
          Buy Now
        </button>
        <button className="fi-plan-compare">Compare</button>
      </div>
    </div>
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
          style={{ transitionDelay: inView ? `${0.15 + i * 0.12}s` : "0s" }}
        >
          <div className="fi-step-left">
            <div className="fi-step-icon-wrap"><span className="fi-step-icon">{step.icon}</span></div>
            {i < STEPS.length - 1 && <div className="fi-step-connector" />}
          </div>
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
export default function FindInsuranceSection() {
  const { ref: headRef, inView: headIn } = useInView(0.08);
  const { ref: bodyRef, inView: bodyIn } = useInView(0.06);
  const [headingKey, setHeadingKey] = useState(0);
  const [activeTab, setActiveTab]   = useState("family");
  const [bought, setBought]         = useState<string | null>(null);

  useEffect(() => { if (headIn) setHeadingKey((k) => k + 1); }, [headIn]);

  const activePlans = PLANS[activeTab] || [];
  const activeNeed  = NEEDS.find((n) => n.id === activeTab)!;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ══ ROOT ═══════════════════════════════════════════════════════ */
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

        /* ══ HEADER ═════════════════════════════════════════════════════ */
        .fi-header {
          padding: 100px 9vw 0;
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
          font-family: 'Playfair Display', serif !important;
          font-size: clamp(40px, 4.8vw, 68px) !important;
          font-weight: 800 !important; line-height: 1.12 !important;
          letter-spacing: -0.01em !important; color: ${B.charcoal} !important;
          overflow: visible !important; padding-bottom: 6px !important;
        }
        .fi-heading-accent { color: ${B.teal} !important; font-style: italic !important; }
        .fi-header-right { padding-bottom: 8px; max-width: 380px; }
        .fi-header-sub {
          font-size: 16px; color: #888; line-height: 1.75; margin: 0 0 28px;
        }
        .fi-header-sub strong { color: ${B.charcoal}; font-weight: 600; }
        @media (max-width: 860px) {
          .fi-header { flex-direction: column; align-items: flex-start; padding: 68px 6vw 0; }
          .fi-header-right { max-width: 100%; padding-bottom: 0; }
        }

        /* ══ CATEGORY TABS ══════════════════════════════════════════════ */
        .fi-tabs-wrap {
          padding: 48px 9vw 0; position: relative; z-index: 1;
        }
        .fi-tabs-label {
          font-size: 11px; font-weight: 700; letter-spacing: .13em;
          text-transform: uppercase; color: ${B.gray}; margin-bottom: 16px;
        }
        .fi-tabs {
          display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px;
        }
        @media (max-width: 960px) { .fi-tabs { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 560px) { .fi-tabs { grid-template-columns: repeat(2,1fr); } }

        .fi-tab {
          all: unset; position: relative; border-radius: 18px; overflow: hidden;
          padding: 18px 12px 16px; display: flex; flex-direction: column;
          align-items: center; gap: 8px; cursor: pointer;
          border: 1.5px solid rgba(0,0,0,0.06);
          box-shadow: 0 2px 12px rgba(0,0,0,.04);
          opacity: 0; transform: translateY(18px);
          transition: box-shadow .35s ease, border-color .25s ease, transform .35s cubic-bezier(0.22,1,0.36,1);
          min-height: 110px; justify-content: center;
        }
        .fi-tab-in { animation: fiTabIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes fiTabIn { to { opacity: 1; transform: translateY(0); } }

        .fi-tab:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,.08); border-color: var(--tab-accent); }
        .fi-tab-active { border-color: var(--tab-accent) !important; transform: translateY(-3px) !important; box-shadow: 0 8px 28px rgba(0,0,0,.10), 0 0 0 3px var(--tab-accent)22 !important; }

        .fi-tab-bg { position: absolute; inset: 0; z-index: 0; }
        .fi-tab-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 70%);
          background-size: 200% 200%; background-position: -100% -100%;
          transition: background-position .55s ease; pointer-events: none; z-index: 1;
        }
        .fi-tab-shimmer-in { background-position: 200% 200%; }
        .fi-tab-tag {
          position: absolute; top: 8px; left: 8px;
          font-size: 8px; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase; color: #fff; padding: 2px 7px; border-radius: 999px; z-index: 3;
        }
        .fi-tab-icon { font-size: 26px; line-height: 1; position: relative; z-index: 2; }
        .fi-tab-label {
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700;
          color: ${B.charcoal}; text-align: center; position: relative; z-index: 2;
          transition: color .2s;
        }
        .fi-tab-active .fi-tab-label { color: var(--tab-accent); }
        .fi-tab-active-bar {
          position: absolute; bottom: 0; left: 50%; width: 40px; height: 2.5px;
          border-radius: 999px; transform: translateX(-50%); z-index: 3;
        }

        /* ══ PLANS AREA ═════════════════════════════════════════════════ */
        .fi-plans-wrap {
          padding: 40px 9vw 0; position: relative; z-index: 1;
        }
        .fi-plans-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
        }
        .fi-plans-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 800; color: ${B.charcoal};
        }
        .fi-plans-title em { color: var(--active-accent, ${B.teal}); font-style: italic; }
        .fi-plans-sub { font-size: 13px; color: ${B.gray}; }
        .fi-plans-advisor {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: ${B.teal}; font-weight: 600; cursor: pointer;
          padding: 8px 16px; border-radius: 999px;
          border: 1px solid rgba(45,191,191,0.3);
          background: rgba(45,191,191,0.06);
          transition: background .25s, border-color .25s;
        }
        .fi-plans-advisor:hover { background: rgba(45,191,191,0.12); }

        .fi-plans-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 18px;
        }
        @media (max-width: 900px) { .fi-plans-grid { grid-template-columns: 1fr; } }

        /* Plan card */
        .fi-plan {
          background: ${B.white}; border-radius: 24px;
          border: 1.5px solid rgba(0,0,0,0.07);
          padding: 28px 24px 24px;
          display: flex; flex-direction: column; gap: 0;
          box-shadow: 0 4px 20px rgba(0,0,0,.05);
          transition: transform .35s cubic-bezier(0.22,1,0.36,1), box-shadow .35s ease;
          animation: fiPlanIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
          position: relative; overflow: hidden;
        }
        @keyframes fiPlanIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fi-plan:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,.10), 0 4px 12px var(--plan-accent)22; }

        /* Recommended card — slightly elevated */
        .fi-plan-rec {
          border-color: var(--plan-accent) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,.08), 0 0 0 3px var(--plan-accent)18 !important;
          transform: translateY(-4px);
        }
        .fi-plan-rec::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--plan-accent);
        }

        .fi-plan-badge {
          position: absolute; top: 16px; right: 16px;
          font-size: 10px; font-weight: 700; letter-spacing: .06em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 999px;
        }
        .fi-plan-header { margin-bottom: 16px; }
        .fi-plan-name {
          font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 800;
          color: ${B.charcoal}; margin: 0 0 8px;
        }
        .fi-plan-price-row { display: flex; align-items: baseline; gap: 4px; }
        .fi-plan-price {
          font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900;
          color: var(--plan-accent); line-height: 1;
        }
        .fi-plan-per { font-size: 13px; color: ${B.gray}; font-weight: 500; }

        .fi-plan-divider { height: 1.5px; border-radius: 999px; margin: 16px 0; opacity: 0.18; }

        .fi-plan-features { list-style: none; margin: 0 0 24px; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .fi-plan-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 13.5px; color: #555; line-height: 1.4;
        }
        .fi-plan-check { font-size: 14px; font-weight: 700; flex-shrink: 0; }

        .fi-plan-actions { display: flex; gap: 10px; margin-top: auto; }
        .fi-plan-buy {
          all: unset; flex: 1; height: 44px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
          color: #fff; cursor: pointer;
          transition: transform .25s, box-shadow .25s;
        }
        .fi-plan-buy:hover { transform: translateY(-2px); filter: brightness(1.08); }
        .fi-plan-buy:active { transform: scale(0.97); }
        .fi-plan-compare {
          all: unset; height: 44px; padding: 0 16px; border-radius: 999px;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
          color: ${B.gray}; cursor: pointer;
          border: 1.5px solid rgba(0,0,0,0.10);
          transition: border-color .25s, color .25s;
        }
        .fi-plan-compare:hover { border-color: var(--plan-accent); color: var(--plan-accent); }

        /* ══ BODY: STEPS + TRUST ════════════════════════════════════════ */
        .fi-body {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 64px; padding: 64px 9vw 100px;
          align-items: start; position: relative; z-index: 1;
        }
        @media (max-width: 860px) { .fi-body { grid-template-columns: 1fr; gap: 48px; padding: 48px 6vw 80px; } }

        /* Steps */
        .fi-steps { display: flex; flex-direction: column; }
        .fi-step {
          display: flex; gap: 18px; opacity: 0; transform: translateX(-16px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .fi-step-in { opacity: 1; transform: translateX(0); }
        .fi-step-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
        .fi-step-icon-wrap {
          width: 46px; height: 46px; border-radius: 13px;
          background: ${B.white}; border: 1.5px solid ${B.border};
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 12px rgba(0,0,0,.06); font-size: 20px; flex-shrink: 0;
          transition: border-color .3s, box-shadow .3s;
        }
        .fi-step:hover .fi-step-icon-wrap { border-color: ${B.teal}; box-shadow: 0 4px 18px rgba(45,191,191,.2); }
        .fi-step-connector {
          width: 2px; flex: 1; min-height: 24px;
          background: linear-gradient(to bottom, ${B.teal}, rgba(45,191,191,0.06));
          border-radius: 999px; margin: 5px 0;
        }
        .fi-step-body { padding: 0 0 28px; }
        .fi-step-num {
          font-family: 'Playfair Display', serif; font-size: 11px; font-weight: 700;
          color: ${B.teal}; letter-spacing: .1em; margin-bottom: 5px;
        }
        .fi-step-title {
          font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700;
          color: ${B.charcoal}; margin: 0 0 5px;
        }
        .fi-step-desc { font-size: 14px; color: #888; line-height: 1.7; margin: 0; }

        /* Trust panel */
        .fi-trust-panel {
          background: ${B.white}; border-radius: 24px;
          border: 1px solid ${B.border};
          padding: 36px 32px;
          box-shadow: 0 6px 32px rgba(0,0,0,.05);
          display: flex; flex-direction: column; gap: 24px;
          position: relative; overflow: hidden;
        }
        .fi-trust-panel::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, ${B.teal}, #7C6EF5, ${B.coral});
        }
        .fi-trust-title {
          font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 800;
          color: ${B.charcoal}; line-height: 1.2;
        }
        .fi-trust-title em { color: ${B.teal}; font-style: italic; }
        .fi-trust-stats {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .fi-trust-stat {
          background: ${B.offwhite}; border-radius: 16px; padding: 18px 16px;
          border: 1px solid ${B.border};
        }
        .fi-trust-stat-val {
          font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 900;
          color: ${B.charcoal}; line-height: 1; margin-bottom: 4px;
        }
        .fi-trust-stat-val em { color: ${B.teal}; font-style: normal; }
        .fi-trust-stat-label { font-size: 11px; font-weight: 600; color: ${B.gray}; letter-spacing: .06em; text-transform: uppercase; }

        .fi-trust-features { display: flex; flex-direction: column; gap: 10px; }
        .fi-trust-feature {
          display: flex; align-items: center; gap: 12px;
          font-size: 14px; color: ${B.charcoal}; font-weight: 500;
        }
        .fi-trust-feature-dot {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(45,191,191,0.12); border: 1px solid rgba(45,191,191,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 11px;
        }
        .fi-trust-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        .fi-trust-badge {
          font-size: 11px; font-weight: 600; color: ${B.charcoal};
          padding: 5px 14px; border-radius: 999px;
          background: ${B.offwhite}; border: 1px solid ${B.border}; letter-spacing: .03em;
        }

        /* ══ SUCCESS TOAST ══════════════════════════════════════════════ */
        .fi-toast {
          position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(100px);
          background: ${B.charcoal}; color: #fff; border-radius: 999px;
          padding: 14px 28px; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,.22); z-index: 2000;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease;
          opacity: 0; pointer-events: none; white-space: nowrap;
        }
        .fi-toast-show { transform: translateX(-50%) translateY(0); opacity: 1; pointer-events: auto; }
        .fi-toast-dot { width: 8px; height: 8px; border-radius: 50%; background: ${B.teal}; flex-shrink: 0; }

        /* ══ UIVERSE BUTTON ═════════════════════════════════════════════ */
        .fi-uv-btn {
          all: unset; position: relative; display: inline-flex;
          height: 52px; align-items: center; border-radius: 9999px; padding: 0 32px;
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
          color: #fff; letter-spacing: .01em; cursor: pointer; user-select: none;
        }
        .fi-uv-bg {
          overflow: hidden; border-radius: 9999px; position: absolute; inset: 0;
          background: var(--btn-bg); box-shadow: 0 4px 24px rgba(0,0,0,.16);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .fi-uv-btn:hover .fi-uv-bg { transform: scale(1.04); }
        .fi-uv-layers {
          display: block; position: absolute; left: 50%; top: -60%; transform: translate(-50%);
          aspect-ratio: 1/1; width: max(200%, 10rem);
        }
        .fi-uv-layer { display: block; border-radius: 9999px; position: absolute; inset: 0; transform: scale(0); }
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
                  <ShuffleText key={`fi-h1-${headingKey}`} text="Find the right"
                    tag="span" className="fi-heading-line" shuffleDirection="right"
                    duration={0.5} stagger={0.035} animationMode="evenodd"
                    triggerOnce={false} triggerOnHover={false} rootMargin="0px" threshold={0} />
                  <ShuffleText key={`fi-h2-${headingKey}`} text="insurance."
                    tag="span" className="fi-heading-line fi-heading-accent" shuffleDirection="right"
                    duration={0.5} stagger={0.035} animationMode="evenodd"
                    triggerOnce={false} triggerOnHover={false} rootMargin="0px" threshold={0} />
                </>
              )}
            </div>
          </div>
          <div className="fi-header-right">
            <p className="fi-header-sub">
              Browse plans across every category. Compare, choose, and
              <strong> buy in under 5 minutes</strong> — no branch visits, no paperwork.
            </p>
            <AnimatedButton label="Talk to an Advisor →" bg={B.teal} layers={["#17f1d1", "#a374ff", B.teal]} />
          </div>
        </div>

        {/* ── Category Tabs ── */}
        <div className="fi-tabs-wrap">
          <p className="fi-tabs-label">Select a category</p>
          <div className="fi-tabs">
            {NEEDS.map((need, i) => (
              <CategoryTab
                key={need.id} need={need} index={i} inView={headIn}
                active={activeTab === need.id}
                onClick={() => setActiveTab(need.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Plans Grid ── */}
        {/* <div className="fi-plans-wrap" style={{ "--active-accent": activeNeed.accent } as React.CSSProperties}>
          <div className="fi-plans-header">
            <div>
              <p className="fi-plans-title">
                <em>{activeNeed.label}</em> Plans
              </p>
              <p className="fi-plans-sub">3 plans — all IRDAI approved. Coverage starts today.</p>
            </div>
            <button className="fi-plans-advisor">
              🎓 Talk to advisor
            </button>
          </div>
          <div className="fi-plans-grid">
            {activePlans.map((plan, i) => (
              <PlanCard
                key={`${activeTab}-${plan.name}`}
                plan={plan}
                index={i}
                onBuy={() => {
                  setBought(plan.name);
                  setTimeout(() => setBought(null), 3200);
                }}
              />
            ))}
          </div>
        </div> */}

        {/* ── Body: How it works + Trust panel ── */}
        <div ref={bodyRef} className="fi-body">

          {/* Left — How it works */}
          <div>
            <p className="fi-eyebrow" style={{ marginBottom: 28 }}>How it works</p>
            <StepsPanel inView={bodyIn} />
          </div>

          {/* Right — Trust & Stats */}
          <div>
            <p className="fi-eyebrow" style={{ marginBottom: 28 }}>Why TransIndia</p>
            <div className="fi-trust-panel">
              <p className="fi-trust-title">
                Trusted by <em>2 crore+</em><br />Indian families.
              </p>
              <div className="fi-trust-stats">
                {[
                  { val: "50+",    em: "",  label: "Insurance Partners"  },
                  { val: "₹500",   em: "Cr+", label: "Claims Settled"   },
                  { val: "4.8",    em: "★",  label: "App Store Rating"  },
                  { val: "5",      em: "min", label: "To Buy a Policy"  },
                ].map((s) => (
                  <div key={s.label} className="fi-trust-stat">
                    <div className="fi-trust-stat-val">{s.val}<em>{s.em}</em></div>
                    <div className="fi-trust-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="fi-trust-features">
                {[
                  { icon: "🔒", text: "100% data secure — never sold to anyone"     },
                  { icon: "📋", text: "IRDAI regulated — all plans verified"         },
                  { icon: "💬", text: "24/7 expert support — human, not a bot"       },
                  { icon: "⚡", text: "Instant policy — same-day coverage start"     },
                ].map((f) => (
                  <div key={f.text} className="fi-trust-feature">
                    <span className="fi-trust-feature-dot">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
              <div className="fi-trust-badges">
                {["IRDAI Regulated", "ISO 27001", "2Cr+ Customers", "4.8★ Rated"].map((b) => (
                  <span key={b} className="fi-trust-badge">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Buy Toast ── */}
      <div className={`fi-toast${bought ? " fi-toast-show" : ""}`}>
        <span className="fi-toast-dot" />
        🎉 Great choice! Redirecting to <strong style={{ marginLeft: 4 }}>{bought}</strong>…
      </div>
    </>
  );
}