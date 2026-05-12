"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import ShuffleText from "../../../component/Shuffletext";

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

// ─── Category Config ──────────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<string, {
  label: string; sublabel: string; accent: string;
  bg: string; icon: string; description: string;
}> = {
  bike:       { label: "Bike Insurance",       sublabel: "2-Wheeler Protection",  accent: B.teal,      bg: "linear-gradient(145deg,#eef9f9,#d4f2f2)", icon: "🏍️", description: "Protect your bike against accidents, theft & third-party damage." },
  car:        { label: "Car Insurance",        sublabel: "4-Wheeler Protection",  accent: "#F9A85D",   bg: "linear-gradient(145deg,#fff8f0,#fdecd6)", icon: "🚗", description: "Comprehensive coverage for your car with cashless claim support." },
  health:     { label: "Health Insurance",     sublabel: "Medical Coverage",      accent: B.coral,     bg: "linear-gradient(145deg,#fdf0ee,#faddd9)", icon: "❤️", description: "Stay covered for hospitalisation, OPD, and critical illness." },
  term:       { label: "Term Life Cover",      sublabel: "Life Protection",       accent: "#7C6EF5",   bg: "linear-gradient(145deg,#f3f0ff,#e4deff)", icon: "🛡️", description: "Secure your family's future with affordable term life insurance." },
  investment: { label: "Investment Plans",     sublabel: "Tax & Wealth Planning", accent: B.teal,      bg: "linear-gradient(145deg,#eef9f9,#d4f2f2)", icon: "📈", description: "Grow your wealth and save tax with market-linked plans." },
  child:      { label: "Child Savings Plan",   sublabel: "Future Planning",       accent: "#F9A85D",   bg: "linear-gradient(145deg,#fff8f0,#fdecd6)", icon: "👶", description: "Build a corpus for your child's education and future goals." },
  pension:    { label: "Pension & Retirement", sublabel: "Retirement Planning",   accent: "#5CE0C6",   bg: "linear-gradient(145deg,#edfcf8,#d0f6ee)", icon: "🧓", description: "Ensure a steady income stream through your retirement years." },
  travel:     { label: "Travel Insurance",     sublabel: "Trip Protection",       accent: "#7C6EF5",   bg: "linear-gradient(145deg,#f3f0ff,#e4deff)", icon: "✈️", description: "Travel worry-free with medical, baggage & cancellation cover." },
  home:       { label: "Home Protection",      sublabel: "Property Cover",        accent: B.coral,     bg: "linear-gradient(145deg,#fdf0ee,#faddd9)", icon: "🏠", description: "Safeguard your home against fire, flood, theft & natural disasters." },
  business:   { label: "Business Cover",       sublabel: "Commercial Insurance",  accent: B.charcoal,  bg: "linear-gradient(145deg,#f2f2f2,#e2e2e2)", icon: "💼", description: "Protect your business assets, employees & liability exposure." },
};

// ─── Step Definitions per category ───────────────────────────────────────────
type Field = {
  key: string; label: string; type: "text" | "number" | "select" | "radio" | "date";
  placeholder?: string; options?: string[]; required?: boolean;
};
type Step = { title: string; subtitle: string; fields: Field[] };

const COMMON_PERSONAL: Step = {
  title: "Personal Details",
  subtitle: "Tell us a little about yourself so we can personalise your quote.",
  fields: [
    { key: "name",   label: "Full Name",    type: "text",   placeholder: "Rahul Sharma",      required: true  },
    { key: "dob",    label: "Date of Birth",type: "date",                                      required: true  },
    { key: "gender", label: "Gender",       type: "radio",  options: ["Male","Female","Other"],required: true  },
    { key: "phone",  label: "Mobile Number",type: "number", placeholder: "10-digit number",    required: true  },
    { key: "email",  label: "Email Address",type: "text",   placeholder: "rahul@email.com",    required: true  },
    { key: "city",   label: "City",         type: "text",   placeholder: "Mumbai",             required: true  },
  ],
};

