import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import LoopScrolly from "@/components/landing/LoopScrolly";
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
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
