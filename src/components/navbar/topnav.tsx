"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "@/lib/utils";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/app/auth/firebase";
import { signOut } from "firebase/auth";
import { IconGardenCart , IconHome, IconUser, IconLogin  } from '@tabler/icons-react';

export function Topnav() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);


  const ADMIN_USER_ID = "IEtzL6BTfiMYtH5dOEr3son1Zrr2";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(user);
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.href = "/"; // Redirect to home page
    } catch (error: any) {
      console.error("Error signing out: ", error);
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
          className
        )}
      >
        <div className="flex items-center justify-between px-6 py-3 rounded-lg">
          <Menu setActive={setActive} >
            <div className="flex items-center justify-start w-1/3">
              <a href="/" className="text-white font-semibold"><IconHome stroke={2} /></a>
            </div>
            <div className="flex items-center justify-center w-1/3 space-x-2">
            <HoveredLink href="/">Men</HoveredLink>
            <HoveredLink href="/">Women</HoveredLink>
              <MenuItem setActive={setActive} active={active} item="Products">
                <div className="text-sm grid grid-cols-1 gap-10 p-4">
                <ProductItem
                title="Algochurn"
                href="https://algochurn.com"
                src="https://assets.aceternity.com/demos/algochurn.webp"
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Tailwind Master Kit"
                href="https://tailwindmasterkit.com"
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Moonbeam"
                href="https://gomoonbeam.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Rogue"
                href="https://userogue.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
                </div>
              </MenuItem>
            </div>
            <div className="flex items-center justify-end w-1/3 space-x-4">
              {user ? (
                <>
             <div className="relative group">
              <IconUser className="text-white text-2xl cursor-pointer" />
              <div className=" absolute right-0 top-full mt-2 bg-black p-6 opacity-0 group-hover:opacity-100 bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl">
                <a
                  href="/dashboard"
                  className="block text-white hover:text-gray-400 mt-4 mb-6 mx-2"
                >
                  {user.displayName || "Dashboard"}
                </a>
                <a
                  href="/company/careers"
                  className="block text-yellow-400 hover:text-yellow-600 mt-4 mb-6 mx-2"
                >
                  Become A Seller
                </a>
                {isAdmin && (
                  <a href="/admin" className="block text-white hover:text-gray-400 my-6 mx-2">
                    Admin
                  </a>
                )}
                <a
                  href="#"
                  className="block text-white hover:text-gray-400 my-6  mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </div>
            </div>
                  <HoveredLink href="/cart"><IconGardenCart /></HoveredLink>
                </>
              ) : (
                <HoveredLink href="/auth"><IconLogin/></HoveredLink>
              )}
            </div>
          </Menu>
        </div>
      </div>
      {showAlert && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{alertMessage}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setShowAlert(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.36 5.652a.5.5 0 1 0-.707.707L9.293 10l-3.64 3.641a.5.5 0 0 0 .707.707L10 10.707l3.641 3.641a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.641a.5.5 0 0 0 0-.707z" />
            </svg>
          </span>
        </div>
      )}
    </>
);
}