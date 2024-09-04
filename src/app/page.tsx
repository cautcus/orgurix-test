"use client";
import React, { useEffect, useState } from "react";
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SpinnerLoader from '@/components/ui/loader';
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import Grid from "@/components/grid/grid";
import { Feature } from "@/components/h-grid/feature";
import { CardA } from "@/components/cards/3dcard";
import { Reviews } from "@/components/review/review";
import { AppleCardsCarouselDemo } from "@/components/carousel/carousel";
import { Slider } from "@/components/banner/slider";
import Script from "next/script";


export default function Home() {
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
    <GoogleAnalytics/>
    <Topnav />
    <Slider/>
    <AppleCardsCarouselDemo/>
    <div className="mx-auto max-w-xl text-center pt-20" id="shop">
          <TextGenerateEffect words="Introducing Our Premier Line of Organic Essentials"/>
    </div>
    <CardA/>  
    <Reviews/>
    <Footer/> 

    {/* Grid Components */}
      {/* <div>
        <div className="mx-auto max-w-xl text-center px-4 pb-12">
          <TextGenerateEffect words="Introducing Our Premier Line of Organic Essentials"/>
        </div>
        <Grid /> 
        </div> 
      <Feature />*/}
    </>
  );
}
