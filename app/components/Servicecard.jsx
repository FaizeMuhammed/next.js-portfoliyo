import React from 'react';

const ServiceCard = ({ title, description, tags }) => (
  <div className="bg-gradient-to-r from-[#8338EC] to-[#9C2EF5] rounded-3xl p-8 flex flex-col h-full w-full">
    <h3 className="text-white text-2xl sm:text-3xl font-light mb-8">{title}</h3>
    <p className="text-gray-200 text-sm sm:text-base mb-8 flex-grow">
      {description}
    </p>
    <div className="flex flex-wrap gap-3">
      {tags.map((tag, index) => (
        <span 
          key={index}
          className="px-4 py-2 rounded-full bg-transparent text-white text-sm hover:bg-[#8442DE] border  transition-colors duration-300"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      title: "Frontend",
      description: "MERN Stack Developer and Frontend Specialist skilled in building responsive, user-centric applications using React, Next.js, and modern JavaScript frameworks. Experienced in developing dynamic full-stack solutions with expertise in MongoDB, Express, Node.js, and a strong focus on intuitive UI/UX.",
      tags: ["React", "HTML","CSS","NEXT.JS","JAVASCRIPT","TYPESCRIPT"]
    },
    {
      title: "Backend and Database",
      description: "Backend Developer with expertise in Node.js, Express, and MongoDB, specializing in building scalable APIs, efficient database schemas, and secure server-side logic. Skilled in creating robust backend solutions to support dynamic, data-driven applications.",
      tags: ["NODE.JS", "EXPRESS.JS","NEST.JS","MONGODB"]
    }
  ];

  return (
    <div className="min-h-fit  bg-black  px-0 sm:px-6 lg:px-8">
      <div className="max-w-9xl  m-2 lg:m-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              tags={service.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;