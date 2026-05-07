import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PricingTable } from "@/components/marketing/pricing-table";
import { PartnerWall } from "@/components/marketing/partner-wall";
import { Contact } from "@/components/marketing/contact";

export default function Pricing() {
  return (
    <>
      <TopNav />
      <main>
        <PricingTable />
        <PartnerWall />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
