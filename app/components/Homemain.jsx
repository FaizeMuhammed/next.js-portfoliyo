import React from "react";
import Link from "next/link";

export const Homemain = () => {
  return (
    <div className="max-w-9xl m-2 lg:min-h-screen lg:m-8  min-h-fit bg-[#1E0044]  rounded-2xl overflow-hidden">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-12">
        {/* Navigation - Consistent across all breakpoints */}
        <nav className="flex justify-between items-center py-4 sm:py-6 mb-8 sm:mb-12 lg:mb-16">
          <h1 className="specialh1 text-white italic font-light text-base sm:text-lg md:text-xl whitespace-nowrap">
            Faize Muhammed Basheer
          </h1>

          <Link href="mailto:faizemuhammedbasheer@gmail.com">
            <button
              className="relative flex items-center px-4 sm:px-6 py-2 sm:py-3 text-white 
                             text-xs sm:text-sm bg-[#1E0044] rounded-full border border-purple-500 
                             transition-all duration-300 hover:scale-105 
                             bg-gradient-to-r shadow-lg shadow-purple-500/50 
                             group whitespace-nowrap"
            >
              Connect ↗
            </button>
          </Link>
        </nav>

        {/* Hero Content - Enhanced responsive layout */}
        <div className="h-full flex flex-col justify-between mt-8 sm:mt-16 lg:mt-24">
          <div className="relative">
            <p className="text-[#E9DEFF] text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 max-w-xl">
              I am a{" "}
              <span
                className="bg-gradient-to-r from-[#8338EC] to-[#B923FF] 
                             bg-clip-text text-transparent italic font-medium"
              >
                MERN STACK
              </span>{" "}
              Developer
            </p>

            <div className="flex items-start gap-4 sm:gap-6 lg:gap-8">
              <div className="flex-1">
                <h2
                  className="text-[#E9DEFF] text-3xl sm:text-5xl lg:text-8xl 
                             font-light leading-tight tracking-tight"
                >
                  I create{" "}
                  <span
                    className="bg-gradient-to-r from-[#8338EC] to-[#B923FF] 
                                 bg-clip-text text-transparent italic"
                  >
                    beautiful
                  </span>
                  <br className="hidden sm:block" />
                  <span className="text-[#E9DEFF] block mt-2 sm:mt-4">
                    experiences
                  </span>
                </h2>
              </div>

              {/* Original Pyramid Loader */}
              <div className="pyramid-loader hidden sm:block">
                <div className="wrapper">
                  <span className="side side1"></span>
                  <span className="side side2"></span>
                  <span className="side side3"></span>
                  <span className="side side4"></span>
                  <span className="shadow"></span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[#E9DEFF] mt-8 sm:mt-12 lg:mt-16 text-sm sm:text-base opacity-80">
            Available for freelance work
          </p>
        </div>

        {/* Fixed Badge - Responsive sizing and positioning */}
       
      </div>
    </div>
  );
};
