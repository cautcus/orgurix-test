"use client";
import React, { useState, useEffect } from 'react';
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import { Hero } from '@/components/banner/hero';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SpinnerLoader from '@/components/ui/loader';
import Script from 'next/script';

const ReturnsExchangesPage = () => {
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
      <GoogleAnalytics />
      <Topnav />
      <main className="flex-grow">
        <section className="py-16 px-4 md:px-8 bg-neutral-950">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center text-green-200 pb-8 pt-20">Our Return & Exchange Policy</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-black p-6 rounded-lg shadow-lg mb-4">
                <h3 className="text-2xl font-bold mb-2">Return Policy</h3>
                <p className="text-lg">
                  We offer a 7-day return policy for most items. However, if the product is damaged, we do not take responsibility, and the return must be handled by the customer.
                </p>
              </div>
              <div className="bg-black p-6 rounded-lg shadow-lg mb-4">
                <h3 className="text-2xl font-bold mb-2">Exchange Policy</h3>
                <p className="text-lg">
                  If you wish to exchange an item, please contact our support team within 7 days of delivery. The item must be in its original condition, and exchanges are only possible for undamaged items. We currently do not offer exchanges for items that have been damaged after delivery.
                </p>
              </div>
              <div className="bg-black p-6 rounded-lg shadow-lg mb-4">
                <h3 className="text-2xl font-bold mb-2">How to Return or Exchange</h3>
                <p className="text-lg">
                  To return or exchange an item, follow the instructions provided on this page. Please ensure all items are returned or exchanged within 7 days of delivery.
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

export default ReturnsExchangesPage;
