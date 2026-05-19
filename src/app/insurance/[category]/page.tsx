"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import FloatingNavbar from "@/component/FloatingNavbar";
import Footer from "@/component/Footer";
import CTABanner from "@/component/Ctabanner";
import CoverageSection from "@/component/Coveragesection";
import TestimonialsSection from "@/component/TestimonialsSection";
import Link from "next/link";

// ─── Brand Palette ────────────────────────────────────────────────────────────
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

// ─── IMAGE PATHS CONFIG ───────────────────────────────────────────────────────
// Replace these paths with your actual image files in /public
const IMG = {
  // ── Insurance category icons (sidebar + category grid) ──
  health:      "/images/icons/health_18725220.svg",
  life:        "/images/icons/health-insurance_15341171.svg",
  car:         "/images/icons/car_416772.svg",
  bike:        "/images/icons/motor-sports_324247.svg",
  home:        "/images/icons/home_1299859.svg",
  travel:      "/images/icons/suitcase_4988833.svg",
  term:        "/images/icons/document_2280730.svg",
  investment:  "/images/icons/active_11135146.svg",
  business:    "/images/icons/business-presentation_6818222.svg",
  critical:    "/images/icons/attentiveness_18331657.svg",
  child:       "/images/icons/baby_15540358.svg",
  pension:     "/images/icons/retirement-plan_10496565.svg",

  // ── Trust strip icons ──
  trust_instant:    "/images/icons/icons-area/like_919792.svg",
  trust_fees:       "/images/icons/icons-area/like_15435230.svg",
  trust_insurers:   "/images/icons/icons-area/trust_5231493.svg",
  trust_support:    "/images/icons/icons-area/reliability_7988716.svg",
  trust_cashless:   "/images/trust/cashless.png",
  trust_irdai:      "/images/trust/irdai.png",
  trust_approval:   "/images/trust/approval.png",
  trust_rating:     "/images/trust/rating.png",
  trust_paperwork:  "/images/trust/paperwork.png",
  trust_protection: "/images/trust/protection.png",

  // ── Form step icons ──
  step_cover:       "/images/steps/who-to-cover.png",
  step_health:      "/images/steps/health-profile.png",
  step_personal:    "/images/steps/personal.png",
  step_coverage:    "/images/steps/coverage.png",
  step_review:      "/images/steps/review.png",
  step_income:      "/images/steps/income.png",
  step_nominee:     "/images/steps/nominee.png",
  step_vehicle:     "/images/steps/vehicle.png",
  step_registration:"/images/steps/registration.png",
  step_engine:      "/images/steps/engine.png",
  step_trip:        "/images/steps/trip.png",
  step_travellers:  "/images/steps/travellers.png",
  step_property:    "/images/steps/property.png",
  step_value:       "/images/steps/value.png",
  step_investment:  "/images/steps/investment.png",
  step_budget:      "/images/steps/budget.png",
  step_business:    "/images/steps/business.png",
  step_biz_value:   "/images/steps/biz-value.png",
  step_cover_det:   "/images/steps/cover-details.png",
  step_prefs:       "/images/steps/preferences.png",
  step_child:       "/images/steps/child.png",
  step_savings:     "/images/steps/savings.png",
  step_retirement:  "/images/steps/retirement.png",
  step_contrib:     "/images/steps/contributions.png",
  step_annuity:     "/images/steps/annuity.png",
  step_life:        "/images/steps/life-profile.png",
  step_cover_term:  "/images/steps/cover-term.png",
};

// ─── Reusable icon image component ───────────────────────────────────────────
function Ico({ src, size = 24, alt = "" }: { src: string; size?: number; alt?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ objectFit: "contain", display: "block" }}
    />
  );
}

// ─── Insurance Categories ─────────────────────────────────────────────────────
const INSURANCE_CATS = [
  { id:"health",     label:"Health",       color:"#E8503A", bg:"#fff0f3", img: IMG.health      },
  { id:"life",       label:"Life",         color:"#2d6a9f", bg:"#eef4fb", img: IMG.life        },
  { id:"car",        label:"Car",          color:"#7c3aed", bg:"#f3f0ff", img: IMG.car         },
  { id:"bike",       label:"Bike",         color:"#059669", bg:"#ecfdf5", img: IMG.bike        },
  { id:"home",       label:"Home",         color:"#d97706", bg:"#fffbeb", img: IMG.home        },
  { id:"travel",     label:"Travel",       color:"#0891b2", bg:"#ecfeff", img: IMG.travel      },
  { id:"term",       label:"Term Life",    color:"#1a3c5e", bg:"#eef2f7", img: IMG.term        },
  { id:"investment", label:"Investment",   color:"#16a34a", bg:"#f0fdf4", img: IMG.investment  },
  { id:"business",   label:"Business",     color:"#475569", bg:"#f1f5f9", img: IMG.business    },
  { id:"critical",   label:"Critical",     color:"#dc2626", bg:"#fff1f1", img: IMG.critical    },
  { id:"child",      label:"Child Plan",   color:"#f59e0b", bg:"#fffbeb", img: IMG.child       },
  { id:"pension",    label:"Pension",      color:"#7c3aed", bg:"#faf5ff", img: IMG.pension     },
];

// ─── Trust Strip Items ────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { img: IMG.trust_instant,    label:"Instant Policy",       sub:"Under 5 minutes"          },
  { img: IMG.trust_fees,       label:"Zero Hidden Fees",     sub:"Full transparency"        },
  { img: IMG.trust_insurers,   label:"50+ Insurers",         sub:"Best plans compared"      },
  { img: IMG.trust_support,    label:"24/7 Expert Support",  sub:"Human advisors, not bots" },
  { img: IMG.trust_cashless,   label:"Cashless Claims",      sub:"Hassle-free settlement"   },
  { img: IMG.trust_irdai,      label:"IRDAI Approved",       sub:"Fully regulated"          },
  { img: IMG.trust_approval,   label:"Instant Approval",     sub:"No paperwork"             },
  { img: IMG.trust_rating,     label:"4.8★ App Rating",      sub:"2Cr+ happy customers"     },
  { img: IMG.trust_paperwork,  label:"Zero Paperwork",       sub:"100% digital process"     },
  { img: IMG.trust_protection, label:"Trusted Protection",   sub:"12+ years of trust"       },
];

// ─── Sidebar Items ────────────────────────────────────────────────────────────
const SIDEBAR_ITEMS = [
  { id:"health",     label:"Health Insurance",  img: IMG.health      },
  { id:"life",       label:"Life Insurance",    img: IMG.life        },
  { id:"car",        label:"Car Insurance",     img: IMG.car         },
  { id:"bike",       label:"Bike Insurance",    img: IMG.bike        },
  { id:"home",       label:"Home Insurance",    img: IMG.home        },
  { id:"travel",     label:"Travel Insurance",  img: IMG.travel      },
  { id:"business",   label:"Business Cover",    img: IMG.business    },
  { id:"term",       label:"Term Life Cover",   img: IMG.term        },
  { id:"investment", label:"Investment Plans",  img: IMG.investment  },
  { id:"pension",    label:"Pension Plan",      img: IMG.pension     },
  { id:"critical",   label:"Critical Illness",  img: IMG.critical    },
  { id:"child",      label:"Child Plan",        img: IMG.child       },
];

