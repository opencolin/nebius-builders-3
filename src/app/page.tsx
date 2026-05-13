import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/marketing/hero";
import { ActiveEvents } from "@/components/marketing/active-events";
import { Products } from "@/components/marketing/products";
import { UseCases } from "@/components/marketing/use-cases";
import { WorkshopSpotlight } from "@/components/marketing/workshop-spotlight";
import { BuilderSpotlight } from "@/components/marketing/builder-spotlight";
import { Community } from "@/components/marketing/community";
import { Programs } from "@/components/marketing/programs";
import { DualPitch } from "@/components/marketing/dual-pitch";
import { PartnerWall } from "@/components/marketing/partner-wall";
import { Testimonial } from "@/components/marketing/testimonial";
import { BuildInPublic } from "@/components/marketing/build-in-public";
import { Contact } from "@/components/marketing/contact";

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <ActiveEvents />
        <Products />
        <UseCases />
        <WorkshopSpotlight />
        <BuilderSpotlight />
        <Community />
        <Programs />
        <DualPitch />
        <PartnerWall />
        <Testimonial />
        <BuildInPublic />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
