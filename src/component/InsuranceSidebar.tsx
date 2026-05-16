"use client";
import { useState } from "react";
import Link from "next/link";

const insuranceTypes = [
  {
    id: "health",
    label: "Health Insurance",
    href: "/insurance/health",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="currentColor" fillOpacity={0.15} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "life",
    label: "Life Insurance",
    href: "/insurance/life",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "auto",
    label: "Auto Insurance",
    href: "/insurance/auto",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7.5" cy="17.5" r="2.5"/>
        <circle cx="17.5" cy="17.5" r="2.5"/>
      </svg>
    ),
  },
  {
    id: "home",
    label: "Home Insurance",
    href: "/insurance/home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "travel",
    label: "Travel Insurance",
    href: "/insurance/travel",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "business",
    label: "Business Insurance",
    href: "/insurance/business",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "pet",
    label: "Pet Insurance",
    href: "/insurance/pet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703.383 1 1.5 1h7.5M9 21c.5 0 6.5.5 6.5-4.5S18 3 20.5 3c1 0 1.5.5 1.5 1.5 0 2-1.5 4-1.5 4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.5 9.5c-.5 3 .5 5 2.5 5.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "critical",
    label: "Critical Illness",
    href: "/insurance/critical",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "term",
    label: "Term Insurance",
    href: "/insurance/term",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/>
        <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/>
        <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "accident",
    label: "Accident Cover",
    href: "/insurance/accident",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
        <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round"/>
      </svg>
    ),
  },
];

interface InsuranceSidebarProps {
  activeId?: string;
}

export default function InsuranceSidebar({ activeId }: InsuranceSidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      {/* Sidebar Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a3c5e 0%, #2d6a9f 100%)",
          borderRadius: "12px 12px 0 0",
          padding: "18px 20px",
        }}
      >
        <h3
          style={{
            color: "#fff",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Insurance Types
        </h3>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.75rem", margin: "4px 0 0" }}>
          Browse all coverage options
        </p>
      </div>

      {/* Sidebar Items */}
      <nav
        style={{
          background: "#fff",
          border: "1px solid #e8edf3",
          borderTop: "none",
          borderRadius: "0 0 12px 12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(26,60,94,0.08)",
        }}
      >
        {insuranceTypes.map((item, idx) => {
          const isActive = activeId === item.id;
          const isHovered = hovered === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "13px 18px",
                borderBottom: idx < insuranceTypes.length - 1 ? "1px solid #f0f4f8" : "none",
                background: isActive
                  ? "linear-gradient(90deg, #e8f1fb 0%, #f5f9ff 100%)"
                  : isHovered
                  ? "#f7fafd"
                  : "#fff",
                color: isActive ? "#1a3c5e" : isHovered ? "#2d6a9f" : "#4a5568",
                textDecoration: "none",
                transition: "all 0.18s ease",
                position: "relative",
              }}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "3px",
                    background: "linear-gradient(180deg, #1a3c5e, #2d6a9f)",
                    borderRadius: "0 2px 2px 0",
                  }}
                />
              )}

              {/* Icon container */}
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isActive
                    ? "linear-gradient(135deg, #1a3c5e, #2d6a9f)"
                    : isHovered
                    ? "#e8f1fb"
                    : "#f0f4f8",
                  color: isActive ? "#fff" : isHovered ? "#2d6a9f" : "#6b7a8d",
                  flexShrink: 0,
                  transition: "all 0.18s ease",
                }}
              >
                {item.icon}
              </span>

              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 600 : 500,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                {item.label}
              </span>

              {/* Arrow */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                style={{
                  width: "14px",
                  height: "14px",
                  marginLeft: "auto",
                  opacity: isActive || isHovered ? 1 : 0.3,
                  transform: isHovered ? "translateX(2px)" : "translateX(0)",
                  transition: "all 0.18s ease",
                  flexShrink: 0,
                }}
              >
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          );
        })}
      </nav>

      {/* Quick Contact Card */}
      <div
        style={{
          marginTop: "20px",
          background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(255,107,53,0.25)",
        }}
      >
        <div style={{ fontSize: "1.5rem", marginBottom: "6px" }}>📞</div>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", margin: "0 0 4px", fontFamily: "'Playfair Display', serif" }}>
          Need Help Choosing?
        </p>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.75rem", margin: "0 0 14px", lineHeight: 1.5 }}>
          Our advisors are available 24/7
        </p>
        <a
          href="tel:1800-000-0000"
          style={{
            display: "block",
            background: "#fff",
            color: "#ff6b35",
            padding: "9px 0",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "0.875rem",
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          1800-000-0000
        </a>
      </div>
    </aside>
  );
}