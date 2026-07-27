import Head from 'next/head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import Problem from '@/components/home/Problem';
import Solution from '@/components/home/Solution';
import FinalCta from '@/components/home/FinalCta';
import SquiggleDivider from '@/components/common/SquiggleDivider';

export default function Home() {
  return (
    <>
      <Head>
        <title>CentralHub: One platform for every customer conversation</title>
        <meta
          name="description"
          content="One AI-native platform replacing your CRM, marketing tools, phone system, and website, priced so growing never costs you more. Founding members lock in their rate forever."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="CentralHub: One platform for every customer conversation" />
        <meta
          property="og:description"
          content="CRM, customer data, marketing, phones, and website in one AI-native platform, with pricing that does not punish you for growing."
        />
      </Head>

      <Nav activePage="index" />

      <main id="home-main">
        <Hero />
        <SquiggleDivider bg="#ffffff" fill="#f0f0f4" intensity="gentle" />
        <Problem />
        <SquiggleDivider bg="#ffffff" fill="#f0f0f4" intensity="bold" flip />
        <Solution />
        <SquiggleDivider bg="#f0f0f4" fill="#1b1b37" intensity="medium" />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
