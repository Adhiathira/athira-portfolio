import { Fragment } from 'react';
import Head from 'next/head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import VerticalsHero from '@/components/verticals/VerticalsHero';
import VerticalBlock, { type VerticalBlockProps } from '@/components/verticals/VerticalBlock';
import VerticalsCta from '@/components/verticals/VerticalsCta';
import SquiggleDivider, { type SquiggleIntensity } from '@/components/common/SquiggleDivider';
import {
  SpaGlyph,
  ToursGlyph,
  RealEstateGlyph,
  CustomGlyph,
} from '@/components/verticals/Glyphs';

// Blocks alternate ground so no two adjacent sections share it: even-indexed
// blocks sit on the tint panel, odd on white. Dividers between them are filled
// with the ground they flow into.
const vbGround = (index: number) => (index % 2 === 0 ? '#f0f0f4' : '#ffffff');
const VB_INTENSITY: SquiggleIntensity[] = ['medium', 'bold', 'gentle'];
const VB_FLIP = [true, false, true];

// Four vertical detail blocks. Copy is verbatim from the content source; the
// layout, motif, and animation are the design decisions. Every block uses the
// site's standard teal circled checkmark for its proof rows (no per-block variation).
const BLOCKS: Array<Omit<VerticalBlockProps, 'index'>> = [
  {
    id: 'vertical-1',
    img: '/assets/vertical-spa.jpeg',
    imgAlt: 'Folded spa towels, basalt stones and eucalyptus',
    heading: 'Massage & spa',
    body: 'Replace Zenoti, MindBody, or MassageBook, without the per-location software creep.',
    items: [
      'Bookings, memberships, and gift cards connected to your CRM',
      'AI-assisted call answering and follow-up drafting',
      'Win-back campaigns you approve before they run',
    ],
    glyph: <SpaGlyph title="A water droplet rising through ribbons of steam" />,
    reverse: false,
  },
  {
    id: 'vertical-2',
    img: '/assets/vertical-tours.jpeg',
    imgAlt: 'A kayak on clear teal water seen from above',
    heading: 'Tours & travel',
    body: 'Replace FareHarbor or Xola, without giving up a cut of every booking.',
    items: [
      'Bookings flow into your CRM with no revenue share',
      'Seasonal campaigns created through simple conversation',
      'Text confirmations and reminders from your business number',
    ],
    glyph: <ToursGlyph title="A compass rose over a plotted route" />,
    reverse: true,
  },
  {
    id: 'vertical-3',
    img: '/assets/vertical-realestate.jpeg',
    imgAlt: 'A minimal model home with a key on a teal keyring',
    heading: 'Real estate agents & teams',
    body: "Replace Follow Up Boss or Wise Agent, with a CRM that flexes to how your team actually splits buyers, sellers, and listings.",
    items: [
      "Buyers, sellers, and listings modeled around your team's structure",
      'Calls transcribed and summarized into the right records',
      'Follow-ups drafted for your review before sending',
    ],
    glyph: <RealEstateGlyph title="A house shell over a floor plan with a locator pin" />,
    reverse: false,
  },
  {
    id: 'vertical-4',
    img: '/assets/vertical-other.jpeg',
    imgAlt: 'White building blocks with one teal block placed mid-air',
    heading: 'Something else?',
    body: "Tell us how your business runs. We'll build the primitives around it, with white-glove onboarding.",
    items: [
      'White-glove onboarding with our team',
      'Objects and fields built around your operations',
      'A platform shaped to fit, not a workaround',
    ],
    glyph: <CustomGlyph title="Modular primitives wired into one custom assembly" />,
    reverse: true,
    tone: 'accent',
  },
];

export default function VerticalsPage() {
  return (
    <>
      <Head>
        <title>CentralHub for spas, tours, real estate, and whatever you run next</title>
        <meta
          name="description"
          content="One flexible foundation, shaped around how your business actually operates. See how CentralHub fits massage and spa, tours and travel, real estate teams, and the verticals we build with you directly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav activePage="verticals" />

      <main id="verticals-main">
        <VerticalsHero />

        <SquiggleDivider bg="#ffffff" fill={vbGround(0)} intensity="gentle" />
        {BLOCKS.map((block, index) => (
          <Fragment key={block.id}>
            {index > 0 && (
              <SquiggleDivider
                bg={vbGround(index - 1)}
                fill={vbGround(index)}
                intensity={VB_INTENSITY[(index - 1) % VB_INTENSITY.length]}
                flip={VB_FLIP[(index - 1) % VB_FLIP.length]}
              />
            )}
            <VerticalBlock index={index} {...block} />
          </Fragment>
        ))}

        <SquiggleDivider bg={vbGround(BLOCKS.length - 1)} fill="#0e0f11" intensity="medium" />
        <VerticalsCta />
      </main>

      <Footer />
    </>
  );
}
