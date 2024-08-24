"use client";

import React, {useState,useEffect} from 'react';
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SpinnerLoader from '@/components/ui/loader';
import Script from 'next/script';

const TermsAndConditionsPage = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SpinnerLoader />;
  }

  return (
    <div className="text-white min-h-screen flex flex-col justify-between bg-neutral-900">
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
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto m-20">
            <h1 className="text-4xl font-bold mb-8 text-green-400">Terms & Conditions</h1>

            <p className="text-lg mb-4 text-neutral-200">
              Welcome to OrguriX. These terms and conditions outline the rules and regulations for the use of our website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">1. Acceptance of Terms</h2>
            <p className="text-lg mb-4 text-neutral-200">
              By accessing this website, you accept these terms and conditions in full. If you do not agree with any part of these terms, you must not use this website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">2. Intellectual Property</h2>
            <p className="text-lg mb-4 text-neutral-200">
              Unless otherwise stated, OrguriX and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">3. Use of Website</h2>
            <p className="text-lg mb-4 text-neutral-200">
              You may view, download for caching purposes only, and print pages from the website for your personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.
            </p>
            <ul className="list-disc list-inside mb-4 text-neutral-200">
              <li>You must not republish material from this website.</li>
              <li>You must not sell, rent, or sub-license material from this website.</li>
              <li>You must not reproduce, duplicate, copy, or otherwise exploit material on this website for a commercial purpose.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">4. User Comments</h2>
            <p className="text-lg mb-4 text-neutral-200">
              Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material, and data ('Comments'). OrguriX does not screen, edit, publish, or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of OrguriX.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">5. Limitation of Liability</h2>
            <p className="text-lg mb-4 text-neutral-200">
              In no event shall OrguriX, nor any of its officers, directors, and employees, be liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">6. Changes to Terms</h2>
            <p className="text-lg mb-4 text-neutral-200">
              OrguriX reserves the right to revise these terms and conditions at any time. By using this website, you are expected to review these terms on a regular basis.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">7. Governing Law</h2>
            <p className="text-lg mb-4 text-neutral-200">
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>

            <p className="text-lg mt-8 text-neutral-200">
              If you have any questions or concerns regarding these terms, please contact us at 
              <a href="mailto:orgurix.in@gmail.com" className="text-green-500 hover:underline ml-1">orgurix.in@gmail.com</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
