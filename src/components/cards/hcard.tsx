import { HoverEffect } from "./card-hover-effect";

export function CardB() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Ayush Baral",
    description: "Founder & CTO",
    link: "https://www.instagram.com/cautcus/",
    pic:'https://orgurix.vercel.app/static/media/ayush-dp.2a7d5f647582b67e6a09.jpg',
  },
  {
    title: "Shreyas Das",
    description: "Co-Founder & COO",
    link: "https://www.instagram.com/avoid___dynamo/",
    pic: "https://orgurix.vercel.app/static/media/shreyas-dp.cb408f3054358135c556.jpg",
  },
];
