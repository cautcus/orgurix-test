"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/app/auth/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Label } from "@/components/login/label";
import { Input } from "@/components/login/input";
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import SpinnerLoader from "@/components/ui/loader";
import { cn } from "@/lib/utils";

const AddProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: 0,
    originalPrice: 0,
    description: "",
    image: "",
    rating: 0,
    size: "",
    color: "",
    goto: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SpinnerLoader />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (product.id === "") {
        alert("Product ID is required");
        return;
      }

      await setDoc(doc(db, "products", product.id), product);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product.");
    }
  };

  return (
    <>
    <Topnav />
    <div className="flex justify-center items-center min-h-screen bg-black p-8 pt-24">
      <div className="bg-neutral-950 p-6 rounded-2xl shadow-md w-full max-w-4xl flex flex-col space-y-4">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-4">
          Product Upload
        </h2>
        <form className="space-y-4" onSubmit={handleAddProduct}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="id">Product ID</Label>
              <Input
                name="id"
                value={product.id}
                onChange={handleInputChange}
                placeholder="Product ID"
                type="text"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                type="text"
                required
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="price">Discounted Price</Label>
            <Input
              placeholder="Rs.XXXX"
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="originalPrice">Original Price</Label>
            <Input
              placeholder="Rs.XXXX"
              type="number"
              name="originalPrice"
              value={product.originalPrice}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input
              placeholder="lorem ipsum dolor sit amet consectetur..."
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="image">Image URL</Label>
            <Input
              placeholder="https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
              type="text"
              name="image"
              value={product.image}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="color">Color</Label>
            <Input
              placeholder="Red"
              type="text"
              name="color"
              value={product.color}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="size">Size</Label>
            <Input
              placeholder="Large"
              type="text"
              name="size"
              value={product.size}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="goto">Redirect</Label>
            <Input
              placeholder="/product/1"
              type="text"
              name="goto"
              value={product.goto}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="rating">Rating</Label>
            <Input
              placeholder="5.0"
              type="number"
              name="rating"
              value={product.rating}
              onChange={handleInputChange}
              min="0"
              max="5"
              step="0.1"
              required
            />
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 text-white rounded-md h-10 font-medium shadow-md w-full"
            type="submit"
          >
            Add Product
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
    <Footer />  
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default AddProduct;
