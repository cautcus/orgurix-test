"use client";

import React, {useState,useEffect} from 'react';
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SpinnerLoader from '@/components/ui/loader';
import Script from 'next/script';

const PrivacyPolicyPage = () => {

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
            <h1 className="text-4xl font-bold mb-8 text-green-400">Privacy Policy</h1>

            <p className="text-lg mb-4 text-neutral-200">
              At OrguriX, we are committed to protecting your privacy. This privacy policy explains how we collect, use, and share your personal information when you visit our website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">1. Information We Collect</h2>
            <p className="text-lg mb-4 text-neutral-200">
              We may collect personal information such as your name, email address, mailing address, phone number, and payment information when you make a purchase, sign up for our newsletter, or interact with us through our website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">2. How We Use Your Information</h2>
            <p className="text-lg mb-4 text-neutral-200">
              We use the information we collect to process your orders, manage your account, respond to your inquiries, send promotional emails, and improve our website. We may also use your information to comply with legal obligations.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">3. Sharing Your Information</h2>
            <p className="text-lg mb-4 text-neutral-200">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or servicing you, provided they agree to keep your information confidential.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">4. Security of Your Information</h2>
            <p className="text-lg mb-4 text-neutral-200">
              We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">5. Cookies</h2>
            <p className="text-lg mb-4 text-neutral-200">
              Our website uses cookies to enhance your experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enables the site's systems to recognize your browser and capture and remember certain information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">6. Your Consent</h2>
            <p className="text-lg mb-4 text-neutral-200">
              By using our site, you consent to our privacy policy. If we decide to change our privacy policy, we will post those changes on this page.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">7. Contacting Us</h2>
            <p className="text-lg mb-4 text-neutral-200">
              If you have any questions regarding this privacy policy, you may contact us at 
              <a href="mailto:orgurix.in@gmail.com" className="text-green-500 hover:underline ml-1">orgurix.in@gmail.com</a>.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-200">8. Changes to This Privacy Policy</h2>
            <p className="text-lg mb-4 text-neutral-200">
              We reserve the right to update or change our privacy policy at any time, and you should check this privacy policy periodically. Your continued use of the service after we post any modifications to the privacy policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified privacy policy.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
