import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: "MERN STACK DEVELOPER",
      company: "Stackmod Innovations",
      location: "Thiruvananthapuram, Kerala",
      date: "April 2024 – Nov 2024",
      details: [
        "Developed and optimized responsive user interfaces using HTML, CSS, JavaScript, and modern frameworks, ensuring cross-browser compatibility and accessibility standards.",
        "Developed and maintained full-stack web applications using the MERN (MongoDB, Express.js, React.js, Node.js) stack.",
        "Collaborated with teams on various projects, implementing responsive and dynamic features.",
        "Gained hands-on experience with RESTful APIs, JWT authentication, and MongoDB database management"
      ]
    }
  ];

  const education = [
    {
      title: "StackUp Learning Hub",
      subtitle: "Self Learning Platform - FullStack Development",
      details: "(Industry experts assign and review our projects)",
      date: "Nov 2023 - April 2024"
    },
    {
      title: "Indira Gandhi Engineering College",
      subtitle: "Diploma in Mechanical Engineering",
      location: "Kothamangalam, Kerala",
      date: "June 2019 - Oct 2021"
    }
  ];

  const ListItem = ({ title, subtitle, details, date, location }) => (
    <div className="border-b border-[#3D2953] py-6 px-4 sm:px-6 lg:px-8 group hover:bg-[#2A1B3D] transition-colors rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="space-y-2">
          <h3 className="text-white text-lg md:text-xl font-medium">{title}</h3>
          {subtitle && <p className="text-purple-300">{subtitle}</p>}
          {location && <p className="text-gray-400">{location}</p>}
          {details && <p className="text-gray-400 text-sm">{details}</p>}
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <span className="text-gray-400 text-sm whitespace-nowrap">{date}</span>
          <ArrowUpRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  ">
      <div className="max-w-9xl  m-2 lg:mx-8">
        <div className="bg-[#1E0044] rounded-3xl p-8 space-y-12 shadow-lg">
          {/* Experience Section */}
          <div>
            <h2 className="text-white text-2xl sm:text-3xl font-light mb-6">Experience</h2>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-[#251641] rounded-xl p-6">
                  <ListItem
                    title={exp.title}
                    subtitle={exp.company}
                    location={exp.location}
                    date={exp.date}
                  />
                  <ul className="mt-4 space-y-2 list-disc list-inside text-gray-300 text-sm sm:text-base">
                    {exp.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h2 className="text-white text-2xl sm:text-3xl font-light mb-6">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="bg-[#251641] rounded-xl p-6">
                  <ListItem
                    title={edu.title}
                    subtitle={edu.subtitle}
                    details={edu.details}
                    location={edu.location}
                    date={edu.date}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
