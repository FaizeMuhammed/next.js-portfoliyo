import React from 'react';
import Link from 'next/link';

export default function BlogFintechDarkMode() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-8 max-w-[1920px] mx-auto">
        <Link href="/blogs" className="text-xl md:text-2xl font-black tracking-tighter hover:opacity-50 transition-opacity">
          ← BLOG
        </Link>
        <a href="/faize-resume.pdf" target="_blank"
          className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
          Resume
        </a>
      </nav>

      {/* HERO */}
      <header className="px-6 md:px-12 lg:px-24 py-16 lg:py-24 max-w-[1920px] mx-auto">
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <span className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest inline-block">
            Product Design
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">January 2026</span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">5 min read</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[7vw] font-bold tracking-tighter leading-none mb-12">
          Designing an Investment Dashboard: Why Pure White Branding Wins in Dark Mode SaaS.
        </h1>

        <p className="text-xl md:text-3xl text-gray-700 leading-relaxed mb-16 max-w-5xl font-medium">
          When I designed this mutual fund dashboard, the instinct was to
          use colour everywhere — green for gains, red for losses, blue for
          primary actions. The counterintuitive finding: pure white elements
          on a dark background created stronger visual hierarchy than any
          colour system I tried.
        </p>

        {/* META ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 border-t border-b border-gray-300 py-12">
          {[
            { label: 'Author', value: 'Faize Muhammed Basheer' },
            { label: 'Product', value: 'Confidential MFD Investment Platform' },
            { label: 'Stack', value: 'Next.js / Tailwind CSS / Shadcn UI' },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{item.label}</p>
              <p className="font-bold text-lg md:text-xl">{item.value}</p>
            </div>
          ))}
        </div>
      </header>

      {/* ARTICLE BODY */}
      <article className="px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto">

        {/* SECTION 1 */}
        <Section label="01 / The Context">
          <P>
            This project was an MFD investment platform I built at Bancwise Technologies —
            a multi-tenant dashboard for Mutual Fund Distributors to manage
            investor portfolios, process SIP transactions, and track brokerage.
          </P>
          <P>
            The users are MFDs — financial professionals who spend 6-8 hours a day
            inside the dashboard. Long sessions in a bright white UI cause eye fatigue.
            Dark mode was not optional — it was the baseline design decision from day one.
          </P>
          <P>
            What I did not expect was how much the choice of accent colours —
            or the deliberate removal of them — would affect how the interface
            felt to use.
          </P>
        </Section>

        {/* SECTION 2 */}
        <Section label="02 / The Colour Problem in Fintech UI">
          <P>
            Fintech dashboards have a colour language problem. Green means profit.
            Red means loss. Blue is primary action. Orange is warning. These
            conventions are so deeply embedded that users read colour before
            they read text.
          </P>
          <P>
            On a dark background this creates a specific failure mode: when
            everything that matters is coloured, nothing stands out. A green
            portfolio gain, a blue SIP button, an orange pending transaction,
            a red failed payment — all competing for attention simultaneously.
            The eye has nowhere to rest and no clear hierarchy to follow.
          </P>

          <QuoteBlock>
            When everything is an accent colour, nothing is accented.
            Colour loses its meaning when it is used for everything.
          </QuoteBlock>

          <P>
            The solution I landed on was inverting the default assumption:
            use colour only for financial state (gain / loss / pending / failed)
            where the semantic meaning is non-negotiable — and use pure white
            for everything else that needs emphasis.
          </P>
        </Section>

        {/* SECTION 3 */}
        <Section label="03 / Pure White as the Primary Accent">
          <P>
            On a dark background — say <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">#0F0F0F</code> or <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">#111827</code> —
            pure white (<code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">#FFFFFF</code>) has the highest possible contrast ratio: 21:1.
            No colour achieves this. Not blue, not green, not gold.
          </P>
          <P>
            This means that any element you render in pure white on a dark background
            will be seen first — before any coloured element — because the human eye
            responds to contrast before it processes hue.
          </P>

          {/* VISUAL DEMO */}
          <div className="my-12 bg-[#111827] p-8 md:p-12 lg:p-16 border border-gray-800 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-10">Visual comparison — dark background</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-6">Coloured accent system</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-blue-400 text-base font-bold">Total Portfolio Value</span>
                    <span className="text-blue-400 text-base font-bold">₹12,45,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-green-400 text-base font-bold">Today's Gain</span>
                    <span className="text-green-400 text-base font-bold">+₹2,340</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-orange-400 text-base font-bold">Pending SIPs</span>
                    <span className="text-orange-400 text-base font-bold">3</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-purple-400 text-base font-bold">Brokerage This Month</span>
                    <span className="text-purple-400 text-base font-bold">₹8,200</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6 italic">Hard to know where to look first</p>
              </div>
              
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-6">Pure white hierarchy</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-gray-400 text-base">Total Portfolio Value</span>
                    <span className="text-white text-base font-bold">₹12,45,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-gray-400 text-base">Today's Gain</span>
                    <span className="text-green-400 text-base font-bold">+₹2,340</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-gray-400 text-base">Pending SIPs</span>
                    <span className="text-orange-400 text-base font-bold">3</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-gray-400 text-base">Brokerage This Month</span>
                    <span className="text-gray-300 text-base font-medium">₹8,200</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6 italic">Eye goes to white first, then gains/losses</p>
              </div>
            </div>
          </div>

          <P>
            The right column works because it establishes a clear three-level hierarchy:
            white for the most important number, semantic colour (green/orange) only
            for financial state, and grey for labels and secondary values.
            The eye follows the hierarchy automatically — white first, then colour,
            then grey.
          </P>
        </Section>

        {/* SECTION 4 */}
        <Section label="04 / The Three-Level Hierarchy System">
          <P>
            The design system I settled on for the dashboard uses exactly
            three levels of visual weight — nothing more.
          </P>

          <DarkBlock>
{`/* Three-level dark mode hierarchy */

/* Level 1 — Primary emphasis */
/* Use for: the single most important number on any card */
.text-primary { color: #FFFFFF; font-weight: 700; }

/* Level 2 — Semantic state */  
/* Use for: financial gain/loss/pending ONLY */
.text-gain    { color: #4ADE80; } /* green-400 */
.text-loss    { color: #F87171; } /* red-400   */
.text-pending { color: #FB923C; } /* orange-400 */
.text-failed  { color: #F87171; } /* red-400   */

/* Level 3 — Labels and secondary */
/* Use for: everything else */
.text-label     { color: #9CA3AF; } /* gray-400  */
.text-secondary { color: #6B7280; } /* gray-500  */

/* Background layers */
.bg-base    { background: #0F172A; } /* slate-900 — page bg    */
.bg-surface { background: #1E293B; } /* slate-800 — card bg    */
.bg-raised  { background: #334155; } /* slate-700 — hover/input */`}
          </DarkBlock>

          <P>
            The rule is strict: colour is only allowed at Level 2, and only
            for financial state. Everything else is white, grey, or background.
            If you find yourself wanting to use blue for a "primary button"
            on a dark background — make it white instead. It will be more visible,
            not less.
          </P>
        </Section>

        {/* SECTION 5 */}
        <Section label="05 / Typography in Dark Mode Fintech">
          <P>
            Numbers are the primary content in a financial dashboard. The typography
            decisions for numbers matter more than for any other content type.
          </P>

          <NumberedList items={[
            {
              title: 'Use tabular figures for all financial numbers',
              body: 'Tabular figures (font-variant-numeric: tabular-nums) ensure all digits have equal width. This means columns of numbers align vertically — ₹1,234 and ₹98,765 line up on the decimal point. Without this, number columns look ragged and are harder to compare at a glance.'
            },
            {
              title: 'Never use font weights below 500 for numbers on dark',
              body: 'Light font weights (300, 400) render poorly on dark backgrounds — thin strokes get lost in the contrast. Use 500 minimum for secondary numbers, 600-700 for primary values. The visual weight of the number should match its importance in the hierarchy.'
            },
            {
              title: 'Size the primary number aggressively',
              body: 'The single most important number on any card — total portfolio value, today\'s P&L — should be significantly larger than everything else on that card. 2.5-3x the size of the label text. This is not decoration; it is information architecture. The user should be able to scan the primary number from across the screen.'
            }
          ]} />

          <DarkBlock>
{`/* Tabular figures for all financial data */
.financial-number {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  letter-spacing: -0.02em; /* tighten tracking for large numbers */
}

/* Primary value — portfolio total, P&L */
.value-primary {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #FFFFFF;
  font-variant-numeric: tabular-nums;
}

/* Secondary value — fund allocation, individual scheme */
.value-secondary {
  font-size: 1rem;
  font-weight: 600;
  color: #D1D5DB; /* gray-300 */
  font-variant-numeric: tabular-nums;
}`}
          </DarkBlock>
        </Section>

        {/* SECTION 6 */}
        <Section label="06 / What Did Not Work">
          <P>
            Two design patterns I tried and removed:
          </P>

          <SubHeading>Glassmorphism for Cards</SubHeading>
          <P>
            Glass cards — <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">backdrop-filter: blur()</code> with semi-transparent
            backgrounds — look impressive in design mockups. In a real dashboard
            with dense data, they create visual noise. The blurred background
            competes with the card content. Labels become harder to read.
            I removed glassmorphism entirely after the first user testing session.
            Solid surface colours with subtle borders work better for content-heavy interfaces.
          </P>

          <SubHeading>Coloured Card Borders for Status</SubHeading>
          <P>
            My first attempt at showing transaction status used coloured left
            borders — green border for completed, orange for pending, red for failed.
            The problem: users missed the border entirely and read the text for status.
            The border is a peripheral visual element; users focus on the card content
            centre. Status badges inside the card — text with background colour —
            are seen 3-4x more reliably than border colours.
          </P>
        </Section>

        {/* SECTION 7 */}
        <Section label="07 / The Single Rule">
          <P>
            If there is one rule to take from this post it is this:
          </P>

          <QuoteBlock>
            In dark mode fintech UI, use colour to mean something specific —
            not to decorate. Reserve white for the single most important element
            per section. Use grey for everything else. Colour only for state.
          </QuoteBlock>

          <P>
            This rule makes every design decision easier. When you find yourself
            asking "should this be blue or green?" — the answer is probably
            neither. Make it white if it is important, grey if it is not,
            and coloured only if it communicates gain, loss, pending, or failed.
          </P>
        </Section>

        {/* BOTTOM NAV */}
        <div className="border-t-4 border-black pt-12 mt-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <Link href="/blogs" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-3 border border-gray-300 px-8 py-4 hover:border-black">
            ← All Articles
          </Link>

          <div className="text-left md:text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Next Article</p>
            <Link href="/blogs/nextjs-multi-tenancy" className="text-4xl md:text-5xl font-bold tracking-tighter hover:underline">
              MongoDB Multi-Tenancy in Next.js →
            </Link>
          </div>
        </div>

      </article>
    </div>
  );
}

