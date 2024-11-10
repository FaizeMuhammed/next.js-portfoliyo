"use client";
const TechStack = () => {
  return (
    <div className="w-9x1  m-2 h-[300px] sm:h-[350px] md:h-[400px] lg:mx-8 lg:mt-0 sm:m-7 rounded-xl bg-[#d7cdeb] flex flex-col sm:flex-row justify-center items-center text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#1E0044] font-bold mb-4 sm:mb-0 sm:mr-4 p-6">
        Always Learning and Improving
      </h1>

      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
