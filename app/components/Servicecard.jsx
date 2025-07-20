import React from 'react';

const ServiceCard = ({ title, description, tags, gradient }) => (
  <div className={`${gradient} rounded-xl p-8 flex flex-col h-full w-full relative overflow-hidden`}>
    {/* Abstract background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full"></div>
      <div className="absolute bottom-8 left-6 w-12 h-12 border border-white/20 rounded-lg rotate-45"></div>
      <div className="absolute top-1/2 left-8 w-6 h-6 bg-white/10 rounded-full"></div>
    </div>
    
    <div className="relative z-10">
      <h3 className="text-white text-2xl sm:text-3xl font-light mb-8">{title}</h3>
      <p className="text-gray-100 text-sm sm:text-base mb-8 flex-grow leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-105"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      title: "Full-Stack Development",
      description: "MERN Stack Developer specializing in building responsive, user-centric applications using React, Next.js, and modern JavaScript frameworks. Experienced in developing dynamic full-stack solutions with React Native for mobile, advanced state management, and modern UI libraries for exceptional user experiences.",
      tags: ["React.js", "Next.js", "React Native", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Shadcn UI", "Redux", "Zustand"],
      gradient: "bg-gradient-to-br from-[#8338EC] via-[#9C2EF5] to-[#A855F7]"
    },
    {
      title: "Backend & Infrastructure",
      description: "Backend Developer with expertise in Node.js, Express, and scalable database solutions. Specializing in RESTful APIs, microservices architecture, real-time applications, and secure authentication systems. Experienced with cloud deployment and modern DevOps practices.",
      tags: ["Node.js", "Express.js", "RESTful APIs", "JWT", "Socket.io", "MongoDB", "SQL", "Prisma", "Docker", "AWS S3"],
      gradient: "bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#9333EA]"
    },
    {
      title: "Fintech Solutions",
      description: "Fintech Developer with hands-on experience in ONDC integration, payment gateway implementations, and financial application development. Skilled in building secure, compliant financial platforms with modern protocols and KYC verification systems.",
      tags: ["ONDC", "Beckn Protocol", "Razorpay", "KYC/Document Verification", "Payment Integration", "Financial APIs"],
      gradient: "bg-gradient-to-br from-[#8338EC] via-[#9C2EF5] to-[#A855F7]"
    },
    {
      title: "Tools & Collaboration",
      description: "Experienced with modern development tools and collaborative workflows. Proficient in design systems, project management, version control, and CI/CD pipelines. Skilled in both technical implementation and cross-functional team collaboration.",
      tags: ["Git", "GitHub Actions", "CI/CD", "Figma", "Jira", "Notion", "VS Code", "Chrome DevTools", "Postman"],
      gradient: "bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#9333EA]"
    }
  ];

  return (
    <div className="min-h-fit bg-black lg:mr-7 lg:mb-2 lg:mt-2 lg:ml-7 m-2">
      <div className="max-w-9xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              tags={service.tags}
              gradient={service.gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;