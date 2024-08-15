"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/app/auth/firebase"; // Adjust import path as necessary
import { onAuthStateChanged, User } from "firebase/auth";
import AddProduct from "./productdb";
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import SpinnerLoader from '@/components/ui/loader';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const ADMIN_USER_ID = "IEtzL6BTfiMYtH5dOEr3son1Zrr2"; 

const AdminPage = () => {
    const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(currentUser.uid === ADMIN_USER_ID);
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
    return  <SpinnerLoader />;
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
          <GoogleAnalytics/>
      <Topnav />
      <div className="pt-24"/>
      <AddProduct/>
      <Footer/>
    </div>
  );
};

export default AdminPage;
