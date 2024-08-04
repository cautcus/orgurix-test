"use client";
import React from "react";
import { AnimatedTooltip } from "./animated-tooltip";
import ShreyasDP from "../img/shreyas-dp.jpg"

const people = [
  {
    id: 1,
    name: "Ayush Baral",
    designation: "Founder & CTO",
    image:"https://orgurix.vercel.app/static/media/ayush-dp.2a7d5f647582b67e6a09.jpg",
    social:"https://www.instagram.com/cautcus/"
  },
  {
    id: 2,
    name: "Shreyas Das",
    designation: "Co-Founder & COO",
    image:"https://orgurix.vercel.app/static/media/shreyas-dp.cb408f3054358135c556.jpg",
    social:"https://www.instagram.com/avoid___dynamo/"
  },
];

export function Team() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
