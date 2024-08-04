"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { toast, Toaster } from "sonner";
import { ButtonsCard } from "../ui/tailwindcss-buttons";
import reactElementToJSXString from "react-element-to-jsx-string";

const copy = (button: any) => {
  if (button.code) {
    copyToClipboard(button.code);
    return;
  }
  let buttonString = reactElementToJSXString(button.component);

  if (buttonString) {
    const textToCopy = buttonString;
    copyToClipboard(textToCopy);
  }
};


const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard:", text);
      toast.success("Copied to clipboard");
    })
    .catch((err) => {
      console.error("Error copying text to clipboard:", err);
      toast.error("Error copying to clipboard");
    });
};

export const buttons = [
  {
    name: "Shimmer",
    description: "Shimmer button for your website",
    showDot: false,
    component: (
      <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        Join Now
      </button>
    ),
  }
]


export default function Coming() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p>
      </div>
      <a href="https://ui.aceternity.com/components/tailwindcss-buttons#installation">
      {buttons.map((button, idx) => (
          <ButtonsCard key={idx} onClick={() => copy(button)}>
            {button.component}
          </ButtonsCard>
        ))}</a>
      <BackgroundBeams />
    </div>
  );
}
