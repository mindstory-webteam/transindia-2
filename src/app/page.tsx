import AboutSection from "@/component/AboutSection";
import FindInsuranceSection from "@/component/FindInsuranceSection";
import FloatingNavbar from "@/component/FloatingNavbar";
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
    <FindInsuranceSection/>
   
      
    </>
  );
}