// ─── Form Definitions ─────────────────────────────────────────────────────────
type FieldType = "text"|"number"|"select"|"radio"|"date"|"email"|"tel";
type Field = { key:string; label:string; type:FieldType; placeholder?:string; options?:string[]; required?:boolean };
type Step  = { title:string; stepImg:string; subtitle:string; fields:Field[] };

const PERSONAL_STEP: Step = {
  title:"Personal Details", stepImg: IMG.step_personal,
  subtitle:"Tell us about yourself for a personalised quote.",
  fields:[
    { key:"name",   label:"Full Name",     type:"text",  placeholder:"Rahul Sharma",        required:true },
    { key:"dob",    label:"Date of Birth", type:"date",                                      required:true },
    { key:"gender", label:"Gender",        type:"radio", options:["Male","Female","Other"],  required:true },
    { key:"phone",  label:"Mobile Number", type:"tel",   placeholder:"10-digit number",     required:true },
    { key:"email",  label:"Email Address", type:"email", placeholder:"you@email.com",       required:true },
    { key:"city",   label:"City",          type:"text",  placeholder:"Mumbai",              required:true },
  ],
};
const REVIEW_STEP: Step = {
  title:"Review & Confirm", stepImg: IMG.step_review,
  subtitle:"Check your details before we fetch personalised plans.", fields:[],
};