// ── Reusable Structural Components ───────────────────────────────────────

function Section({ label, children }) {
  return (
    <section className="mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      <div className="lg:col-span-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter border-t-4 border-black pt-6 mb-8 lg:mb-0">
          {label}
        </h2>
      </div>
      <div className="lg:col-span-8 max-w-4xl space-y-8 lg:pt-6">
        {children}
      </div>
    </section>
  );
}

function P({ children }) {
  return <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">{children}</p>;
}

function SubHeading({ children }) {
  return (
    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-16 mb-8 border-b border-gray-200 pb-4 text-black">
      {children}
    </h3>
  );
}

function QuoteBlock({ children }) {
  return (
    <div className="border-l-4 border-black pl-6 lg:pl-10 py-6 my-12 bg-gray-50">
      <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed italic">{children}</p>
    </div>
  );
}

function DarkBlock({ children }) {
  return (
    <div className="bg-[#0a0a0a] text-gray-300 font-mono text-sm md:text-base leading-relaxed p-8 md:p-12 my-12 overflow-x-auto whitespace-pre shadow-xl border border-black">
      {children}
    </div>
  );
}

function NumberedList({ items }) {
  return (
    <div className="space-y-12 pt-8">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col md:flex-row gap-6 items-start">
          <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest shrink-0 mt-1">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h4 className="font-bold text-xl md:text-2xl mb-4 text-black">{item.title}</h4>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}