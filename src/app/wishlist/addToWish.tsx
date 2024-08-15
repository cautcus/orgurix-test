import { db, auth } from "@/app/auth/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const addToWishlist = async (product: any) => {
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
  } catch (error) {
    console.error("Error adding product to wishlist: ", error);
  }
};
