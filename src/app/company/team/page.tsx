"use client";

import { Topnav } from "@/components/navbar/topnav";
import React, { useState, useEffect } from "react";
import Heading from "./heading";
import Team from "./cards";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SpinnerLoader from "@/components/ui/loader";
import Footer from "@/components/footer/Footer";
import Script from "next/script";

export default function TeamPage() {
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
    <div>
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
      <Heading />
      <Team />
      <Footer />
    </div>
  );
}