const STEPS_MAP: Record<string, Step[]> = {
  bike: [
    {
      title: "Vehicle Details",
      subtitle: "Share your bike details for an accurate premium estimate.",
      fields: [
        { key: "brand",    label: "Bike Brand",      type: "select", options: ["Hero","Honda","Bajaj","TVS","Royal Enfield","Yamaha","Suzuki","KTM","Other"], required: true },
        { key: "model",    label: "Bike Model",      type: "text",   placeholder: "e.g. Splendor Plus", required: true },
        { key: "year",     label: "Year of Purchase",type: "select", options: ["2024","2023","2022","2021","2020","2019","2018","Before 2018"], required: true },
        { key: "fuel",     label: "Fuel Type",       type: "radio",  options: ["Petrol","Electric"], required: true },
        { key: "cc",       label: "Engine CC",       type: "select", options: ["Up to 100cc","100–150cc","150–250cc","250–500cc","500cc+"], required: true },
        { key: "rto",      label: "RTO / State",     type: "text",   placeholder: "e.g. MH-01 Maharashtra", required: true },
      ],
    },
    COMMON_PERSONAL,
    {
      title: "Coverage Preferences",
      subtitle: "Choose what matters most in your policy.",
      fields: [
        { key: "cover_type",  label: "Cover Type",          type: "radio",  options: ["Third Party Only","Comprehensive","Own Damage Only"], required: true },
        { key: "idv",         label: "Insured Declared Value (IDV)", type: "select", options: ["Market Value","Custom IDV"], required: true },
        { key: "ncb",         label: "No Claim Bonus (NCB)", type: "select", options: ["0%","20%","25%","35%","45%","50%"], required: false },
        { key: "addons",      label: "Add-ons Required",    type: "select", options: ["None","Zero Depreciation","Engine Protect","Roadside Assistance","All Add-ons"], required: false },
      ],
    },
  ],
  car: [
    {
      title: "Vehicle Details",
      subtitle: "Enter your car details for a precise quote.",
      fields: [
        { key: "brand",  label: "Car Brand",       type: "select", options: ["Maruti","Hyundai","Tata","Honda","Toyota","Kia","MG","Ford","Mahindra","Other"], required: true },
        { key: "model",  label: "Car Model",       type: "text",   placeholder: "e.g. Swift Dzire", required: true },
        { key: "year",   label: "Year of Purchase",type: "select", options: ["2024","2023","2022","2021","2020","2019","2018","Before 2018"], required: true },
        { key: "fuel",   label: "Fuel Type",       type: "radio",  options: ["Petrol","Diesel","CNG","Electric"], required: true },
        { key: "variant",label: "Variant",         type: "text",   placeholder: "e.g. VXi", required: false },
        { key: "rto",    label: "RTO / State",     type: "text",   placeholder: "e.g. DL-01 Delhi", required: true },
      ],
    },
    COMMON_PERSONAL,
    {
      title: "Coverage Preferences",
      subtitle: "Pick the right cover for your car.",
      fields: [
        { key: "cover_type", label: "Cover Type",    type: "radio",  options: ["Third Party Only","Comprehensive","Own Damage Only"], required: true },
        { key: "ncb",        label: "NCB Discount",  type: "select", options: ["0%","20%","25%","35%","45%","50%"], required: false },
        { key: "addons",     label: "Key Add-ons",   type: "select", options: ["None","Zero Depreciation","Engine Protection","Return to Invoice","All Add-ons"], required: false },
        { key: "claims",     label: "Previous Claims",type: "radio", options: ["No Claims","1 Claim","2+ Claims"], required: true },
      ],
    },
  ],
  health: [
    {
      title: "Health Profile",
      subtitle: "A few health details help us find the best-fit plan.",
      fields: [
        { key: "members",     label: "Who to cover",       type: "select", options: ["Self","Self + Spouse","Self + Kids","Family Floater","Parents"], required: true },
        { key: "age_self",    label: "Your Age",           type: "number", placeholder: "e.g. 32", required: true },
        { key: "age_spouse",  label: "Spouse Age (if any)",type: "number", placeholder: "e.g. 29", required: false },
        { key: "smoker",      label: "Do you smoke?",      type: "radio",  options: ["No","Yes"], required: true },
        { key: "existing",    label: "Pre-existing conditions", type: "select", options: ["None","Diabetes","Hypertension","Heart Disease","Multiple Conditions"], required: true },
        { key: "sum_insured", label: "Cover Amount",       type: "select", options: ["₹3 Lakhs","₹5 Lakhs","₹10 Lakhs","₹25 Lakhs","₹50 Lakhs","₹1 Crore"], required: true },
      ],
    },
    COMMON_PERSONAL,
    {
      title: "Plan Preferences",
      subtitle: "Customise to match your lifestyle and budget.",
      fields: [
        { key: "hospital_type", label: "Hospital Preference",    type: "radio",  options: ["Any Network","Government Only","Private Premium"], required: true },
        { key: "opd",           label: "OPD Cover needed?",      type: "radio",  options: ["Yes","No"], required: true },
        { key: "maternity",     label: "Maternity Cover needed?",type: "radio",  options: ["Yes","No"], required: true },
        { key: "budget",        label: "Monthly Budget",         type: "select", options: ["Under ₹500","₹500–₹1000","₹1000–₹2000","₹2000+"], required: true },
      ],
    },
  ],
  term: [
    {
      title: "Life Profile",
      subtitle: "Basic details help us calculate the right life cover for you.",
      fields: [
        { key: "age",        label: "Your Age",          type: "number", placeholder: "e.g. 30", required: true },
        { key: "gender",     label: "Gender",            type: "radio",  options: ["Male","Female"], required: true },
        { key: "smoker",     label: "Do you smoke?",     type: "radio",  options: ["No","Yes"], required: true },
        { key: "income",     label: "Annual Income",     type: "select", options: ["Under ₹3L","₹3–5L","₹5–10L","₹10–25L","₹25L+"], required: true },
        { key: "cover",      label: "Cover Amount",      type: "select", options: ["₹25 Lakhs","₹50 Lakhs","₹75 Lakhs","₹1 Crore","₹2 Crore","₹5 Crore"], required: true },
        { key: "term",       label: "Policy Term",       type: "select", options: ["10 years","15 years","20 years","25 years","30 years","Till age 60","Till age 65","Till age 75"], required: true },
      ],
    },
    COMMON_PERSONAL,
    {
      title: "Nominee & Payout",
      subtitle: "Ensure your family gets the right payout.",
      fields: [
        { key: "nominee",      label: "Nominee Name",      type: "text",   placeholder: "e.g. Priya Sharma", required: true },
        { key: "relation",     label: "Relation",          type: "select", options: ["Spouse","Child","Parent","Sibling","Other"], required: true },
        { key: "payout_type",  label: "Payout Preference", type: "radio",  options: ["Lump Sum","Monthly Income","Both"], required: true },
        { key: "riders",       label: "Riders",            type: "select", options: ["None","Critical Illness","Accidental Death","Waiver of Premium","All Riders"], required: false },
      ],
    },
  ],
  investment: [
    {
      title: "Investment Profile",
      subtitle: "Your goals & risk appetite help us suggest the right plans.",
      fields: [
        { key: "age",       label: "Your Age",          type: "number", placeholder: "e.g. 35", required: true },
        { key: "goal",      label: "Investment Goal",   type: "select", options: ["Tax Saving","Wealth Creation","Child Education","Retirement","Regular Income"], required: true },
        { key: "risk",      label: "Risk Appetite",     type: "radio",  options: ["Low (Safe)","Medium","High (Aggressive)"], required: true },
        { key: "tenure",    label: "Investment Horizon",type: "select", options: ["3–5 years","5–10 years","10–15 years","15+ years"], required: true },
        { key: "amount",    label: "Monthly Investment",type: "select", options: ["₹500–₹2000","₹2000–₹5000","₹5000–₹10000","₹10000+"], required: true },
        { key: "tax_80c",   label: "80C limit exhausted?", type: "radio", options: ["No","Partially","Yes"], required: false },
      ],
    },
    COMMON_PERSONAL,
    {
      title: "Plan Customisation",
      subtitle: "Fine-tune your investment preferences.",
      fields: [
        { key: "payout",    label: "Payout Preference",    type: "radio",  options: ["On Maturity","Regular Income","Both"], required: true },
        { key: "life_cover",label: "Life Cover needed?",   type: "radio",  options: ["Yes","No"], required: true },
        { key: "partial",   label: "Partial withdrawal?",  type: "radio",  options: ["Yes, might need","No"], required: false },
        { key: "budget",    label: "Budget flexibility",   type: "radio",  options: ["Fixed amount","Can increase over time"], required: true },
      ],
    },
  ],
  travel: [
    {
      title: "Trip Details",
      subtitle: "Tell us about your travel plan.",
      fields: [
        { key: "trip_type",   label: "Trip Type",          type: "radio",  options: ["Domestic","International"], required: true },
        { key: "destination", label: "Destination",        type: "text",   placeholder: "e.g. USA, Europe, Thailand", required: true },
        { key: "dep_date",    label: "Departure Date",     type: "date",   required: true },
        { key: "ret_date",    label: "Return Date",        type: "date",   required: true },
        { key: "travellers",  label: "Number of Travellers",type: "select",options: ["1","2","3","4","5","6+"], required: true },
        { key: "purpose",     label: "Purpose of Travel",  type: "select", options: ["Tourism","Business","Education","Medical","Other"], required: true },
      ],
    },
    COMMON_PERSONAL,
    {
      title: "Coverage Needs",
      subtitle: "Choose the cover that suits your trip.",
      fields: [
        { key: "medical",     label: "Medical Cover",       type: "select", options: ["₹2L","₹5L","₹10L","₹50L","₹1Cr+"], required: true },
        { key: "baggage",     label: "Baggage Cover",       type: "radio",  options: ["Yes","No"], required: true },
        { key: "cancellation",label: "Trip Cancellation",   type: "radio",  options: ["Yes","No"], required: true },
        { key: "adventure",   label: "Adventure Sports",    type: "radio",  options: ["Yes","No"], required: false },
      ],
    },
  ],
  home: [
    {
      title: "Property Details",
      subtitle: "Share details about the property you want to protect.",
      fields: [
        { key: "prop_type",  label: "Property Type",     type: "radio",  options: ["Own House","Rented","Flat/Apartment","Villa"], required: true },
        { key: "area",       label: "Area (sq ft)",      type: "number", placeholder: "e.g. 1200", required: true },
        { key: "city",       label: "City",              type: "text",   placeholder: "Mumbai", required: true },
        { key: "age",        label: "Age of Property",   type: "select", options: ["New (<1 yr)","1–5 years","5–10 years","10–20 years","20+ years"], required: true },
        { key: "construction",label: "Construction Type",type: "radio",  options: ["RCC","Semi-Pucca","Kutcha"], required: true },
        { key: "value",      label: "Property Value",    type: "select", options: ["Under ₹20L","₹20–50L","₹50L–1Cr","₹1–2Cr","₹2Cr+"], required: true },
      ],
    },
    COMMON_PERSONAL,
    {
      title: "Coverage Preferences",
      subtitle: "Select what you want to protect.",
      fields: [
        { key: "structure",  label: "Structure Cover",    type: "radio", options: ["Yes","No"], required: true },
        { key: "contents",   label: "Contents Cover",     type: "radio", options: ["Yes","No"], required: true },
        { key: "fire",       label: "Fire & Natural Disaster", type: "radio", options: ["Yes","No"], required: true },
        { key: "burglary",   label: "Burglary Cover",     type: "radio", options: ["Yes","No"], required: false },
      ],
    },
  ],
  child: [
    {
      title: "Child & Goal Details",
      subtitle: "Help us understand your savings goal for your child.",
      fields: [
        { key: "child_age",  label: "Child's Current Age",   type: "number", placeholder: "e.g. 5", required: true },
        { key: "goal_age",   label: "Goal Age (when needed)",type: "select", options: ["18 years","21 years","25 years"], required: true },
        { key: "goal",       label: "Goal Purpose",          type: "select", options: ["Higher Education","Marriage","Business Setup","All of the above"], required: true },
        { key: "corpus",     label: "Target Corpus",         type: "select", options: ["₹10–25L","₹25–50L","₹50L–1Cr","₹1Cr+"], required: true },
        { key: "monthly",    label: "Monthly Savings Budget", type: "select",options: ["₹500–₹2000","₹2000–₹5000","₹5000–₹10000","₹10000+"], required: true },
        { key: "risk",       label: "Risk Appetite",         type: "radio",  options: ["Low","Medium","High"], required: true },
      ],
    },
    COMMON_PERSONAL,
    {
      title: "Plan Preferences",
      subtitle: "Customise your child plan preferences.",
      fields: [
        { key: "waiver",     label: "Premium Waiver on Parent's Death?", type: "radio", options: ["Yes","No"], required: true },
        { key: "guaranteed", label: "Guaranteed Returns preferred?",     type: "radio", options: ["Yes","Market-linked OK"], required: true },
        { key: "partial",    label: "Partial withdrawal needed?",        type: "radio", options: ["Yes","No"], required: false },
        { key: "life_cover", label: "Life Cover for Parent?",            type: "radio", options: ["Yes","No"], required: true },
      ],
    },
  ],
  pension: [
    {
      title: "Retirement Profile",
      subtitle: "Let us build your retirement income plan.",
      fields: [
        { key: "age",         label: "Current Age",          type: "number", placeholder: "e.g. 40", required: true },
        { key: "retire_age",  label: "Expected Retirement Age",type:"select", options: ["55","60","65","70"], required: true },
        { key: "income",      label: "Monthly Income Needed", type: "select", options: ["₹20–30K","₹30–50K","₹50K–1L","₹1L+"], required: true },
        { key: "savings",     label: "Existing Retirement Savings", type: "select", options: ["None","Under ₹5L","₹5–20L","₹20–50L","₹50L+"], required: false },
        { key: "monthly",     label: "Monthly Contribution",  type: "select", options: ["₹1000–₹3000","₹3000–₹5000","₹5000–₹10000","₹10000+"], required: true },
        { key: "risk",        label: "Risk Appetite",         type: "radio",  options: ["Low (Guaranteed)","Medium","High (Market-linked)"], required: true },
      ],
    },
    COMMON_PERSONAL,
    {
      title: "Annuity Preferences",
      subtitle: "How do you want your retirement income?",
      fields: [
        { key: "annuity_type",label: "Annuity Type",          type: "radio",  options: ["Life Annuity","Joint (with spouse)","With Return of Purchase Price"], required: true },
        { key: "frequency",   label: "Payout Frequency",      type: "radio",  options: ["Monthly","Quarterly","Annually"], required: true },
        { key: "tax_benefit", label: "Tax Benefit under 80CCC?", type: "radio",options: ["Yes, needed","Not priority"], required: false },
        { key: "legacy",      label: "Legacy planning?",      type: "radio",  options: ["Yes","No"], required: false },
      ],
    },
  ],
  business: [
    {
      title: "Business Details",
      subtitle: "Tell us about your business so we can recommend the right cover.",
      fields: [
        { key: "biz_type",   label: "Business Type",     type: "select", options: ["Sole Proprietor","Partnership","Pvt Ltd","LLP","Other"], required: true },
        { key: "industry",   label: "Industry",          type: "select", options: ["Retail","Manufacturing","IT/Tech","Healthcare","Hospitality","Finance","Other"], required: true },
        { key: "employees",  label: "Number of Employees",type:"select", options: ["1–10","11–50","51–200","200+"], required: true },
        { key: "turnover",   label: "Annual Turnover",   type: "select", options: ["Under ₹50L","₹50L–2Cr","₹2–10Cr","₹10Cr+"], required: true },
        { key: "assets",     label: "Asset Value",       type: "select", options: ["Under ₹10L","₹10–50L","₹50L–2Cr","₹2Cr+"], required: true },
        { key: "city",       label: "Business City",     type: "text",   placeholder: "Mumbai", required: true },
      ],
    },
    COMMON_PERSONAL,
    {
      title: "Coverage Requirements",
      subtitle: "Select the covers most relevant to your business.",
      fields: [
        { key: "liability",  label: "Public Liability",    type: "radio", options: ["Yes","No"], required: true },
        { key: "fire",       label: "Fire & Property",     type: "radio", options: ["Yes","No"], required: true },
        { key: "cyber",      label: "Cyber Risk Cover",    type: "radio", options: ["Yes","No"], required: false },
        { key: "group_health",label:"Group Health for employees?",type:"radio",options:["Yes","No"],required:false},
        { key: "key_person", label: "Key Person Insurance",type: "radio", options: ["Yes","No"], required: false },
        { key: "budget",     label: "Monthly Budget",      type: "select", options: ["Under ₹5000","₹5000–₹15000","₹15000–₹50000","₹50000+"], required: true },
      ],
    },
  ],
};