const FORMS: Record<string,Step[]> = {
  health:[
    { title:"Who to Cover", stepImg: IMG.step_cover, subtitle:"Select members you want to insure.",
      fields:[
        { key:"members",    label:"Cover For",           type:"radio",  options:["Self","Self + Spouse","Self + Kids","Family Floater","Parents"], required:true },
        { key:"age",        label:"Your Age",            type:"number", placeholder:"32", required:true },
        { key:"age_spouse", label:"Spouse Age (if any)", type:"number", placeholder:"29" },
        { key:"kids",       label:"No. of Children",    type:"select", options:["0","1","2","3","4+"] },
      ]},
    { title:"Health Profile", stepImg: IMG.step_health, subtitle:"Share medical background for accurate premium.",
      fields:[
        { key:"smoker",   label:"Do you smoke?",               type:"radio",  options:["No","Yes"], required:true },
        { key:"existing", label:"Pre-existing Conditions",     type:"select", options:["None","Diabetes","Hypertension","Heart Disease","Multiple"], required:true },
        { key:"bmi",      label:"BMI Category",               type:"radio",  options:["Normal","Overweight","Obese"] },
        { key:"history",  label:"Hospitalised in last 3 yrs?", type:"radio",  options:["No","Yes"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Preferences", stepImg: IMG.step_coverage, subtitle:"Choose cover amount and features.",
      fields:[
        { key:"sum",       label:"Sum Insured",    type:"select", options:["₹3 Lakhs","₹5 Lakhs","₹10 Lakhs","₹25 Lakhs","₹50 Lakhs","₹1 Crore"], required:true },
        { key:"opd",       label:"OPD Cover?",     type:"radio",  options:["Yes","No"], required:true },
        { key:"maternity", label:"Maternity?",     type:"radio",  options:["Yes","No"] },
        { key:"budget",    label:"Monthly Budget", type:"select", options:["Under ₹500","₹500–₹1,000","₹1,000–₹2,000","₹2,000+"], required:true },
      ]},
    REVIEW_STEP,
  ],
  car:[
    { title:"Vehicle Details", stepImg: IMG.step_vehicle, subtitle:"Enter car details for a precise quote.",
      fields:[
        { key:"brand", label:"Car Brand",        type:"select", options:["Maruti","Hyundai","Tata","Honda","Toyota","Kia","MG","Mahindra","Other"], required:true },
        { key:"model", label:"Car Model",        type:"text",   placeholder:"e.g. Swift Dzire", required:true },
        { key:"year",  label:"Year of Purchase", type:"select", options:["2024","2023","2022","2021","2020","2019","2018","Before 2018"], required:true },
        { key:"fuel",  label:"Fuel Type",        type:"radio",  options:["Petrol","Diesel","CNG","Electric"], required:true },
      ]},
    { title:"Registration", stepImg: IMG.step_registration, subtitle:"RTO and variant details.",
      fields:[
        { key:"rto",    label:"RTO / State",     type:"text",   placeholder:"e.g. MH-01 Maharashtra", required:true },
        { key:"variant",label:"Variant",         type:"text",   placeholder:"e.g. VXi" },
        { key:"claims", label:"Previous Claims", type:"radio",  options:["No Claims","1 Claim","2+ Claims"], required:true },
        { key:"ncb",    label:"NCB Discount",    type:"select", options:["0%","20%","25%","35%","45%","50%"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Preferences", stepImg: IMG.step_coverage, subtitle:"Pick the right cover type.",
      fields:[
        { key:"cover_type",label:"Cover Type",     type:"radio",  options:["Third Party Only","Comprehensive","Own Damage Only"], required:true },
        { key:"addons",    label:"Key Add-ons",    type:"select", options:["None","Zero Depreciation","Engine Protection","Return to Invoice","All"] },
        { key:"idv",       label:"IDV Preference", type:"radio",  options:["Market Value","Custom IDV"] },
        { key:"garage",    label:"Garage Type",    type:"radio",  options:["Cashless Only","Any Garage"] },
      ]},
    REVIEW_STEP,
  ],
  bike:[
    { title:"Bike Details", stepImg: IMG.step_vehicle, subtitle:"Share your bike info for an accurate premium.",
      fields:[
        { key:"brand", label:"Bike Brand",       type:"select", options:["Hero","Honda","Bajaj","TVS","Royal Enfield","Yamaha","Suzuki","KTM","Other"], required:true },
        { key:"model", label:"Bike Model",       type:"text",   placeholder:"e.g. Splendor Plus", required:true },
        { key:"year",  label:"Year of Purchase", type:"select", options:["2024","2023","2022","2021","2020","2019","2018","Before 2018"], required:true },
        { key:"fuel",  label:"Fuel Type",        type:"radio",  options:["Petrol","Electric"], required:true },
      ]},
    { title:"Engine & RTO", stepImg: IMG.step_engine, subtitle:"Engine capacity and registration details.",
      fields:[
        { key:"cc",    label:"Engine CC",        type:"select", options:["Up to 100cc","100–150cc","150–250cc","250–500cc","500cc+"], required:true },
        { key:"rto",   label:"RTO / State",      type:"text",   placeholder:"e.g. MH-01 Maharashtra", required:true },
        { key:"claims",label:"Previous Claims",  type:"radio",  options:["No Claims","1 Claim","2+ Claims"] },
        { key:"ncb",   label:"NCB Discount",     type:"select", options:["0%","20%","25%","35%","45%","50%"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Preferences", stepImg: IMG.step_coverage, subtitle:"Choose the right policy type.",
      fields:[
        { key:"cover_type",label:"Cover Type",          type:"radio",  options:["Third Party Only","Comprehensive","Own Damage Only"], required:true },
        { key:"idv",       label:"IDV",                type:"select", options:["Market Value","Custom IDV"] },
        { key:"addons",    label:"Add-ons",             type:"select", options:["None","Zero Depreciation","Engine Protect","Roadside Assistance","All"] },
        { key:"pillion",   label:"Pillion Rider Cover?",type:"radio",  options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  life:[
    { title:"Life Profile", stepImg: IMG.step_life, subtitle:"Basic details to calculate the right cover.",
      fields:[
        { key:"age",    label:"Your Age",       type:"number", placeholder:"30", required:true },
        { key:"gender", label:"Gender",         type:"radio",  options:["Male","Female"], required:true },
        { key:"smoker", label:"Do you smoke?",  type:"radio",  options:["No","Yes"], required:true },
        { key:"health", label:"Overall Health", type:"radio",  options:["Excellent","Good","Average","Poor"] },
      ]},
    { title:"Income & Cover", stepImg: IMG.step_income, subtitle:"Set your income and coverage goals.",
      fields:[
        { key:"income", label:"Annual Income", type:"select", options:["Under ₹3L","₹3–5L","₹5–10L","₹10–25L","₹25L+"], required:true },
        { key:"cover",  label:"Cover Amount",  type:"select", options:["₹25L","₹50L","₹75L","₹1 Crore","₹2 Crore","₹5 Crore"], required:true },
        { key:"term",   label:"Policy Term",   type:"select", options:["10 yrs","15 yrs","20 yrs","25 yrs","30 yrs","Till 60","Till 65"], required:true },
        { key:"payout", label:"Payout Type",   type:"radio",  options:["Lump Sum","Monthly Income","Both"] },
      ]},
    PERSONAL_STEP,
    { title:"Nominee & Riders", stepImg: IMG.step_nominee, subtitle:"Protect your nominee and add riders.",
      fields:[
        { key:"nominee",     label:"Nominee Name",       type:"text",   placeholder:"Priya Sharma", required:true },
        { key:"relation",    label:"Relation",           type:"select", options:["Spouse","Child","Parent","Sibling","Other"], required:true },
        { key:"riders",      label:"Add-on Riders",      type:"select", options:["None","Critical Illness","Accidental Death","Waiver of Premium","All"] },
        { key:"return_prem", label:"Return of Premium?", type:"radio",  options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  home:[
    { title:"Property Details", stepImg: IMG.step_property, subtitle:"Share details about your property.",
      fields:[
        { key:"prop_type",label:"Property Type",   type:"radio",  options:["Own House","Rented","Flat","Villa"], required:true },
        { key:"area",     label:"Area (sq ft)",    type:"number", placeholder:"1200", required:true },
        { key:"city",     label:"City",            type:"text",   placeholder:"Mumbai", required:true },
        { key:"age",      label:"Age of Property", type:"select", options:["New (<1yr)","1–5 yrs","5–10 yrs","10–20 yrs","20+ yrs"], required:true },
      ]},
    { title:"Property Value", stepImg: IMG.step_value, subtitle:"Construction type and estimated value.",
      fields:[
        { key:"construction",label:"Construction Type",type:"radio",  options:["RCC","Semi-Pucca","Kutcha"], required:true },
        { key:"value",       label:"Property Value",   type:"select", options:["Under ₹20L","₹20–50L","₹50L–1Cr","₹1–2Cr","₹2Cr+"], required:true },
        { key:"contents",    label:"Contents Value",   type:"select", options:["Not needed","Under ₹5L","₹5–10L","₹10–25L","₹25L+"] },
        { key:"loan",        label:"Home Loan Active?",type:"radio",  options:["Yes","No"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Options", stepImg: IMG.step_coverage, subtitle:"Choose what you want to protect.",
      fields:[
        { key:"structure", label:"Structure Cover",         type:"radio", options:["Yes","No"], required:true },
        { key:"fire",      label:"Fire & Natural Disaster", type:"radio", options:["Yes","No"], required:true },
        { key:"burglary",  label:"Burglary Cover",          type:"radio", options:["Yes","No"] },
        { key:"appliances",label:"Appliance Breakdown",     type:"radio", options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  travel:[
    { title:"Trip Details", stepImg: IMG.step_trip, subtitle:"Tell us about your travel plan.",
      fields:[
        { key:"trip_type",   label:"Trip Type",      type:"radio",  options:["Domestic","International"], required:true },
        { key:"destination", label:"Destination",    type:"text",   placeholder:"USA, Europe, Thailand", required:true },
        { key:"dep_date",    label:"Departure Date", type:"date",   required:true },
        { key:"ret_date",    label:"Return Date",    type:"date",   required:true },
      ]},
    { title:"Travellers", stepImg: IMG.step_travellers, subtitle:"Number of people and purpose.",
      fields:[
        { key:"travellers",label:"No. of Travellers", type:"select", options:["1","2","3","4","5","6+"], required:true },
        { key:"purpose",   label:"Purpose of Travel", type:"select", options:["Tourism","Business","Education","Medical","Other"] },
        { key:"seniors",   label:"Seniors (60+)?",    type:"radio",  options:["No","Yes"] },
        { key:"adventure", label:"Adventure Sports?", type:"radio",  options:["No","Yes"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Needs", stepImg: IMG.step_coverage, subtitle:"Select the coverage that suits your trip.",
      fields:[
        { key:"medical",      label:"Medical Cover",      type:"select", options:["₹2L","₹5L","₹10L","₹50L","₹1Cr+"], required:true },
        { key:"baggage",      label:"Baggage Cover",      type:"radio",  options:["Yes","No"] },
        { key:"cancellation", label:"Trip Cancellation",  type:"radio",  options:["Yes","No"] },
        { key:"delay",        label:"Flight Delay Cover", type:"radio",  options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  term:[
    { title:"Life Profile", stepImg: IMG.step_life, subtitle:"Basic details for your term plan.",
      fields:[
        { key:"age",    label:"Your Age",      type:"number", placeholder:"30", required:true },
        { key:"gender", label:"Gender",        type:"radio",  options:["Male","Female"], required:true },
        { key:"smoker", label:"Do you smoke?", type:"radio",  options:["No","Yes"], required:true },
        { key:"health", label:"Health Status", type:"radio",  options:["Excellent","Good","Average"] },
      ]},
    { title:"Cover & Term", stepImg: IMG.step_cover_term, subtitle:"Set your coverage amount and period.",
      fields:[
        { key:"income", label:"Annual Income", type:"select", options:["Under ₹3L","₹3–5L","₹5–10L","₹10–25L","₹25L+"], required:true },
        { key:"cover",  label:"Cover Amount",  type:"select", options:["₹25L","₹50L","₹75L","₹1Cr","₹2Cr","₹5Cr"], required:true },
        { key:"term",   label:"Policy Term",   type:"select", options:["10 yrs","15 yrs","20 yrs","25 yrs","30 yrs"], required:true },
        { key:"payout", label:"Payout Type",   type:"radio",  options:["Lump Sum","Monthly Income","Both"] },
      ]},
    PERSONAL_STEP,
    { title:"Nominee & Riders", stepImg: IMG.step_nominee, subtitle:"Add nominee and optional riders.",
      fields:[
        { key:"nominee",  label:"Nominee Name",       type:"text",   placeholder:"Priya Sharma", required:true },
        { key:"relation", label:"Relation",           type:"select", options:["Spouse","Child","Parent","Sibling","Other"], required:true },
        { key:"riders",   label:"Add-on Riders",      type:"select", options:["None","Critical Illness","Accidental Death","Waiver of Premium","All"] },
        { key:"return_p", label:"Return of Premium?", type:"radio",  options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  investment:[
    { title:"Investment Profile", stepImg: IMG.step_investment, subtitle:"Goals and risk appetite.",
      fields:[
        { key:"age",    label:"Your Age",           type:"number", placeholder:"35", required:true },
        { key:"goal",   label:"Investment Goal",    type:"select", options:["Tax Saving","Wealth Creation","Child Education","Retirement","Regular Income"], required:true },
        { key:"risk",   label:"Risk Appetite",      type:"radio",  options:["Low (Safe)","Medium","High (Aggressive)"], required:true },
        { key:"tenure", label:"Investment Horizon", type:"select", options:["3–5 yrs","5–10 yrs","10–15 yrs","15+ yrs"], required:true },
      ]},
    { title:"Budget & Tax", stepImg: IMG.step_budget, subtitle:"Monthly investment and tax status.",
      fields:[
        { key:"amount",  label:"Monthly Investment",   type:"select", options:["₹500–₹2K","₹2K–₹5K","₹5K–₹10K","₹10K+"], required:true },
        { key:"tax_80c", label:"80C Limit Exhausted?", type:"radio",  options:["No","Partially","Yes"] },
        { key:"existing",label:"Existing Investments", type:"select", options:["None","FD/RD","Mutual Funds","PPF/EPF","Multiple"] },
        { key:"life",    label:"Life Cover Needed?",   type:"radio",  options:["Yes","No"] },
      ]},
    PERSONAL_STEP,
    { title:"Plan Preferences", stepImg: IMG.step_prefs, subtitle:"Fine-tune your investment preferences.",
      fields:[
        { key:"payout",     label:"Payout Preference",  type:"radio", options:["On Maturity","Regular Income","Both"], required:true },
        { key:"partial",    label:"Partial Withdrawal?", type:"radio", options:["Yes","No"] },
        { key:"guaranteed", label:"Guaranteed Returns?", type:"radio", options:["Yes","Market-linked OK"] },
        { key:"budget_flex",label:"Budget Flexibility",  type:"radio", options:["Fixed Amount","Can Increase Over Time"] },
      ]},
    REVIEW_STEP,
  ],
  business:[
    { title:"Business Details", stepImg: IMG.step_business, subtitle:"Tell us about your business.",
      fields:[
        { key:"biz_type", label:"Business Type",    type:"select", options:["Sole Proprietor","Partnership","Pvt Ltd","LLP","Other"], required:true },
        { key:"industry", label:"Industry",         type:"select", options:["Retail","Manufacturing","IT/Tech","Healthcare","Hospitality","Finance","Other"], required:true },
        { key:"employees",label:"No. of Employees", type:"select", options:["1–10","11–50","51–200","200+"], required:true },
        { key:"city",     label:"Business City",    type:"text",   placeholder:"Mumbai", required:true },
      ]},
    { title:"Business Value", stepImg: IMG.step_biz_value, subtitle:"Turnover and asset details.",
      fields:[
        { key:"turnover",label:"Annual Turnover",  type:"select", options:["Under ₹50L","₹50L–2Cr","₹2–10Cr","₹10Cr+"], required:true },
        { key:"assets",  label:"Asset Value",      type:"select", options:["Under ₹10L","₹10–50L","₹50L–2Cr","₹2Cr+"], required:true },
        { key:"loan",    label:"Business Loan?",   type:"radio",  options:["Yes","No"] },
        { key:"export",  label:"Export Business?", type:"radio",  options:["Yes","No"] },
      ]},
    PERSONAL_STEP,
    { title:"Coverage Requirements", stepImg: IMG.step_coverage, subtitle:"Select the most relevant covers.",
      fields:[
        { key:"liability",    label:"Public Liability",          type:"radio", options:["Yes","No"], required:true },
        { key:"fire",         label:"Fire & Property",           type:"radio", options:["Yes","No"], required:true },
        { key:"cyber",        label:"Cyber Risk Cover",          type:"radio", options:["Yes","No"] },
        { key:"group_health", label:"Group Health (Employees)?", type:"radio", options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  critical:[
    { title:"Health Profile", stepImg: IMG.step_health, subtitle:"Health background for critical illness cover.",
      fields:[
        { key:"age",    label:"Your Age",       type:"number", placeholder:"35", required:true },
        { key:"gender", label:"Gender",         type:"radio",  options:["Male","Female"], required:true },
        { key:"smoker", label:"Do you smoke?",  type:"radio",  options:["No","Yes"], required:true },
        { key:"family", label:"Family History", type:"select", options:["None","Cancer","Heart Disease","Diabetes","Multiple"], required:true },
      ]},
    { title:"Cover Details", stepImg: IMG.step_cover_det, subtitle:"Choose your coverage amount and conditions.",
      fields:[
        { key:"cover",      label:"Cover Amount",         type:"select", options:["₹5L","₹10L","₹25L","₹50L","₹1Cr"], required:true },
        { key:"conditions", label:"Conditions Covered",   type:"select", options:["Cancer Only","Heart Only","Standard 36","Premium 64+"], required:true },
        { key:"waiting",    label:"Waiting Period OK?",   type:"radio",  options:["Yes, understand","Need clarity"] },
        { key:"existing",   label:"Existing Health Plan?",type:"radio",  options:["Yes","No"] },
      ]},
    PERSONAL_STEP,
    { title:"Preferences", stepImg: IMG.step_prefs, subtitle:"Customise your critical illness plan.",
      fields:[
        { key:"payout",  label:"Payout on Diagnosis?", type:"radio",  options:["Full Lump Sum","Staged Payout"], required:true },
        { key:"renewal", label:"Lifetime Renewable?",   type:"radio",  options:["Yes","Not Priority"] },
        { key:"budget",  label:"Monthly Budget",        type:"select", options:["Under ₹500","₹500–₹1K","₹1K–₹2K","₹2K+"], required:true },
        { key:"riders",  label:"Add Riders?",           type:"radio",  options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  child:[
    { title:"Child Details", stepImg: IMG.step_child, subtitle:"Details about your child and goal.",
      fields:[
        { key:"child_age",label:"Child's Age",   type:"number", placeholder:"5", required:true },
        { key:"goal_age", label:"Goal Age",      type:"select", options:["18 yrs","21 yrs","25 yrs"], required:true },
        { key:"goal",     label:"Goal Purpose",  type:"select", options:["Higher Education","Marriage","Business Setup","All"], required:true },
        { key:"corpus",   label:"Target Corpus", type:"select", options:["₹10–25L","₹25–50L","₹50L–1Cr","₹1Cr+"], required:true },
      ]},
    { title:"Savings & Risk", stepImg: IMG.step_savings, subtitle:"Investment capacity and risk preference.",
      fields:[
        { key:"monthly",label:"Monthly Budget",          type:"select", options:["₹500–₹2K","₹2K–₹5K","₹5K–₹10K","₹10K+"], required:true },
        { key:"risk",   label:"Risk Appetite",           type:"radio",  options:["Low","Medium","High"], required:true },
        { key:"waiver", label:"Premium Waiver on Death?",type:"radio",  options:["Yes","No"] },
        { key:"returns",label:"Guaranteed Returns?",     type:"radio",  options:["Yes","Market-linked OK"] },
      ]},
    PERSONAL_STEP,
    { title:"Plan Preferences", stepImg: IMG.step_prefs, subtitle:"Customise your child savings plan.",
      fields:[
        { key:"partial",    label:"Partial Withdrawal?",   type:"radio", options:["Yes","No"] },
        { key:"life",       label:"Life Cover for Parent?",type:"radio", options:["Yes","No"] },
        { key:"payout",     label:"Payout Structure",      type:"radio", options:["Lump Sum at Goal","Milestone Payouts"] },
        { key:"study_loan", label:"Study Loan Backup?",    type:"radio", options:["Yes","No"] },
      ]},
    REVIEW_STEP,
  ],
  pension:[
    { title:"Retirement Profile", stepImg: IMG.step_retirement, subtitle:"Plan your retirement income.",
      fields:[
        { key:"age",         label:"Current Age",           type:"number", placeholder:"40", required:true },
        { key:"retire_age",  label:"Retirement Age",        type:"select", options:["50","55","60","65","70"], required:true },
        { key:"income_need", label:"Monthly Income Needed", type:"select", options:["₹20–30K","₹30–50K","₹50K–1L","₹1L+"], required:true },
        { key:"risk",        label:"Risk Appetite",         type:"radio",  options:["Low (Guaranteed)","Medium","High"], required:true },
      ]},
    { title:"Savings & Contributions", stepImg: IMG.step_contrib, subtitle:"Existing savings and monthly plan.",
      fields:[
        { key:"savings", label:"Existing Retirement Savings",type:"select", options:["None","Under ₹5L","₹5–20L","₹20–50L","₹50L+"] },
        { key:"monthly", label:"Monthly Contribution",        type:"select", options:["₹1K–₹3K","₹3K–₹5K","₹5K–₹10K","₹10K+"], required:true },
        { key:"nps",     label:"NPS Account Active?",         type:"radio",  options:["Yes","No"] },
        { key:"tax",     label:"80CCC Tax Benefit Needed?",   type:"radio",  options:["Yes","Not Priority"] },
      ]},
    PERSONAL_STEP,
    { title:"Annuity Preferences", stepImg: IMG.step_annuity, subtitle:"How you want retirement income.",
      fields:[
        { key:"annuity",   label:"Annuity Type",          type:"radio", options:["Life Annuity","Joint (Spouse)","Return of Purchase Price"], required:true },
        { key:"frequency", label:"Payout Frequency",      type:"radio", options:["Monthly","Quarterly","Annually"], required:true },
        { key:"legacy",    label:"Legacy Planning?",      type:"radio", options:["Yes","No"] },
        { key:"inflation", label:"Inflation Protection?", type:"radio", options:["Yes","No"] },
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

// ─── How It Works ─────────────────────────────────────────────────────────────
const HIW_STEPS = [
  { num:"01", title:"Choose a category", desc:"Pick what to protect — health, vehicle, home or wealth.", color:B.teal,     bg:"#e6f9f9", img:"/images/hiw/choose-category.png" },
  { num:"02", title:"Select a plan",     desc:"Compare side by side. Every feature, no jargon.",         color:"#7c3aed", bg:"#f3f0ff", img:"/images/hiw/select-plan.png"     },
  { num:"03", title:"Fill in 2 min",     desc:"Basic info only. No medical tests for most plans.",        color:B.coral,   bg:"#fff0ed", img:"/images/hiw/fill-form.png"       },
  { num:"04", title:"Pay & get covered", desc:"Instant policy document. Coverage starts same day.",       color:"#16a34a", bg:"#f0fdf4", img:"/images/hiw/pay-covered.png"    },
];

function HowItWorks() {
  const { ref, inView } = useInView(0.1);
  return (
    <section ref={ref} style={{ background:B.white, border:`1px solid ${B.border}`, borderRadius:20, padding:"40px 36px 36px", overflow:"hidden", position:"relative" }}>
      <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:`${B.teal}08`, pointerEvents:"none" }}/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:24, alignItems:"flex-end", marginBottom:36 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <span style={{ display:"block", width:28, height:2, background:B.teal, borderRadius:2 }}/>
            <span style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:B.teal, fontFamily:"'Outfit', sans-serif" }}>How it works</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:"clamp(1.5rem,2.5vw,2rem)", fontWeight:800, color:B.charcoal, margin:"0 0 8px", lineHeight:1.15, letterSpacing:"-0.02em" }}>
            Find the right <em style={{ color:B.teal, fontStyle:"italic" }}>insurance.</em>
          </h2>
          <p style={{ fontSize:"0.85rem", color:"#666", margin:0, lineHeight:1.7, fontFamily:"'Outfit', sans-serif", maxWidth:360 }}> 
            Browse, compare & buy in under 5 minutes —<br/>
            <strong style={{ color:B.charcoal, fontWeight:700 }}>no branch visits, no paperwork.</strong>
          </p>
        </div>
        <a href="tel:1800-000-0000" style={{ display:"inline-flex", alignItems:"center", gap:8, background:B.teal, color:B.white, padding:"11px 22px", borderRadius:999, fontFamily:"'Outfit', sans-serif", fontSize:"0.82rem", fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" as const, boxShadow:`0 4px 16px ${B.teal}35`, flexShrink:0 }}>
          <Ico src="/images/icons/phone.png" size={15} alt="phone"/>
          Talk to an Advisor
        </a>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, position:"relative" }}>
        <div style={{ position:"absolute", top:28, left:"calc(12.5% + 22px)", right:"calc(12.5% + 22px)", height:1.5, background:`linear-gradient(90deg, ${B.teal}60, ${B.teal}20)`, zIndex:0, pointerEvents:"none" }}/>
        {HIW_STEPS.map((step, i) => (
          <div key={step.num} style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"0 12px", position:"relative", zIndex:1, opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(16px)", transition:`opacity 0.55s ease ${0.1+i*0.12}s, transform 0.55s ease ${0.1+i*0.12}s` }}>
            <div style={{ width:56, height:56, borderRadius:16, background:step.bg, border:`1.5px solid ${step.color}30`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12, flexShrink:0, boxShadow:`0 4px 16px ${step.color}18` }}>
              <Ico src={step.img} size={28} alt={step.title}/>
            </div>
            <span style={{ fontSize:"0.65rem", fontWeight:800, color:step.color, letterSpacing:"0.1em", fontFamily:"'Outfit', sans-serif", marginBottom:6 }}>{step.num}</span>
            <p style={{ fontFamily:"'Playfair Display', serif", fontSize:"0.95rem", fontWeight:800, color:B.charcoal, margin:"0 0 6px", textAlign:"center", lineHeight:1.25 }}>{step.title}</p>
            <p style={{ fontSize:"0.75rem", color:"#777", margin:0, textAlign:"center", lineHeight:1.6, fontFamily:"'Outfit', sans-serif" }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Marquee Trust Strip ──────────────────────────────────────────────────────
function MarqueeTrust() {
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <div style={{ background:B.white, borderTop:`1px solid ${B.border}`, borderBottom:`1px solid ${B.border}`, overflow:"hidden", position:"relative" }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:80, background:`linear-gradient(to right, ${B.white}, transparent)`, zIndex:2, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:80, background:`linear-gradient(to left, ${B.white}, transparent)`, zIndex:2, pointerEvents:"none" }}/>
      <div style={{ display:"flex", width:"max-content", animation:"marqueeScroll 36s linear infinite" }}>
        {items.map((it, idx) => (
          <div key={idx} style={{ display:"flex", alignItems:"center", gap:12, padding:"16px 28px", borderRight:`1px solid ${B.border}`, flexShrink:0 }}>
            <span style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg, ${B.teal}18, ${B.teal}30)`, border:`1.5px solid ${B.teal}40`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Ico src={it.img} size={20} alt={it.label}/>
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
    { value:"50+", label:"Insurance Partners" }, { value:"2Cr+", label:"Happy Customers" },
    { value:"₹500Cr+", label:"Claims Settled" }, { value:"4.8★", label:"App Rating" },
  ];
  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:B.offwhite, borderTop:`1px solid ${B.border}` }}>
      {stats.map((s, i) => (
        <div key={s.label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, padding:"36px 16px", borderRight:i<stats.length-1?`1px solid ${B.border}`:"none", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(16px)", transition:`opacity 0.7s ease ${i*0.12}s, transform 0.7s ease ${i*0.12}s`, position:"relative" }}>
          <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", height:2.5, background:B.teal, borderRadius:999, width:inView?"50%":0, transition:`width 0.65s cubic-bezier(0.77,0,0.175,1) ${0.3+i*0.1}s` }}/>
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
          <Ico src="/images/icons/home.png" size={13} alt="home"/>
          Home
        </Link>
        {[{ label:"Insurance", href:"/insurance" }, { label:"All Plans" }].map((it, i) => (
          <span key={i} style={{ display:"flex", alignItems:"center" }}>
            <span style={{ margin:"0 5px", display:"flex" }}><Ico src="/images/icons/chevron-right.png" size={10} alt=""/></span>
            {it.href
              ? <Link href={it.href} style={{ color:B.teal, textDecoration:"none", fontSize:"0.78rem", fontWeight:600, fontFamily:"'Outfit', sans-serif" }}>{it.label}</Link>
              : <span style={{ color:B.charcoal, fontSize:"0.78rem", fontWeight:700, fontFamily:"'Outfit', sans-serif" }}>{it.label}</span>
            }
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
  return (
    <aside>
      <div style={{ background:`linear-gradient(135deg,${B.navy},${B.navyMid})`, borderRadius:"14px 14px 0 0", padding:"16px 18px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
          <Ico src="/images/icons/shield.png" size={20} alt="shield"/>
          <h3 style={{ color:B.white, fontFamily:"'Playfair Display', serif", fontSize:"0.95rem", fontWeight:700, letterSpacing:"0.03em", margin:0 }}>Insurance Types</h3>
        </div>
        <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"0.68rem", margin:0, fontFamily:"'Outfit', sans-serif" }}>Click any type to get a quote</p>
      </div>
      <nav style={{ background:B.white, border:`1px solid ${B.border}`, borderTop:"none", borderRadius:"0 0 14px 14px", overflow:"hidden", boxShadow:"0 4px 20px rgba(26,60,94,0.07)" }}>
        {SIDEBAR_ITEMS.map((item, idx) => {
          const isActive = activeId === item.id;
          const isHov    = hov === item.id;
          const color    = INSURANCE_CATS.find(c=>c.id===item.id)?.color ?? B.teal;
          return (
            <button key={item.id} onClick={() => onSelect(item.id)}
              onMouseEnter={() => setHov(item.id)} onMouseLeave={() => setHov(null)}
              style={{ all:"unset", display:"flex", alignItems:"center", gap:9, padding:"11px 14px", width:"100%", boxSizing:"border-box" as const, cursor:"pointer", borderBottom:idx<SIDEBAR_ITEMS.length-1?`1px solid #f0f4f8`:"none", background:isActive?color+"10":isHov?"#f7fafd":B.white, position:"relative", transition:"background 0.15s" }}>
              {isActive && <span style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:color, borderRadius:"0 2px 2px 0" }}/>}
              <span style={{ width:18, height:18, display:"flex", flexShrink:0, opacity:isActive?1:isHov?0.8:0.5 }}>
                <Ico src={item.img} size={18} alt={item.label}/>
              </span>
              <span style={{ fontSize:"0.8rem", fontWeight:isActive?700:500, fontFamily:"'Outfit', sans-serif", color:isActive?color:isHov?B.navyMid:"#4a5568", transition:"color 0.15s" }}>
                {item.label}
              </span>
              <span style={{ width:10, height:10, display:"flex", marginLeft:"auto", flexShrink:0, opacity:isActive||isHov?1:0.3 }}>
                <Ico src="/images/icons/chevron-right.png" size={10} alt=""/>
              </span>
            </button>
          );
        })}
      </nav>
      {/* <div style={{ marginTop:16, background:"linear-gradient(135deg,#E8503A,#f7931e)", borderRadius:14, padding:"18px 16px", textAlign:"center", boxShadow:"0 6px 24px rgba(232,80,58,0.25)" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:8 }}>
          <Ico src="/images/icons/phone.png" size={28} alt="phone"/>
        </div>
        <p style={{ color:B.white, fontWeight:700, fontSize:"0.85rem", margin:"0 0 3px", fontFamily:"'Playfair Display', serif" }}>Need Expert Help?</p>
        <p style={{ color:"rgba(255,255,255,0.8)", fontSize:"0.68rem", margin:"0 0 12px", lineHeight:1.5, fontFamily:"'Outfit', sans-serif" }}>Licensed advisors available 24/7</p>
        <a href="tel:1800-000-0000" style={{ display:"block", background:B.white, color:"#E8503A", padding:"8px 0", borderRadius:9, fontWeight:800, fontSize:"0.82rem", textDecoration:"none", fontFamily:"'Outfit', sans-serif" }}>
          1800-000-0000
        </a>
      </div> */}
    </aside>
  );
}

// ─── Icon Card ────────────────────────────────────────────────────────────────
function IconCard({ cat, onSelect }: { cat: typeof INSURANCE_CATS[0]; onSelect:(id:string)=>void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={() => onSelect(cat.id)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ all:"unset", display:"flex", flexDirection:"column", alignItems:"center", gap:9, padding:"20px 10px 16px", borderRadius:16, cursor:"pointer", border:`1.5px solid ${hov?cat.color+"55":cat.color+"22"}`, background:hov?cat.bg:B.white, transform:hov?"translateY(-5px)":"translateY(0)", boxShadow:hov?`0 10px 28px ${cat.color}22`:"0 2px 8px rgba(0,0,0,0.04)", transition:"all 0.22s cubic-bezier(0.22,1,0.36,1)", textAlign:"center" as const }}>
      <span style={{ width:52, height:52, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", background:hov?cat.color+"18":cat.bg, transition:"background 0.22s" }}>
        <Ico src={cat.img} size={30} alt={cat.label}/>
      </span>
      <span style={{ fontSize:"0.72rem", fontWeight:700, fontFamily:"'Outfit', sans-serif", lineHeight:1.3, color:hov?cat.color:B.charcoal, transition:"color 0.2s" }}>
        {cat.label}
      </span>
    </button>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────
function FormField({ field, value, onChange, accent }: { field:Field; value:string; onChange:(v:string)=>void; accent:string }) {
  const base: React.CSSProperties = { fontFamily:"'Outfit', sans-serif", fontSize:"0.875rem", fontWeight:500, color:B.charcoal, background:"#f8fafc", border:`1.5px solid ${B.border}`, borderRadius:10, outline:"none", width:"100%", transition:"border-color 0.2s, box-shadow 0.2s" };
  const onFocus = (e: React.FocusEvent<any>) => { e.target.style.borderColor=accent; e.target.style.boxShadow=`0 0 0 3px ${accent}18`; };
  const onBlur  = (e: React.FocusEvent<any>) => { e.target.style.borderColor=B.border; e.target.style.boxShadow="none"; };
  const Label = () => (
    <label style={{ fontSize:"0.68rem", fontWeight:700, color:B.charcoal, textTransform:"uppercase" as const, letterSpacing:"0.05em", fontFamily:"'Outfit', sans-serif" }}>
      {field.label}{field.required && <span style={{ color:accent, marginLeft:2 }}>*</span>}
    </label>
  );
  if (field.type === "radio") return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      <Label/>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" as const }}>
        {field.options?.map(opt => (
          <button key={opt} type="button" onClick={() => onChange(opt)} style={{ all:"unset", padding:"7px 13px", borderRadius:8, cursor:"pointer", fontSize:"0.78rem", fontWeight:600, fontFamily:"'Outfit', sans-serif", border:`1.5px solid ${value===opt?accent:B.border}`, background:value===opt?accent+"14":B.white, color:value===opt?accent:"#555", display:"flex", alignItems:"center", gap:5, transition:"all 0.18s" }}>
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
      <select value={value} onChange={e=>onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} style={{ ...base, height:46, padding:"0 36px 0 14px", appearance:"none" as any, cursor:"pointer", backgroundImage:`url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 5.25l3.5 3.5 3.5-3.5' stroke='%23B5B5B5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center" }}>
        <option value="">Select…</option>
        {field.options?.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      <Label/>
      <input type={field.type==="number"?"number":field.type==="date"?"date":field.type==="email"?"email":field.type==="tel"?"tel":"text"} placeholder={field.placeholder} value={value} onChange={e=>onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} style={{ ...base, height:46, padding:"0 14px" }}/>
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
    <div style={{ background:B.white, borderRadius:20, border:`1.5px solid ${plan.recommended?plan.accent+"55":B.border}`, padding:"24px 20px 20px", display:"flex", flexDirection:"column", boxShadow:plan.recommended?`0 8px 32px ${plan.accent}20`:"0 2px 12px rgba(0,0,0,0.05)", transform:plan.recommended?"translateY(-4px)":"none", position:"relative", overflow:"hidden", animation:`planIn 0.5s ease ${delay}s both` }}>
      {plan.recommended && <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${plan.accent},${plan.accent}99)` }}/>}
      {plan.badge && <div style={{ position:"absolute", top:14, right:14, background:plan.recommended?plan.accent:"#f0f4f8", color:plan.recommended?B.white:B.charcoal, fontSize:"0.62rem", fontWeight:800, letterSpacing:"0.07em", textTransform:"uppercase", padding:"3px 10px", borderRadius:100, fontFamily:"'Outfit', sans-serif" }}>{plan.badge}</div>}
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
        <button onClick={() => setBought(true)} style={{ flex:1, height:42, border:"none", borderRadius:10, cursor:"pointer", background:bought?"#22c55e":plan.accent, color:B.white, fontFamily:"'Outfit', sans-serif", fontSize:"0.82rem", fontWeight:700, transition:"all 0.25s" }}>{bought?"✓ Added":"Buy Now"}</button>
        <button style={{ height:42, padding:"0 14px", border:`1.5px solid ${B.border}`, borderRadius:10, background:"transparent", cursor:"pointer", fontSize:"0.72rem", fontWeight:700, color:B.gray, fontFamily:"'Outfit', sans-serif", transition:"all 0.2s" }}>Advise</button>
      </div>
    </div>
  );
}

// ─── Insurance Form ───────────────────────────────────────────────────────────
function InsuranceForm({ categoryId, onClose }: { categoryId:string; onClose:()=>void }) {
  const cat    = INSURANCE_CATS.find(c=>c.id===categoryId);
  const accent = cat?.color ?? B.teal;
  const steps  = FORMS[categoryId] ?? FORMS["health"];
  const plans  = PLANS[categoryId] ?? PLANS["health"];
  const TOTAL  = steps.length;

  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string,string>>({});
  const [done, setDone] = useState(false);
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
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${B.navy},${accent})`, padding:"18px 22px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {cat && (
            <span style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Ico src={cat.img} size={22} alt={cat.label}/>
            </span>
          )}
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
                <div style={{ width:28, height:28, borderRadius:"50%", fontSize:"0.68rem", fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", background:i<step?"#22c55e":i===step?accent:"#e2e8f0", color:i<=step?B.white:B.gray, border:`2px solid ${i===step?accent:"transparent"}`, boxShadow:i===step?`0 0 0 3px ${accent}22`:"none", transition:"all 0.25s", fontFamily:"'Outfit', sans-serif" }}>
                  {i<step?"✓":i+1}
                </div>
                {/* Step image instead of emoji */}
                <div style={{ width:20, height:20 }}>
                  <Ico src={s.stepImg} size={20} alt={s.title}/>
                </div>
              </div>
              {i < steps.length-1 && <div style={{ flex:1, height:2, background:i<step?"#22c55e":"#e2e8f0", margin:"0 4px", marginBottom:16, transition:"background 0.3s" }}/>}
            </React.Fragment>
          ))}
        </div>
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
                <div key={f.key} style={{ gridColumn:f.type==="radio"&&(f.options?.length??0)>2?"1/-1":"auto" }}>
                  <FormField field={f} value={data[f.key]??""} onChange={v=>setField(f.key,v)} accent={accent}/>
                </div>
              ))}
            </div>
          )}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:22, paddingTop:16, borderTop:`1px solid ${B.border}` }}>
            <button onClick={back} style={{ all:"unset", cursor:"pointer", fontSize:"0.75rem", fontWeight:700, color:B.gray, display:"flex", alignItems:"center", gap:4, fontFamily:"'Outfit', sans-serif" }}>
              <Ico src="/images/icons/chevron-left.png" size={11} alt="back"/>
              {step===0?"Cancel":"Back"}
            </button>
            <button onClick={next} style={{ all:"unset", cursor:"pointer", background:accent, color:B.white, padding:"10px 22px", borderRadius:10, fontFamily:"'Outfit', sans-serif", fontSize:"0.85rem", fontWeight:700, display:"flex", alignItems:"center", gap:6, boxShadow:`0 4px 14px ${accent}40`, transition:"all 0.2s" }}>
              {isLast?"See My Plans":"Continue"}
              <Ico src="/images/icons/chevron-right.png" size={11} alt="next"/>
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding:22 }}>
          <div style={{ background:`linear-gradient(135deg,${accent},${accent}cc)`, borderRadius:14, padding:"16px 20px", display:"flex", alignItems:"center", gap:14, marginBottom:22, boxShadow:`0 6px 20px ${accent}30` }}>
            <Ico src="/images/icons/celebration.png" size={40} alt="celebration"/>
            <div>
              <p style={{ color:B.white, fontFamily:"'Playfair Display', serif", fontWeight:800, fontSize:"1rem", margin:"0 0 3px" }}>Your plans are ready, {data["name"]||"there"}!</p>
              <p style={{ color:"rgba(255,255,255,0.78)", fontSize:"0.72rem", margin:0, fontFamily:"'Outfit', sans-serif" }}>Based on your profile · {TOTAL} steps completed · Sorted by best fit</p>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {plans.map((plan,i) => <PlanCard key={plan.name} plan={plan} delay={i*0.08}/>)}
          </div>
          <button onClick={() => { setDone(false); setStep(0); setData({}); }} style={{ all:"unset", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5, marginTop:16, color:B.gray, fontSize:"0.75rem", fontWeight:700, fontFamily:"'Outfit', sans-serif" }}>
            <Ico src="/images/icons/chevron-left.png" size={10} alt="back"/>
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
        .ins-hero { background:linear-gradient(135deg,#0f2744 0%,#1a3c5e 55%,#2d6a9f 100%); padding:60px 24px 52px; position:relative; overflow:hidden; }
        .ins-hero-inner { max-width:1280px; margin:0 auto; position:relative; z-index:1; }
        .ins-hero-title { font-family:'Playfair Display',serif; color:#FFFFFF; font-size:clamp(2.2rem,4.5vw,3.4rem); font-weight:900; margin:0 0 16px; line-height:1.1; letter-spacing:-0.02em; animation:heroFadeUp 0.8s ease 0.1s both; }
        .ins-hero-title em { color:#2DBFBF; font-style:italic; }
        .ins-hero-sub { color:rgba(255,255,255,0.72); font-size:0.95rem; font-family:'Outfit',sans-serif; max-width:500px; line-height:1.75; margin:0 0 28px; animation:heroFadeUp 0.8s ease 0.2s both; }
        .ins-pills { display:flex; gap:7px; flex-wrap:wrap; animation:heroFadeUp 0.8s ease 0.3s both; }
        .ins-pill { font-size:0.68rem; font-weight:600; font-family:'Outfit',sans-serif; color:rgba(255,255,255,0.88); padding:5px 13px; border-radius:100px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); }
        .ins-hero-decor1 { position:absolute; top:-100px; right:-100px; width:400px; height:400px; border-radius:50%; background:rgba(45,191,191,0.07); pointer-events:none; }
        .ins-hero-decor2 { position:absolute; bottom:-70px; right:220px; width:220px; height:220px; border-radius:50%; background:rgba(255,255,255,0.03); pointer-events:none; }
        .ins-hero-decor3 { position:absolute; top:30px; left:-60px; width:160px; height:160px; border-radius:50%; background:rgba(45,191,191,0.05); pointer-events:none; }
        .ins-body { background:#F4F4EF; }
        .ins-layout { max-width:1280px; margin:0 auto; padding:32px 24px 60px; display:flex; gap:26px; align-items:flex-start; }
        .ins-sidebar-col { width:236px; flex-shrink:0; position:sticky; top:76px; }
        .ins-main { flex:1; min-width:0; }
        .ins-section { margin-bottom:32px; }
        .ins-icon-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(108px,1fr)); gap:12px; }
        @media(max-width:900px) { .ins-sidebar-col { display:none; } }
        @media(max-width:640px) { .ins-icon-grid { grid-template-columns:repeat(3,1fr); gap:10px; } .ins-layout { padding:20px 14px 48px; gap:0; } .ins-hero { padding:44px 18px 40px; } }
      `}</style>

      <FloatingNavbar/>

      <section className="ins-hero" style={{ marginTop:"50px" }}>
        <div className="ins-hero-decor1"/><div className="ins-hero-decor2"/><div className="ins-hero-decor3"/>
        <div className="ins-hero-inner">
          <h1 className="ins-hero-title">Find the Right <em>Insurance</em><br/>Plan for You</h1>
          <p className="ins-hero-sub">Compare 50+ top-rated plans across health, life, auto, home & more. Click any category below — get your personalised quote in 5 simple steps.</p>
          <div className="ins-pills">
            {["IRDAI Approved","Instant Policy","Zero Hidden Fees","Cashless Claims","24/7 Support","12+ Yrs of Trust"].map(p => (
              <span key={p} className="ins-pill">{p}</span>
            ))}
          </div>
        </div>
      </section>

      <Breadcrumb/>
      <MarqueeTrust/>

      <div className="ins-body">
        <div className="ins-layout">
          <div className="ins-sidebar-col">
            <Sidebar activeId={activeForm ?? undefined} onSelect={openForm}/>
          </div>
          <main className="ins-main">
            <div className="ins-section">
              <SectionLabel text="Browse by Category — Click to Get a Quote"/>
              <div className="ins-icon-grid">
                {INSURANCE_CATS.map(cat => <IconCard key={cat.id} cat={cat} onSelect={openForm}/>)}
              </div>
            </div>
            {activeForm && (
              <div className="ins-section" ref={formRef}>
                <SectionLabel text={`${INSURANCE_CATS.find(c=>c.id===activeForm)?.label ?? ""} Quote — 5 Simple Steps`}/>
                <InsuranceForm key={activeForm} categoryId={activeForm} onClose={() => setActiveForm(null)}/>
              </div>
            )}
            <div className="ins-section">
              <SectionLabel text="Our Numbers"/>
              <StatsBar/>
            </div>
            <div className="ins-section">
              <SectionLabel text="Coverage Options"/>
              <CoverageSection/>
            </div>
            <div className="ins-section">
              <HowItWorks/>
            </div>
          </main>
        </div>
      </div>

      <CTABanner/>
      <Footer/>
    </>
  );
}