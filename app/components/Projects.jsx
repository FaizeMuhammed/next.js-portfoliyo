"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Building2, Heart, ShoppingCart, TrendingUp, Church, CreditCard, Home, Users, MessageCircle, CheckSquare } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    title: "Business Club Web Application – Rotary Club, Thrissur",
    category: "FREELANCE CLIENT",
    tags: ["NEXT.JS", "SHADCN UI", "ZUSTAND", "NODE.JS"],
    description: "Business networking platform with user roles, business ranking, real-time chat, and custom dashboards. Full-stack development handled independently, currently nearing production.",
    gradient: "bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700",
    icon: Building2
  },
  {
    id: 2,
    title: "Clinic Appointment System – Heemas Clinic, Thrissur",
    category: "FREELANCE CLIENT",
    tags: ["MONGODB", "EXPRESS.JS", "REACT", "NODE.JS"],
    description: "Developed a clinic management app with modules for doctors, appointments, billing, and patient tracking. Single-handedly built from scratch; now live with 700+ active users.",
    gradient: "bg-gradient-to-br from-green-500 via-teal-600 to-green-700",
    icon: Heart
  },
  {
    id: 3,
    title: "Full-Stack Real Estate E-commerce Platform",
    category: "PORTFOLIO PROJECT",
    tags: ["REACT", "NEXT.JS", "NODE.JS", "MONGODB", "AWS S3", "RAZORPAY", "SOCKET.IO"],
    description: "Real estate app with property listings, chat, payment integration, and an admin dashboard. Features dynamic property browsing, real-time communication, and secure transactions.",
    gradient: "bg-gradient-to-br from-orange-500 via-red-600 to-pink-700",
    icon: Home
  },
  {
    id: 4,
    title: "Full-Stack Social Media News Platform",
    category: "PORTFOLIO PROJECT",
    tags: ["NEXT.JS", "NODE.JS", "MONGODB", "ZUSTAND", "SHADCN UI", "JWT"],
    description: "Blog-style platform with user roles, authentication, moderation, and content management dashboard. Built with modern state management and UI components.",
    gradient: "bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700",
    icon: Users
  },
  {
    id: 5,
    title: "Ecopeedika Grocery Web App – Frontend",
    category: "FREELANCE CLIENT",
    tags: ["NEXT.JS", "TAILWIND CSS"],
    description: "Created a responsive and clean shopping UI for a local grocery brand with category-based navigation and mobile-first design approach.",
    gradient: "bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700",
    icon: ShoppingCart
  },
  {
    id: 6,
    title: "WEALTH Web Application – Frontend",
    category: "FREELANCE CLIENT",
    tags: ["NEXT.JS", "CSS MODULES"],
    description: "Built responsive landing and dashboard pages for a startup with performance-focused rendering and modern UI design.",
    gradient: "bg-gradient-to-br from-yellow-500 via-orange-600 to-red-700",
    icon: TrendingUp
  },
  {
    id: 7,
    title: "Social Media Platform with Real-Time Chat",
    category: "PORTFOLIO PROJECT",
    tags: ["NODE.JS", "EXPRESS.JS", "MONGODB", "EJS", "SOCKET.IO"],
    description: "Chat app with real-time private messaging, user auth, and profile features. Built with Socket.IO for seamless real-time communication.",
    gradient: "bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700",
    icon: MessageCircle
  },
  {
    id: 8,
    title: "Cloud-Based Task Management System",
    category: "PORTFOLIO PROJECT",
    tags: ["REACT", "NODE.JS", "MONGODB", "JWT"],
    description: "Built a scalable task manager with admin and user panels, hosted on cloud infrastructure with robust authentication and role management.",
    gradient: "bg-gradient-to-br from-violet-500 via-purple-600 to-pink-700",
    icon: CheckSquare
  }
];

