import Image from "next/image";
import { Homemain } from "./components/Homemain";
import ServicesSection from "./components/Servicecard";
import CaseStudiesSection from "./components/Projects";
import ExperienceSection from "./components/Experincesection";
import ContactSection from "./components/ContactSection";
import TechStack from "./components/Extra";

export default function Home() {
  return (
   <div>
    <Homemain/>
    <ServicesSection/>
    <CaseStudiesSection/>
    <ExperienceSection/>
    <TechStack/>
    <ContactSection/>
   </div>
  );
}
