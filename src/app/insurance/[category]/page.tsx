"use client";

import React, { useState, useRef, useEffect } from "react";
import FloatingNavbar from "@/component/FloatingNavbar";
import Footer from "@/component/Footer";
import CTABanner from "@/component/Ctabanner";
import CoverageSection from "@/component/Coveragesection";
import FindInsuranceSection from "@/component/FindInsuranceSection";
import TestimonialsSection from "@/component/TestimonialsSection";
import Link from "next/link";

// ─── Brand Palette (from AboutSection) ───────────────────────────────────────
const B = {
  coral:    "#E8503A",
  teal:     "#2DBFBF",
  teal100:  "#9AE0E0",
  charcoal: "#1A1A1A",
  gray:     "#B5B5B5",
  offwhite: "#F4F4EF",
  white:    "#FFFFFF",
  border:   "rgba(0,0,0,0.07)",
  navy:     "#1a3c5e",
  navyMid:  "#2d6a9f",
  orange:   "#f7931e",
};

// ─── Premium SVG Icons ────────────────────────────────────────────────────────
const Icons = {
  Heart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="currentColor" fillOpacity={0.12}/>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Car: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l3-4h10l3 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
      <circle cx="7.5" cy="17.5" r="2.5"/>
      <circle cx="16.5" cy="17.5" r="2.5"/>
    </svg>
  ),
  Bike: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5"/>
      <circle cx="18.5" cy="17.5" r="3.5"/>
      <path d="M15 6h-5l-3 8h11.5"/>
      <path d="M9 6l3.5 5.5"/>
      <path d="M15 6l1.5 3"/>
    </svg>
  ),
  Home: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" fill="currentColor" fillOpacity={0.08}/>
      <path d="M9 21V12h6v9"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity={0.1}/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Briefcase: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" fill="currentColor" fillOpacity={0.08}/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      <path d="M2 12h20"/>
    </svg>
  ),
  Activity: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Baby: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <circle cx="12" cy="7" r="4"/>
      <path d="M5.5 21a8.38 8.38 0 0 1 13 0"/>
      <path d="M12 11v5"/>
      <path d="M9.5 15.5h5"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" fill="currentColor" fillOpacity={0.08}/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
    </svg>
  ),
  // Trust strip icons
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity={0.15}/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="currentColor" fillOpacity={0.12}/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Bank: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22"/>
      <line x1="6" y1="18" x2="6" y2="11"/>
      <line x1="10" y1="18" x2="10" y2="11"/>
      <line x1="14" y1="18" x2="14" y2="11"/>
      <line x1="18" y1="18" x2="18" y2="11"/>
      <polygon points="12 2 20 7 4 7" fill="currentColor" fillOpacity={0.12}/>
    </svg>
  ),
  Headphones: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" fill="currentColor" fillOpacity={0.12}/>
    </svg>
  ),
  CreditCard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" fill="currentColor" fillOpacity={0.1}/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  Award: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" fill="currentColor" fillOpacity={0.12}/>
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="currentColor" fillOpacity={0.08}/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fillOpacity={0.9}/>
    </svg>
  ),
  FileText: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="currentColor" fillOpacity={0.1}/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor" fillOpacity={0.1}/>
    </svg>
  ),
};

// ─── Insurance Categories with Premium Icons ─────────────────────────────────
const INSURANCE_CATS = [
  { id:"health",     label:"Health",       color:"#E8503A", bg:"#fff0f3", Icon: Icons.Heart      },
  { id:"life",       label:"Life",         color:"#2d6a9f", bg:"#eef4fb", Icon: Icons.Users      },
  { id:"car",        label:"Car",          color:"#7c3aed", bg:"#f3f0ff", Icon: Icons.Car        },
  { id:"bike",       label:"Bike",         color:"#059669", bg:"#ecfdf5", Icon: Icons.Bike       },
  { id:"home",       label:"Home",         color:"#d97706", bg:"#fffbeb", Icon: Icons.Home       },
  { id:"travel",     label:"Travel",       color:"#0891b2", bg:"#ecfeff", Icon: Icons.Globe      },
  { id:"term",       label:"Term Life",    color:"#1a3c5e", bg:"#eef2f7", Icon: Icons.Shield     },
  { id:"investment", label:"Investment",   color:"#16a34a", bg:"#f0fdf4", Icon: Icons.TrendingUp },
  { id:"business",   label:"Business",     color:"#475569", bg:"#f1f5f9", Icon: Icons.Briefcase  },
  { id:"critical",   label:"Critical",     color:"#dc2626", bg:"#fff1f1", Icon: Icons.Activity   },
  { id:"child",      label:"Child Plan",   color:"#f59e0b", bg:"#fffbeb", Icon: Icons.Baby       },
  { id:"pension",    label:"Pension",      color:"#7c3aed", bg:"#faf5ff", Icon: Icons.Calendar   },
];

// ─── Marquee Trust Items ──────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { Icon: Icons.Zap,        label:"Instant Policy",       sub:"Under 5 minutes"          },
  { Icon: Icons.Lock,       label:"Zero Hidden Fees",     sub:"Full transparency"        },
  { Icon: Icons.Bank,       label:"50+ Insurers",         sub:"Best plans compared"      },
  { Icon: Icons.Headphones, label:"24/7 Expert Support",  sub:"Human advisors, not bots" },
  { Icon: Icons.CreditCard, label:"Cashless Claims",      sub:"Hassle-free settlement"   },
  { Icon: Icons.Award,      label:"IRDAI Approved",       sub:"Fully regulated"          },
  { Icon: Icons.CheckCircle,label:"Instant Approval",     sub:"No paperwork"             },
  { Icon: Icons.Star,       label:"4.8★ App Rating",      sub:"2Cr+ happy customers"     },
  { Icon: Icons.FileText,   label:"Zero Paperwork",       sub:"100% digital process"     },
  { Icon: Icons.Shield,     label:"Trusted Protection",   sub:"12+ years of trust"       },
];

// ─── Sidebar Items ────────────────────────────────────────────────────────────
const SIDEBAR_ITEMS = [
  { id:"health",     label:"Health Insurance",  Icon: Icons.Heart      },
  { id:"life",       label:"Life Insurance",    Icon: Icons.Users      },
  { id:"car",        label:"Car Insurance",     Icon: Icons.Car        },
  { id:"bike",       label:"Bike Insurance",    Icon: Icons.Bike       },
  { id:"home",       label:"Home Insurance",    Icon: Icons.Home       },
  { id:"travel",     label:"Travel Insurance",  Icon: Icons.Globe      },
  { id:"business",   label:"Business Cover",    Icon: Icons.Briefcase  },
  { id:"term",       label:"Term Life Cover",   Icon: Icons.Shield     },
  { id:"investment", label:"Investment Plans",  Icon: Icons.TrendingUp },
  { id:"pension",    label:"Pension Plan",      Icon: Icons.Calendar   },
  { id:"critical",   label:"Critical Illness",  Icon: Icons.Activity   },
  { id:"child",      label:"Child Plan",        Icon: Icons.Baby       },
];

// ─── Form Definitions ─────────────────────────────────────────────────────────
type FieldType = "text"|"number"|"select"|"radio"|"date"|"email"|"tel";
type Field = { key:string; label:string; type:FieldType; placeholder?:string; options?:string[]; required?:boolean };
type Step  = { title:string; emoji:string; subtitle:string; fields:Field[] };

const PERSONAL_STEP: Step = {
  title:"Personal Details", emoji:"👤",
  subtitle:"Tell us about yourself for a personalised quote.",
  fields:[
    { key:"name",   label:"Full Name",     type:"text",  placeholder:"Rahul Sharma",   required:true },
    { key:"dob",    label:"Date of Birth", type:"date",                                 required:true },
    { key:"gender", label:"Gender",        type:"radio", options:["Male","Female","Other"], required:true },
    { key:"phone",  label:"Mobile Number", type:"tel",   placeholder:"10-digit number",required:true },
    { key:"email",  label:"Email Address", type:"email", placeholder:"you@email.com",  required:true },
    { key:"city",   label:"City",          type:"text",  placeholder:"Mumbai",         required:true },
  ],
};
const REVIEW_STEP: Step = { title:"Review & Confirm", emoji:"✅", subtitle:"Check your details before we fetch personalised plans.", fields:[] };

