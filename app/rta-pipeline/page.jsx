import React from 'react';
import Link from 'next/link';

export default function RTAPipelinePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-8 max-w-[1920px] mx-auto">
        <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter hover:opacity-50 transition-opacity">
          ← BACK
        </Link>
        <a href="/faize-resume.pdf" target="_blank"
          className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
          Resume
        </a>
      </nav>

      {/* PROJECT HEADER */}
      <header className="px-6 md:px-12 lg:px-24 py-16 lg:py-24 max-w-[1920px] mx-auto">
        <div className="bg-black text-white inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest mb-12">
          System Case Study / 03
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[8vw] font-bold tracking-tighter leading-none mb-16">
          Automated RTA<br />Mailback Pipeline.
        </h1>

        {/* META ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 border-t border-b border-gray-300 py-12">
          {[
            { label: 'Role', value: 'Sole Engineer' },
            { label: 'Stack', value: 'FastAPI / Python' },
            { label: 'Type', value: 'Data Automation' },
            { label: 'Status', value: '🟢 Live Production' },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{item.label}</p>
              <p className="font-bold text-lg md:text-xl">{item.value}</p>
            </div>
          ))}
        </div>
      </header>

      <main className="px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto">

        {/* OVERVIEW */}
        <section className="mb-24 lg:mb-40 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter border-t-4 border-black pt-6 mb-8 lg:mb-0">
              / The Scope
            </h2>
          </div>
          <div className="lg:col-span-8 max-w-4xl space-y-8">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Replaced a completely manual process with a fully automated pipeline —
              ingesting messy RTA emails from CAMS and Karvy directly into structured
              database records within minutes.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              RTA stands for Registrar and Transfer Agent. In the mutual fund industry,
              CAMS and Karvy are the two major RTAs that process all SIP transactions,
              redemptions, and brokerage payouts. They send confirmation data via email —
              in inconsistent, semi-structured formats that change without notice.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Before this pipeline, someone had to manually read every email, extract the
              transaction data, and enter it into the system. For a platform handling multiple
              MFDs this was unsustainable. I built a FastAPI service that receives these emails
              automatically, parses the data regardless of format variations, and pushes clean
              records to the database — all without human intervention.
            </p>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="mb-24 lg:mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter border-t-4 border-black pt-6 mb-8 lg:mb-0">
                / The Problem
              </h2>
            </div>
            <div className="lg:col-span-8 max-w-4xl">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                CAMS and Karvy send transaction data in emails that are inconsistent,
                poorly formatted, and change format without warning.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                num: '01',
                title: 'Format Inconsistency',
                body: 'CAMS and Karvy use different email formats — and both change their formats periodically without any API versioning or changelog. A parser built for one format silently breaks when the format shifts, producing wrong data or no data.',
              },
              {
                num: '02',
                title: 'Volume at Scale',
                body: 'A platform serving multiple MFDs receives hundreds of RTA emails per day. Manual data entry doesn\'t scale beyond a handful of MFDs. Any delay in processing means the portfolio data shown to investors is stale — a serious trust issue in fintech.',
              },
              {
                num: '03',
                title: 'Data Integrity',
                body: 'SIP transactions and brokerage amounts are financial data. A parsing error that enters the wrong amount, wrong scheme code, or wrong investor into the ledger causes reconciliation failures that are painful to debug and fix days later.',
              },
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 p-8 lg:p-10 border border-gray-200 hover:border-black transition-colors">
                <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest inline-block mb-6">{card.num}</span>
                <h3 className="text-2xl font-bold tracking-tight mb-4">{card.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="mb-24 lg:mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter border-t-4 border-black pt-6 mb-8 lg:mb-0">
                / Architecture
              </h2>
            </div>
            <div className="lg:col-span-8 max-w-4xl">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Email in. Clean structured data out. No human in the loop.
              </p>
            </div>
          </div>

          {/* PIPELINE DIAGRAM */}
          <div className="w-full bg-gray-50 border border-gray-200 p-8 lg:p-16 mb-24 overflow-x-auto">
            <div className="min-w-[900px] flex flex-col gap-6 font-mono text-sm">
              {/* Step 1 */}
              <div className="flex items-center gap-6">
                <div className="border-2 border-black bg-white px-6 py-4 font-bold text-center w-48 shrink-0 shadow-sm">
                  CAMS Email<br />Karvy Email
                </div>
                <div className="text-gray-400 shrink-0 tracking-widest">──▶</div>
                <div className="border border-gray-300 bg-white px-6 py-4 flex-1 text-center shadow-sm">
                  Email Server / Webhook Trigger
                </div>
                <div className="text-gray-400 shrink-0 tracking-widest">──▶</div>
                <div className="bg-black text-white px-6 py-4 text-center w-56 shrink-0 shadow-xl">
                  <p className="text-[10px] font-sans uppercase tracking-widest text-gray-400 mb-1">Ingestion</p>
                  <p className="font-bold">FastAPI</p>
                </div>
              </div>

              <div className="text-center text-gray-500 text-xs pl-64 my-4">
                ↓ Raw email body (HTML / plain text)
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-6 pl-0 md:pl-48">
                <div className="border-2 border-black bg-white px-6 py-8 flex-1 text-center shadow-sm">
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500 mb-2">Parser Layer</p>
                  <p className="font-bold text-lg mb-4">Python — Multi-format Parser</p>
                  <div className="flex gap-4 justify-center text-[10px] font-sans uppercase tracking-widest">
                    <span className="bg-gray-100 px-3 py-1.5 border border-gray-300">CAMS Format</span>
                    <span className="bg-gray-100 px-3 py-1.5 border border-gray-300">Karvy Format</span>
                    <span className="bg-gray-100 px-3 py-1.5 border border-gray-300">Fallback Logic</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-gray-500 text-xs pl-64 my-4">
                ↓ Structured transaction records
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-6">
                <div className="border border-gray-300 bg-white px-6 py-4 text-center w-48 shrink-0 shadow-sm">
                  Validation<br />+ Dedup Check
                </div>
                <div className="text-gray-400 shrink-0 tracking-widest">──▶</div>
                <div className="border border-gray-300 bg-white px-6 py-4 flex-1 text-center shadow-sm">
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500 mb-1">Write to Ledger</p>
                  <p className="font-bold">PostgreSQL / MongoDB</p>
                </div>
                <div className="text-gray-400 shrink-0 tracking-widest">──▶</div>
                <div className="border-2 border-green-600 text-green-700 bg-green-50 px-6 py-4 text-center w-56 shrink-0 font-bold">
                  Portfolio<br />Reconciled ✅
                </div>
              </div>
            </div>
          </div>

          {/* Tech detail cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                label: 'Ingestion',
                tech: 'FastAPI Async',
                desc: 'FastAPI was chosen over Node.js specifically because Python\'s text processing libraries — regex, email parsing, pandas — are far superior for this use case. Extracts raw body and passes to the parser layer.'
              },
              {
                label: 'Parser',
                tech: 'Python Engine',
                desc: 'Detects RTA sender from headers and applies the correct parsing strategy. Fallback logic catches parsing failures and routes them for manual review rather than silently producing wrong data.'
              },
              {
                label: 'Validation',
                tech: 'Schema + Dedup',
                desc: 'Validated against a strict schema before writing. Duplicate detection checks the transaction reference against existing records to prevent double-counting forwarded emails.'
              },
              {
                label: 'Output',
                tech: 'DB Records',
                desc: 'Structured transaction records written to the ledger. What previously took hours of manual entry now completes within minutes, keeping investor views current.'
              },
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 p-8 lg:p-10 border border-gray-200 hover:border-black transition-colors flex flex-col items-start">
                <div className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 mb-6">
                  {card.label}
                </div>
                <p className="text-2xl font-bold tracking-tight mb-4">{card.tech}</p>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HARD PARTS */}
        <section className="mb-24 lg:mb-40 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter border-t-4 border-black pt-6 mb-8 lg:mb-0">
              / Hard Problems Solved
            </h2>
            <div className="border-l-4 border-black pl-6 py-4 bg-gray-50 mb-8 lg:mb-0">
              <p className="text-lg text-gray-800 leading-relaxed italic font-medium">
                Parsing unstructured financial email data that changes format without warning is harder than it sounds.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 max-w-4xl space-y-12 lg:pt-6">
            {[
              {
                num: '01',
                title: 'CAMS and Karvy use completely different formats',
                body: 'There is no standard format for RTA mailbacks. CAMS sends HTML tables. Karvy sends a mix of plain text and inline HTML. Column names differ. Date formats differ. Amount formats differ. I had to write two separate parsers and a detector that routes each incoming email.'
              },
              {
                num: '02',
                title: 'Formats change silently in production',
                body: 'RTAs update formats without any changelog. A working parser breaks silently when the format shifts. The solution was explicit failure detection — if the parser extracts zero records from a non-empty email, it flags it for manual review rather than writing nothing.'
              },
              {
                num: '03',
                title: 'The same transaction arrives multiple times',
                body: 'RTA emails get forwarded and re-sent. Without deduplication, the same SIP transaction gets written to the ledger multiple times. Every parsed record is checked against a unique transaction reference before writing. Seen before — skip. New — write.'
              },
              {
                num: '04',
                title: 'Financial data has zero tolerance for silent errors',
                body: 'A wrong decimal place in a brokerage amount is a financial error. I added strict validation — amounts must be positive numbers within realistic ranges, scheme codes must match. Anything failing validation is quarantined for human review.'
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-gray-200 pb-10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-6 flex items-center gap-4">
                  <span className="bg-black text-white px-3 py-1">{item.num}</span>
                  {item.title}
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM NAVIGATION */}
        <div className="border-t-4 border-black pt-12 mt-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <Link href="/#architecture" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-3 border border-gray-300 px-8 py-4 hover:border-black">
            ← Back to Projects
          </Link>

          <div className="text-left md:text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Next Case Study</p>
            <Link href="/ondc" className="text-4xl md:text-6xl font-bold tracking-tighter hover:underline">
              ONDC Connector →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}