"use client";

import React, { useState } from "react";
import { db } from "@/app/auth/firebase"; // Adjust the import path as necessary
import { doc, setDoc } from "firebase/firestore";
import { Label } from "@/components/login/label";
import { Input } from "@/components/login/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Product Upload
      </h2>
      <form className="my-8" onSubmit={handleAddProduct}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Product ID</Label>
            <Input name="id" value={product.id} onChange={handleInputChange} placeholder="Product-id" type="text" required/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Name</Label>
            <Input name="name" value={product.name} onChange={handleInputChange} placeholder="Product Name" type="text" required/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="DPrice">Discounted Price</Label>
          <Input placeholder="Rs.XXXX"
          type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange} required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="OPrice">Original Price</Label>
          <Input placeholder="Rs.XXXX" type="number"
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleInputChange} required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="description">Description</Label>
          <Input
          placeholder="lorem ipsum dolor sit amet consectetur..."
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="image">Image URL</Label>
          <Input
          placeholder="https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
          type="text"
          name="image"
          value={product.image}
          onChange={handleInputChange}
          required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="color">Color</Label>
          <Input
          placeholder="Red"
          type="text"
          name="color"
          value={product.color}
          onChange={handleInputChange}
          required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="size">Size</Label>
          <Input
          placeholder="Large"
          type="text"
          name="size"
          value={product.size}
          onChange={handleInputChange}
          required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="gotolink">Redirect</Label>
          <Input
          placeholder="/product/1"
          type="text"
          name="goto"
          value={product.goto}
          onChange={handleInputChange}
          required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="gotolink">Rating</Label>
          <Input
          placeholder="5.0"
          type="number"
          name="rating"
          value={product.rating}
          onChange={handleInputChange}
          min="0"
                  max="5"
                  step="0.1"
          required/>
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Add Product
          <BottomGradient />
        </button>
      </form>
    </div>
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
