import React from 'react';
import Link from 'next/link';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-4 md:px-8 py-6 border-b border-gray-300">
        <div className="text-xl md:text-2xl font-black tracking-tighter">●</div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
          <a href="#architecture" className="hover:underline">#Architecture</a>
          <a href="#design" className="hover:underline">#Design</a>
          <a href="/blogs" className="hover:underline">#Blogs</a>
          <a href="#stack" className="hover:underline">#Tech Stack</a>
          <a href="#contact" className="hover:underline">#Contact</a>
        </div>
        <a 
          href="/faize-resume.pdf" 
          target="_blank" 
          className="bg-black text-white px-4 md:px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          Resume
        </a>
      </nav>

      {/* HERO SECTION */}
      <header className="px-4 md:px-8 py-16 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none">
            Full-Stack<br />Product Engineer
          </h1>
          <h2 className="text-xl md:text-3xl font-bold tracking-tighter mt-4 md:mt-6 text-gray-500 uppercase">
            / Faize Muhammed Basheer
          </h2>
        </div>
        <div className="text-base md:text-xl leading-relaxed text-gray-700 pt-2 md:pt-0 flex flex-col gap-6">
          <p>
            Architecting <strong className="text-black">10+ zero-to-one fintech and SaaS platforms</strong>. I bridge the gap between complex backend infrastructure and premium product design.
          </p>
          <p>
            My engineering focus is on highly concurrent systems. I have successfully built and deployed live <strong className="text-black">ONDC financial connectors</strong> handling complex race conditions for personal loans, alongside automated RTA pipelines and <strong className="text-black">BSE Star MF</strong> integrations.
          </p>
          <p>
            Beyond fintech, I am the founder of Faigen AI—a multi-tenant automation SaaS operating as an official <strong className="text-black">Meta Tech Provider</strong>. It actively serves B2B clients with 99.9% uptime.
          </p>
          
          {/* HERO CTAs */}
          <div className="flex flex-wrap gap-4 mt-2">
            <a href="/faize-resume.pdf" target="_blank" className="border-2 border-black px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              View Resume
            </a>
            <Link href="/blogs" className="bg-gray-100 border border-gray-300 px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2">
              Read Engineering Blog <span className="text-lg leading-none">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* BACKEND ARCHITECTURE SECTION */}
      <section id="architecture" className="px-4 md:px-8 pb-16 pt-8">
        <div className="bg-black text-white inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest mb-8">
          Backend Architecture
        </div>
        
        <Link href="/ondc" className="group border-t border-b border-black py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-baseline hover:bg-gray-50 transition-colors block cursor-pointer">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter group-hover:pl-0 md:group-hover:pl-4 transition-all">ONDC FINANCIAL CONNECTOR</h2>
          <div className="text-left md:text-right mt-2 md:mt-0">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Node.js / PostgreSQL</p>
            <p className="text-sm font-bold uppercase">Live Production</p>
          </div>
        </Link>

        <Link href="/faigen" className="group border-b border-black py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-baseline hover:bg-gray-50 transition-colors block cursor-pointer">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter group-hover:pl-0 md:group-hover:pl-4 transition-all">FAIGEN AI (META TECH)</h2>
          <div className="text-left md:text-right mt-2 md:mt-0">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Next.js / MongoDB</p>
            <p className="text-sm font-bold uppercase">SaaS Platform</p>
          </div>
        </Link>

        <Link href="/rta-pipeline" className="group border-b border-black py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-baseline hover:bg-gray-50 transition-colors block cursor-pointer">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter group-hover:pl-0 md:group-hover:pl-4 transition-all">RTA MAILBACK PIPELINE</h2>
          <div className="text-left md:text-right mt-2 md:mt-0">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">FastAPI / Python</p>
            <p className="text-sm font-bold uppercase">Data Automation</p>
          </div>
        </Link>
      </section>

      {/* PRODUCT DESIGN / UI SECTION */}
      <section id="design" className="px-4 md:px-8 pb-20 pt-8">
        <div className="bg-black text-white inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest mb-8">
          Product Design & UI
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black pt-8">
          <div className="group cursor-pointer">
            <div className="w-full h-48 md:h-64 bg-[#0a0a0a] border border-gray-300 flex items-center justify-center mb-4 transition-all group-hover:border-black p-4 text-center">
               <span className="text-white text-xs font-bold uppercase tracking-widest">[ Caply Pure White Logo / Dark Mode UI ]</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tighter">Caply Mutual Fund Dashboard</h3>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mt-2">Fintech SaaS Interface</p>
          </div>
          
          <div className="group cursor-pointer">
            <div className="w-full h-48 md:h-64 bg-gray-100 border border-gray-300 flex items-center justify-center mb-4 transition-all group-hover:border-black p-4 text-center">
               <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">[ Flash-Verify Identity UI ]</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tighter">Flash-Verify App Branding</h3>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mt-2">Digital Identity Verification</p>
          </div>
        </div>
      </section>

      {/* TECH STACK & PROTOCOLS SECTION */}
      <section id="stack" className="px-4 md:px-8 py-16 border-t border-black bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black text-white inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest mb-8">
            Core Ecosystems & Engineering Stack
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Fintech Protocols & Networks</p>
              <div className="flex flex-wrap gap-2">
                <span className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider">ONDC Beckn</span>
                <span className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider">BSE Star MF</span>
                <span className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider">CAMS/Karvy RTA</span>
                <span className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider">UIDAI e-KYC</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Core Frameworks & APIs</p>
              <div className="flex flex-wrap gap-2">
                <span className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider">Next.js</span>
                <span className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider">FastAPI</span>
                <span className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider">Meta WhatsApp API</span>
                <span className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider">PostgreSQL / Redis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST WRITING / BLOGS PREVIEW */}
      <section className="px-4 md:px-8 py-20 border-t border-black">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">/ Latest Writing</h2>
          <Link href="/blogs" className="text-sm font-bold uppercase tracking-widest hover:underline">View All Articles →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/blogs/ondc-race-conditions" className="block border border-gray-300 p-6 hover:border-black transition-colors">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Fintech Architecture</p>
            <h3 className="text-lg md:text-xl font-bold tracking-tighter leading-tight mb-4">Handling complex race conditions in ONDC personal loan provisioning.</h3>
            <p className="text-sm text-gray-600 font-medium">Read Article →</p>
          </Link>
          
          <Link href="/blogs/rta-fastapi-pipelines" className="block border border-gray-300 p-6 hover:border-black transition-colors">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Data Engineering</p>
            <h3 className="text-lg md:text-xl font-bold tracking-tighter leading-tight mb-4">Building highly concurrent mailback parsing pipelines with FastAPI.</h3>
            <p className="text-sm text-gray-600 font-medium">Read Article →</p>
          </Link>

          <Link href="/blogs/meta-tech-provider" className="block border border-gray-300 p-6 hover:border-black transition-colors">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">SaaS Scaling</p>
            <h3 className="text-lg md:text-xl font-bold tracking-tighter leading-tight mb-4">Lessons learned scaling a multi-tenant AI product as a Meta Tech Provider.</h3>
            <p className="text-sm text-gray-600 font-medium">Read Article →</p>
          </Link>
        </div>
      </section>

      {/* BIG CONTACT SECTION */}
      <section id="contact" className="px-4 md:px-8 py-20 border-t border-black bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <div>
            <div className="bg-black text-white inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest mb-4">
              Get In Touch
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter max-w-sm">
              Let&apos;s build scalable infrastructure together.
            </h3>
          </div>
          <div className="flex flex-col justify-center">
             <p className="text-base md:text-lg text-gray-700">Currently exploring new roles in Bangalore for seed-stage to Series B startups.</p>
          </div>
        </div>
        
        {/* Massive Email - Fully Responsive wrapping */}
        <div className="w-full text-center overflow-hidden">
          <a href="mailto:faizemuhammedbasheer@gmail.com" className="text-2xl sm:text-4xl md:text-[5vw] font-black tracking-tighter hover:text-gray-600 transition-colors break-all">
            faizemuhammedbasheer@gmail.com
          </a>
        </div>
      </section>
      
    </div>
  );
}