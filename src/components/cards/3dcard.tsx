"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import { db, auth } from "@/app/auth/firebase";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import GoogleAnalytics from '@/components/GoogleAnalytics';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  goto: string;
  color: string;
  size: string;
  rating: number;
}

export function CardA() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList: Product[] = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, 'id'>), // Assuming all fields in Product are present except 'id'
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

  const handleAddToCart = async (product: Product) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setAlertMessage("No user is logged in.");
        setShowAlert(true);
        return;
      }

      const cartRef = doc(db, "carts", user.uid);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        await updateDoc(cartRef, {
          items: arrayUnion(product),
        });
      } else {
        await setDoc(cartRef, {
          items: [product],
        });
      }

      setAlertMessage("Product added to cart successfully.");
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      setAlertMessage("Error adding product to cart.");
      setShowAlert(true);
    }
  };

  return (
    <section>
      <GoogleAnalytics />
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
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
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-52">
          {products.map((product) => (
            <CardContainer key={product.id} className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem translateZ="50" className="w-full mt-4">
                  <Image
                    src={product.image}
                    height="1000"
                    width="1000"
                    className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={product.name}
                  />
                </CardItem>
                <div className="mt-4">
                  <CardItem
                    translateZ="100"
                    className="text-xl font-bold text-green-200"
                  >
                    {product.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    <span className="line-through">₹{product.originalPrice}</span> ₹{product.price}
                  </CardItem>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <CardItem
                    translateZ={20}
                    as="a"
                    href={product.goto}
                    className="px-4 py-2 rounded-xl bg-green-800 text-white text-xs font-bold"
                  >
                    Buy Now
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black text-green-200 text-xs font-bold"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
