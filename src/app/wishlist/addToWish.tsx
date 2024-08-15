import { db, auth } from "@/app/auth/firebase";
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const addToWishlist = async (product: any) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    const wishlistRef = doc(db, "wishlists", user.uid);
    const wishlistDoc = await getDoc(wishlistRef);

    if (wishlistDoc.exists()) {
      await updateDoc(wishlistRef, {
        items: arrayUnion(product),
      });
    } else {
      await setDoc(wishlistRef, {
        items: [product],
      });
    }
    console.log("Product added to wishlist successfully.");
    setAlertMessage("Item moved to cart successfully.");
    setShowAlert(true);
  } catch (error) {
    console.error("Error adding product to wishlist: ", error);
  }
};
