"use client";
import React, {useState,useEffect} from 'react';
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import { Hero } from '@/components/banner/hero';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SpinnerLoader from '@/components/ui/loader';
import Script from 'next/script';

const CustomerSupportPage = () => {

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
          <GoogleAnalytics/>
      <Topnav />
      <main className="flex-grow">
        <section className="py-16 px-4 md:px-8 bg-neutral-950">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center text-green-200 pb-8 pt-20">Frequently Asked Questions (FAQs)</h2>
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
                We offer a 7-day return policy for most items. However, if the product is damaged, we are not responsible, and the return must be handled by the customer. For more details, please visit our <a className='text-green-500 hover:text-green-200' href="exchange">Returns & Exchanges</a> page.
                </p>
              </div>
              <div className="bg-black p-6 rounded-lg shadow-lg mb-4">
                <h3 className="text-2xl font-bold mb-2">How can I contact customer support?</h3>
                <p className="text-lg">
                  You can contact our customer support team via email at orgurix.in@gmail.com or by filling out the contact form below. We’re available 24/7 to assist you.
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

export default CustomerSupportPage;