// ─── Plans Data ───────────────────────────────────────────────────────────────
const PLANS_DATA: Record<string, {
  name: string; price: string; per: string; badge: string | null;
  cover: string; features: string[]; accent: string; recommended: boolean;
}[]> = {
  bike: [
    { name: "Third Party",   price: "₹714",  per: "/year",  badge: null,          cover: "As per IRDAI", accent: B.gray,    recommended: false, features: ["Mandatory by law","Third party liability","Personal accident cover","No own damage"] },
    { name: "Comprehensive", price: "₹2,499",per: "/year",  badge: "Most Popular",cover: "Market Value",  accent: B.teal,    recommended: true,  features: ["Own damage + TP","Theft protection","Natural calamity","Zero dep add-on available","Cashless garages"] },
    { name: "Standalone OD", price: "₹1,299",per: "/year",  badge: null,          cover: "Market Value",  accent: "#7C6EF5", recommended: false, features: ["Own damage only","No TP cover","Ideal if TP separate","Add-ons available","Engine protect"] },
  ],
  car: [
    { name: "Third Party",   price: "₹2,094",per: "/year",  badge: null,          cover: "IRDAI Mandated",accent: B.gray,    recommended: false, features: ["Legally required","TP bodily injury","TP property damage","Basic PA cover"] },
    { name: "Comprehensive", price: "₹8,499",per: "/year",  badge: "Best Value",  cover: "IDV Based",     accent: "#F9A85D", recommended: true,  features: ["Full own damage","Theft & fire","Flood & earthquake","Zero dep available","24/7 RSA","500+ cashless garages"] },
    { name: "Pay As You Drive",price:"₹4,999",per:"/year",  badge: null,          cover: "IDV Based",     accent: "#7C6EF5", recommended: false, features: ["Usage-based pricing","Perfect for low mileage","OD cover included","Telematics based","Save up to 40%"] },
  ],
  health: [
    { name: "Basic Care",    price: "₹399",  per: "/month", badge: null,          cover: "₹3 Lakhs",     accent: B.gray,    recommended: false, features: ["Hospitalisation","Day care","Ambulance","Basic OPD"] },
    { name: "Active Plus",   price: "₹799",  per: "/month", badge: "Most Bought", cover: "₹10 Lakhs",    accent: B.coral,   recommended: true,  features: ["In-patient cover","OPD + diagnostics","Mental health cover","Annual health check","No-claim bonus","10,000+ network"] },
    { name: "Total Health",  price: "₹1,499",per: "/month", badge: "Premium",     cover: "₹1 Crore",     accent: "#7C6EF5", recommended: false, features: ["Unlimited restore","Maternity cover","Critical illness","Global treatment","Waiver of premium","VIP room"] },
  ],
  term: [
    { name: "Pure Term",     price: "₹499",  per: "/month", badge: null,          cover: "₹50 Lakhs",    accent: B.gray,    recommended: false, features: ["Low cost cover","Death benefit only","Flexible term","Online process"] },
    { name: "Term + Return", price: "₹1,199",per: "/month", badge: "Recommended", cover: "₹1 Crore",     accent: "#7C6EF5", recommended: true,  features: ["Death benefit","Return of premium","Tax benefit 80C","Critical illness rider","Waiver on disability","Joint cover option"] },
    { name: "Smart Protect", price: "₹899",  per: "/month", badge: null,          cover: "₹75 Lakhs",    accent: "#5CE0C6", recommended: false, features: ["Increasing cover","Milestone based","Accidental cover","Spouse add-on","Income payout option"] },
  ],
  investment: [
    { name: "ELSS Fund",     price: "₹500",  per: "/month", badge: null,          cover: "Market-linked", accent: B.gray,   recommended: false, features: ["80C tax saving","3yr lock-in","High return potential","SIP mode","No guaranteed returns"] },
    { name: "ULIP Growth",   price: "₹2,000",per: "/month", badge: "Best Returns",cover: "Life + Growth",  accent: B.teal,   recommended: true,  features: ["Life cover included","Market-linked returns","80C benefit","Partial withdrawal","Fund switch option","₹1.5L 80C limit"] },
    { name: "Guaranteed Plan",price:"₹3,000",per: "/month", badge: null,          cover: "Guaranteed",     accent: "#7C6EF5",recommended: false, features: ["Guaranteed returns","Zero market risk","Life cover","Annuity option","Tax free maturity","Loan facility"] },
  ],
  travel: [
    { name: "Basic Shield",  price: "₹299",  per: "/trip",  badge: null,          cover: "₹2 Lakhs",     accent: B.gray,    recommended: false, features: ["Medical emergency","Trip cancellation","Lost baggage","Passport loss"] },
    { name: "Explorer Plus", price: "₹699",  per: "/trip",  badge: "Most Popular",cover: "₹10 Lakhs",    accent: "#7C6EF5", recommended: true,  features: ["Medical ₹10L","Trip delay","Adventure sports","24/7 helpline","Home burglary","Missed connection"] },
    { name: "Global Elite",  price: "₹1,299",per: "/trip",  badge: "Premium",     cover: "Unlimited",     accent: "#F9A85D", recommended: false, features: ["Unlimited medical","Evacuation","Pre-existing cover","Business travel","Concierge","Dental emergency"] },
  ],
  home: [
    { name: "Structure Only",price: "₹999",  per: "/year",  badge: null,          cover: "₹20 Lakhs",    accent: B.gray,    recommended: false, features: ["Building cover","Fire & lightning","Earthquake","Flood","No contents"] },
    { name: "Home Shield",   price: "₹1,799",per: "/year",  badge: "Best Value",  cover: "₹50 Lakhs",    accent: B.coral,   recommended: true,  features: ["Structure + contents","Fire & theft","Electrical breakdown","Tenant liability","Jewellery cover","Alternate accommodation"] },
    { name: "Elite Home",    price: "₹3,499",per: "/year",  badge: null,          cover: "₹1 Crore",     accent: "#7C6EF5", recommended: false, features: ["Premium cover","All risks","Luxury contents","Art & valuables","Smart home devices","Priority claims"] },
  ],
  child: [
    { name: "Future Star",   price: "₹1,000",per: "/month", badge: null,          cover: "₹10 Lakhs",    accent: B.gray,    recommended: false, features: ["Guaranteed returns","Life cover for parent","Premium waiver","Education milestone payouts"] },
    { name: "Smart Child",   price: "₹2,500",per: "/month", badge: "Most Popular",cover: "₹25 Lakhs",    accent: "#F9A85D", recommended: true,  features: ["Market-linked growth","Life cover","Premium waiver on death","Flexible withdrawals","Loyalty additions","Tax free maturity"] },
    { name: "Scholar Max",   price: "₹5,000",per: "/month", badge: "Premium",     cover: "₹50 Lakhs",    accent: "#7C6EF5", recommended: false, features: ["Maximum corpus","Guaranteed + market","Multiple payouts","Study loan backup","International education cover","Wealth transfer"] },
  ],
  pension: [
    { name: "NPS Lite",      price: "₹1,000",per: "/month", badge: null,          cover: "Market-linked", accent: B.gray,   recommended: false, features: ["Government backed","80CCD tax benefit","Low charges","Flexible contribution","Partial withdrawal at 60"] },
    { name: "Pension Plus",  price: "₹3,000",per: "/month", badge: "Recommended", cover: "Guaranteed income",accent:"#5CE0C6",recommended:true, features: ["Guaranteed monthly income","Joint life option","Return of corpus","Inflation protection","80CCC benefit","Lifelong income"] },
    { name: "Retire Rich",   price: "₹6,000",per: "/month", badge: "Premium",     cover: "High corpus",   accent: "#7C6EF5", recommended: false, features: ["Maximum corpus","ULIP + annuity","Wealth + income","Critical illness cover","Legacy planning","Dedicated RM"] },
  ],
  business: [
    { name: "SME Essentials",price: "₹2,499",per: "/month", badge: null,          cover: "₹25 Lakhs",    accent: B.gray,    recommended: false, features: ["Fire & property","TP liability","Employee accident","Legal expenses"] },
    { name: "Biz Shield Pro",price: "₹5,999",per: "/month", badge: "Most Popular",cover: "₹1 Crore",     accent: B.charcoal,recommended: true,  features: ["Full property cover","Public liability","Cyber risk","Key person cover","Group health basic","Business interruption"] },
    { name: "Enterprise",    price: "Custom",per: "",        badge: "Enterprise",  cover: "Customised",    accent: "#7C6EF5", recommended: false, features: ["Unlimited liability","D&O cover","Trade credit","Customised SLA","Legal shield","Dedicated RM 24/7"] },
  ],
};

