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
