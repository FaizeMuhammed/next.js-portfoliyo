import React from 'react';
import Link from 'next/link';

export default function ONDCProject() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-6 border-b border-gray-100">
        <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
          ← Back
        </Link>
        <a href="/faize-resume.pdf" target="_blank"
          className="bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
          Resume
        </a>
      </nav>

      {/* PROJECT HEADER */}
      <header className="px-6 md:px-16 pt-16 md:pt-24 pb-0">
        <div className="bg-black text-white inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest mb-10">
          System Case Study / 01
        </div>

        <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-bold tracking-tighter leading-[0.92] mb-12 max-w-6xl">
          ONDC Financial<br />Services Connector.
        </h1>

        {/* META ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-gray-200">
          {[
            { label: 'Role', value: 'Sole Full-Stack Architect' },
            { label: 'Context', value: 'Confidential Fintech (NDA)' },
            { label: 'Type', value: 'Zero-to-One Build' },
            { label: 'Status', value: '🟢 Personal Loan Live' },
          ].map((item, i) => (
            <div key={i} className="py-6 px-6 border-r border-gray-200 last:border-r-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
              <p className="font-bold text-sm md:text-base">{item.value}</p>
            </div>
          ))}
        </div>
      </header>

      <main className="px-6 md:px-16 pb-32">

        {/* OVERVIEW */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gray-100">
          <div className="md:col-span-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">/ Overview</p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800">
              Sole architect of a live ONDC BAP/BPP financial connector — built from zero
              when ONDC had almost no developer documentation.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              I owned the ONDC integration entirely — no team, no existing codebase,
              no tutorials. Built the full Personal Loan BAP/BPP flow from the raw Beckn Protocol
              spec, reverse-engineering every payload from live network logs.
              Purchase Finance and Working Capital connectors are built on the same
              infrastructure and going live next.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Also contributed to the broader fintech platform — including the MF dashboard
              and RTA pipeline — but the ONDC connector is the work I designed and shipped
              independently end to end.
            </p>
          </div>
        </section>

        {/* WHAT WAS BUILT */}
        <section className="py-20 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">/ What Was Built</p>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800">
                Not one product — an entire financial ecosystem. Three live credit products,
                two external network integrations, and an automated data pipeline.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
            {[
              {
                num: '01',
                title: 'ONDC Personal Loan',
                items: [
                  'Full BAP/BPP connector — sole architect',
                  'End-to-end loan application lifecycle',
                  'Beckn Protocol state machine from scratch',
                  'Onboarded 2 Credit Providers — Live ✅',
                ]
              },
              {
                num: '02',
                title: 'ONDC Purchase Finance & Working Capital',
                items: [
                  'Purchase Finance — embedded checkout flow',
                  'Working Capital — business lending product',
                  'Both built on same BAP/BPP connector',
                  'Integration complete — going live soon',
                ]
              },
              {
                num: '03',
                title: 'Mutual Fund Platform',
                items: [
                  'Multi-MFD tenant dashboard — Next.js',
                  'BSE Star MF integration (team effort)',
                  'CAMS & Karvy RTA mailback pipeline',
                  'UIDAI Aadhaar face KYC integration',
                ]
              },
            ].map((card, i) => (
              <div key={i} className="p-8 border-r border-gray-200 last:border-r-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-6">{card.num}</span>
                <h3 className="text-lg font-bold tracking-tight mb-6">{card.title}</h3>
                <ul className="space-y-3">
                  {card.items.map((item, j) => (
                    <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-gray-300 mt-1">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="py-20 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">/ Architecture</p>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800">
                A polyglot stack chosen deliberately — each language doing what it does best.
              </p>
            </div>
          </div>

          {/* ARCHITECTURE DIAGRAM */}
          <div className="w-full bg-[#0a0a0a] text-white p-8 md:p-16 mb-12 overflow-x-auto">
            <div className="min-w-[640px]">

              {/* Top row — external networks */}
              <div className="flex gap-4 mb-8 justify-center">
                {['ONDC Beckn Gateway', 'BSE Star MF Network', 'CAMS / Karvy RTA Email'].map((n, i) => (
                  <div key={i} className="border border-gray-600 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center flex-1 max-w-[200px]">
                    {n}
                  </div>
                ))}
              </div>

              {/* Arrow down */}
              <div className="text-center text-gray-600 text-xs mb-8 font-mono">
                Webhooks / API Calls / Email Ingestion<br />
                ↓ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓
              </div>

              {/* Middle row — gateway + parser */}
              <div className="flex gap-4 mb-8 justify-center">
                <div className="bg-white text-black p-6 text-center flex-1 max-w-[300px]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Primary Gateway</p>
                  <p className="text-lg font-black tracking-tight">Node.js / Express</p>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Idempotency · Auth · Routing</p>
                </div>
                <div className="border border-gray-700 p-6 text-center flex-1 max-w-[300px]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Data Pipeline</p>
                  <p className="text-lg font-black tracking-tight">FastAPI / Python</p>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">RTA Parsing · Reconciliation</p>
                </div>
              </div>

              {/* Arrow down */}
              <div className="text-center text-gray-600 text-xs mb-8 font-mono">
                ↓ ACID Writes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓ Structured Logs
              </div>

              {/* Bottom row — databases */}
              <div className="flex gap-4 justify-center">
                <div className="border border-gray-700 p-5 text-center flex-1 max-w-[200px]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Financial Ledger</p>
                  <p className="font-black text-base">PostgreSQL</p>
                  <p className="text-[9px] text-gray-600 mt-1 uppercase">ACID · Row Locks</p>
                </div>
                <div className="border border-gray-700 p-5 text-center flex-1 max-w-[200px]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Webhook Sink</p>
                  <p className="font-black text-base">MongoDB</p>
                  <p className="text-[9px] text-gray-600 mt-1 uppercase">Payloads · Logs</p>
                </div>
                <div className="border border-gray-700 p-5 text-center flex-1 max-w-[200px]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Idempotency</p>
                  <p className="font-black text-base">Redis</p>
                  <p className="text-[9px] text-gray-600 mt-1 uppercase">Cache · Dedup</p>
                </div>
              </div>

            </div>
          </div>

          {/* Tech cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: 'Frontend',
                tech: 'Next.js (SSR)',
                desc: 'Multi-tenant dashboards with Server-Side Rendering for fast initial loads. Complex state machines for dynamic KYC flows, loan offer screens, and real-time application tracking across multiple tenants without data bleed.'
              },
              {
                label: 'API Gateway',
                tech: 'Node.js + Express',
                desc: 'High-concurrency gateway handling the full volume of asynchronous ONDC webhooks, non-blocking network calls, and real-time updates. Chosen specifically for its event-loop architecture suited to I/O-heavy webhook processing.'
              },
              {
                label: 'Data Processing',
                tech: 'Python + FastAPI',
                desc: 'Isolated into a separate microservice for mailback parsing. Ingests raw CAMS and Karvy RTA emails, parses messy unstructured data, transforms it into structured portfolio records, and pushes to the core ledger — all async.'
              },
              {
                label: 'Database Strategy',
                tech: 'PostgreSQL + MongoDB + Redis',
                desc: 'PostgreSQL for all financial state — strict ACID compliance for loan disbursals and SIP transactions. MongoDB as a high-throughput sink for raw webhook payloads. Redis for idempotency keys and deduplication of duplicate webhook fires.'
              },
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 p-8 hover:border-black transition-colors">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{card.label}</p>
                <p className="text-xl font-bold tracking-tight mb-4">{card.tech}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HARDEST PROBLEM */}
        <section className="py-20 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">/ Hardest Problem</p>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800">
                Race conditions in financial state machines. Duplicate webhook fires leading to double disbursals.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-8 md:p-12 mb-12">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">The Problem</p>
            <p className="text-lg md:text-2xl font-medium leading-relaxed text-gray-800 mb-0">
              The ONDC gateway fires webhooks for every state change in a loan application.
              Under load, the same webhook fires twice within milliseconds — both arrive at the Node.js server simultaneously.
              A naive backend processes both, creating duplicate ledger entries and double disbursals.
              In financial systems this is catastrophic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200">
            <div className="p-8 md:p-12 border-r border-gray-200">
              <span className="bg-black text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest">Solution 01</span>
              <h4 className="text-xl font-bold tracking-tight mt-6 mb-4">Idempotency Middleware</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Every incoming webhook is hashed into a unique idempotency key based on the
                transaction ID, state, and timestamp. Before processing, the Node.js gateway
                checks Redis for this key. If it exists — the request already processed successfully —
                we return the cached response immediately without touching PostgreSQL.
                The duplicate is handled in under 1ms with zero database load.
              </p>
            </div>
            <div className="p-8 md:p-12">
              <span className="bg-black text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest">Solution 02</span>
              <h4 className="text-xl font-bold tracking-tight mt-6 mb-4">PostgreSQL Row-Level Locks</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                For any operation mutating loan state or disbursing funds, I wrap the entire
                operation in a PostgreSQL transaction with{' '}
                <code className="bg-gray-100 px-2 py-0.5 text-xs font-mono border border-gray-300">SELECT ... FOR UPDATE</code>.
                If two threads race to approve the same loan, the database forces them to queue.
                The second thread reads the already-updated state and exits cleanly.
                No duplicate disbursal is possible at the database level — even if the application layer fails.
              </p>
            </div>
          </div>
        </section>

        {/* KEY LESSONS */}
        <section className="py-20 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">/ What I Learned</p>
            </div>
            <div className="md:col-span-8 space-y-8">
              {[
                {
                  num: '01',
                  title: 'Building without documentation is a skill',
                  body: 'ONDC had almost no developer resources when we started. I reverse-engineered the entire Beckn Protocol flow from the spec PDF and live network payloads. This taught me to read protocol specs directly rather than waiting for tutorials.'
                },
                {
                  num: '02',
                  title: 'Financial systems need defence in depth',
                  body: 'One layer of protection is never enough. I implemented idempotency at the API layer, row locks at the database layer, and state machine validation at the business logic layer. Any two of these would survive individually if one failed.'
                },
                {
                  num: '03',
                  title: 'Polyglot is sometimes the right answer',
                  body: 'Using Python for the RTA mailback pipeline while Node.js handled the real-time API was the right call. Forcing everything into Node.js would have made the data parsing significantly harder. Pick the right tool per problem.'
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest pt-1 shrink-0">{item.num}</span>
                  <div>
                    <h4 className="font-bold text-base mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM NAV */}
        <div className="pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <Link href="/#architecture" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
            ← Back to Projects
          </Link>
          <div className="text-left md:text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Next Case Study</p>
            <Link href="/faigen" className="text-3xl md:text-5xl font-bold tracking-tighter hover:underline">
              Faigen AI Platform →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}