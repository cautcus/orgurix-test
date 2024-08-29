"use client"
import { React, useState } from "react";
import { IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";

const TeamMember = ({ initials, name, title, image, linkin, insta }) => {
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
              <IconBrandLinkedin className="w-8 h-8 duration-150 hover:text-gray-500"/>
            </a>
            <a href={insta}>
              <IconBrandInstagram className="w-8 h-8 duration-150 hover:text-gray-500"/>
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
    instagram: "https://www.instagram.com/cautcus/",
    image:"/img/ayush-dp.jpg",
  },
  {
    initials: "SD",
    name: "Shreyas Das",
    title: "Co-Founder & COO",
    linkedin: "https://www.linkedin.com/in/shreyas-das-00a273321/",
    instagram: "https://www.instagram.com/avoid___dynamo/",
    image:'/img/shreyas-dp.jpg',
  },
  {
    initials: "DS",
    name: "Debarati Saha",
    title: "CMO",
    image:'/img/debarati-dp.jpg',
    instagram: "https://www.instagram.com/imdebaratisa/",
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
                insta={member.instagram}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}