"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/auth/firebase"; // Ensure correct import paths
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import Image from "next/image";
import { Topnav } from "@/components/navbar/topnav";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

interface CartItem {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  quantity: number;
  goto: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const cost = totalPrice + 50;

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
            alert("Item removed successfully.");
          }
        }
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const cartDoc = doc(db, "carts", user.uid);
        const cartSnapshot = await getDoc(cartDoc);

        if (cartSnapshot.exists()) {
          const items = cartSnapshot.data().items || [];
          const itemToUpdate = items.find((item: CartItem) => item.id === itemId);

          if (itemToUpdate) {
            const updatedItem = { ...itemToUpdate, quantity: newQuantity };

            await updateDoc(cartDoc, {
              items: arrayRemove(itemToUpdate),
            });

            await updateDoc(cartDoc, {
              items: arrayUnion(updatedItem),
            });

            const updatedItems = cartItems.map((item) =>
              item.id === itemId ? updatedItem : item
            );
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
          }
        }
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <Topnav />
      <div className="h-screen pt-20">
      <div className="mx-auto max-w-5xl pt-20 text-left">
      <TextGenerateEffect words="Shopping Cart"/></div>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item) => (
              <div key={item.id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={item.image} alt={item.name} className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                    <p className="mt-1 text-xs text-gray-700">
                      ₹ <span className="line-through">{item.originalPrice}</span> {item.price}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <button
                        onClick={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))}
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        -
                      </button>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Math.max(parseInt(e.target.value), 1))}
                        min="1"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">₹{item.price * item.quantity}</p>
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
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">₹{totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">₹50</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">₹{cost}</p>
              </div>
            </div>
            <button className="px-8 py-2 mt-6 w-full bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
