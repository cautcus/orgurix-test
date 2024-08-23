"use client";
import React, { useEffect, useState } from "react";
import { Topnav } from "@/components/navbar/topnav";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import Grid from "@/components/grid/grid";
import { Feature } from "@/components/h-grid/feature";
import { CardA } from "@/components/cards/3dcard";
import { Reviews } from "@/components/review/review";
import Footer from "@/components/footer/Footer";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { AppleCardsCarouselDemo } from "@/components/carousel/carousel";
import { Slider } from "@/components/banner/slider";
import SpinnerLoader from '@/components/ui/loader';


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
    <GoogleAnalytics/>
    <Topnav />
    <Slider/>
    <AppleCardsCarouselDemo/>
    <div className="mx-auto max-w-xl text-center pt-20">
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
