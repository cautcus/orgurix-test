"use client"
import { React, useState } from "react";

const TeamMember = ({ initials, name, title, image, linkin }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative p-24 m-4 border-2 border-neutral-700 shadow-lg rounded-lg text-center transform transition-transform hover:scale-105 "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className="text-5xl font-bold text-neutral-200">{initials}</h2>
      <h3 className="text-xl font-semibold text-neutral-400">{name}</h3>
      <p className="text-neutral-700">{title}</p>
      {hovered && (
        <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center p-4 ">
          <img
            className="w-20 h-20 rounded-full mb-2"
            src={image}
            width={20}
            height={20}
            alt={`${name}'s profile`}
          />
          <h3 className="text-xl text-white font-semibold">{name}</h3>
          <p className="text-gray-500">{title}</p>
          <div className="mt-4 flex justify-center gap-4 text-white ">
            <a href={linkin}>
              <svg
                className="w-5 h-5 duration-150 hover:text-gray-500"
                fill="none"
                viewBox="0 0 48 48"
              >
                <g clip-path="url(#clip0_17_68)">
                  <path
                    fill="currentColor"
                    d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_68">
                    <path fill="currentColor" d="M0 0h48v48H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const teamMembers = [
  {
    initials: "AB",
    name: "Ayush Baral",
    title: "Founder & CTO",
    linkedin: "https://www.linkedin.com/in/cautcus/",
    image:"/img/ayush-dp.jpg",
  },
  {
    initials: "SD",
    name: "Shreyas Das",
    title: "Co-Founder & COO",
    linkedin: "https://www.linkedin.com/in/shreyas-das-00a273321/",
    image:'/img/shreyas-dp.jpg',
  }
];

export default function Team() {
  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMember
                key={member.name}
                initials={member.initials}
                name={member.name}
                title={member.title}
                image={member.image}
                linkin={member.linkedin}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}