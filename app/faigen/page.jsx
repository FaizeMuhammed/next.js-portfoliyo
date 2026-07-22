import React from 'react';
import Link from 'next/link';

export default function FaigenProject() {
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
          System Case Study / 02
        </div>

        <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-bold tracking-tighter leading-[0.92] mb-12 max-w-6xl">
          Faigen AI —<br />WhatsApp & Instagram<br />Automation SaaS.
        </h1>

        {/* META ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-gray-200">
          {[
            { label: 'Role', value: 'Founder & Solo Engineer' },
            { label: 'Type', value: 'Multi-tenant SaaS' },
            { label: 'Status', value: '🟢 Live — 5+ B2B Clients' },
            { label: 'Provider', value: 'Meta Tech Provider' },
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
              Faigen is a multi-tenant AI automation SaaS that deploys intelligent WhatsApp and Instagram
              agents for businesses — handling customer conversations, orders, appointments, and
              broadcast campaigns 24/7.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Built entirely from scratch as a solo founder and engineer — from the multi-tenant
              backend architecture and AI integration all the way to the landing page, admin console,
              and WhatsApp webhook infrastructure.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Registered as an official <strong className="text-black">Meta Tech Provider</strong>,
              giving access to the WhatsApp Business Cloud API for sending authentication templates,
              interactive button messages, and broadcast campaigns at scale.
              The AI speaks Malayalam, Manglish, and English — auto-detecting the customer's language.
            </p>
            <a href="https://faigen.in" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b-2 border-black text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
              Visit faigen.in →
            </a>
          </div>
        </section>

        {/* WHAT IT DOES */}
        <section className="py-20 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">/ Capabilities</p>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800">
                One platform. Every conversation channel. Every business type.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
            {[
              {
                num: '01',
                title: 'AI Conversation Engine',
                items: [
                  'Takes orders directly in WhatsApp chat',
                  'Books appointments automatically',
                  'Answers FAQs and product queries',
                  'Malayalam, Manglish & English auto-detect',
                  'Gemini AI with custom business context',
                  '15 message / 24hr limit with graceful handoff',
                ]
              },
              {
                num: '02',
                title: 'Broadcast Campaigns',
                items: [
                  'Send to thousands of customers in one click',
                  'WhatsApp Authentication OTP templates',
                  'Marketing and Utility template support',
                  'Delivery and read rate tracking',
                  'Credit-based billing per message sent',
                  'Festival offers, promotions, order updates',
                ]
              },
              {
                num: '03',
                title: 'Business Dashboard',
                items: [
                  'Multi-tenant admin console per company',
                  'Live conversation inbox with AI pause',
                  'Order management and tracking',
                  'Template creation and Meta sync',
                  'Per-company AI config and feature flags',
                  'Usage analytics and billing overview',
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
                Multi-tenant from the ground up. Every company gets isolated AI config, feature flags, and billing — sharing zero data across tenants.
              </p>
            </div>
          </div>

          {/* ARCHITECTURE DIAGRAM */}
          <div className="w-full bg-[#0a0a0a] text-white p-8 md:p-16 mb-12 overflow-x-auto">
            <div className="min-w-[680px]">

              {/* Channels */}
              <div className="flex gap-4 mb-8 justify-center">
                {['WhatsApp Cloud API', 'Instagram Graph API', 'faigen.in Web'].map((n, i) => (
                  <div key={i} className="border border-gray-700 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center flex-1 max-w-[200px]">
                    {n}
                  </div>
                ))}
              </div>

              <div className="text-center text-gray-600 text-xs mb-8 font-mono">
                Webhooks / Messages / API calls<br />↓ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓
              </div>

              {/* Core */}
              <div className="flex gap-4 mb-8 justify-center">
                <div className="bg-white text-black p-6 text-center flex-1 max-w-[280px]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Webhook Router</p>
                  <p className="text-lg font-black tracking-tight">Node.js / Express</p>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Company Lookup · Queue · Dedup</p>
                </div>
                <div className="border border-gray-700 p-6 text-center flex-1 max-w-[280px]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">AI Engine</p>
                  <p className="text-lg font-black tracking-tight">Gemini / Groq</p>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">NLP · Order Parsing · Intent</p>
                </div>
              </div>

              <div className="text-center text-gray-600 text-xs mb-8 font-mono">
                ↓ Company-isolated reads/writes &nbsp;&nbsp;&nbsp;&nbsp; ↓ AI responses
              </div>

              {/* Storage */}
              <div className="flex gap-4 justify-center">
                {[
                  { label: 'Per-Company Data', tech: 'MongoDB', sub: 'Conversations · Orders · Config' },
                  { label: 'Message Queue', tech: 'In-Memory Queue', sub: 'Per-phone serialization' },
                  { label: 'Deduplication', tech: 'processedMessageIds', sub: 'Last 100 per conversation' },
                ].map((item, i) => (
                  <div key={i} className="border border-gray-700 p-5 text-center flex-1 max-w-[200px]">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{item.label}</p>
                    <p className="font-black text-sm">{item.tech}</p>
                    <p className="text-[9px] text-gray-600 mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Tech cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: 'Multi-tenancy',
                tech: 'Company-isolated MongoDB',
                desc: 'Every company has its own isolated AI context, system prompt, feature flags, conversation history, order records, and template library. A single MongoDB instance with companyId-scoped queries ensures zero data bleed between tenants. Each company gets independent AI provider config — Gemini, Groq, or OpenAI.'
              },
              {
                label: 'Message Queue',
                tech: 'Per-phone serialization',
                desc: 'WhatsApp sends webhook events asynchronously with no guarantee of order. I built an in-memory queue keyed by phone number — ensuring messages from the same customer are processed sequentially. This prevents AI from responding out of order or starting two conversations simultaneously for the same user.'
              },
              {
                label: 'AI Integration',
                tech: 'Gemini + Groq fallback',
                desc: 'The AI engine builds a structured conversation prompt from the company system prompt, aiContext (FAQs, rules, tone), and the last 50 messages. Gemini is the primary provider with Groq as automatic fallback. The AI response is parsed into typed actions — text, order, menu, products, or buttons — each handled differently by the webhook router.'
              },
              {
                label: 'WhatsApp Layer',
                tech: 'Meta Cloud API',
                desc: 'Full Meta WhatsApp Cloud API integration — text messages, interactive button messages, list messages, authentication OTP templates, and broadcast campaigns. Template management syncs with Meta for approval status. Broadcast uses a credit-based billing system deducted per message at ₹0.15 for auth, ₹0.88 for marketing.'
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

        {/* HARD PROBLEMS */}
        <section className="py-20 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">/ Hard Problems Solved</p>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800">
                Building a production AI product means solving problems that don't have Stack Overflow answers.
              </p>
            </div>
          </div>

          <div className="space-y-0 border border-gray-200">
            {[
              {
                num: '01',
                title: 'Duplicate webhook prevention',
                body: 'WhatsApp fires the same webhook multiple times under load. I store the last 100 processed message IDs per conversation and reject duplicates before they hit the AI — preventing double replies that would confuse customers and waste API credits.'
              },
              {
                num: '02',
                title: '24-hour conversation limit with graceful handoff',
                body: 'To control AI API costs, each conversation is limited to 15 customer messages per 24-hour window. When the limit is hit, instead of going silent, the AI sends a single warm convincing message with contact details — converting the limit hit into a sales opportunity. The handoff message fires once every 24 hours, not on every message.'
              },
              {
                num: '03',
                title: 'Malayalam NLP without a Malayalam model',
                body: 'Gemini and Groq don\'t have dedicated Malayalam models. The solution was prompt engineering — the system prompt instructs the AI to auto-detect the customer\'s language and respond in the same language. Combined with Manglish (Malayalam written in English script) handling, this covers 95% of Kerala customer writing styles.'
              },
              {
                num: '04',
                title: 'AI response type parsing',
                body: 'The AI needs to do more than reply with text — it needs to trigger order creation, show product lists, send button menus, or hand off to a human. I built a structured JSON response parser that the AI returns tagged responses in, and the webhook router dispatches them to the correct WhatsApp message type.'
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-8 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest pt-1 shrink-0 w-8">{item.num}</span>
                <div>
                  <h4 className="font-bold text-base mb-3">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT I LEARNED */}
        <section className="py-20 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">/ What I Learned</p>
            </div>
            <div className="md:col-span-8 space-y-8">
              {[
                {
                  num: '01',
                  title: 'Prompt engineering is real engineering',
                  body: 'Getting an AI to behave consistently across thousands of conversations required as much careful design as the backend architecture. System prompt structure, instruction order, and output format constraints all materially change how the AI performs in production.'
                },
                {
                  num: '02',
                  title: 'Multi-tenancy must be designed from day one',
                  body: 'Adding multi-tenancy to a single-tenant system after the fact is painful. Every query, every model, every API route needs companyId scoping. Building this first means the codebase scales to hundreds of clients without architectural changes.'
                },
                {
                  num: '03',
                  title: 'Product sense matters more than perfect code',
                  body: 'The 24-hour limit handoff message turning a cost-control measure into a sales opportunity — that\'s product thinking, not engineering. Building a SaaS alone forces you to think about user experience, business logic, and conversion at every technical decision.'
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
            <Link href="/rta-pipeline" className="text-3xl md:text-5xl font-bold tracking-tighter hover:underline">
              RTA Mailback Pipeline →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}