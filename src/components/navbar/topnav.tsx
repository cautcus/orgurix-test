"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "@/lib/utils";
import { onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "@/app/auth/firebase";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { IconUser, IconLogin, IconShoppingBag  } from '@tabler/icons-react';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  goto: string;
  description: string;
}


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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const ADMIN_USER_IDS = ["xplWxEbxi3bfa9ozsyGrEmiO4uF3"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList: Product[] = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, 'id'>),
        }));

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setAlertMessage("Error fetching products.");
        setShowAlert(true);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(user);
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.href = "/";
    } catch (error: any) {
      console.error("Error signing out: ", error);
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
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
              <a href="/" className="text-white font-semibold"><Image width={60} height={60} src="/img/icon.png" alt={""}/></a>
            </div>
            <div className="flex items-center justify-center w-1/3 space-x-2">
              <MenuItem setActive={setActive} active={active} item={"Glass Bottle"} id={"product"}>
                <div className="text-sm grid grid-cols-1 gap-10 p-4">
                {products.map((product) => (
                <ProductItem
                key={product.id}
                title={product.name}
                href={product.goto}
                src={product.image}
                description= {truncateText(product.description,10)}
              /> ))}
                </div>
              </MenuItem>
            </div>
            <div className="flex items-center justify-end w-1/3 space-x-4">
            {user ? (
            <>
            <div className="space-x-4">
            <MenuItem setActive={setActive} active={active} item={<IconUser />} id={"user"}>
            <div className="text-sm grid grid-cols-1 gap-6 p-4">
            {isAdmin ? (<>
            <HoveredLink href="/admin">Admin</HoveredLink>
          </>) : 
          <HoveredLink className="text-neutral-200 hover:text-neutral-400" href="/dashboard">{user.displayName || "Dashboard"}</HoveredLink>}
          <a className="text-yellow-400 hover:text-yellow-600" href="/company/careers">Become A Seller</a>
            <HoveredLink href="#" className="text-neutral-200 hover:text-neutral-400 pointer">
            <button onClick={handleLogout}>Logout</button></HoveredLink>
            </div>
            </MenuItem>
            </div>
            <HoveredLink href="/cart"><IconShoppingBag/></HoveredLink>
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