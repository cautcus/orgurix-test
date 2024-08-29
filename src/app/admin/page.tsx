"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/app/auth/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import SpinnerLoader from "@/components/ui/loader";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { AGrid } from "./a-grid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Script from "next/script";

// List of admin user IDs
const ADMIN_USER_IDS = ["xplWxEbxi3bfa9ozsyGrEmiO4uF3"];

const AdminPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(ADMIN_USER_IDS.includes(currentUser.uid));
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAdmin) {
        window.location.href = "/"; // Redirect to home if not admin
      }
    }
  }, [loading, isAdmin]);

  if (loading) {
    return <SpinnerLoader />;
  }

  if (!isAdmin) {
    return (
      <div className="text-white">
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="text-white">
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
      <div className="pt-20" />
      {user && (
        <div className="max-w-7xl text-center mx-auto text-xl md:text-5xl font-bold text-green-300 font-sans pt-20">
          <TextGenerateEffect
            words={`Welcome ${user.displayName || "Admin"}, To The Admin Page`}
          />
        </div>
      )}
      <AGrid />
      <div className="pb-20" />
      <Footer />
    </div>
  );
};

export default AdminPage;
