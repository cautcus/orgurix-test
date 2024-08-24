"use client";

import React from 'react';
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Script from 'next/script';
import { IconMail, IconBrandWhatsapp } from '@tabler/icons-react';

const ContactUsPage = () => {
  return (
    <div className="text-white min-h-screen flex flex-col justify-between bg-neutral-900">
      <GoogleAnalytics />
      <Topnav />
      <main className="flex-grow pt-20">
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-green-400 text-center">Contact Us</h1>
            <p className="text-lg mb-8 text-neutral-200 text-center">
              We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, please feel free to reach out to us using the options below.
            </p>

            <div className="flex flex-col md:flex-row md:justify-center gap-4 mb-8">
            <a
                href="mailto:orgurix.in@gmail.com"
                className="flex items-center space-x-4 bg-re-800 border border-neutral-700 p-4 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <IconMail size={24} className="text-red-500" />
                <span className="text-lg font-semibold text-green-200">Email Us</span>
              </a>

              <a
                href="https://wa.me/918981918040"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 bg-neutral-800 border border-neutral-700 p-4 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <IconBrandWhatsapp size={24} className="text-green-500" />
                <span className="text-lg font-semibold text-green-200">Message Us on WhatsApp</span>
              </a>

            </div>

            <div className="relative w-full h-96 border border-neutral-700 rounded-lg overflow-hidden">
              <iframe
                src="https://tawk.to/chat/66c9e94350c10f7a009fffd6/1i62bec3o"
                frameBorder="0"
                width="100%"
                height="100%"
                title="Tawk.to Chat"
                className="absolute inset-0"
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s=document.createElement("script");
              s.src='https://embed.tawk.to/66c9e94350c10f7a009fffd6/1i62bec3o'; // Replace with your Tawk.to ID
              s.async=true;
              s.charset='UTF-8';
              s.crossOrigin='*';
              document.head.appendChild(s);
            })();
          `,
        }}
      />
    </div>
  );
};

export default ContactUsPage;
