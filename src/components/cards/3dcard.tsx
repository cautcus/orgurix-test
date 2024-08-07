"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import { addToCart } from "@/app/cart/addToCart";  // Ensure correct import path

export function CardA() {
  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const products = [
    {
      id: "product-id-1",
      name: "Product Name 1",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 590.00,
      originalPrice: 990.00,
      goto: "https://algochurn.com",
      quantity:1
    },
    {
      id: "product-id-2",
      name: "Product Name 2",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 490.00,
      originalPrice: 890.00,
      goto: "https://algochurn.com",
       quantity:1
    },
    {
      id: "product-id-3",
      name: "Product Name 3",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 690.00,
      originalPrice: 1090.00,
      goto: "https://algochurn.com",
       quantity:1
    },
    {
      id: "product-id-4",
      name: "Product Name 4",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 590.00,
      originalPrice: 990.00,
      goto: "https://algochurn.com",
       quantity:1
    },
    {
      id: "product-id-5",
      name: "Product Name 5",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 490.00,
      originalPrice: 890.00,
      goto: "https://algochurn.com",
      quantity:1
    },
    {
      id: "product-id-6",
      name: "Product Name 6",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 690.00,
      originalPrice: 1090.00,
      goto: "https://algochurn.com",
       quantity:1
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {products.map((product) => (
            <CardContainer key={product.id} className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem translateZ="50" className="w-full mt-4">
                  <Image
                    src={product.image}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={product.name}
                  />
                </CardItem>
                <div className="mt-4">
                  <CardItem
                    translateZ="100"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {product.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    ₹ <span className="line-through">{product.originalPrice.toFixed(2)}</span> {product.price.toFixed(2)}
                  </CardItem>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <CardItem
                    translateZ={20}
                    as="button"
                    
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    <a href={product.goto}>Buy Now</a>
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold"
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
