import React from 'react';
import Link from 'next/link';

export default function BlogsIndex() {
  const blogs = [
    {
      slug: 'ondc-race-conditions',
      category: 'Fintech Architecture',
      date: 'June 2026',
      title: 'Handling complex race conditions in ONDC personal loan provisioning.',
      readTime: '8 min read',
    },
    {
      slug: 'rta-fastapi-pipelines',
      category: 'Data Engineering',
      date: 'April 2026',
      title: 'Building highly concurrent mailback parsing pipelines with FastAPI.',
      readTime: '6 min read',
    },
    {
      slug: 'meta-tech-provider',
      category: 'SaaS Scaling',
      date: 'February 2026',
      title: 'Lessons learned scaling a multi-tenant AI product as a Meta Tech Provider.',
      readTime: '10 min read',
    },
    {
      slug: 'fintech-dark-mode-ui',
      category: 'Product Design',
      date: 'January 2026',
      title: 'Designing an Investment Dashboard: Why pure white branding wins in Dark Mode SaaS.',
      readTime: '5 min read',
    },
    {
      slug: 'nextjs-multi-tenancy',
      category: 'Backend Engineering',
      date: 'November 2025',
      title: 'Moving to custom MongoDB multi-tenancy in Next.js for B2B applications.',
      readTime: '7 min read',
    },
    {
      slug: 'mern-hospital-routing',
      category: 'Systems Design',
      date: 'August 2025',
      title: 'Optimizing Express.js API routing for a high-traffic hospital appointment system.',
      readTime: '6 min read',
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-8 max-w-[1920px] mx-auto">
        <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter hover:opacity-50 transition-opacity">
          ← HOME
        </Link>
        <a 
          href="/faize-resume.pdf" 
          target="_blank" 
          className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          Resume
        </a>
      </nav>

      {/* HEADER */}
      <header className="px-6 md:px-12 lg:px-24 py-16 lg:py-24 max-w-[1920px] mx-auto">
        <div className="bg-black text-white inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest mb-12">
          Writing & Notes
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-[8vw] font-bold tracking-tighter leading-none mb-8">
          Engineering Blog.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
          Deep dives into backend architecture, system design, and the technical challenges of scaling zero-to-one fintech and AI products.
        </p>
      </header>

      {/* BLOG LIST */}
      <main className="px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto">
        <div className="border-t-4 border-black pt-12">
          {blogs.map((blog, index) => (
            <Link 
              href={`/blogs/${blog.slug}`} 
              key={index}
              className="group block border-b border-gray-200 py-10 hover:bg-gray-50 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start px-4 lg:px-0">
                {/* Meta Data */}
                <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-start gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {blog.category}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {blog.date}
                  </span>
                </div>
                
                {/* Title */}
                <div className="lg:col-span-7">
                  <h2 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight group-hover:underline">
                    {blog.title}
                  </h2>
                </div>

                {/* Read Time / Action */}
                <div className="lg:col-span-2 text-left lg:text-right mt-4 lg:mt-0">
                  <span className="text-sm font-bold text-black border border-gray-300 px-4 py-2 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                    Read Article →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      
    </div>
  );
}