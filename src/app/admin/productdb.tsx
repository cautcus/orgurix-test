"use client";

import React, { useState } from "react";
import { db } from "@/app/auth/firebase"; // Adjust the import path as necessary
import { doc, setDoc } from "firebase/firestore";

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label className="block text-white">Product ID</label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleInputChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <div>
          <label className="block text-white">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <div>
          <label className="block text-white">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <div>
          <label className="block text-white">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleInputChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <div>
          <label className="block text-white">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full p-2 border text-black"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-white">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <div>
          <label className="block text-white">Color</label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleInputChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <div>
          <label className="block text-white">Size</label>
          <input
            type="text"
            name="size"
            value={product.size}
            onChange={handleInputChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <div>
          <label className="block text-white">Redirect</label>
          <input
            type="link"
            name="link"
            value={product.goto}
            onChange={handleInputChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <div>
          <label className="block text-white">Rating</label>
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleInputChange}
            min="0"
            max="5"
            step="0.1"
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
