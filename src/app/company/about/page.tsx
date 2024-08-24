"use client";

import React from 'react';
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Hero } from '@/components/banner/hero';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Script from 'next/script';

const AboutUsPage = () => {
  return (
    <div className="text-white min-h-screen flex flex-col justify-between">
       <div>
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
          <GoogleAnalytics/>
      <Topnav />
      <main className="flex-grow">
      <Hero words=" Welcome to OrguriX"/>
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto m-20">
          <div>
                <h2 className="text-4xl font-bold mb-4 text-green-200">Our Story</h2>
                <p className="text-lg mb-4">
                  At OrguriX, we believe that every product has a story to tell. Founded in 2024, we started with a simple vision: to bring unique, handcrafted items to discerning customers who value quality and authenticity. Our journey began with a small team of dedicated artisans who pour their heart and soul into every creation.
                </p>
                </div>
          </div>
        </section>

        <section className="py-16 px-4  md:px-8 bg-neutral-950">
          <div className="container text-right mx-auto m-20">
                <h2 className="text-4xl font-bold mb-4 text-green-200">Our Mission</h2>
                <p className="text-lg mb-4">
                  Our mission is to connect you with beautifully crafted products that add a touch of elegance and charm to your life. We are committed to sustainability, ethical sourcing, and supporting local artisans. Each purchase you make supports a community of talented craftsmen and helps preserve traditional art forms.
                </p>
          </div>
        </section>

        <section className="py-16 px-4 m-20 md:px-8">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-6 pb-18 text-center text-green-200">Why Choose Us?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Quality and Craftsmanship</h3>
                <p className="text-lg">
                  We take pride in the meticulous attention to detail and the high-quality materials used in every product.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Unique Designs</h3>
                <p className="text-lg">
                  Our collection features one-of-a-kind pieces that you won't find anywhere else.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Sustainable Practices</h3>
                <p className="text-lg">
                  We are committed to eco-friendly practices and use sustainable materials whenever possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4  md:px-8 bg-neutral-950">
          <div className="container mx-auto m-20 text-center">
            <h2 className="text-4xl font-bold mb-6 text-green-200">Join Our Community</h2>
            <p className="max-w-2xl mx-auto text-lg mb-6">
              Stay connected with us through our social media channels and be the first to know about new arrivals, special offers, and behind-the-scenes stories. Follow us on:
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://facebook.com/orgurix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                <FaFacebook className="w-8 h-8" />
              </a>
              <a href="https://twitter.com/orgurix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200">
                <FaTwitter className="w-8 h-8" />
              </a>
              <a href="https://instagram.com/orgurix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
                <FaInstagram className="w-8 h-8" />
              </a>
              <a href="https://linkedin.com/company/orgurix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-900">
                <FaLinkedin className="w-8 h-8" />
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto m-20 text-center">
            <h2 className="text-4xl font-bold mb-6 text-green-200">Contact Us</h2>
            <p className="max-w-2xl mx-auto text-lg">
              We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us at 
            </p>
            <a href="mailto:yourcontactemail@gmail.com" className="max-w-2xl mx-auto text-lg text-green-500 hover:underline">orgurix.in@gmail.com</a>.
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
