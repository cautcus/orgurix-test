import { db, auth } from "@/app/auth/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const addToCart = async (product: any) => { 
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in.");
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
    alert("Product added to cart successfully.");
  } catch (error) {
    console.error("Error adding product to cart: ", error);
  }
};
