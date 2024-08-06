// components/account/wishlist.tsx
import React, { useEffect, useState } from "react";
import { db, auth } from "@/app/auth/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { Label } from "@/components/login/label";
import { Input } from "@/components/login/input";

const Wishlist = ({ onClose }: { onClose: () => void }) => {
  const [user, setUser] = useState<any>(null);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [newWishlistItem, setNewWishlistItem] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const wishlistDoc = await getDoc(doc(db, "wishlists", user.uid));
        if (wishlistDoc.exists()) {
          setWishlistItems(wishlistDoc.data().items || []);
        } else {
          setWishlistItems([]);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddWishlistItem = async () => {
    if (!newWishlistItem.trim()) return;
    try {
      const wishlistRef = doc(db, "wishlists", user.uid);
      const wishlistDoc = await getDoc(wishlistRef);

      if (wishlistDoc.exists()) {
        await updateDoc(wishlistRef, {
          items: arrayUnion(newWishlistItem.trim()),
        });
      } else {
        await setDoc(wishlistRef, {
          items: [newWishlistItem.trim()],
        });
      }
      setWishlistItems((prevItems) => [...prevItems, newWishlistItem.trim()]);
      setNewWishlistItem("");
    } catch (error) {
      console.error("Error adding wishlist item: ", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      {user ? (
        <div>
          <div className="mb-4">
            <Label>New Wishlist Item</Label>
            <Input
              type="text"
              value={newWishlistItem}
              onChange={(e) => setNewWishlistItem(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleAddWishlistItem}
            >
              Add to Wishlist
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Your Wishlist</h3>
            <ul className="list-disc pl-5">
              {wishlistItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <button
  className="mt-4 text-sm text-blue-500 hover:underline"
  onClick={onClose}
>
  Close
</button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Wishlist;
