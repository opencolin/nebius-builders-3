import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/marketing/hero";
import { ActiveEvents } from "@/components/marketing/active-events";
import { DualPitch } from "@/components/marketing/dual-pitch";
import { IdePreview } from "@/components/marketing/ide-preview";
import { WorkshopSpotlight } from "@/components/marketing/workshop-spotlight";
import { OldVsNew } from "@/components/marketing/old-vs-new";
import { PricingTable } from "@/components/marketing/pricing-table";
import { PartnerWall } from "@/components/marketing/partner-wall";
import { Testimonial } from "@/components/marketing/testimonial";
import { Contact } from "@/components/marketing/contact";

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <ActiveEvents />
        <DualPitch />
        <IdePreview />
        <WorkshopSpotlight />
        <OldVsNew />
        <PricingTable />
        <PartnerWall />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
