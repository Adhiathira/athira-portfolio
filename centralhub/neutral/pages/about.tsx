import Head from 'next/head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import FounderLetter from '@/components/about/FounderLetter';
import Beliefs from '@/components/about/Beliefs';
import AboutCta from '@/components/about/AboutCta';
import SquiggleDivider from '@/components/common/SquiggleDivider';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About CentralHub</title>
        <meta
          name="description"
          content="A note from the founder on why we built CentralHub, and the pricing commitments we hold to as your business grows."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav activePage="about" />

      <main id="about-page">
        <AboutHero />
        <SquiggleDivider bg="#ffffff" fill="#f0f0f4" intensity="gentle" />
        <FounderLetter />
        <SquiggleDivider bg="#f0f0f4" fill="#ffffff" intensity="bold" flip />
        <Beliefs />
        <SquiggleDivider bg="#ffffff" fill="#1b1b37" intensity="medium" />
        <AboutCta />
      </main>

      <Footer />
    </>
  );
}
