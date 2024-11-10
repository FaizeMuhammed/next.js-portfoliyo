"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    title: "Fullstack Real Estate E-commerce Platform",
    category: "PROJECTS",
    tags: ["NEXT.JS","REACT","NODE.JS","MONGODB","AWS S3","SOCKET.IO","RAZORPAY"],
    description: "Developed a dynamic real estate platform using React, Next.js, Node.js, MongoDB, AWS S3, Razorpay, and Socket.IO, enabling users to browse properties, communicate in real-time, and complete secure transactions with a responsive interface, image storage, premium membership options, and a comprehensive admin dashboard with full CRUD functionality.",
    image: "/Screenshot 2024-11-07 145229.png"
  },
  {
    id: 2,
    title: "Full-stack Social Media News Platform",
    category: "",
    tags: ["NEXT.JS","NODE.JS","MONGODB","EXPRESS.JS","SHADCN UI","JWT", "FIGMA"],
    description: "Developed a Social Media News Platform with a Next.js frontend and Node.js backend, leveraging Zustand for state management, Shadcn UI components, and JWT authentication. Built an admin dashboard for managing users, posts, likes, comments, and news additions, using MongoDB for data storage and deploying on Vercel (frontend) and Render (backend) to ensure secure, role-based access and a smooth user experience",
    image: "/Screenshot 2024-10-22 143110.png"
  },
  {
    id: 3,
    title: "Full-stack social media/Chat platform",
    category: "CASE STUDY",
    tags: ["EJS","NODE.JS","MONGODB","EXPRESS.JS","JWT", "FIGMA"],
    description: "Developed a full-stack social media platform using Node.js, Express, MongoDB, EJS, and Socket.IO, featuring user authentication, personal chat functionality, and real-time private messaging. Built a secure CRUD system for user-generated posts with JWT-based authentication, enabling users to create, edit, and delete posts while storing chat histories in MongoDB",
    image: "/Screenshot 2024-09-28 130936.png"
  },
  {
    id: 4,
    title: "Employee-Managment",
    category: "CASE STUDY",
    tags: ["JS","NODE.JS","MONGODB","EXPRESS.JS","JWT", "FIGMA"],
    description: "Developed an employee management system using Node.js, Express, and Redux, supporting efficient CRUD operations and real-time data management. Designed a responsive front end with HTML, CSS, Bootstrap, and JavaScript to provide a seamless user experience for managing employee records.",
    image: "/employee-management.png"
  },
  {
    id: 5,
    title: "Static Responsive Webpage and Bootstrap Form",
    category: "CASE STUDY",
    tags: ["HTML", "CSS","JAVASCRIPT","BOOTSTRAP"],
    description: "Developed a static, responsive website using HTML, CSS, and Bootstrap, delivering cross-device compatibility and a modern user interface.",
    image: "/Screenshot 2024-09-21 172607.png"
  }
];

const CaseStudyCard = ({ study, isFeatured = false, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
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
        <img 
          src={study.image} 
          alt={study.title}
          className="rounded-2xl w-full h-full object-cover transition hover:scale-105 shadow-lg shadow-purple-500/50"
        />
      </div>
      
      <div className={`flex flex-col ${isFeatured ? 'justify-center space-y-6' : 'mt-4 space-y-2'}`}>
        <span className="text-[#0B001A] text-sm">PROJECTS</span>
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
              <a href="https://github.com/FaizeMuhammed"> GIT-REPO ↗</a>
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
