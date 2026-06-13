import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import LoopScrolly from "@/components/landing/LoopScrolly";
import Witness from "@/components/landing/Witness";
import Climb from "@/components/landing/Climb";
import Record from "@/components/landing/Record";
import PlusSection from "@/components/landing/PlusSection";
import FinalCta from "@/components/landing/FinalCta";
import AltitudeRail from "@/components/landing/AltitudeRail";

export default function Home() {
  return (
    <>
      <Nav />
      <AltitudeRail />
      <main>
        <Hero />
        <Marquee />
        <LoopScrolly />
        <Witness />
        <Climb />
        <Record />
        <PlusSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
