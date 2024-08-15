"use client";

import React from 'react';
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import { Hero } from '@/components/banner/hero';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const CustomerSupportPage = () => {
  return (
    <div className="text-white min-h-screen flex flex-col justify-between">
          <GoogleAnalytics/>
      <Topnav />
      <main className="flex-grow">
      <Hero words="Customer Support"/>
        <section className="py-16 px-4 md:px-8 bg-neutral-950">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center text-green-200 pb-8">Frequently Asked Questions (FAQs)</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-black p-6 rounded-lg shadow-lg mb-4">
                <h3 className="text-2xl font-bold mb-2">How can I track my order?</h3>
                <p className="text-lg">
                  You can track your order using the tracking link sent to your email once your order has been shipped. Alternatively, you can log in to your account on our website and view your order status.
                </p>
              </div>
              <div className="bg-black p-6 rounded-lg shadow-lg mb-4">
                <h3 className="text-2xl font-bold mb-2">What is your return policy?</h3>
                <p className="text-lg">
                  We offer a 30-day return policy for most items. Please visit our Returns & Exchanges page for detailed information.
                </p>
              </div>
              <div className="bg-black p-6 rounded-lg shadow-lg mb-4">
                <h3 className="text-2xl font-bold mb-2">How can I contact customer support?</h3>
                <p className="text-lg">
                  You can contact our customer support team via email at support@yourcompany.com or by filling out the contact form below. We’re available 24/7 to assist you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-8 ">
          <div className="container mx-auto ">
            <h2 className="text-4xl font-bold mb-6 text-center text-green-200">Contact Us</h2>
            <form className="max-w-3xl mx-auto bg-neutral-950 p-8 rounded-lg shadow-lg">
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
                <input type="text" id="name" name="name" className="w-full p-3 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full p-3 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Email" />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-lg font-medium mb-2">Subject</label>
                <input type="text" id="subject" name="subject" className="w-full p-3 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Subject" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
                <textarea id="message" name="message" rows={5} className="w-full p-3 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Message"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="bg-white hover:bg-white/[0.8] text-black font-bold py-3 px-6 rounded-lg">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerSupportPage;