// ─── Intersection hook ────────────────────────────────────────────────────────
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

// ─── Animated Button (unchanged from original) ────────────────────────────────
function AnimatedButton({ label, bg, layers, onClick, type = "button" }: {
  label: string; bg: string; layers: [string, string, string];
  onClick?: () => void; type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className="ip-uv-btn"
      style={{ "--btn-bg": bg } as React.CSSProperties}
      onClick={onClick}
    >
      <span className="ip-uv-bg">
        <span className="ip-uv-layers">
          <span className="ip-uv-layer ip-uv-l1" style={{ background: layers[0] }} />
          <span className="ip-uv-layer ip-uv-l2" style={{ background: layers[1] }} />
          <span className="ip-uv-layer ip-uv-l3" style={{ background: layers[2] }} />
        </span>
      </span>
      <span className="ip-uv-inner">
        <span className="ip-uv-static">{label}</span>
        <span className="ip-uv-hover">{label}</span>
      </span>
    </button>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────
function FormField({ field, value, onChange, accent }: {
  field: Field; value: string; onChange: (v: string) => void; accent: string;
}) {
  if (field.type === "radio") {
    return (
      <div className="ip-field">
        <label className="ip-label">{field.label}{field.required && <span className="ip-req">*</span>}</label>
        <div className="ip-radio-group">
          {field.options?.map((opt) => (
            <button
              key={opt} type="button"
              className={`ip-radio-btn${value === opt ? " ip-radio-active" : ""}`}
              style={{ "--field-accent": accent } as React.CSSProperties}
              onClick={() => onChange(opt)}
            >
              <span className="ip-radio-dot" />
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="ip-field">
        <label className="ip-label">{field.label}{field.required && <span className="ip-req">*</span>}</label>
        <select
          className="ip-select"
          style={{ "--field-accent": accent } as React.CSSProperties}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select an option</option>
          {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    );
  }

  return (
    <div className="ip-field">
      <label className="ip-label">{field.label}{field.required && <span className="ip-req">*</span>}</label>
      <input
        className="ip-input"
        style={{ "--field-accent": accent } as React.CSSProperties}
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────
function PlanCard({ plan, index }: {
  plan: typeof PLANS_DATA["bike"][0]; index: number;
}) {
  const [bought, setBought] = useState(false);
  return (
    <div
      className={`ip-plan${plan.recommended ? " ip-plan-rec" : ""}${bought ? " ip-plan-bought" : ""}`}
      style={{
        "--plan-accent": plan.accent,
        animationDelay: `${index * 0.12}s`,
      } as React.CSSProperties}
    >
      {plan.recommended && <div className="ip-plan-top-bar" style={{ background: plan.accent }} />}
      {plan.badge && (
        <div
          className="ip-plan-badge"
          style={{
            background: plan.recommended ? plan.accent : B.offwhite,
            color: plan.recommended ? "#fff" : B.charcoal,
          }}
        >
          {plan.badge}
        </div>
      )}
      <div className="ip-plan-header">
        <p className="ip-plan-name">{plan.name}</p>
        <p className="ip-plan-cover">{plan.cover} cover</p>
        <div className="ip-plan-price-row">
          <span className="ip-plan-price" style={{ color: plan.accent }}>{plan.price}</span>
          {plan.per && <span className="ip-plan-per">{plan.per}</span>}
        </div>
      </div>
      <div className="ip-plan-divider" style={{ background: plan.accent }} />
      <ul className="ip-plan-features">
        {plan.features.map((f) => (
          <li key={f} className="ip-plan-feature">
            <span className="ip-plan-check" style={{ color: plan.accent }}>✓</span> {f}
          </li>
        ))}
      </ul>
      <div className="ip-plan-actions">
        <button
          className="ip-plan-buy"
          style={{ background: bought ? "#22c55e" : plan.accent }}
          onClick={() => setBought(true)}
        >
          {bought ? "✓ Added" : "Buy Now"}
        </button>
        <button className="ip-plan-advisor">Get Advice</button>
      </div>
    </div>
  );
}

// ─── Trust Strip ─────────────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { icon: "⚡", label: "Instant Policy Issuance", sub: "Get covered in under 5 min" },
    { icon: "🔒", label: "Zero Hidden Fees",         sub: "What you see is what you pay" },
    { icon: "🏦", label: "50+ Insurers",             sub: "Best-in-class plans compared" },
    { icon: "🤝", label: "Expert Support 24/7",      sub: "Human advisors, not bots" },
    { icon: "💸", label: "Cashless Claims",           sub: "Hassle-free claim settlement" },
  ];
  return (
    <div className="ip-trust-strip">
      {items.map((it) => (
        <div key={it.label} className="ip-trust-item">
          <span className="ip-trust-icon">{it.icon}</span>
          <div>
            <p className="ip-trust-label">{it.label}</p>
            <p className="ip-trust-sub">{it.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InsurancePage() {
  const params   = useParams();
  const router   = useRouter();
  const category = (params?.category as string) || "health";
  const config   = CATEGORY_CONFIG[category] || CATEGORY_CONFIG["health"];
  const steps    = STEPS_MAP[category]        || STEPS_MAP["health"];
  const plans    = PLANS_DATA[category]       || PLANS_DATA["health"];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData,    setFormData]    = useState<Record<string, string>>({});
  const [showPlans,   setShowPlans]   = useState(false);
  const [headingKey,  setHeadingKey]  = useState(0);
  const { ref: plansRef, inView: plansIn } = useInView(0.05);
  const topRef = useRef<HTMLDivElement>(null);

  const totalSteps = steps.length;
  const step       = steps[currentStep];
  const progress   = ((currentStep) / totalSteps) * 100;

  useEffect(() => { setHeadingKey((k) => k + 1); }, [category]);

  const handleField = (key: string, val: string) =>
    setFormData((p) => ({ ...p, [key]: val }));

  const validateStep = () => {
    const required = step.fields.filter((f) => f.required);
    return required.every((f) => formData[f.key]?.trim());
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setShowPlans(true);
      setTimeout(() => plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  };

  const handleBack = () => {
    if (showPlans) { setShowPlans(false); return; }
    if (currentStep > 0) setCurrentStep((s) => s - 1);
    else router.back();
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ══ ROOT ══ */
        .ip-root {
          font-family: 'Outfit', sans-serif;
          background: ${B.offwhite};
          min-height: 100vh; width: 100%;
          color: ${B.charcoal}; position: relative;
          overflow-x: hidden;
        }

        /* Decorative background orb */
        .ip-root::before {
          content: ''; position: fixed; top: -180px; right: -180px;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, var(--cat-accent-alpha, rgba(45,191,191,0.07)) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .ip-root::after {
          content: ''; position: fixed; bottom: -120px; left: -120px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,80,58,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* ══ HERO ══ */
        .ip-hero {
          position: relative; z-index: 1;
          background: ${B.white};
          border-bottom: 1px solid ${B.border};
          overflow: hidden;
        }

        /* Top accent line */
        .ip-hero-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--cat-accent, ${B.teal}) 0%, #17f1d1 40%, transparent 80%);
        }

        .ip-hero-inner {
          padding: 0 9vw;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          align-items: end;
          min-height: 280px;
        }

        .ip-hero-left { padding: 48px 0 44px; }

        .ip-back-btn {
          all: unset; display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 600;
          color: ${B.gray}; cursor: pointer; margin-bottom: 28px;
          letter-spacing: .06em; text-transform: uppercase;
          transition: color 0.2s, gap 0.2s;
        }
        .ip-back-btn:hover { color: var(--cat-accent, ${B.teal}); gap: 12px; }
        .ip-back-btn svg { transition: transform 0.2s; }
        .ip-back-btn:hover svg { transform: translateX(-3px); }

        .ip-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: var(--cat-accent, ${B.teal}); margin-bottom: 20px;
        }
        .ip-eyebrow::before {
          content: ''; display: block; width: 24px; height: 2px;
          background: var(--cat-accent, ${B.teal}); border-radius: 999px;
        }

        .ip-heading-wrap { margin-bottom: 18px; }
        .ip-heading-line {
          display: block;
          font-family: 'Playfair Display', serif !important;
          font-size: clamp(38px, 4.5vw, 64px) !important;
          font-weight: 800 !important; line-height: 1.08 !important;
          letter-spacing: -0.02em !important; color: ${B.charcoal} !important;
          overflow: visible !important; padding-bottom: 6px !important;
        }
        .ip-heading-accent {
          color: var(--cat-accent, ${B.teal}) !important; font-style: italic !important;
        }

        .ip-hero-desc {
          font-size: 15px; color: #888; line-height: 1.75; max-width: 440px;
          margin-bottom: 32px;
        }

        .ip-hero-badges {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .ip-hero-badge {
          font-size: 11px; font-weight: 600; color: ${B.charcoal};
          padding: 6px 14px; border-radius: 999px;
          background: ${B.offwhite}; border: 1px solid ${B.border}; letter-spacing: .03em;
        }

        /* Right visual column */
        .ip-hero-right {
          display: flex; flex-direction: column; align-items: flex-end;
          justify-content: flex-end; padding-bottom: 44px; gap: 20px;
          position: relative;
        }

        .ip-hero-icon-wrap {
          width: 120px; height: 120px; border-radius: 32px;
          display: flex; align-items: center; justify-content: center;
          background: var(--cat-bg, ${B.offwhite});
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.8) inset;
          position: relative;
        }
        .ip-hero-icon-wrap::before {
          content: ''; position: absolute; inset: -1px;
          border-radius: 33px;
          background: linear-gradient(135deg, var(--cat-accent, ${B.teal})20, transparent 60%);
          z-index: 0;
        }
        .ip-hero-icon { font-size: 56px; line-height: 1; position: relative; z-index: 1; }

        .ip-hero-stat-row {
          display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
        }
        .ip-hero-stat {
          display: flex; align-items: center; gap: 10px;
          background: ${B.white}; border: 1px solid ${B.border};
          border-radius: 12px; padding: 10px 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        .ip-hero-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 800;
          color: var(--cat-accent, ${B.teal});
        }
        .ip-hero-stat-lbl {
          font-size: 11px; font-weight: 600; color: ${B.gray};
          letter-spacing: .04em; text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .ip-hero-inner { grid-template-columns: 1fr; min-height: auto; padding: 0 6vw; }
          .ip-hero-left { padding: 40px 0 0; }
          .ip-hero-right { flex-direction: row; align-items: center; justify-content: flex-start; padding-bottom: 36px; }
          .ip-hero-stat-row { flex-direction: row; }
        }

        /* ══ TRUST STRIP ══ */
        .ip-trust-strip {
          position: relative; z-index: 1;
          background: ${B.white};
          border-bottom: 1px solid ${B.border};
          display: flex; align-items: stretch;
          overflow-x: auto; padding: 0 9vw;
          scrollbar-width: none;
        }
        .ip-trust-strip::-webkit-scrollbar { display: none; }
        .ip-trust-item {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 24px; flex-shrink: 0;
          border-right: 1px solid ${B.border};
          transition: background 0.2s;
        }
        .ip-trust-item:last-child { border-right: none; }
        .ip-trust-item:first-child { padding-left: 0; }
        .ip-trust-icon { font-size: 20px; }
        .ip-trust-label {
          font-size: 12px; font-weight: 700; color: ${B.charcoal};
          white-space: nowrap; margin-bottom: 1px;
        }
        .ip-trust-sub {
          font-size: 11px; color: ${B.gray}; white-space: nowrap;
        }

        /* ══ PROGRESS BAR ══ */
        .ip-progress-wrap {
          background: ${B.white}; border-bottom: 1px solid ${B.border};
          padding: 18px 9vw; position: sticky; top: 0; z-index: 100;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
        }
        .ip-progress-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 14px;
        }
        .ip-progress-steps { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .ip-progress-step {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600;
          color: ${B.gray}; transition: color 0.3s;
        }
        .ip-progress-step-active { color: var(--cat-accent, ${B.teal}); }
        .ip-progress-step-done   { color: #22c55e; }
        .ip-progress-step-num {
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800;
          background: ${B.offwhite}; border: 1.5px solid ${B.border};
          transition: background 0.3s, border-color 0.3s, color 0.3s;
        }
        .ip-progress-step-active .ip-progress-step-num {
          background: var(--cat-accent, ${B.teal}); color: #fff;
          border-color: var(--cat-accent, ${B.teal});
          box-shadow: 0 4px 12px var(--cat-accent, ${B.teal})40;
        }
        .ip-progress-step-done .ip-progress-step-num {
          background: #22c55e; color: #fff; border-color: #22c55e;
        }
        .ip-progress-step-name {
          font-size: 12px; font-weight: 600;
          display: none;
        }
        @media (min-width: 600px) { .ip-progress-step-name { display: block; } }
        .ip-progress-sep { color: ${B.border}; font-size: 18px; user-select: none; }
        .ip-progress-meta {
          display: flex; align-items: center; gap: 16px;
        }
        .ip-progress-pct {
          font-size: 12px; font-weight: 800;
          color: var(--cat-accent, ${B.teal});
          letter-spacing: .04em;
        }
        .ip-progress-bar {
          height: 5px; background: ${B.border}; border-radius: 999px; overflow: hidden;
        }
        .ip-progress-fill {
          height: 100%; border-radius: 999px;
          background: linear-gradient(90deg, var(--cat-accent, ${B.teal}), #17f1d1);
          transition: width 0.65s cubic-bezier(0.22,1,0.36,1);
          position: relative;
        }
        .ip-progress-fill::after {
          content: ''; position: absolute; right: 0; top: 50%;
          transform: translate(50%,-50%);
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--cat-accent, ${B.teal});
          box-shadow: 0 0 0 3px white;
        }
        @media (max-width: 720px) { .ip-progress-wrap { padding: 14px 6vw; } }

        /* ══ MAIN CONTENT LAYOUT ══ */
        .ip-content-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 0;
          max-width: 1280px;
          margin: 0 auto;
          padding: 48px 9vw 80px;
          position: relative; z-index: 1;
          align-items: start;
        }
        @media (max-width: 960px) {
          .ip-content-layout { grid-template-columns: 1fr; padding: 36px 6vw 60px; }
          .ip-sidebar { display: none; }
        }

        /* ══ FORM CARD ══ */
        .ip-step-card {
          background: ${B.white}; border-radius: 24px;
          border: 1px solid ${B.border};
          padding: 48px 48px 44px;
          box-shadow: 0 8px 48px rgba(0,0,0,.06), 0 2px 8px rgba(0,0,0,.03);
          animation: ipStepIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes ipStepIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 560px) { .ip-step-card { padding: 28px 22px 28px; border-radius: 20px; } }

        .ip-step-header { margin-bottom: 36px; padding-bottom: 28px; border-bottom: 1px solid ${B.border}; }
        .ip-step-num {
          font-family: 'Playfair Display', serif;
          font-size: 11px; font-weight: 700;
          color: var(--cat-accent, ${B.teal}); letter-spacing: .14em;
          text-transform: uppercase; margin-bottom: 12px;
          display: flex; align-items: center; gap: 8px;
        }
        .ip-step-num::before {
          content: ''; display: block; width: 20px; height: 2px;
          background: var(--cat-accent, ${B.teal}); border-radius: 999px;
        }
        .ip-step-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 2.8vw, 34px); font-weight: 800;
          color: ${B.charcoal}; line-height: 1.15; margin: 0 0 10px;
        }
        .ip-step-subtitle { font-size: 14px; color: #999; line-height: 1.65; margin: 0; }

        /* ── Fields Grid ── */
        .ip-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 24px 28px; }
        @media (max-width: 640px) { .ip-fields { grid-template-columns: 1fr; } }

        .ip-field { display: flex; flex-direction: column; gap: 8px; }
        .ip-label {
          font-size: 12px; font-weight: 700; color: ${B.charcoal};
          letter-spacing: .04em; text-transform: uppercase;
        }
        .ip-req { color: var(--cat-accent, ${B.teal}); margin-left: 2px; }

        .ip-input, .ip-select {
          height: 50px; border-radius: 12px; padding: 0 16px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 500;
          color: ${B.charcoal}; background: ${B.offwhite};
          border: 1.5px solid ${B.border};
          outline: none; width: 100%;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.2s;
          appearance: none;
        }
        .ip-input:focus, .ip-select:focus {
          border-color: var(--field-accent, ${B.teal});
          box-shadow: 0 0 0 3px var(--field-accent, ${B.teal})18;
          background: ${B.white};
        }
        .ip-input::placeholder { color: #ccc; }
        .ip-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23B5B5B5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px;
        }

        .ip-radio-group { display: flex; gap: 8px; flex-wrap: wrap; }
        .ip-radio-btn {
          all: unset; display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 16px; border-radius: 10px; cursor: pointer;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
          color: ${B.charcoal}; background: ${B.offwhite};
          border: 1.5px solid ${B.border};
          transition: border-color 0.22s, background 0.22s, color 0.22s, box-shadow 0.22s;
        }
        .ip-radio-btn:hover { border-color: var(--field-accent, ${B.teal}); }
        .ip-radio-active {
          border-color: var(--field-accent, ${B.teal}) !important;
          background: ${B.white} !important;
          color: var(--field-accent, ${B.teal}) !important;
          box-shadow: 0 0 0 3px var(--field-accent, ${B.teal})15;
        }
        .ip-radio-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--field-accent, ${B.teal});
          opacity: 0; transform: scale(0);
          transition: opacity 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .ip-radio-active .ip-radio-dot { opacity: 1; transform: scale(1); }

        /* ── Form Actions ── */
        .ip-form-actions {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 36px; padding-top: 28px;
          border-top: 1px solid ${B.border};
          gap: 16px; flex-wrap: wrap;
        }
        .ip-back-link {
          all: unset; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
          color: ${B.gray}; cursor: pointer; display: flex; align-items: center; gap: 6px;
          letter-spacing: .04em; text-transform: uppercase;
          transition: color 0.2s;
        }
        .ip-back-link:hover { color: ${B.charcoal}; }

        /* ══ SIDEBAR ══ */
        .ip-sidebar {
          padding-left: 40px; position: sticky; top: 100px;
        }

        .ip-sidebar-info {
          background: ${B.white}; border-radius: 20px;
          border: 1px solid ${B.border};
          padding: 28px 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          margin-bottom: 16px;
        }
        .ip-sidebar-info h4 {
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 800;
          color: ${B.charcoal}; margin-bottom: 8px;
        }
        .ip-sidebar-info p {
          font-size: 13px; color: #888; line-height: 1.65;
        }

        .ip-sidebar-perks {
          background: ${B.white}; border-radius: 20px;
          border: 1px solid ${B.border}; padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .ip-sidebar-perks h5 {
          font-size: 11px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: ${B.gray}; margin-bottom: 16px;
        }
        .ip-perk {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 14px;
        }
        .ip-perk:last-child { margin-bottom: 0; }
        .ip-perk-icon {
          width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          background: var(--cat-bg, ${B.offwhite});
        }
        .ip-perk-text p { font-size: 13px; font-weight: 700; color: ${B.charcoal}; margin-bottom: 2px; }
        .ip-perk-text span { font-size: 12px; color: #999; }

        /* ══ PLANS SECTION ══ */
        .ip-plans-section {
          padding: 64px 9vw 100px; position: relative; z-index: 1;
        }
        @media (max-width: 720px) { .ip-plans-section { padding: 48px 6vw 80px; } }

        /* Plans header two-col */
        .ip-plans-header-row {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 24px; flex-wrap: wrap; margin-bottom: 40px;
        }
        .ip-plans-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: var(--cat-accent, ${B.teal}); margin-bottom: 16px;
        }
        .ip-plans-eyebrow::before {
          content: ''; display: block; width: 24px; height: 2px;
          background: var(--cat-accent, ${B.teal}); border-radius: 999px;
        }
        .ip-plans-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 3.8vw, 52px); font-weight: 800;
          color: ${B.charcoal}; line-height: 1.1; margin: 0 0 10px;
        }
        .ip-plans-heading em { color: var(--cat-accent, ${B.teal}); font-style: italic; }
        .ip-plans-sub {
          font-size: 14px; color: #888; line-height: 1.65;
          max-width: 400px;
        }

        .ip-plans-actions-top { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
        .ip-plans-irdai {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; color: ${B.gray};
          letter-spacing: .06em;
        }
        .ip-plans-irdai::before {
          content: '✓'; display: inline-flex; align-items: center; justify-content: center;
          width: 18px; height: 18px; border-radius: 50%;
          background: #22c55e20; color: #22c55e; font-size: 10px; font-weight: 900;
        }

        /* Plans Grid */
        .ip-plans-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
          margin-bottom: 40px;
        }
        @media (max-width: 860px) { .ip-plans-grid { grid-template-columns: 1fr; } }

        /* Plan card */
        .ip-plan {
          background: ${B.white}; border-radius: 24px;
          border: 1.5px solid rgba(0,0,0,0.07); padding: 28px 24px 24px;
          display: flex; flex-direction: column;
          box-shadow: 0 4px 20px rgba(0,0,0,.04);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          animation: ipPlanIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
          position: relative; overflow: hidden;
        }
        @keyframes ipPlanIn { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .ip-plan:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,.10), 0 4px 12px var(--plan-accent)22; }
        .ip-plan-rec {
          border-color: var(--plan-accent) !important;
          transform: translateY(-4px);
          box-shadow: 0 8px 40px rgba(0,0,0,.08), 0 0 0 4px var(--plan-accent)12 !important;
        }
        .ip-plan-rec:hover { transform: translateY(-10px) !important; }
        .ip-plan-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 4px; }
        .ip-plan-badge {
          position: absolute; top: 18px; right: 18px;
          font-size: 10px; font-weight: 800; letter-spacing: .06em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 999px;
        }
        .ip-plan-header { margin-bottom: 18px; }
        .ip-plan-name {
          font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 800;
          color: ${B.charcoal}; margin: 0 0 4px;
        }
        .ip-plan-cover { font-size: 11px; color: ${B.gray}; font-weight: 700; margin: 0 0 12px; text-transform: uppercase; letter-spacing: .08em; }
        .ip-plan-price-row { display: flex; align-items: baseline; gap: 4px; }
        .ip-plan-price { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900; line-height: 1; }
        .ip-plan-per { font-size: 13px; color: ${B.gray}; font-weight: 500; }
        .ip-plan-divider { height: 1px; border-radius: 999px; margin: 18px 0; opacity: 0.2; }
        .ip-plan-features {
          list-style: none; margin: 0 0 24px; padding: 0;
          display: flex; flex-direction: column; gap: 10px; flex: 1;
        }
        .ip-plan-feature {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 13px; color: #555; line-height: 1.4;
        }
        .ip-plan-check { flex-shrink: 0; font-weight: 900; }
        .ip-plan-actions { display: flex; gap: 10px; }
        .ip-plan-buy {
          all: unset; flex: 1; height: 46px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
          color: #fff; cursor: pointer;
          transition: transform 0.25s, filter 0.25s, background 0.3s;
        }
        .ip-plan-buy:hover { transform: translateY(-2px); filter: brightness(1.08); }
        .ip-plan-advisor {
          all: unset; height: 46px; padding: 0 16px; border-radius: 12px;
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700;
          color: ${B.gray}; cursor: pointer;
          border: 1.5px solid rgba(0,0,0,0.10);
          transition: border-color 0.25s, color 0.25s;
          white-space: nowrap;
        }
        .ip-plan-advisor:hover { border-color: var(--plan-accent, ${B.teal}); color: var(--plan-accent, ${B.teal}); }

        /* ══ SUCCESS BANNER ══ */
        .ip-success-banner {
          background: linear-gradient(135deg, var(--cat-accent, ${B.teal}), #17f1d1);
          border-radius: 20px; padding: 28px 36px;
          display: flex; align-items: center; gap: 20px;
          margin-bottom: 40px; flex-wrap: wrap;
          box-shadow: 0 12px 40px var(--cat-accent, ${B.teal})35;
          animation: ipStepIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
        .ip-success-icon { font-size: 44px; flex-shrink: 0; }
        .ip-success-text h3 {
          font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 800;
          color: #fff; margin: 0 0 4px;
        }
        .ip-success-text p { font-size: 14px; color: rgba(255,255,255,0.82); margin: 0; }

        /* ══ PLANS BOTTOM ACTIONS ══ */
        .ip-plans-bottom-actions {
          display: flex; gap: 14px; flex-wrap: wrap; align-items: center;
        }
        .ip-advisor-btn {
          all: unset; display: inline-flex; align-items: center; gap: 8px;
          height: 52px; padding: 0 28px; border-radius: 999px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
          color: var(--cat-accent, ${B.teal}); cursor: pointer;
          border: 1.5px solid var(--cat-accent, ${B.teal})55;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .ip-advisor-btn:hover {
          background: var(--cat-accent, ${B.teal})10;
          border-color: var(--cat-accent, ${B.teal});
          transform: translateY(-2px);
        }

        /* ══ UIVERSE BUTTON (unchanged) ══ */
        .ip-uv-btn {
          all: unset; position: relative; display: inline-flex;
          height: 52px; align-items: center; border-radius: 9999px; padding: 0 32px;
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
          color: #fff; letter-spacing: .01em; cursor: pointer; user-select: none;
          min-width: 160px; justify-content: center;
        }
        .ip-uv-bg {
          overflow: hidden; border-radius: 9999px; position: absolute; inset: 0;
          background: var(--btn-bg); box-shadow: 0 6px 28px rgba(0,0,0,.18);
          transition: transform 1.8s cubic-bezier(0.19,1,0.22,1);
        }
        .ip-uv-btn:hover .ip-uv-bg { transform: scale(1.04); }
        .ip-uv-layers {
          display: block; position: absolute; left: 50%; top: -60%; transform: translate(-50%);
          aspect-ratio: 1/1; width: max(200%, 10rem);
        }
        .ip-uv-layer { display: block; border-radius: 9999px; position: absolute; inset: 0; transform: scale(0); }
        .ip-uv-btn:hover .ip-uv-layer { transition: transform 1.3s cubic-bezier(0.19,1,0.22,1), opacity .3s linear; }
        .ip-uv-btn:hover .ip-uv-l1 { transform: scale(1); }
        .ip-uv-btn:hover .ip-uv-l2 { transition-delay: .1s; transform: scale(1); }
        .ip-uv-btn:hover .ip-uv-l3 { transition-delay: .2s; transform: scale(1); }
        .ip-uv-inner { position: relative; display: block; pointer-events: none; }
        .ip-uv-static, .ip-uv-hover { display: block; pointer-events: none; }
        .ip-uv-hover { position: absolute; top: 0; left: 0; opacity: 0; transform: translateY(70%); }
        .ip-uv-btn:hover .ip-uv-static { opacity: 0; transform: translateY(-70%); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity .3s linear; }
        .ip-uv-btn:hover .ip-uv-hover  { opacity: 1; transform: translateY(0); transition: transform 1.4s cubic-bezier(0.19,1,0.22,1), opacity 1.4s cubic-bezier(0.19,1,0.22,1); }

        /* ══ SECTION DIVIDER ══ */
        .ip-section-divider {
          height: 1px; background: ${B.border};
          margin: 0 9vw; position: relative; z-index: 1;
        }
      `}</style>

      <div
        className="ip-root"
        ref={topRef}
        style={{
          "--cat-accent": config.accent,
          "--cat-accent-alpha": `${config.accent}18`,
          "--cat-bg": config.bg,
        } as React.CSSProperties}
      >
        {/* ══ HERO ══ */}
        <div className="ip-hero">
          <div className="ip-hero-accent-bar" />
          <div className="ip-hero-inner">
            <div className="ip-hero-left">
              <button className="ip-back-btn" onClick={() => router.back()}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All Products
              </button>
              <p className="ip-eyebrow">{config.sublabel}</p>
              <div className="ip-heading-wrap">
                <ShuffleText
                  key={`ip-h1-${headingKey}`}
                  text={config.label}
                  tag="span"
                  className="ip-heading-line ip-heading-accent"
                  shuffleDirection="right"
                  duration={0.5} stagger={0.035}
                  animationMode="evenodd"
                  triggerOnce={false} triggerOnHover={false}
                  rootMargin="0px" threshold={0}
                />
                <ShuffleText
                  key={`ip-h2-${headingKey}`}
                  text="Quotes for you."
                  tag="span"
                  className="ip-heading-line"
                  shuffleDirection="right"
                  duration={0.5} stagger={0.035}
                  animationMode="evenodd"
                  triggerOnce={false} triggerOnHover={false}
                  rootMargin="0px" threshold={0}
                />
              </div>
              <p className="ip-hero-desc">{config.description}</p>
              <div className="ip-hero-badges">
                {["IRDAI Approved","Instant Policy","Zero Paperwork","Cashless Claims"].map((b) => (
                  <span key={b} className="ip-hero-badge">{b}</span>
                ))}
              </div>
            </div>

            <div className="ip-hero-right">
              <div className="ip-hero-icon-wrap">
                <span className="ip-hero-icon">{config.icon}</span>
              </div>
              <div className="ip-hero-stat-row">
                <div className="ip-hero-stat">
                  <div>
                    <div className="ip-hero-stat-val">2Cr+</div>
                    <div className="ip-hero-stat-lbl">Customers</div>
                  </div>
                </div>
                <div className="ip-hero-stat">
                  <div>
                    <div className="ip-hero-stat-val">₹3500Cr</div>
                    <div className="ip-hero-stat-lbl">Claims Settled</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ TRUST STRIP ══ */}
        <TrustStrip />

        {/* ══ PROGRESS BAR ══ */}
        {!showPlans && (
          <div className="ip-progress-wrap">
            <div className="ip-progress-top">
              <div className="ip-progress-steps">
                {steps.map((s, i) => (
                  <React.Fragment key={s.title}>
                    <div className={`ip-progress-step${i === currentStep ? " ip-progress-step-active" : i < currentStep ? " ip-progress-step-done" : ""}`}>
                      <span className="ip-progress-step-num">
                        {i < currentStep ? "✓" : i + 1}
                      </span>
                      <span className="ip-progress-step-name">{s.title}</span>
                    </div>
                    {i < steps.length - 1 && <span className="ip-progress-sep">›</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="ip-progress-meta">
                <span className="ip-progress-pct">
                  {Math.round(((currentStep) / totalSteps) * 100)}% Complete
                </span>
              </div>
            </div>
            <div className="ip-progress-bar">
              <div className="ip-progress-fill" style={{ width: `${Math.max(progress, 6)}%` }} />
            </div>
          </div>
        )}

        {/* ══ FORM STEPS ══ */}
        {!showPlans && (
          <div className="ip-content-layout">
            {/* Main form */}
            <div>
              <div key={currentStep} className="ip-step-card">
                <div className="ip-step-header">
                  <div className="ip-step-num">Step {currentStep + 1} of {totalSteps} — {step.title}</div>
                  <h2 className="ip-step-title">{step.title}</h2>
                  <p className="ip-step-subtitle">{step.subtitle}</p>
                </div>

                <div className="ip-fields">
                  {step.fields.map((field) => (
                    <FormField
                      key={field.key}
                      field={field}
                      value={formData[field.key] || ""}
                      onChange={(v) => handleField(field.key, v)}
                      accent={config.accent}
                    />
                  ))}
                </div>

                <div className="ip-form-actions">
                  <button className="ip-back-link" onClick={handleBack}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {currentStep === 0 ? "All Products" : "Previous"}
                  </button>
                  <AnimatedButton
                    label={currentStep === totalSteps - 1 ? "See My Plans →" : "Continue →"}
                    bg={config.accent}
                    layers={["#17f1d1", "#a374ff", config.accent]}
                    onClick={handleNext}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="ip-sidebar">
              <div className="ip-sidebar-info">
                <h4>{config.icon} {config.label}</h4>
                <p>{config.description}</p>
              </div>
              <div className="ip-sidebar-perks">
                <h5>Why TransIndia</h5>
                {[
                  { icon: "🔍", title: "Radical Transparency", sub: "No hidden clauses. No pushy upsells." },
                  { icon: "🎓", title: "Expert-Led Guidance", sub: "IRDAI licensed advisors, always." },
                  { icon: "⚡", title: "Instant Coverage", sub: "Policy in your inbox within minutes." },
                  { icon: "💬", title: "24/7 Human Support", sub: "Real people, not bots, always." },
                ].map((p) => (
                  <div key={p.title} className="ip-perk">
                    <div className="ip-perk-icon">{p.icon}</div>
                    <div className="ip-perk-text">
                      <p>{p.title}</p>
                      <span>{p.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ PLANS SECTION ══ */}
        {showPlans && (
          <div className="ip-plans-section" ref={plansRef}>
            {/* Success banner */}
            <div className="ip-success-banner">
              <span className="ip-success-icon">🎉</span>
              <div className="ip-success-text">
                <h3>Your personalised plans are ready, {formData["name"] || "there"}!</h3>
                <p>
                  Based on your profile · {totalSteps} steps completed · {config.label} · Sorted by best fit
                </p>
              </div>
            </div>

            <div className="ip-plans-header-row">
              <div>
                <p className="ip-plans-eyebrow">Your Matched Plans</p>
                <h2 className="ip-plans-heading">
                  Best <em>{config.label}</em><br />plans for you.
                </h2>
                <p className="ip-plans-sub">
                  All plans are IRDAI approved. Compare and buy in under 5 minutes —
                  policy document delivered instantly.
                </p>
              </div>
              <div className="ip-plans-actions-top">
                <span className="ip-plans-irdai">IRDAI Regulated</span>
                <span className="ip-plans-irdai">ISO 27001 Certified</span>
                <span className="ip-plans-irdai">4.8★ App Rating</span>
              </div>
            </div>

            <div className="ip-plans-grid">
              {plans.map((plan, i) => (
                <PlanCard key={plan.name} plan={plan} index={i} />
              ))}
            </div>

            <div className="ip-plans-bottom-actions">
              <AnimatedButton
                label="← Edit My Details"
                bg={B.charcoal}
                layers={["#444", "#222", B.charcoal]}
                onClick={() => {
                  setShowPlans(false);
                  setCurrentStep(0);
                  topRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              />
              <button className="ip-advisor-btn">
                🎓 Talk to an Advisor
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}