"use client";

import React from 'react';
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import GoogleAnalytics from '@/components/GoogleAnalytics';

const HelpCenterPage = () => {
  return (
    <div className="text-white min-h-screen flex flex-col justify-between bg-neutral-900">
          <GoogleAnalytics/>
      <Topnav />
      <main className="flex-grow">
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto m-20">
            <h1 className="text-4xl font-bold mb-8 text-green-400">Help Center</h1>
            <p className="text-lg mb-8 text-neutral-200">
              Welcome to the OrguriX Help Center. Here, you'll find answers to common questions, guidance on our products and services, and support resources to ensure your shopping experience is smooth and enjoyable.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-green-200">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-green-200">How do I track my order?</h3>
                <p className="text-lg text-neutral-200">
                  Once your order has been shipped, you will receive an email with a tracking number and a link to track your package. You can also track your order directly on our website under the "Order History" section in your account.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-200">What is your return policy?</h3>
                <p className="text-lg text-neutral-200">
                  We offer a 30-day return policy on most items. If you're not satisfied with your purchase, you can return it within 30 days of delivery for a full refund. Please visit our Returns & Exchanges page for more details.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-200">How can I contact customer support?</h3>
                <p className="text-lg text-neutral-200">
                  You can reach our customer support team via email at 
                  <a href="mailto:orgurix.in@gmail.com" className="text-green-500 hover:underline ml-1">orgurix.in@gmail.com</a>, or by using the contact form on our website. We are here to help you with any issues or questions you may have.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-200">Do you offer international shipping?</h3>
                <p className="text-lg text-neutral-200">
                  Yes, we do offer international shipping to many countries. Shipping costs and delivery times vary depending on the destination. You can find more details on our Shipping Information page.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-green-200">Support Resources</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-green-200">Order Issues</h3>
                <p className="text-lg text-neutral-200">
                  If you encounter any issues with your order, such as incorrect items or missing packages, please contact our support team as soon as possible. We will work quickly to resolve the problem.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-200">Account Management</h3>
                <p className="text-lg text-neutral-200">
                  Need help with your account? Whether you need to update your information, reset your password, or manage your orders, our support team is here to assist you.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-200">Technical Support</h3>
                <p className="text-lg text-neutral-200">
                  Experiencing technical issues with our website? Please reach out to our technical support team for help with navigating the site, making purchases, or any other technical concerns.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenterPage;