const CaseStudyCard = ({ study, isFeatured = false, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = study.icon;
  
  const toggleReadMore = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-[#d7cdeb] rounded-xl overflow-hidden cursor-pointer transition-transform duration-300  ${
        isFeatured ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 p-8' : 'p-4'
      }`}
    >
      <div className={`${isFeatured ? 'order-2' : ''}`}>
        <div className={`relative rounded-2xl w-full h-full overflow-hidden transition hover:scale-105 shadow-lg shadow-purple-500/50 ${isFeatured ? 'min-h-[300px]' : 'h-48'} bg-gradient-to-br from-slate-50 to-gray-100`}>
          {/* Abstract Data Visualization Style */}
          <div className="absolute inset-0">
            {/* Circular Progress Rings */}
            <div className="absolute top-6 left-6">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="75, 100" 
                        className="animate-pulse"/>
                </svg>
              </div>
            </div>
            
            {/* Bar Chart Elements */}
            <div className="absolute bottom-6 left-6 flex items-end gap-1">
              <div className="w-2 bg-violet-400 rounded-t animate-pulse" style={{ height: '20px', animationDelay: '0s' }}></div>
              <div className="w-2 bg-violet-500 rounded-t animate-pulse" style={{ height: '35px', animationDelay: '0.2s' }}></div>
              <div className="w-2 bg-violet-300 rounded-t animate-pulse" style={{ height: '28px', animationDelay: '0.4s' }}></div>
              <div className="w-2 bg-violet-600 rounded-t animate-pulse" style={{ height: '42px', animationDelay: '0.6s' }}></div>
              <div className="w-2 bg-violet-400 rounded-t animate-pulse" style={{ height: '15px', animationDelay: '0.8s' }}></div>
            </div>
            
            {/* Connecting Lines/Network */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full opacity-30">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <path d="M20,20 Q80,40 150,30 T250,80" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse"/>
                <path d="M50,80 Q120,60 180,90 T280,50" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }}/>
                <circle cx="20" cy="20" r="3" fill="#8b5cf6" className="animate-ping" style={{ animationDelay: '0.5s' }}/>
                <circle cx="150" cy="30" r="2" fill="#a855f7" className="animate-ping" style={{ animationDelay: '1.5s' }}/>
                <circle cx="180" cy="90" r="2.5" fill="#8b5cf6" className="animate-ping" style={{ animationDelay: '2s' }}/>
              </svg>
            </div>
            
            {/* Tech Stack as Data Points */}
            <div className="absolute top-6 right-6 space-y-2">
              {study.tags.slice(0, 4).map((tag, idx) => (
                <div key={idx} className="flex items-center gap-2 animate-pulse" style={{ animationDelay: `${idx * 0.3}s` }}>
                  <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                  <span className="text-xs font-mono text-gray-600">{tag}</span>
                </div>
              ))}
            </div>
            
            {/* Central Icon with Pulse Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-400 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-white rounded-full p-4 shadow-lg">
                  <IconComponent className={`text-violet-600 ${isFeatured ? 'w-12 h-12' : 'w-8 h-8'}`} />
                </div>
              </div>
            </div>
            
            {/* Project Number as Watermark */}
            <div className="absolute bottom-4 right-4 text-6xl font-bold text-violet-100 select-none">
              {String(study.id).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
      
      <div className={`flex flex-col ${isFeatured ? 'justify-center space-y-6' : 'mt-4 space-y-2'}`}>
        <span className="text-[#0B001A] text-sm">{study.category}</span>
        <h3 className={`text-[#0B001A] ${isFeatured ? 'text-4xl' : 'text-xl'} font-light`}>
          {study.title}
        </h3>
        
        <div className="flex gap-2 flex-wrap">
          {study.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-4 py-1 text-[#0B001A] rounded-full bg-transparent text-sm border border-[#0b001a]"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {isFeatured && (
          <>
            <div className="relative">
              <p className={`text-gray-700 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                {study.description}
              </p>
              {study.description.length > 150 && (
                <button
                  onClick={toggleReadMore}
                  className="text-purple-600 text-sm mt-2 hover:underline focus:outline-none"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
            <button className="w-fit relative flex items-center px-6 py-3 text-[#0B001A] text-sm bg-transparent rounded-full border border-purple-500 transition hover:scale-105 shadow-lg shadow-purple-500/50">
              <a href="https://github.com/FaizeMuhammed"> VIEW PROJECT ↗</a>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const CaseStudiesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredStudy, setFeaturedStudy] = useState(caseStudies[0]);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? caseStudies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setFeaturedStudy(caseStudies[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % caseStudies.length;
    setCurrentIndex(newIndex);
    setFeaturedStudy(caseStudies[newIndex]);
  };

  const visibleStudies = caseStudies.filter(study => study.id !== featuredStudy.id).slice(0, 4);

  return (
    <div className="min-h-fit bg-black  max-w-9xl lg:m-7  lg:mt-0 lg:mb-2 m-2">
      <div className="max-w-9xl mx-auto space-y-2">
        <div className="relative">
          <CaseStudyCard study={featuredStudy} isFeatured={true} />
          
          <button 
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-6 bg-transparent p-2 sm:p-3 rounded-full hover:bg-transparent border border-purple-500 transition hover:scale-105 shadow-lg shadow-purple-500/50"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-6 bg-transparent p-2 sm:p-3 rounded-full hover:bg-transparent border border-purple-500 transition hover:scale-105 shadow-lg shadow-purple-500/50"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {visibleStudies.map((study) => (
            <CaseStudyCard 
              key={study.id}
              study={study}
              onClick={() => {
                setFeaturedStudy(study);
                setCurrentIndex(caseStudies.findIndex(s => s.id === study.id));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesSection;