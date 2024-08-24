"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/app/auth/firebase"; // Adjust import path as necessary
import { onAuthStateChanged, User } from "firebase/auth";
import { Topnav } from "@/components/navbar/topnav";
import { DGrid } from './d-grid';
import SpinnerLoader from "@/components/ui/loader";
import Footer from '@/components/footer/Footer';
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Script from "next/script";


export default function Login() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } 
      setLoading(false);
    });

    return () => unsubscribe();
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
    <Topnav/>
    <div className='px-4 pb-12'/>
    {user && (
        <div className="max-w-7xl text-center mx-auto text-xl md:text-5xl font-bold text-green-300 font-sans pt-20">
          <TextGenerateEffect
            words={`Welcome ${user.displayName || "Admin"}, To The Dashboard`}  
          />
        </div>
      )}
    <DGrid/>
    <div className='px-4 pb-20'/>
    <Footer/>
    </>
  )
}
