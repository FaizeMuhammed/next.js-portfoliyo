import React from 'react';
import Link from 'next/link';

export default function ONDCProject() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-4 md:px-8 py-6">
        <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter hover:opacity-50 transition-opacity">
          ← BACK
        </Link>
        <a 
          href="/faize-resume.pdf" 
          target="_blank" 
          className="bg-black text-white px-4 md:px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          Resume
        </a>
      </nav>

      {/* PROJECT HEADER */}
      <header className="px-4 md:px-8 py-16 md:py-24 max-w-5xl">
        <div className="bg-black text-white inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest mb-8">
          System Case Study / 01
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
          Distributed Fintech Infrastructure.
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-gray-300 py-8 mt-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Role</p>
            <p className="font-bold">Lead Full-Stack Eng.</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Context</p>
            <p className="font-bold">Confidential SaaS (NDA)</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Architecture</p>
            <p className="font-bold">Zero-to-One Build</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Status</p>
            <p className="font-bold text-green-600">Live Production</p>
          </div>
        </div>
      </header>

      {/* CONTENT BODY */}
      <main className="px-4 md:px-8 pb-32 max-w-5xl">
        
        {/* OVERVIEW */}
        <section className="mb-24 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tighter mb-6">/ The Scope</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Tasked with a complete zero-to-one build, I engineered a highly concurrent financial engine designed to bridge digital lending platforms with the <strong className="text-black">ONDC Beckn Protocol</strong> and <strong className="text-black">BSE Star MF</strong> networks. 
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Operating as the sole full-stack architect, I designed the system from the ground up to handle the end-to-end lifecycle of Personal Loans, Purchase Finance, and Mutual Fund investments—managing everything from frontend multi-tenant dashboards to asynchronous webhook ingestion.
          </p>
        </section>

        {/* THE ARCHITECTURE (BIG IDEAS + DIAGRAM) */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold tracking-tighter mb-6">/ Polyglot Microservices Architecture</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-4xl">
            Financial systems require a balance of high-speed I/O, rigorous ACID compliance, and heavy data-processing capabilities. I built a polyglot stack to isolate these concerns.
          </p>
          
          {/* MINIMALIST CSS ARCHITECTURE DIAGRAM */}
          <div className="w-full bg-gray-50 border border-gray-200 p-8 mb-12 overflow-x-auto">
            <div className="min-w-[700px] flex justify-between items-center text-xs font-bold uppercase tracking-widest text-center">
              
              {/* External Networks */}
              <div className="w-1/4 flex flex-col gap-4">
                <div className="border-2 border-black bg-white p-4">ONDC Gateway</div>
                <div className="border-2 border-black bg-white p-4">BSE Star MF</div>
              </div>
              
              {/* Data Flow Arrow */}
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                 <span className="mb-2 text-[10px]">Webhooks & APIs</span>
                 ━━━━▶
              </div>

              {/* Core Engine */}
              <div className="w-1/4">
                <div className="bg-black text-white p-6 shadow-xl">
                   Node.js Gateway<br/>
                   <span className="text-gray-400 text-[9px] mt-2 block tracking-widest">Idempotency Layer</span>
                </div>
              </div>

              {/* Data Flow Arrow */}
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                 <span className="mb-2 text-[10px]">Mutation</span>
                 ━━━━▶
              </div>

              {/* DB & Processing Layer */}
              <div className="w-1/4 flex flex-col gap-4 text-left">
                <div className="border border-gray-300 bg-white p-4 flex items-center gap-3">
                  <span className="text-gray-400 text-[10px]">DB</span> PostgreSQL
                </div>
                <div className="border border-gray-300 bg-white p-4 flex items-center gap-3">
                  <span className="text-gray-400 text-[10px]">Job</span> Python / FastAPI
                </div>
              </div>

            </div>
          </div>

          {/* TECH DESCRIPTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 border border-gray-200 hover:border-black transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-4 border-b border-gray-300 pb-2">Frontend Engine</h3>
              <p className="text-xl font-bold tracking-tight mb-2">Next.js</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Built robust, multi-tenant dashboards utilizing Server-Side Rendering (SSR) for blazing-fast initial loads. Engineered complex state machines to handle dynamic KYC forms, loan offer selections, and real-time application tracking.
              </p>
            </div>

            <div className="bg-gray-50 p-8 border border-gray-200 hover:border-black transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-4 border-b border-gray-300 pb-2">Core API Gateway</h3>
              <p className="text-xl font-bold tracking-tight mb-2">Node.js + Express</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Deployed as the primary high-concurrency gateway. Node.js handles the massive volume of asynchronous ONDC webhooks, non-blocking network calls, and real-time client socket connections without bottlenecking.
              </p>
            </div>

            <div className="bg-gray-50 p-8 border border-gray-200 hover:border-black transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-4 border-b border-gray-300 pb-2">Data Processing</h3>
              <p className="text-xl font-bold tracking-tight mb-2">Python + FastAPI</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Isolated heavy computational tasks into Python microservices. FastAPI drives the automated parsing of Mutual Fund RTA mailbacks (CAMS/Karvy) and executes heavy data transformations before pushing to the core ledger.
              </p>
            </div>

            <div className="bg-gray-50 p-8 border border-gray-200 hover:border-black transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-4 border-b border-gray-300 pb-2">Database Layer</h3>
              <p className="text-xl font-bold tracking-tight mb-2">PostgreSQL & MongoDB</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong className="text-black">PostgreSQL:</strong> Maintains strict ACID compliance for all financial ledgers, loan states, and transactional data.<br/><br/>
                <strong className="text-black">MongoDB:</strong> Acts as a high-throughput sink for unstructured ONDC webhook payloads, system logs, and flexible user metadata.
              </p>
            </div>
          </div>
        </section>

        {/* THE ENGINEERING CHALLENGE */}
        <section className="mb-20 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tighter mb-6">/ Solving Race Conditions in Lending</h2>
          <div className="border-l-4 border-black pl-6 py-2 mb-8 bg-gray-50">
            <p className="text-lg text-gray-800 leading-relaxed italic font-medium">
              "What happens if the ONDC gateway fires a 'Loan Disbursed' webhook twice within 50 milliseconds? A naive backend processes both, creating duplicate ledger entries."
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-2 flex items-center gap-2">
                <span className="bg-black text-white px-2 py-0.5">01</span> Idempotency Middleware
              </h4>
              <p className="text-gray-700 leading-relaxed mt-4">
                Every incoming request from the Beckn Gateway is assigned a unique idempotency key based on the transaction ID and state payload. If a duplicate request arrives, the Node.js API intercepts it at the Redis layer and returns the cached successful response before ever touching the database.
              </p>
            </div>
            
            <div className="pb-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-2 flex items-center gap-2">
                <span className="bg-black text-white px-2 py-0.5">02</span> Distributed Database Locks
              </h4>
              <p className="text-gray-700 leading-relaxed mt-4">
                For actions that manipulate ledger balances or loan states, I utilized PostgreSQL transaction isolation and row-level locking (<code className="bg-gray-100 px-2 py-1 text-sm font-mono border border-gray-300">SELECT ... FOR UPDATE</code>). This guarantees that even if two threads attempt to process a loan approval simultaneously, the database forces them to queue sequentially.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION (FIXED ALIGNMENT) */}
        <div className="border-t border-black pt-12 mt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
           <Link href="/#architecture" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-2">
              ← Back to Projects
           </Link>
           
           <div className="text-left md:text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Next Case Study</p>
              <Link href="/faigen" className="text-3xl md:text-4xl font-bold tracking-tighter hover:underline">
                Faigen AI Platform →
              </Link>
           </div>
        </div>

      </main>
    </div>
  );
}