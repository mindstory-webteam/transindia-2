"use client";
import Link from "next/link";
import Image from "next/image";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  rightImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

export default function Breadcrumb({ items = [], rightImage }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        background: "#f0f4f9",
        borderBottom: "1px solid #dce6f0",
        padding: "0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: "0",
          flexWrap: "wrap",
        }}
      >
        {/* Home icon */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#2d6a9f",
            textDecoration: "none",
            fontSize: "0.8125rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            gap: "4px",
            transition: "color 0.15s",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: "13px", height: "13px" }}>
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Home
        </Link>

        {items.map((item, idx) => (
          <span key={idx} style={{ display: "flex", alignItems: "center" }}>
            {/* Separator */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              style={{ width: "12px", height: "12px", margin: "0 6px", color: "#9baab8", flexShrink: 0 }}
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {item.href && idx < items.length - 1 ? (
              <Link
                href={item.href}
                style={{
                  color: "#2d6a9f",
                  textDecoration: "none",
                  fontSize: "0.8125rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  transition: "color 0.15s",
                }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                style={{
                  color: "#1a3c5e",
                  fontSize: "0.8125rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </span>
            )}
          </span>
        ))}

        {/* Right-side image — pushed to far right via marginLeft: auto */}
        {rightImage && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src={rightImage.src}
              alt={rightImage.alt}
              width={rightImage.width ?? 120}
              height={rightImage.height ?? 36}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        )}
      </div>
    </nav>
  );
}