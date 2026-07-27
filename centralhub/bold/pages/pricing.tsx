import Head from 'next/head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PricingHero from '@/components/pricing/PricingHero';
import PricingTiers from '@/components/pricing/PricingTiers';
import Roadmap from '@/components/pricing/Roadmap';
import PricingCta from '@/components/pricing/PricingCta';
import SquiggleDivider from '@/components/common/SquiggleDivider';

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing | CentralHub</title>
        <meta
          name="description"
          content="A flat platform price with no revenue share and no per seat tax. AI and telephony usage is billed at cost plus a transparent 20 percent, and the price you sign up at stays locked in."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav activePage="pricing" />

      <main id="pricing-main">
        <PricingHero />
        <SquiggleDivider bg="#ffffff" fill="#f0f0f4" intensity="gentle" />
        <PricingTiers />
        <SquiggleDivider bg="#f0f0f4" fill="#ffffff" intensity="bold" flip />
        <Roadmap />
        <SquiggleDivider bg="#ffffff" fill="#1b1b37" intensity="medium" />
        <PricingCta />
      </main>

      <Footer />
    </>
  );
}
