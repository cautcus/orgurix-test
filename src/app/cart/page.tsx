"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/auth/firebase";  // Ensure correct import paths
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import Image from "next/image";
import { Topnav } from "@/components/navbar/topnav";

// Define the type for cart items
interface CartItem {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  goto: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const cartDoc = doc(db, "carts", user.uid);
          const cartSnapshot = await getDoc(cartDoc);

          if (cartSnapshot.exists()) {
            setCartItems(cartSnapshot.data().items || []);
          } else {
            setCartItems([]);
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

        // Fetch the cart document to get the full item object
        const cartSnapshot = await getDoc(cartDoc);
        if (cartSnapshot.exists()) {
          const items = cartSnapshot.data().items || [];
          const itemToRemove = items.find((item: CartItem) => item.id === itemId);

          if (itemToRemove) {
            // Remove the specific item object
            await updateDoc(cartDoc, {
              items: arrayRemove(itemToRemove),
            });

            // Update the local state
            setCartItems(cartItems.filter((item) => item.id !== itemId));
            alert("Item removed successfully.");
          }
        }
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Topnav />
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-16">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                className="object-cover rounded-lg"
              />
              <h2 className="text-xl font-bold mt-4">{item.name}</h2>
              <p className="text-neutral-500 text-sm mt-2">
                ₹ <span className="line-through">{item.originalPrice}</span> {item.price}
              </p>
              <a href={item.goto}>Buy Now</a>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CartPage;
