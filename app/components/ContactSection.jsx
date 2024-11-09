import React from 'react';
import Link from 'next/link';

const ContactSection = () => {
  return (
    <div className="min-h-screen max-w-9xl m-2 lg:mx-8 bg-[#1E0044] px-4 sm:px-6 lg:px-8 flex flex-col  sm:m-7 rounded-2xl">
      {/* Top Navigation */}
      <nav className="max-w-7xl w-full mx-auto pt-4 sm:pt-6 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <Link href="/" className="text-white italic font-light text-lg sm:text-xl">
          Faize Muhammed Basheer
        </Link>
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-8">
          <Link 
            href="www.linkedin.com/in/faize-muhammed-basheer" 
            className="text-gray-300 hover:text-white transition text-xs sm:text-sm lg:text-base"
          >
            LINKEDIN ↗
          </Link>
          <Link 
            href="https://github.com/FaizeMuhammed" 
            className="text-gray-300 hover:text-white transition text-xs sm:text-sm lg:text-base"
          >
            GIT ↗
          </Link>
          <Link 
            href="https://www.instagram.com/faize_muhammed_basheer/" 
            className="text-gray-300 hover:text-white transition text-xs sm:text-sm lg:text-base"
          >
            INSTAGRAM ↗
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl text-white font-light leading-tight max-w-xl sm:max-w-2xl lg:max-w-4xl">
          Interested in
          <br />
          working together?
        </h2>

        {/* Circular Badge */}
        <div className="mt-10 sm:mt-12 lg:mt-16 relative">
          <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-[#2D1B4E] flex items-center justify-center group hover:bg-[#3D2B5E] transition-colors duration-300 cursor-pointer">
            <div className="text-purple-300 flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
              <a href="mailto:faizemuhammedbasheer@gmail.com"><img className="w-8 h-8 sm:w-[70px] sm:h-[70px] lg:w-[90px] lg:h-[90px]" src="/Image2.png" alt="" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl w-full mx-auto pb-4 sm:pb-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <p className="text-gray-400 text-xs sm:text-sm">
          ©2024 - MADE WITH NEXT.JS
        </p>
        <p className="text-gray-400 text-xs sm:text-sm">
          Available for freelance work
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
