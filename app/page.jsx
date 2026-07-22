import React from 'react';
import Link from 'next/link';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-4 md:px-8 py-6">
        <div className="text-xl md:text-2xl font-black tracking-tighter">●</div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
          <a href="#architecture" className="hover:underline">#Architecture</a>
          <a href="#experience" className="hover:underline">#Experience</a>
          <a href="#skills" className="hover:underline">#Skills</a>
          <a href="/blogs" className="hover:underline">#Blogs</a>
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
      <section id="architecture" className="px-4 md:px-8 pb-16 pt-16">
        <div className="bg-black text-white inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest mb-8">
          Backend Architecture
        </div>
        
        <Link href="/ondc" className="group border-t border-b border-gray-300 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-baseline hover:bg-gray-50 transition-colors block cursor-pointer">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter group-hover:pl-0 md:group-hover:pl-4 transition-all">ONDC FINANCIAL CONNECTOR</h2>
          <div className="text-left md:text-right mt-2 md:mt-0">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Node.js / PostgreSQL</p>
            <p className="text-sm font-bold uppercase">Live Production</p>
          </div>
        </Link>

        <Link href="/faigen" className="group border-b border-gray-300 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-baseline hover:bg-gray-50 transition-colors block cursor-pointer">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter group-hover:pl-0 md:group-hover:pl-4 transition-all">FAIGEN AI (META TECH)</h2>
          <div className="text-left md:text-right mt-2 md:mt-0">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Next.js / MongoDB</p>
            <p className="text-sm font-bold uppercase">SaaS Platform</p>
          </div>
        </Link>

        <Link href="/rta-pipeline" className="group border-b border-gray-300 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-baseline hover:bg-gray-50 transition-colors block cursor-pointer">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter group-hover:pl-0 md:group-hover:pl-4 transition-all">RTA MAILBACK PIPELINE</h2>
          <div className="text-left md:text-right mt-2 md:mt-0">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">FastAPI / Python</p>
            <p className="text-sm font-bold uppercase">Data Automation</p>
          </div>
        </Link>
      </section>

      {/* WORK EXPERIENCE SECTION */}
      <section id="experience" className="px-4 md:px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div className="bg-black text-white inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest">
            Work Experience
          </div>
          <a href="/faize-resume.pdf" target="_blank" className="text-sm font-bold uppercase tracking-widest hover:underline text-gray-500">Download Full Resume →</a>
        </div>

        <div className="space-y-0">
          <div className="group border-t border-gray-300 py-8 md:py-12 flex flex-col md:flex-row gap-4 md:gap-12 hover:bg-gray-50 transition-colors cursor-default">
            <div className="md:w-1/4 flex flex-col justify-start">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Nov 2024 — Present</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Software Engineer</p>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl md:text-4xl font-bold tracking-tighter">Bancwise Technologies</h3>
              <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl leading-relaxed">
                Architecting multi-tenant mutual fund platforms and leading the backend development of live ONDC financial connectors. Engineered highly concurrent RTA mailback parsing pipelines to automate systematic investment plan (SIP) data ingestion.
              </p>
            </div>
          </div>

          <div className="group border-t border-gray-300 py-8 md:py-12 flex flex-col md:flex-row gap-4 md:gap-12 hover:bg-gray-50 transition-colors cursor-default">
            <div className="md:w-1/4 flex flex-col justify-start">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Founder</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Product Engineer</p>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl md:text-4xl font-bold tracking-tighter">Faigen AI (Meta Tech Provider)</h3>
              <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl leading-relaxed">
                Built and scaled a multi-tenant AI automation SaaS recognized as an official Meta Tech Provider. Designed the complete architecture using Next.js, Node.js, and MongoDB to serve automated B2B conversational flows with 99.9% uptime.
              </p>
            </div>
          </div>

          <div className="group border-t border-b border-gray-300 py-8 md:py-12 flex flex-col md:flex-row gap-4 md:gap-12 hover:bg-gray-50 transition-colors cursor-default">
            <div className="md:w-1/4 flex flex-col justify-start">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Prior Experience</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Junior Software Eng.</p>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl md:text-4xl font-bold tracking-tighter">Stackmod Innovations</h3>
              <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl leading-relaxed">
                Developed and deployed a scalable hospital appointment booking platform utilizing the MERN stack (MongoDB, Express.js, React, Node.js), focusing on robust API routing and system performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE SKILLS SECTION */}
      <section id="skills" className="px-4 md:px-8 py-20 bg-gray-50">
        <div className="bg-black text-white inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest mb-12">
          Engineering Arsenal
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Frontend */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-gray-300 pb-2">Frontend & Interface</h3>
            <ul className="space-y-3 font-bold tracking-tight text-lg">
              <li>Next.js / React</li>
              <li>React Native</li>
              <li>Tailwind CSS</li>
              <li>Shadcn UI</li>
              <li>Framer Motion</li>
              <li>Glassmorphism UI</li>
            </ul>
          </div>
          
          {/* Backend */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-gray-300 pb-2">Backend & Databases</h3>
            <ul className="space-y-3 font-bold tracking-tight text-lg">
              <li>Node.js / Express.js</li>
              <li>FastAPI / Python</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>Redis Caching</li>
              <li>RESTful API Architecture</li>
            </ul>
          </div>

          {/* Infrastructure */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-gray-300 pb-2">Cloud & DevOps</h3>
            <ul className="space-y-3 font-bold tracking-tight text-lg">
              <li>AWS EC2 / S3</li>
              <li>DigitalOcean</li>
              <li>Linux / Bash Scripting</li>
              <li>Vercel Deployment</li>
              <li>Systemd Services</li>
              <li>Git / CI-CD</li>
            </ul>
          </div>

          {/* Protocols */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-gray-300 pb-2">AI, APIs & Networks</h3>
            <ul className="space-y-3 font-bold tracking-tight text-lg">
              <li>ONDC Beckn Protocol</li>
              <li>Meta WhatsApp Cloud API</li>
              <li>BSE Star MF / CAMS RTA</li>
              <li>UIDAI e-KYC Integrations</li>
              <li>Gemini AI / OpenAI APIs</li>
              <li>LLM Conversational Flows</li>
            </ul>
          </div>
        </div>
      </section>


      {/* LATEST WRITING / BLOGS PREVIEW */}
      <section className="px-4 md:px-8 py-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div className="bg-black text-white inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest">
            Latest Writing
          </div>
          <Link href="/blogs" className="text-sm font-bold uppercase tracking-widest hover:underline text-gray-500">View All Articles →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/blogs/ondc-race-conditions" className="block border border-gray-200 p-6 hover:border-black transition-colors">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Fintech Architecture</p>
            <h3 className="text-lg md:text-xl font-bold tracking-tighter leading-tight mb-4">Handling complex race conditions in ONDC personal loan provisioning.</h3>
            <p className="text-sm text-gray-600 font-medium">Read Article →</p>
          </Link>
          
          <Link href="/blogs/rta-fastapi-pipelines" className="block border border-gray-200 p-6 hover:border-black transition-colors">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Data Engineering</p>
            <h3 className="text-lg md:text-xl font-bold tracking-tighter leading-tight mb-4">Building highly concurrent mailback parsing pipelines with FastAPI.</h3>
            <p className="text-sm text-gray-600 font-medium">Read Article →</p>
          </Link>

          <Link href="/blogs/meta-tech-provider" className="block border border-gray-200 p-6 hover:border-black transition-colors">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">SaaS Scaling</p>
            <h3 className="text-lg md:text-xl font-bold tracking-tighter leading-tight mb-4">Lessons learned scaling a multi-tenant AI product as a Meta Tech Provider.</h3>
            <p className="text-sm text-gray-600 font-medium">Read Article →</p>
          </Link>
        </div>
      </section>

      {/* BIG CONTACT SECTION */}
      <section id="contact" className="px-4 md:px-8 py-20 bg-gray-50">
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