const FORMS: Record<string,Step[]> = {
  health:[
    { title:"Who to Cover", emoji:"👨‍👩‍👧", subtitle:"Select members you want to insure.",
      fields:[
        { key:"members",    label:"Cover For",           type:"radio",  options:["Self","Self + Spouse","Self + Kids","Family Floater","Parents"], required:true },
        { key:"age",        label:"Your Age",            type:"number", placeholder:"32", required:true },
        { key:"age_spouse", label:"Spouse Age (if any)", type:"number", placeholder:"29" },
        { key:"kids",       label:"No. of Children",    type:"select", options:["0","1","2","3","4+"] },
      ]},
    { title:"Health Profile", emoji:"❤️", subtitle:"Share medical background for accurate premium.",
      fields:[
        { key:"smoker",   label:"Do you smoke?",             type:"radio",  options:["No","Yes"], required:true },
        { key:"existing", label:"Pre-existing Conditions",   type:"select", options:["None","Diabetes","Hypertension","Heart Disease","Multiple"], required:true },
        { key:"bmi",      label:"BMI Category",             type:"radio",  options:["Normal","Overweight","Obese"] },
        { key:"history",  label:"Hospitalised in last 3 yrs?",type:"radio",options:["No","Yes"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Preferences", emoji:"🛡️", subtitle:"Choose cover amount and features.",
      fields:[
        { key:"sum",      label:"Sum Insured",    type:"select", options:["₹3 Lakhs","₹5 Lakhs","₹10 Lakhs","₹25 Lakhs","₹50 Lakhs","₹1 Crore"], required:true },
        { key:"opd",      label:"OPD Cover?",     type:"radio",  options:["Yes","No"], required:true },
        { key:"maternity",label:"Maternity?",     type:"radio",  options:["Yes","No"] },
        { key:"budget",   label:"Monthly Budget", type:"select", options:["Under ₹500","₹500–₹1,000","₹1,000–₹2,000","₹2,000+"], required:true },
      ]},
    REVIEW_STEP,
  ],
  car:[
    { title:"Vehicle Details", emoji:"🚗", subtitle:"Enter car details for a precise quote.",
      fields:[
        { key:"brand", label:"Car Brand",        type:"select", options:["Maruti","Hyundai","Tata","Honda","Toyota","Kia","MG","Mahindra","Other"], required:true },
        { key:"model", label:"Car Model",        type:"text",   placeholder:"e.g. Swift Dzire", required:true },
        { key:"year",  label:"Year of Purchase", type:"select", options:["2024","2023","2022","2021","2020","2019","2018","Before 2018"], required:true },
        { key:"fuel",  label:"Fuel Type",        type:"radio",  options:["Petrol","Diesel","CNG","Electric"], required:true },
      ]},
    { title:"Registration", emoji:"📋", subtitle:"RTO and variant details.",
      fields:[
        { key:"rto",    label:"RTO / State",    type:"text",   placeholder:"e.g. MH-01 Maharashtra", required:true },
        { key:"variant",label:"Variant",        type:"text",   placeholder:"e.g. VXi" },
        { key:"claims", label:"Previous Claims",type:"radio",  options:["No Claims","1 Claim","2+ Claims"], required:true },
        { key:"ncb",    label:"NCB Discount",   type:"select", options:["0%","20%","25%","35%","45%","50%"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Preferences", emoji:"🛡️", subtitle:"Pick the right cover type.",
      fields:[
        { key:"cover_type",label:"Cover Type",    type:"radio",  options:["Third Party Only","Comprehensive","Own Damage Only"], required:true },
        { key:"addons",    label:"Key Add-ons",   type:"select", options:["None","Zero Depreciation","Engine Protection","Return to Invoice","All"] },
        { key:"idv",       label:"IDV Preference",type:"radio",  options:["Market Value","Custom IDV"] },
        { key:"garage",    label:"Garage Type",   type:"radio",  options:["Cashless Only","Any Garage"] },
      ]},
    REVIEW_STEP,
  ],
  bike:[
    { title:"Bike Details", emoji:"🏍️", subtitle:"Share your bike info for an accurate premium.",
      fields:[
        { key:"brand", label:"Bike Brand",        type:"select", options:["Hero","Honda","Bajaj","TVS","Royal Enfield","Yamaha","Suzuki","KTM","Other"], required:true },
        { key:"model", label:"Bike Model",        type:"text",   placeholder:"e.g. Splendor Plus", required:true },
        { key:"year",  label:"Year of Purchase",  type:"select", options:["2024","2023","2022","2021","2020","2019","2018","Before 2018"], required:true },
        { key:"fuel",  label:"Fuel Type",         type:"radio",  options:["Petrol","Electric"], required:true },
      ]},
    { title:"Engine & RTO", emoji:"⚙️", subtitle:"Engine capacity and registration details.",
      fields:[
        { key:"cc",    label:"Engine CC",       type:"select", options:["Up to 100cc","100–150cc","150–250cc","250–500cc","500cc+"], required:true },
        { key:"rto",   label:"RTO / State",     type:"text",   placeholder:"e.g. MH-01 Maharashtra", required:true },
        { key:"claims",label:"Previous Claims", type:"radio",  options:["No Claims","1 Claim","2+ Claims"] },
        { key:"ncb",   label:"NCB Discount",    type:"select", options:["0%","20%","25%","35%","45%","50%"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Preferences", emoji:"🛡️", subtitle:"Choose the right policy type.",
      fields:[
        { key:"cover_type",label:"Cover Type",         type:"radio",  options:["Third Party Only","Comprehensive","Own Damage Only"], required:true },
        { key:"idv",       label:"IDV",               type:"select", options:["Market Value","Custom IDV"] },
        { key:"addons",    label:"Add-ons",            type:"select", options:["None","Zero Depreciation","Engine Protect","Roadside Assistance","All"] },
        { key:"pillion",   label:"Pillion Rider Cover?",type:"radio", options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  life:[
    { title:"Life Profile", emoji:"🧬", subtitle:"Basic details to calculate the right cover.",
      fields:[
        { key:"age",    label:"Your Age",       type:"number", placeholder:"30", required:true },
        { key:"gender", label:"Gender",         type:"radio",  options:["Male","Female"], required:true },
        { key:"smoker", label:"Do you smoke?",  type:"radio",  options:["No","Yes"], required:true },
        { key:"health", label:"Overall Health", type:"radio",  options:["Excellent","Good","Average","Poor"] },
      ]},
    { title:"Income & Cover", emoji:"💰", subtitle:"Set your income and coverage goals.",
      fields:[
        { key:"income", label:"Annual Income",  type:"select", options:["Under ₹3L","₹3–5L","₹5–10L","₹10–25L","₹25L+"], required:true },
        { key:"cover",  label:"Cover Amount",   type:"select", options:["₹25L","₹50L","₹75L","₹1 Crore","₹2 Crore","₹5 Crore"], required:true },
        { key:"term",   label:"Policy Term",    type:"select", options:["10 yrs","15 yrs","20 yrs","25 yrs","30 yrs","Till 60","Till 65"], required:true },
        { key:"payout", label:"Payout Type",    type:"radio",  options:["Lump Sum","Monthly Income","Both"] },
      ]},
    PERSONAL_STEP,
    { title:"Nominee & Riders", emoji:"👨‍👩‍👧", subtitle:"Protect your nominee and add riders.",
      fields:[
        { key:"nominee",    label:"Nominee Name",        type:"text",   placeholder:"Priya Sharma", required:true },
        { key:"relation",   label:"Relation",            type:"select", options:["Spouse","Child","Parent","Sibling","Other"], required:true },
        { key:"riders",     label:"Add-on Riders",       type:"select", options:["None","Critical Illness","Accidental Death","Waiver of Premium","All"] },
        { key:"return_prem",label:"Return of Premium?",  type:"radio",  options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  home:[
    { title:"Property Details", emoji:"🏠", subtitle:"Share details about your property.",
      fields:[
        { key:"prop_type",label:"Property Type",    type:"radio",  options:["Own House","Rented","Flat","Villa"], required:true },
        { key:"area",     label:"Area (sq ft)",     type:"number", placeholder:"1200", required:true },
        { key:"city",     label:"City",             type:"text",   placeholder:"Mumbai", required:true },
        { key:"age",      label:"Age of Property",  type:"select", options:["New (<1yr)","1–5 yrs","5–10 yrs","10–20 yrs","20+ yrs"], required:true },
      ]},
    { title:"Property Value", emoji:"💎", subtitle:"Construction type and estimated value.",
      fields:[
        { key:"construction",label:"Construction Type",type:"radio",  options:["RCC","Semi-Pucca","Kutcha"], required:true },
        { key:"value",       label:"Property Value",   type:"select", options:["Under ₹20L","₹20–50L","₹50L–1Cr","₹1–2Cr","₹2Cr+"], required:true },
        { key:"contents",    label:"Contents Value",   type:"select", options:["Not needed","Under ₹5L","₹5–10L","₹10–25L","₹25L+"] },
        { key:"loan",        label:"Home Loan Active?",type:"radio",  options:["Yes","No"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Options", emoji:"🛡️", subtitle:"Choose what you want to protect.",
      fields:[
        { key:"structure", label:"Structure Cover",        type:"radio", options:["Yes","No"], required:true },
        { key:"fire",      label:"Fire & Natural Disaster", type:"radio",options:["Yes","No"], required:true },
        { key:"burglary",  label:"Burglary Cover",         type:"radio", options:["Yes","No"] },
        { key:"appliances",label:"Appliance Breakdown",    type:"radio", options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  travel:[
    { title:"Trip Details", emoji:"✈️", subtitle:"Tell us about your travel plan.",
      fields:[
        { key:"trip_type",   label:"Trip Type",          type:"radio",  options:["Domestic","International"], required:true },
        { key:"destination", label:"Destination",        type:"text",   placeholder:"USA, Europe, Thailand", required:true },
        { key:"dep_date",    label:"Departure Date",     type:"date",   required:true },
        { key:"ret_date",    label:"Return Date",        type:"date",   required:true },
      ]},
    { title:"Travellers", emoji:"👥", subtitle:"Number of people and purpose.",
      fields:[
        { key:"travellers",label:"No. of Travellers",  type:"select", options:["1","2","3","4","5","6+"], required:true },
        { key:"purpose",   label:"Purpose of Travel",  type:"select", options:["Tourism","Business","Education","Medical","Other"] },
        { key:"seniors",   label:"Seniors (60+)?",     type:"radio",  options:["No","Yes"] },
        { key:"adventure", label:"Adventure Sports?",  type:"radio",  options:["No","Yes"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Needs", emoji:"🛡️", subtitle:"Select the coverage that suits your trip.",
      fields:[
        { key:"medical",      label:"Medical Cover",     type:"select", options:["₹2L","₹5L","₹10L","₹50L","₹1Cr+"], required:true },
        { key:"baggage",      label:"Baggage Cover",     type:"radio",  options:["Yes","No"] },
        { key:"cancellation", label:"Trip Cancellation", type:"radio",  options:["Yes","No"] },
        { key:"delay",        label:"Flight Delay Cover",type:"radio",  options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  term:[
    { title:"Life Profile", emoji:"🧬", subtitle:"Basic details for your term plan.",
      fields:[
        { key:"age",    label:"Your Age",      type:"number", placeholder:"30", required:true },
        { key:"gender", label:"Gender",        type:"radio",  options:["Male","Female"], required:true },
        { key:"smoker", label:"Do you smoke?", type:"radio",  options:["No","Yes"], required:true },
        { key:"health", label:"Health Status", type:"radio",  options:["Excellent","Good","Average"] },
      ]},
    { title:"Cover & Term", emoji:"📅", subtitle:"Set your coverage amount and period.",
      fields:[
        { key:"income", label:"Annual Income",  type:"select", options:["Under ₹3L","₹3–5L","₹5–10L","₹10–25L","₹25L+"], required:true },
        { key:"cover",  label:"Cover Amount",   type:"select", options:["₹25L","₹50L","₹75L","₹1Cr","₹2Cr","₹5Cr"], required:true },
        { key:"term",   label:"Policy Term",    type:"select", options:["10 yrs","15 yrs","20 yrs","25 yrs","30 yrs"], required:true },
        { key:"payout", label:"Payout Type",    type:"radio",  options:["Lump Sum","Monthly Income","Both"] },
      ]},
    PERSONAL_STEP,
    { title:"Nominee & Riders", emoji:"👨‍👩‍👧", subtitle:"Add nominee and optional riders.",
      fields:[
        { key:"nominee",  label:"Nominee Name",       type:"text",   placeholder:"Priya Sharma", required:true },
        { key:"relation", label:"Relation",           type:"select", options:["Spouse","Child","Parent","Sibling","Other"], required:true },
        { key:"riders",   label:"Add-on Riders",      type:"select", options:["None","Critical Illness","Accidental Death","Waiver of Premium","All"] },
        { key:"return_p", label:"Return of Premium?", type:"radio",  options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  investment:[
    { title:"Investment Profile", emoji:"📈", subtitle:"Goals and risk appetite.",
      fields:[
        { key:"age",    label:"Your Age",           type:"number", placeholder:"35", required:true },
        { key:"goal",   label:"Investment Goal",    type:"select", options:["Tax Saving","Wealth Creation","Child Education","Retirement","Regular Income"], required:true },
        { key:"risk",   label:"Risk Appetite",      type:"radio",  options:["Low (Safe)","Medium","High (Aggressive)"], required:true },
        { key:"tenure", label:"Investment Horizon", type:"select", options:["3–5 yrs","5–10 yrs","10–15 yrs","15+ yrs"], required:true },
      ]},
    { title:"Budget & Tax", emoji:"💸", subtitle:"Monthly investment and tax status.",
      fields:[
        { key:"amount",  label:"Monthly Investment",   type:"select", options:["₹500–₹2K","₹2K–₹5K","₹5K–₹10K","₹10K+"], required:true },
        { key:"tax_80c", label:"80C Limit Exhausted?", type:"radio",  options:["No","Partially","Yes"] },
        { key:"existing",label:"Existing Investments", type:"select", options:["None","FD/RD","Mutual Funds","PPF/EPF","Multiple"] },
        { key:"life",    label:"Life Cover Needed?",   type:"radio",  options:["Yes","No"] },
      ]},
    PERSONAL_STEP,
    { title:"Plan Preferences", emoji:"🎯", subtitle:"Fine-tune your investment preferences.",
      fields:[
        { key:"payout",    label:"Payout Preference",  type:"radio",  options:["On Maturity","Regular Income","Both"], required:true },
        { key:"partial",   label:"Partial Withdrawal?", type:"radio", options:["Yes","No"] },
        { key:"guaranteed",label:"Guaranteed Returns?", type:"radio", options:["Yes","Market-linked OK"] },
        { key:"budget_flex",label:"Budget Flexibility", type:"radio", options:["Fixed Amount","Can Increase Over Time"] },
      ]},
    REVIEW_STEP,
  ],
  business:[
    { title:"Business Details", emoji:"🏢", subtitle:"Tell us about your business.",
      fields:[
        { key:"biz_type", label:"Business Type",    type:"select", options:["Sole Proprietor","Partnership","Pvt Ltd","LLP","Other"], required:true },
        { key:"industry", label:"Industry",         type:"select", options:["Retail","Manufacturing","IT/Tech","Healthcare","Hospitality","Finance","Other"], required:true },
        { key:"employees",label:"No. of Employees", type:"select", options:["1–10","11–50","51–200","200+"], required:true },
        { key:"city",     label:"Business City",    type:"text",   placeholder:"Mumbai", required:true },
      ]},
    { title:"Business Value", emoji:"💼", subtitle:"Turnover and asset details.",
      fields:[
        { key:"turnover",label:"Annual Turnover", type:"select", options:["Under ₹50L","₹50L–2Cr","₹2–10Cr","₹10Cr+"], required:true },
        { key:"assets",  label:"Asset Value",     type:"select", options:["Under ₹10L","₹10–50L","₹50L–2Cr","₹2Cr+"], required:true },
        { key:"loan",    label:"Business Loan?",  type:"radio",  options:["Yes","No"] },
        { key:"export",  label:"Export Business?",type:"radio",  options:["Yes","No"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Requirements", emoji:"🛡️", subtitle:"Select the most relevant covers.",
      fields:[
        { key:"liability",   label:"Public Liability",         type:"radio", options:["Yes","No"], required:true },
        { key:"fire",        label:"Fire & Property",          type:"radio", options:["Yes","No"], required:true },
        { key:"cyber",       label:"Cyber Risk Cover",         type:"radio", options:["Yes","No"] },
        { key:"group_health",label:"Group Health (Employees)?",type:"radio", options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  critical:[
    { title:"Health Profile", emoji:"❤️‍🩹", subtitle:"Health background for critical illness cover.",
      fields:[
        { key:"age",    label:"Your Age",       type:"number", placeholder:"35", required:true },
        { key:"gender", label:"Gender",         type:"radio",  options:["Male","Female"], required:true },
        { key:"smoker", label:"Do you smoke?",  type:"radio",  options:["No","Yes"], required:true },
        { key:"family", label:"Family History", type:"select", options:["None","Cancer","Heart Disease","Diabetes","Multiple"], required:true },
      ]},
    { title:"Cover Details", emoji:"🏥", subtitle:"Choose your coverage amount and conditions.",
      fields:[
        { key:"cover",     label:"Cover Amount",       type:"select", options:["₹5L","₹10L","₹25L","₹50L","₹1Cr"], required:true },
        { key:"conditions",label:"Conditions Covered", type:"select", options:["Cancer Only","Heart Only","Standard 36","Premium 64+"], required:true },
        { key:"waiting",   label:"Waiting Period OK?", type:"radio",  options:["Yes, understand","Need clarity"] },
        { key:"existing",  label:"Existing Health Plan?",type:"radio",options:["Yes","No"] },
      ]},
    PERSONAL_STEP,
    { title:"Preferences", emoji:"🎯", subtitle:"Customise your critical illness plan.",
      fields:[
        { key:"payout",  label:"Payout on Diagnosis?",type:"radio",  options:["Full Lump Sum","Staged Payout"], required:true },
        { key:"renewal", label:"Lifetime Renewable?",  type:"radio", options:["Yes","Not Priority"] },
        { key:"budget",  label:"Monthly Budget",       type:"select", options:["Under ₹500","₹500–₹1K","₹1K–₹2K","₹2K+"], required:true },
        { key:"riders",  label:"Add Riders?",          type:"radio",  options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  child:[
    { title:"Child Details", emoji:"👶", subtitle:"Details about your child and goal.",
      fields:[
        { key:"child_age",label:"Child's Age",   type:"number", placeholder:"5", required:true },
        { key:"goal_age", label:"Goal Age",      type:"select", options:["18 yrs","21 yrs","25 yrs"], required:true },
        { key:"goal",     label:"Goal Purpose",  type:"select", options:["Higher Education","Marriage","Business Setup","All"], required:true },
        { key:"corpus",   label:"Target Corpus", type:"select", options:["₹10–25L","₹25–50L","₹50L–1Cr","₹1Cr+"], required:true },
      ]},
    { title:"Savings & Risk", emoji:"💰", subtitle:"Investment capacity and risk preference.",
      fields:[
        { key:"monthly",label:"Monthly Budget",         type:"select", options:["₹500–₹2K","₹2K–₹5K","₹5K–₹10K","₹10K+"], required:true },
        { key:"risk",   label:"Risk Appetite",          type:"radio",  options:["Low","Medium","High"], required:true },
        { key:"waiver", label:"Premium Waiver on Death?",type:"radio", options:["Yes","No"] },
        { key:"returns",label:"Guaranteed Returns?",    type:"radio",  options:["Yes","Market-linked OK"] },
      ]},
    PERSONAL_STEP,
    { title:"Plan Preferences", emoji:"🎯", subtitle:"Customise your child savings plan.",
      fields:[
        { key:"partial",   label:"Partial Withdrawal?",  type:"radio", options:["Yes","No"] },
        { key:"life",      label:"Life Cover for Parent?",type:"radio",options:["Yes","No"] },
        { key:"payout",    label:"Payout Structure",     type:"radio", options:["Lump Sum at Goal","Milestone Payouts"] },
        { key:"study_loan",label:"Study Loan Backup?",   type:"radio", options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  pension:[
    { title:"Retirement Profile", emoji:"🧓", subtitle:"Plan your retirement income.",
      fields:[
        { key:"age",        label:"Current Age",           type:"number", placeholder:"40", required:true },
        { key:"retire_age", label:"Retirement Age",        type:"select", options:["50","55","60","65","70"], required:true },
        { key:"income_need",label:"Monthly Income Needed", type:"select", options:["₹20–30K","₹30–50K","₹50K–1L","₹1L+"], required:true },
        { key:"risk",       label:"Risk Appetite",         type:"radio",  options:["Low (Guaranteed)","Medium","High"], required:true },
      ]},
    { title:"Savings & Contributions", emoji:"💸", subtitle:"Existing savings and monthly plan.",
      fields:[
        { key:"savings", label:"Existing Retirement Savings",type:"select", options:["None","Under ₹5L","₹5–20L","₹20–50L","₹50L+"] },
        { key:"monthly", label:"Monthly Contribution",       type:"select", options:["₹1K–₹3K","₹3K–₹5K","₹5K–₹10K","₹10K+"], required:true },
        { key:"nps",     label:"NPS Account Active?",        type:"radio",  options:["Yes","No"] },
        { key:"tax",     label:"80CCC Tax Benefit Needed?",  type:"radio",  options:["Yes","Not Priority"] },
      ]},
    PERSONAL_STEP,
    { title:"Annuity Preferences", emoji:"📅", subtitle:"How you want retirement income.",
      fields:[
        { key:"annuity",  label:"Annuity Type",       type:"radio",  options:["Life Annuity","Joint (Spouse)","Return of Purchase Price"], required:true },
        { key:"frequency",label:"Payout Frequency",   type:"radio",  options:["Monthly","Quarterly","Annually"], required:true },
        { key:"legacy",   label:"Legacy Planning?",   type:"radio",  options:["Yes","No"] },
        { key:"inflation",label:"Inflation Protection?",type:"radio",options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
};

// ─── Plans Data ───────────────────────────────────────────────────────────────
const PLANS: Record<string,{name:string;price:string;per:string;badge:string|null;cover:string;features:string[];accent:string;recommended:boolean}[]> = {
  health:[
    { name:"Basic Care",  price:"₹399",  per:"/mo", badge:null,          cover:"₹3 Lakhs",  accent:B.gray,    recommended:false, features:["Hospitalisation","Day care","Ambulance","Basic OPD"] },
    { name:"Active Plus", price:"₹799",  per:"/mo", badge:"Most Bought", cover:"₹10 Lakhs", accent:B.coral,   recommended:true,  features:["In-patient cover","OPD + Diagnostics","Mental health","Annual health check","No-claim bonus","10,000+ hospitals"] },
    { name:"Total Health",price:"₹1,499",per:"/mo", badge:"Premium",     cover:"₹1 Crore",  accent:"#7C6EF5", recommended:false, features:["Unlimited restore","Maternity","Critical illness","Global treatment","Waiver of premium"] },
  ],
  car:[
    { name:"Third Party",     price:"₹2,094",per:"/yr", badge:null,         cover:"IRDAI Mandated",accent:B.gray,    recommended:false, features:["Legally required","TP bodily injury","TP property damage","Basic PA cover"] },
    { name:"Comprehensive",   price:"₹8,499",per:"/yr", badge:"Best Value", cover:"IDV Based",     accent:"#7c3aed", recommended:true,  features:["Full own damage","Theft & fire","Flood & earthquake","Zero dep available","24/7 RSA","500+ cashless garages"] },
    { name:"Pay As You Drive",price:"₹4,999",per:"/yr", badge:null,         cover:"IDV Based",     accent:"#059669", recommended:false, features:["Usage-based pricing","Low mileage savings","OD cover included","Telematics based","Save up to 40%"] },
  ],
  bike:[
    { name:"Third Party",   price:"₹714",  per:"/yr", badge:null,           cover:"IRDAI Mandated",accent:B.gray,    recommended:false, features:["Mandatory by law","Third party liability","Personal accident","No own damage"] },
    { name:"Comprehensive", price:"₹2,499",per:"/yr", badge:"Most Popular", cover:"Market Value",  accent:"#059669", recommended:true,  features:["Own damage + TP","Theft protection","Natural calamity","Zero dep add-on","Cashless garages"] },
    { name:"Standalone OD", price:"₹1,299",per:"/yr", badge:null,           cover:"Market Value",  accent:"#7C6EF5", recommended:false, features:["Own damage only","No TP cover","Add-ons available","Engine protect"] },
  ],
  life:[
    { name:"Pure Term",     price:"₹499",  per:"/mo", badge:null,           cover:"₹50 Lakhs",accent:B.gray,    recommended:false, features:["Low cost cover","Death benefit only","Flexible term","Online process"] },
    { name:"Term + Return", price:"₹1,199",per:"/mo", badge:"Recommended",  cover:"₹1 Crore",  accent:"#2d6a9f", recommended:true,  features:["Death benefit","Return of premium","Tax benefit 80C","Critical illness rider","Waiver on disability"] },
    { name:"Smart Protect", price:"₹899",  per:"/mo", badge:null,           cover:"₹75 Lakhs", accent:B.teal,    recommended:false, features:["Increasing cover","Milestone based","Accidental cover","Spouse add-on"] },
  ],
  home:[
    { name:"Structure Only",price:"₹999",  per:"/yr", badge:null,        cover:"₹20 Lakhs",accent:B.gray,    recommended:false, features:["Building cover","Fire & lightning","Earthquake","Flood","No contents"] },
    { name:"Home Shield",   price:"₹1,799",per:"/yr", badge:"Best Value",cover:"₹50 Lakhs",accent:"#d97706", recommended:true,  features:["Structure + contents","Fire & theft","Electrical breakdown","Tenant liability","Jewellery cover"] },
    { name:"Elite Home",    price:"₹3,499",per:"/yr", badge:null,        cover:"₹1 Crore", accent:"#7C6EF5", recommended:false, features:["Premium cover","All risks","Luxury contents","Art & valuables","Smart home devices"] },
  ],
  travel:[
    { name:"Basic Shield",  price:"₹299",  per:"/trip",badge:null,           cover:"₹2 Lakhs",  accent:B.gray,    recommended:false, features:["Medical emergency","Trip cancellation","Lost baggage","Passport loss"] },
    { name:"Explorer Plus", price:"₹699",  per:"/trip",badge:"Most Popular",  cover:"₹10 Lakhs", accent:"#0891b2", recommended:true,  features:["Medical ₹10L","Trip delay","Adventure sports","24/7 helpline","Home burglary"] },
    { name:"Global Elite",  price:"₹1,299",per:"/trip",badge:"Premium",       cover:"Unlimited",  accent:"#d97706", recommended:false, features:["Unlimited medical","Evacuation","Pre-existing cover","Business travel","Concierge"] },
  ],
  term:[
    { name:"Pure Term",   price:"₹499",  per:"/mo", badge:null,          cover:"₹50 Lakhs",accent:B.gray,    recommended:false, features:["Low cost","Death benefit","Flexible term","Online process"] },
    { name:"Term Shield", price:"₹899",  per:"/mo", badge:"Recommended", cover:"₹1 Crore", accent:"#1a3c5e", recommended:true,  features:["Life cover","Critical illness","Accidental death","Waiver on disability","Joint cover"] },
    { name:"Smart Term",  price:"₹1,299",per:"/mo", badge:null,          cover:"₹2 Crore", accent:B.teal,    recommended:false, features:["Increasing cover","Spouse rider","Income payout","Return of premium option"] },
  ],
  investment:[
    { name:"ELSS Fund",      price:"₹500",  per:"/mo", badge:null,           cover:"Market-linked", accent:B.gray,    recommended:false, features:["80C tax saving","3yr lock-in","High return potential","SIP mode"] },
    { name:"ULIP Growth",    price:"₹2,000",per:"/mo", badge:"Best Returns", cover:"Life + Growth",  accent:"#16a34a", recommended:true,  features:["Life cover included","Market-linked returns","80C benefit","Partial withdrawal","Fund switch"] },
    { name:"Guaranteed Plan",price:"₹3,000",per:"/mo", badge:null,           cover:"Guaranteed",    accent:"#7C6EF5", recommended:false, features:["Guaranteed returns","Zero market risk","Life cover","Tax free maturity","Loan facility"] },
  ],
  business:[
    { name:"SME Essentials",price:"₹2,499",per:"/mo", badge:null,           cover:"₹25 Lakhs",accent:B.gray,    recommended:false, features:["Fire & property","TP liability","Employee accident","Legal expenses"] },
    { name:"Biz Shield Pro",price:"₹5,999",per:"/mo", badge:"Most Popular", cover:"₹1 Crore", accent:"#475569", recommended:true,  features:["Full property cover","Public liability","Cyber risk","Key person cover","Group health","Business interruption"] },
    { name:"Enterprise",    price:"Custom",per:"",     badge:"Enterprise",   cover:"Customised",accent:"#7C6EF5", recommended:false, features:["Unlimited liability","D&O cover","Trade credit","Customised SLA","Legal shield","Dedicated RM 24/7"] },
  ],
  critical:[
    { name:"Basic Shield",  price:"₹399",  per:"/mo", badge:null,           cover:"₹5 Lakhs",  accent:B.gray,    recommended:false, features:["36 critical illnesses","Lump sum payout","Tax benefit 80D","1yr waiting period"] },
    { name:"Critical Plus", price:"₹799",  per:"/mo", badge:"Recommended",  cover:"₹25 Lakhs", accent:"#dc2626", recommended:true,  features:["64+ illnesses","Lump sum on diagnosis","No claim bonus","Second medical opinion","Wellness benefits"] },
    { name:"Comprehensive", price:"₹1,499",per:"/mo", badge:"Premium",      cover:"₹1 Crore",  accent:"#7C6EF5", recommended:false, features:["100+ illnesses","Relapse cover","International treatment","Premium waiver","Lifelong renewable"] },
  ],
  child:[
    { name:"Future Star",  price:"₹1,000",per:"/mo", badge:null,           cover:"₹10 Lakhs",accent:B.gray,    recommended:false, features:["Guaranteed returns","Life cover","Premium waiver","Education payouts"] },
    { name:"Smart Child",  price:"₹2,500",per:"/mo", badge:"Most Popular", cover:"₹25 Lakhs",accent:"#f59e0b", recommended:true,  features:["Market-linked growth","Life cover","Premium waiver","Flexible withdrawals","Loyalty additions","Tax free maturity"] },
    { name:"Scholar Max",  price:"₹5,000",per:"/mo", badge:"Premium",      cover:"₹50 Lakhs",accent:"#7C6EF5", recommended:false, features:["Maximum corpus","Guaranteed + market","Multiple payouts","Study loan backup","Wealth transfer"] },
  ],
  pension:[
    { name:"NPS Lite",     price:"₹1,000",per:"/mo", badge:null,           cover:"Market-linked",     accent:B.gray,    recommended:false, features:["Government backed","80CCD benefit","Low charges","Flexible contribution"] },
    { name:"Pension Plus", price:"₹3,000",per:"/mo", badge:"Recommended",  cover:"Guaranteed Income", accent:"#7c3aed", recommended:true,  features:["Guaranteed monthly income","Joint life option","Return of corpus","80CCC benefit","Lifelong income"] },
    { name:"Retire Rich",  price:"₹6,000",per:"/mo", badge:"Premium",      cover:"High Corpus",       accent:B.teal,    recommended:false, features:["Maximum corpus","ULIP + annuity","Wealth + income","Critical illness cover","Dedicated RM"] },
  ],
};

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Marquee Trust Strip ──────────────────────────────────────────────────────
function MarqueeTrust() {
  // Double items for seamless loop
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <div style={{ background: B.white, borderTop:`1px solid ${B.border}`, borderBottom:`1px solid ${B.border}`, overflow:"hidden", position:"relative" }}>
      {/* Left & right fade masks */}
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:80, background:`linear-gradient(to right, ${B.white}, transparent)`, zIndex:2, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:80, background:`linear-gradient(to left, ${B.white}, transparent)`, zIndex:2, pointerEvents:"none" }}/>

      <div style={{ display:"flex", width:"max-content", animation:"marqueeScroll 36s linear infinite" }}>
        {items.map((it, idx) => (
          <div key={idx} style={{
            display:"flex", alignItems:"center", gap:12,
            padding:"16px 28px", borderRight:`1px solid ${B.border}`, flexShrink:0,
          }}>
            {/* Premium icon in teal circle */}
            <span style={{
              width:40, height:40, borderRadius:"50%",
              background:`linear-gradient(135deg, ${B.teal}18, ${B.teal}30)`,
              border:`1.5px solid ${B.teal}40`,
              display:"flex", alignItems:"center", justifyContent:"center",
              color: B.teal, flexShrink:0,
            }}>
              <span style={{ width:18, height:18, display:"flex" }}><it.Icon/></span>
            </span>
            <div>
              <p style={{ fontSize:"0.78rem", fontWeight:700, color:B.charcoal, margin:0, fontFamily:"'Outfit', sans-serif", whiteSpace:"nowrap" }}>{it.label}</p>
              <p style={{ fontSize:"0.66rem", color:B.gray, margin:0, fontFamily:"'Outfit', sans-serif", whiteSpace:"nowrap" }}>{it.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const { ref, inView } = useInView(0.2);
  const stats = [
    { value:"50+",     label:"Insurance Partners" },
    { value:"2Cr+",    label:"Happy Customers"    },
    { value:"₹500Cr+", label:"Claims Settled"     },
    { value:"4.8★",    label:"App Rating"         },
  ];
  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:B.offwhite, borderTop:`1px solid ${B.border}` }}>
      {stats.map((s, i) => (
        <div key={s.label} style={{
          display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          padding:"36px 16px", borderRight: i < stats.length-1 ? `1px solid ${B.border}` : "none",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
          transition:`opacity 0.7s ease ${i*0.12}s, transform 0.7s ease ${i*0.12}s`,
          position:"relative",
        }}>
          <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", height:2.5, background:B.teal, borderRadius:999, width: inView ? "50%" : 0, transition:`width 0.65s cubic-bezier(0.77,0,0.175,1) ${0.3+i*0.1}s` }}/>
          <span style={{ fontFamily:"'Outfit', sans-serif", fontSize:"clamp(26px,3vw,42px)", fontWeight:800, color:B.charcoal, lineHeight:1.1, letterSpacing:"-0.02em" }}>{s.value}</span>
          <span style={{ fontSize:"0.68rem", fontWeight:700, color:B.gray, letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"'Outfit', sans-serif" }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb() {
  return (
    <nav style={{ background:B.offwhite, borderBottom:`1px solid ${B.border}` }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"10px 24px", display:"flex", alignItems:"center", flexWrap:"wrap" }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:4, color:B.teal, textDecoration:"none", fontSize:"0.78rem", fontWeight:600, fontFamily:"'Outfit', sans-serif" }}>
          <span style={{ width:12, height:12, display:"flex" }}><Icons.Home/></span>
          Home
        </Link>
        {[{ label:"Insurance", href:"/insurance" }, { label:"All Plans" }].map((it, i) => (
          <span key={i} style={{ display:"flex", alignItems:"center" }}>
            <span style={{ width:10, height:10, margin:"0 5px", color:B.gray, display:"flex" }}><Icons.ChevronRight/></span>
            {it.href ? (
              <Link href={it.href} style={{ color:B.teal, textDecoration:"none", fontSize:"0.78rem", fontWeight:600, fontFamily:"'Outfit', sans-serif" }}>{it.label}</Link>
            ) : (
              <span style={{ color:B.charcoal, fontSize:"0.78rem", fontWeight:700, fontFamily:"'Outfit', sans-serif" }}>{it.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
      <span style={{ display:"block", width:28, height:2, background:B.teal, borderRadius:2, flexShrink:0 }}/>
      <span style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:"1.15rem", fontWeight:800, color:B.charcoal, whiteSpace:"nowrap", letterSpacing:"-0.01em" }}>{text}</span>
      <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${B.border}, transparent)` }}/>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ activeId, onSelect }: { activeId?:string; onSelect:(id:string)=>void }) {
  const [hov, setHov] = useState<string|null>(null);
  const cat = INSURANCE_CATS.find(c => c.id === activeId);
  return (
    <aside>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${B.navy},${B.navyMid})`, borderRadius:"14px 14px 0 0", padding:"16px 18px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
          <span style={{ width:20, height:20, display:"flex", color:B.teal }}><Icons.Shield/></span>
          <h3 style={{ color:B.white, fontFamily:"'Playfair Display', serif", fontSize:"0.95rem", fontWeight:700, letterSpacing:"0.03em", margin:0 }}>Insurance Types</h3>
        </div>
        <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"0.68rem", margin:0, fontFamily:"'Outfit', sans-serif" }}>Click any type to get a quote</p>
      </div>
      {/* Nav */}
      <nav style={{ background:B.white, border:`1px solid ${B.border}`, borderTop:"none", borderRadius:"0 0 14px 14px", overflow:"hidden", boxShadow:"0 4px 20px rgba(26,60,94,0.07)" }}>
        {SIDEBAR_ITEMS.map((item, idx) => {
          const isActive = activeId === item.id;
          const isHov    = hov === item.id;
          const color    = INSURANCE_CATS.find(c=>c.id===item.id)?.color ?? B.teal;
          return (
            <button key={item.id} onClick={() => onSelect(item.id)}
              onMouseEnter={() => setHov(item.id)} onMouseLeave={() => setHov(null)}
              style={{
                all:"unset", display:"flex", alignItems:"center", gap:9, padding:"11px 14px", width:"100%", boxSizing:"border-box", cursor:"pointer",
                borderBottom: idx < SIDEBAR_ITEMS.length-1 ? `1px solid #f0f4f8` : "none",
                background: isActive ? color+"10" : isHov ? "#f7fafd" : B.white,
                position:"relative", transition:"background 0.15s",
              }}
            >
              {isActive && <span style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:color, borderRadius:"0 2px 2px 0" }}/>}
              <span style={{ width:16, height:16, display:"flex", color: isActive ? color : isHov ? B.navyMid : B.gray, flexShrink:0, transition:"color 0.15s" }}>
                <item.Icon/>
              </span>
              <span style={{ fontSize:"0.8rem", fontWeight: isActive ? 700 : 500, fontFamily:"'Outfit', sans-serif", color: isActive ? color : isHov ? B.navyMid : "#4a5568", transition:"color 0.15s" }}>
                {item.label}
              </span>
              <span style={{ width:10, height:10, display:"flex", marginLeft:"auto", color: isActive ? color : B.gray, opacity: isActive||isHov ? 1 : 0.3, flexShrink:0 }}>
                <Icons.ChevronRight/>
              </span>
            </button>
          );
        })}
      </nav>
      {/* Call CTA */}
      <div style={{ marginTop:16, background:"linear-gradient(135deg,#E8503A,#f7931e)", borderRadius:14, padding:"18px 16px", textAlign:"center", boxShadow:"0 6px 24px rgba(232,80,58,0.25)" }}>
        <span style={{ width:28, height:28, display:"inline-flex", margin:"0 auto 8px", color:"#fff" }}><Icons.Phone/></span>
        <p style={{ color:B.white, fontWeight:700, fontSize:"0.85rem", margin:"0 0 3px", fontFamily:"'Playfair Display', serif" }}>Need Expert Help?</p>
        <p style={{ color:"rgba(255,255,255,0.8)", fontSize:"0.68rem", margin:"0 0 12px", lineHeight:1.5, fontFamily:"'Outfit', sans-serif" }}>Licensed advisors available 24/7</p>
        <a href="tel:1800-000-0000" style={{ display:"block", background:B.white, color:"#E8503A", padding:"8px 0", borderRadius:9, fontWeight:800, fontSize:"0.82rem", textDecoration:"none", fontFamily:"'Outfit', sans-serif" }}>
          1800-000-0000
        </a>
      </div>
    </aside>
  );
}

// ─── Icon Card ────────────────────────────────────────────────────────────────
function IconCard({ cat, onSelect }: { cat: typeof INSURANCE_CATS[0]; onSelect:(id:string)=>void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={() => onSelect(cat.id)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      all:"unset", display:"flex", flexDirection:"column", alignItems:"center", gap:9,
      padding:"20px 10px 16px", borderRadius:16, cursor:"pointer",
      border:`1.5px solid ${hov ? cat.color+"55" : cat.color+"22"}`,
      background: hov ? cat.bg : B.white, color:cat.color,
      transform: hov ? "translateY(-5px)" : "translateY(0)",
      boxShadow: hov ? `0 10px 28px ${cat.color}22` : "0 2px 8px rgba(0,0,0,0.04)",
      transition:"all 0.22s cubic-bezier(0.22,1,0.36,1)", textAlign:"center",
    }}>
      <span style={{ width:52, height:52, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", background: hov ? cat.color+"18" : cat.bg, transition:"background 0.22s" }}>
        <span style={{ width:28, height:28, display:"flex", color:cat.color }}><cat.Icon/></span>
      </span>
      <span style={{ fontSize:"0.72rem", fontWeight:700, fontFamily:"'Outfit', sans-serif", lineHeight:1.3, color: hov ? cat.color : B.charcoal, transition:"color 0.2s" }}>
        {cat.label}
      </span>
    </button>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────
function FormField({ field, value, onChange, accent }: { field:Field; value:string; onChange:(v:string)=>void; accent:string }) {
  const base: React.CSSProperties = {
    fontFamily:"'Outfit', sans-serif", fontSize:"0.875rem", fontWeight:500,
    color:B.charcoal, background:"#f8fafc",
    border:`1.5px solid ${B.border}`, borderRadius:10, outline:"none", width:"100%",
    transition:"border-color 0.2s, box-shadow 0.2s",
  };
  const onFocus = (e: React.FocusEvent<any>) => { e.target.style.borderColor=accent; e.target.style.boxShadow=`0 0 0 3px ${accent}18`; };
  const onBlur  = (e: React.FocusEvent<any>) => { e.target.style.borderColor=B.border; e.target.style.boxShadow="none"; };
  const Label = () => (
    <label style={{ fontSize:"0.68rem", fontWeight:700, color:B.charcoal, textTransform:"uppercase", letterSpacing:"0.05em", fontFamily:"'Outfit', sans-serif" }}>
      {field.label}{field.required && <span style={{ color:accent, marginLeft:2 }}>*</span>}
    </label>
  );

  if (field.type === "radio") return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      <Label/>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {field.options?.map(opt => (
          <button key={opt} type="button" onClick={() => onChange(opt)} style={{
            all:"unset", padding:"7px 13px", borderRadius:8, cursor:"pointer",
            fontSize:"0.78rem", fontWeight:600, fontFamily:"'Outfit', sans-serif",
            border:`1.5px solid ${value===opt ? accent : B.border}`,
            background: value===opt ? accent+"14" : B.white,
            color: value===opt ? accent : "#555",
            display:"flex", alignItems:"center", gap:5, transition:"all 0.18s",
          }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:accent, opacity:value===opt?1:0, transform:value===opt?"scale(1)":"scale(0)", transition:"all 0.2s", flexShrink:0 }}/>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  if (field.type === "select") return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      <Label/>
      <select value={value} onChange={e=>onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} style={{
        ...base, height:46, padding:"0 36px 0 14px", appearance:"none", cursor:"pointer",
        backgroundImage:`url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 5.25l3.5 3.5 3.5-3.5' stroke='%23B5B5B5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center",
      }}>
        <option value="">Select…</option>
        {field.options?.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      <Label/>
      <input type={field.type==="number"?"number":field.type==="date"?"date":field.type==="email"?"email":field.type==="tel"?"tel":"text"}
        placeholder={field.placeholder} value={value}
        onChange={e=>onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur}
        style={{ ...base, height:46, padding:"0 14px" }}
      />
    </div>
  );
}

// ─── Review Summary ───────────────────────────────────────────────────────────
function ReviewSummary({ formData, steps }: { formData:Record<string,string>; steps:Step[] }) {
  const allFields = steps.slice(0,-1).flatMap(s=>s.fields);
  const filled    = allFields.filter(f=>formData[f.key]);
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 20px" }}>
      {filled.map(f => (
        <div key={f.key} style={{ borderBottom:`1px solid ${B.border}`, paddingBottom:8 }}>
          <p style={{ fontSize:"0.65rem", fontWeight:700, color:B.gray, textTransform:"uppercase", letterSpacing:"0.05em", margin:"0 0 2px", fontFamily:"'Outfit', sans-serif" }}>{f.label}</p>
          <p style={{ fontSize:"0.875rem", fontWeight:600, color:B.charcoal, margin:0, fontFamily:"'Outfit', sans-serif" }}>{formData[f.key]}</p>
        </div>
      ))}
      {filled.length===0 && <p style={{ color:B.gray, fontSize:"0.85rem", gridColumn:"1/-1", fontFamily:"'Outfit', sans-serif" }}>No details filled yet.</p>}
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────
function PlanCard({ plan, delay }: { plan:typeof PLANS["health"][0]; delay:number }) {
  const [bought, setBought] = useState(false);
  return (
    <div style={{
      background:B.white, borderRadius:20,
      border:`1.5px solid ${plan.recommended ? plan.accent+"55" : B.border}`,
      padding:"24px 20px 20px", display:"flex", flexDirection:"column",
      boxShadow: plan.recommended ? `0 8px 32px ${plan.accent}20` : "0 2px 12px rgba(0,0,0,0.05)",
      transform: plan.recommended ? "translateY(-4px)" : "none",
      position:"relative", overflow:"hidden",
      animation:`planIn 0.5s ease ${delay}s both`,
    }}>
      {plan.recommended && <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${plan.accent},${plan.accent}99)` }}/>}
      {plan.badge && (
        <div style={{ position:"absolute", top:14, right:14, background: plan.recommended?plan.accent:"#f0f4f8", color:plan.recommended?B.white:B.charcoal, fontSize:"0.62rem", fontWeight:800, letterSpacing:"0.07em", textTransform:"uppercase", padding:"3px 10px", borderRadius:100, fontFamily:"'Outfit', sans-serif" }}>{plan.badge}</div>
      )}
      <p style={{ fontFamily:"'Playfair Display', serif", fontSize:"1.05rem", fontWeight:800, color:B.charcoal, margin:"0 0 3px" }}>{plan.name}</p>
      <p style={{ fontSize:"0.62rem", fontWeight:700, color:B.gray, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 10px", fontFamily:"'Outfit', sans-serif" }}>{plan.cover} cover</p>
      <div style={{ display:"flex", alignItems:"baseline", gap:3, marginBottom:14 }}>
        <span style={{ fontFamily:"'Playfair Display', serif", fontSize:"1.7rem", fontWeight:900, color:plan.accent, lineHeight:1 }}>{plan.price}</span>
        {plan.per && <span style={{ fontSize:"0.75rem", color:B.gray, fontWeight:500, fontFamily:"'Outfit', sans-serif" }}>{plan.per}</span>}
      </div>
      <div style={{ height:1, background:plan.accent, opacity:0.18, borderRadius:999, margin:"0 0 14px" }}/>
      <ul style={{ listStyle:"none", margin:"0 0 18px", padding:0, display:"flex", flexDirection:"column", gap:7, flex:1 }}>
        {plan.features.map(f => (
          <li key={f} style={{ display:"flex", gap:7, fontSize:"0.75rem", color:"#555", lineHeight:1.4, fontFamily:"'Outfit', sans-serif" }}>
            <span style={{ color:plan.accent, fontWeight:900, flexShrink:0 }}>✓</span>{f}
          </li>
        ))}
      </ul>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={() => setBought(true)} style={{
          flex:1, height:42, border:"none", borderRadius:10, cursor:"pointer",
          background: bought?"#22c55e":plan.accent, color:B.white,
          fontFamily:"'Outfit', sans-serif", fontSize:"0.82rem", fontWeight:700, transition:"all 0.25s",
        }}>{bought?"✓ Added":"Buy Now"}</button>
        <button style={{ height:42, padding:"0 14px", border:`1.5px solid ${B.border}`, borderRadius:10, background:"transparent", cursor:"pointer", fontSize:"0.72rem", fontWeight:700, color:B.gray, fontFamily:"'Outfit', sans-serif", transition:"all 0.2s" }}>Advise</button>
      </div>
    </div>
  );
}

// ─── 5-Step Insurance Form ────────────────────────────────────────────────────
function InsuranceForm({ categoryId, onClose }: { categoryId:string; onClose:()=>void }) {
  const cat    = INSURANCE_CATS.find(c=>c.id===categoryId);
  const accent = cat?.color ?? B.teal;
  const steps  = FORMS[categoryId] ?? FORMS["health"];
  const plans  = PLANS[categoryId] ?? PLANS["health"];
  const TOTAL  = steps.length;

  const [step, setStep]   = useState(0);
  const [data, setData]   = useState<Record<string,string>>({});
  const [done, setDone]   = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const current  = steps[step];
  const isLast   = step === TOTAL - 1;
  const isReview = current.title === "Review & Confirm";
  const progress = Math.round((step / (TOTAL-1)) * 100);

  const setField = (k:string, v:string) => setData(p=>({...p,[k]:v}));
  const next = () => { if (isLast) { setDone(true); return; } setStep(s=>s+1); topRef.current?.scrollIntoView({behavior:"smooth",block:"start"}); };
  const back = () => { if (step===0) { onClose(); return; } setStep(s=>s-1); topRef.current?.scrollIntoView({behavior:"smooth",block:"start"}); };

  return (
    <div ref={topRef} style={{ background:B.white, borderRadius:20, border:`1px solid ${B.border}`, boxShadow:"0 8px 48px rgba(0,0,0,0.08)", overflow:"hidden", animation:"formSlideIn 0.4s cubic-bezier(0.22,1,0.36,1) both" }}>
      {/* Form header */}
      <div style={{ background:`linear-gradient(135deg,${B.navy},${accent})`, padding:"18px 22px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {cat && <span style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}><cat.Icon/></span>}
          <div>
            <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.65rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", margin:0, fontFamily:"'Outfit', sans-serif" }}>Get Quote</p>
            <p style={{ color:B.white, fontFamily:"'Playfair Display', serif", fontSize:"1rem", fontWeight:800, margin:0 }}>{cat?.label ?? "Insurance"}</p>
          </div>
        </div>
        <button onClick={onClose} style={{ all:"unset", color:"rgba(255,255,255,0.6)", cursor:"pointer", fontSize:"1.1rem", width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:6 }}>✕</button>
      </div>

      {/* Step indicator */}
      <div style={{ padding:"14px 22px 0", background:B.offwhite, borderBottom:`1px solid ${B.border}` }}>
        <div style={{ display:"flex", alignItems:"center", marginBottom:12 }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:i<step?"pointer":"default" }} onClick={() => i<step && setStep(i)}>
                <div style={{
                  width:28, height:28, borderRadius:"50%", fontSize:"0.68rem", fontWeight:800,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background: i<step?"#22c55e" : i===step?accent:"#e2e8f0",
                  color: i<=step?B.white:B.gray,
                  border:`2px solid ${i===step?accent:"transparent"}`,
                  boxShadow: i===step?`0 0 0 3px ${accent}22`:"none",
                  transition:"all 0.25s", fontFamily:"'Outfit', sans-serif",
                }}>
                  {i<step?"✓":i+1}
                </div>
                <span style={{ fontSize:"0.9rem" }}>{s.emoji}</span>
              </div>
              {i < steps.length-1 && <div style={{ flex:1, height:2, background:i<step?"#22c55e":"#e2e8f0", margin:"0 4px", marginBottom:16, transition:"background 0.3s" }}/>}
            </React.Fragment>
          ))}
        </div>
        {/* Progress bar */}
        <div style={{ height:3, background:"#e2e8f0", borderRadius:999, marginBottom:0 }}>
          <div style={{ height:"100%", width:`${progress}%`, background:`linear-gradient(90deg,${accent},${accent}bb)`, borderRadius:999, transition:"width 0.5s cubic-bezier(0.22,1,0.36,1)" }}/>
        </div>
      </div>

      {/* Step content */}
      {!done ? (
        <div style={{ padding:"22px", animation:"stepFade 0.3s ease both" }} key={step}>
          <div style={{ marginBottom:18 }}>
            <p style={{ fontSize:"0.65rem", fontWeight:700, color:accent, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 4px", fontFamily:"'Outfit', sans-serif" }}>Step {step+1} of {TOTAL}</p>
            <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:"1.2rem", fontWeight:800, color:B.charcoal, margin:"0 0 4px" }}>{current.title}</h3>
            <p style={{ fontSize:"0.78rem", color:B.gray, margin:0, lineHeight:1.6, fontFamily:"'Outfit', sans-serif" }}>{current.subtitle}</p>
          </div>

          {isReview ? (
            <ReviewSummary formData={data} steps={steps}/>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px 18px" }}>
              {current.fields.map(f => (
                <div key={f.key} style={{ gridColumn: f.type==="radio" && (f.options?.length??0)>2 ? "1/-1" : "auto" }}>
                  <FormField field={f} value={data[f.key]??""} onChange={v=>setField(f.key,v)} accent={accent}/>
                </div>
              ))}
            </div>
          )}

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:22, paddingTop:16, borderTop:`1px solid ${B.border}` }}>
            <button onClick={back} style={{ all:"unset", cursor:"pointer", fontSize:"0.75rem", fontWeight:700, color:B.gray, display:"flex", alignItems:"center", gap:4, fontFamily:"'Outfit', sans-serif", letterSpacing:"0.04em" }}>
              <span style={{ width:11, height:11, display:"flex" }}><Icons.ChevronLeft/></span>
              {step===0?"Cancel":"Back"}
            </button>
            <button onClick={next} style={{ all:"unset", cursor:"pointer", background:accent, color:B.white, padding:"10px 22px", borderRadius:10, fontFamily:"'Outfit', sans-serif", fontSize:"0.85rem", fontWeight:700, display:"flex", alignItems:"center", gap:6, boxShadow:`0 4px 14px ${accent}40`, transition:"all 0.2s" }}>
              {isLast?"See My Plans":"Continue"}
              <span style={{ width:11, height:11, display:"flex" }}><Icons.ChevronRight/></span>
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding:22 }}>
          <div style={{ background:`linear-gradient(135deg,${accent},${accent}cc)`, borderRadius:14, padding:"16px 20px", display:"flex", alignItems:"center", gap:14, marginBottom:22, boxShadow:`0 6px 20px ${accent}30` }}>
            <span style={{ fontSize:"2rem" }}>🎉</span>
            <div>
              <p style={{ color:B.white, fontFamily:"'Playfair Display', serif", fontWeight:800, fontSize:"1rem", margin:"0 0 3px" }}>Your plans are ready, {data["name"]||"there"}!</p>
              <p style={{ color:"rgba(255,255,255,0.78)", fontSize:"0.72rem", margin:0, fontFamily:"'Outfit', sans-serif" }}>Based on your profile · {TOTAL} steps completed · Sorted by best fit</p>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {plans.map((plan,i) => <PlanCard key={plan.name} plan={plan} delay={i*0.08}/>)}
          </div>
          <button onClick={() => { setDone(false); setStep(0); setData({}); }} style={{ all:"unset", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5, marginTop:16, color:B.gray, fontSize:"0.75rem", fontWeight:700, fontFamily:"'Outfit', sans-serif" }}>
            <span style={{ width:10, height:10, display:"flex" }}><Icons.ChevronLeft/></span>
            Edit Details
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InsurancePage() {
  const [activeForm, setActiveForm] = useState<string|null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const openForm = (id: string) => {
    setActiveForm(id);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 80);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        @keyframes marqueeScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes formSlideIn   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes stepFade      { from{opacity:0;transform:translateX(8px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes planIn        { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroFadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        .ins-hero {
          background: linear-gradient(135deg, #0f2744 0%, #1a3c5e 55%, #2d6a9f 100%);
          padding: 60px 24px 52px; position:relative; overflow:hidden;
        }
        .ins-hero-inner { max-width:1280px; margin:0 auto; position:relative; z-index:1; }
        .ins-hero-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:0.68rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;
          color:${B.teal}; font-family:'Outfit',sans-serif; margin-bottom:20px;
        }
        .ins-hero-eyebrow::before { content:''; display:block; width:24px; height:2px; background:${B.teal}; border-radius:2px; }
        .ins-hero-title {
          font-family:'Playfair Display',serif; color:${B.white};
          font-size:clamp(2.2rem,4.5vw,3.4rem); font-weight:900;
          margin:0 0 16px; line-height:1.1; letter-spacing:-0.02em;
          animation: heroFadeUp 0.8s ease 0.1s both;
        }
        .ins-hero-title em { color:${B.teal}; font-style:italic; }
        .ins-hero-sub {
          color:rgba(255,255,255,0.72); font-size:0.95rem; font-family:'Outfit',sans-serif;
          max-width:500px; line-height:1.75; margin:0 0 28px;
          animation: heroFadeUp 0.8s ease 0.2s both;
        }
        .ins-pills { display:flex; gap:7px; flex-wrap:wrap; animation: heroFadeUp 0.8s ease 0.3s both; }
        .ins-pill {
          font-size:0.68rem; font-weight:600; font-family:'Outfit',sans-serif;
          color:rgba(255,255,255,0.88); padding:5px 13px; border-radius:100px;
          background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);
        }
        .ins-hero-decor1 { position:absolute; top:-100px; right:-100px; width:400px; height:400px; border-radius:50%; background:rgba(45,191,191,0.07); pointer-events:none; }
        .ins-hero-decor2 { position:absolute; bottom:-70px; right:220px; width:220px; height:220px; border-radius:50%; background:rgba(255,255,255,0.03); pointer-events:none; }
        .ins-hero-decor3 { position:absolute; top:30px; left:-60px; width:160px; height:160px; border-radius:50%; background:rgba(45,191,191,0.05); pointer-events:none; }

        .ins-body { background:${B.offwhite}; }
        .ins-layout { max-width:1280px; margin:0 auto; padding:32px 24px 60px; display:flex; gap:26px; align-items:flex-start; }
        .ins-sidebar-col { width:236px; flex-shrink:0; position:sticky; top:76px; }
        .ins-main { flex:1; min-width:0; }
        .ins-section { margin-bottom:32px; }
        .ins-icon-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(108px,1fr)); gap:12px; }

        @media(max-width:900px) { .ins-sidebar-col { display:none; } }
        @media(max-width:640px) {
          .ins-icon-grid { grid-template-columns:repeat(3,1fr); gap:10px; }
          .ins-layout { padding:20px 14px 48px; gap:0; }
          .ins-hero { padding:44px 18px 40px; }
        }
      `}</style>

      <FloatingNavbar/>

      {/* ── Hero ── */}
      <section className="ins-hero">
        <div className="ins-hero-decor1"/><div className="ins-hero-decor2"/><div className="ins-hero-decor3"/>
        <div className="ins-hero-inner">
          <p className="ins-hero-eyebrow">Trusted Protection Plans</p>
          <h1 className="ins-hero-title">
            Find the Right <em>Insurance</em><br/>Plan for You
          </h1>
          <p className="ins-hero-sub">
            Compare 50+ top-rated plans across health, life, auto, home & more.
            Click any category below — get your personalised quote in 5 simple steps.
          </p>
          <div className="ins-pills">
            {["IRDAI Approved","Instant Policy","Zero Hidden Fees","Cashless Claims","24/7 Support","12+ Yrs of Trust"].map(p => (
              <span key={p} className="ins-pill">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <Breadcrumb/>

      {/* ── Marquee Trust Strip ── */}
      <MarqueeTrust/>

      {/* ── Body ── */}
      <div className="ins-body">
        <div className="ins-layout">

          {/* Sidebar */}
          <div className="ins-sidebar-col">
            <Sidebar activeId={activeForm ?? undefined} onSelect={openForm}/>
          </div>

          {/* Main */}
          <main className="ins-main">

            {/* Category icon grid */}
            <div className="ins-section">
              <SectionLabel text="Browse by Category — Click to Get a Quote"/>
              <div className="ins-icon-grid">
                {INSURANCE_CATS.map(cat => <IconCard key={cat.id} cat={cat} onSelect={openForm}/>)}
              </div>
            </div>

            {/* Inline form */}
            {activeForm && (
              <div className="ins-section" ref={formRef}>
                <SectionLabel text={`${INSURANCE_CATS.find(c=>c.id===activeForm)?.label ?? ""} Quote — 5 Simple Steps`}/>
                <InsuranceForm key={activeForm} categoryId={activeForm} onClose={() => setActiveForm(null)}/>
              </div>
            )}

            {/* Stats */}
            <div className="ins-section">
              <SectionLabel text="Our Numbers"/>
              <StatsBar/>
            </div>

            {/* Coverage */}
            <div className="ins-section">
              <SectionLabel text="Coverage Options"/>
              <CoverageSection/>
            </div>

            {/* Find Insurance */}
            <div className="ins-section">
              <SectionLabel text="Find Insurance"/>
              <FindInsuranceSection/>
            </div>

            {/* Testimonials */}
            <div className="ins-section">
              <SectionLabel text="Customer Stories"/>
              <TestimonialsSection/>
            </div>

          </main>
        </div>
      </div>

      <CTABanner/>
      <Footer/>
    </>
  );
}