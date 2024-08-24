"use client";
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Topnav } from '@/components/navbar/topnav';
import Footer from '@/components/footer/Footer';
import Script from 'next/script';

function BecomeASellerPage() {
  const [state, handleSubmit] = useForm("xrbzaylw");

  if (state.succeeded) {
    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
        <div className="bg-gray-800 shadow-lg rounded-lg w-full max-w-4xl p-8">
          <h1 className="text-3xl font-semibold text-white mb-6">Welcome to the OrguriX Family</h1>
          <p className="text-green-400 mb-4">Thanks for joining!</p>
          <a className="w-full px-4 py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 " href="/">Go Back -{'>'}</a>
        </div>
      </div>
    );
  }

  return (
    <>
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
    <Topnav/>
    <div className="min-h-screen flex items-center justify-center p-20">
      <div className="bg-gray-800 shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h1 className="text-3xl font-semibold text-white mb-6">Become a Seller</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-red-400"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="storeName">
              Store Name
            </label>
            <input
              id="storeName"
              type="text"
              name="storeName"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="storeDescription">
              Store Description
            </label>
            <textarea
              id="storeDescription"
              name="storeDescription"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
            <ValidationError
              prefix="Description"
              field="storeDescription"
              errors={state.errors}
              className="text-red-400"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="businessWebsite">
              Business Website (optional)
            </label>
            <input
              id="businessWebsite"
              type="url"
              name="businessWebsite"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] w-full font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            disabled={state.submitting}
          >
            Submit
          </button>
        </form>
        {state.errors && Array.isArray(state.errors) && state.errors.length > 0 && (
          <p className="mt-4 text-red-400">
            There were errors with your submission. Please check the form and try again.
          </p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default BecomeASellerPage;
