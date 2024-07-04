import Image from "next/image";
import Navbar from "./mainPageComponents/Navbar";
import HeroSection from "./mainPageComponents/HeroSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
    </div>
  );
}
