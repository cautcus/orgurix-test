"use client";
import React, { useState, useEffect } from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { toast } from "sonner";
import { ButtonsCard } from "../ui/tailwindcss-buttons";
import reactElementToJSXString from "react-element-to-jsx-string";


export const buttons = [
  {
    name: "Shimmer",
    description: "Shimmer button for your website",
    showDot: false,
    component: (
      <button
        className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
       <a href="https://forms.gle/HyWgeaqoDUNuXdJ59">Notify Now</a>
      </button>
    ),
  },
];

export default function ComingSoon() {
  const calculateTimeLeft = () => {
    const difference = +new Date(2024, 8, 8, 18, 30, 0, 0) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);


  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 text-center">
        <h1 className="relative z-10 text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold pb-6">
        Arriving Soon
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm relative z-10">
          We're working on something amazing! Stay tuned for our upcoming launch. Exciting things are on the way, and we can't wait to share them with you.
        </p>
        <div className="mt-4">
          <p className="text-neutral-400 text-lg">Launching in:</p>
          <div className="text-neutral-200 text-3xl font-semibold mt-2">
            {`${timeLeft.days}d : ${timeLeft.hours}h : ${timeLeft.minutes}m : ${timeLeft.seconds}s`}
          </div>
        </div>
      </div>
      {buttons.map((button, idx) => (
        <ButtonsCard key={idx} className="py-4">
          {button.component}
        </ButtonsCard>
      ))}
      <BackgroundBeams />
    </div>
  );
}
