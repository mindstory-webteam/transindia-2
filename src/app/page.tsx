import AboutSection from "@/component/AboutSection";
import CoverageSection from "@/component/Coveragesection";
import CTABanner from "@/component/Ctabanner";
import FindInsuranceSection from "@/component/FindInsuranceSection";
import FloatingNavbar from "@/component/FloatingNavbar";
import Footer from "@/component/Footer";
import HeroCarousel from "@/component/Herocarousel";
import QuoteCompare from "@/component/Quotecompare";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <FloatingNavbar/>

    <HeroCarousel/>
     <QuoteCompare/>
    <AboutSection/>
    <CoverageSection/>
    <FindInsuranceSection/>

<CTABanner/>

    <Footer/>
   
      
    </>
  );
}
