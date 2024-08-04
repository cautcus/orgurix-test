"use client"
import { React, useState } from "react";

const TeamMember = ({ initials, name, title, image, insta, linkin }) => {
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
            <a href={insta}>
              <svg
                className="w-5 h-5 duration-150 hover:text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
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
    instagram: "https://www.instagram.com/cautcus/",
    image:"/img/ayush-dp.jpg",
  },
  {
    initials: "SD",
    name: "Shreyas Das",
    title: "Co-Founder & COO",
    instagram: "https://www.instagram.com/avoid___dynamo/",
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
                insta={member.instagram}
                linkin={member.linkedin}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}