"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/auth/firebase"; // Ensure correct import paths
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import Image from "next/image";
import { Topnav } from "@/components/navbar/topnav";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Footer from "@/components/footer/Footer";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SpinnerLoader from '@/components/ui/loader';
import Script from "next/script";

interface CartItem {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  color: string;
  size: string;
  rating: number;
  goto: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const cartDoc = doc(db, "carts", user.uid);
          const cartSnapshot = await getDoc(cartDoc);

          if (cartSnapshot.exists()) {
            setCartItems(cartSnapshot.data().items || []);
            calculateTotal(cartSnapshot.data().items || []);
          } else {
            setCartItems([]);
            setTotalPrice(0);
          }
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setAlertMessage("Error fetching cart items.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleDeleteItem = async (itemId: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const cartDoc = doc(db, "carts", user.uid);

        const cartSnapshot = await getDoc(cartDoc);
        if (cartSnapshot.exists()) {
          const items = cartSnapshot.data().items || [];
          const itemToRemove = items.find((item: CartItem) => item.id === itemId);

          if (itemToRemove) {
            await updateDoc(cartDoc, {
              items: arrayRemove(itemToRemove),
            });

            const updatedItems = cartItems.filter((item) => item.id !== itemId);
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
            setAlertMessage("Item removed successfully");
            setShowAlert(true);
          }
        }
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      setAlertMessage("Error deleting cart item.");
      setShowAlert(true);
    }
  };

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((acc, item) => acc + item.price * 1, 0);
    setTotalPrice(total);
  };

  const handleCheckout = () => {
    const phoneNumber = "918981918040";
    const message = encodeURIComponent(`
      *Order Details:*
      ${cartItems.map(item => `
      - Name: ${item.name}
      - Price: ₹${item.price}
      - Quantity: 1
      - Color: ${item.color}
      - Size: ${item.size}
      - Rating: ${item.rating}
      `).join('\n')}
      *Total Price:* ₹${totalPrice}
    `);
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(url, '_blank');
  };

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
      <GoogleAnalytics />
      <Topnav />
      <div className="h-screen pt-20">
        <div className="mx-auto max-w-5xl text-left">
          {showAlert && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{alertMessage}</span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setShowAlert(false)}
              >
                <svg
                  className="fill-current h-6 w-6 text-green-500"
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
          <TextGenerateEffect words="Shopping Cart" />
        </div>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item) => (
              <div key={item.id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={item.image} alt={item.name} className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                    <p className="mt-1 text-xs text-gray-700">
                      <span className="line-through">₹{item.originalPrice}</span> ₹{item.price}
                    </p>
                    <p className="mt-1 text-xs text-gray-700">
                      {item.color} / {item.size}
                    </p>
                    <p className="mt-1 text-xs text-gray-700">
                      Rating: {item.rating}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">₹{item.price}</p>
                      <button onClick={() => handleDeleteItem(item.id)} >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">₹{totalPrice}</p>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="px-8 py-2 mt-6 w-full bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
