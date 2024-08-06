// components/account/my-account.tsx
import React, { useState, useEffect } from "react";
import { auth,db } from "@/app/auth/firebase";
import { Label } from "@/components/login/label";
import { Input } from "@/components/login/input";
import { cn } from "@/lib/utils";
import { doc, getDoc } from "firebase/firestore";


const MyAccount = ({ onClose }: { onClose: () => void }) => {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email || "");

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name);
          setPhoneNumber(userData.phoneNumber);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-4 rounded-md shadow-md w-96">
            <h3 className="text-lg font-bold mb-4 text-white">Reset Password</h3>
      {user ? (
        <div>
          <div className="mb-4">
            <Label>Id</Label>
            <Input className="cursor-pointer" type="text" value={user.uid || ""} readOnly />
          </div>
          <div className="mb-4">
            <Label>Name</Label>
            <Input className="cursor-pointer" type="text" value={user.displayName || ""} readOnly />
          </div>
          <div className="mb-4 ">
            <Label>Email</Label>
            <Input className="cursor-pointer" type="text" value={email} readOnly />
          </div>
          <div className="mb-4">
            <Label>Phone Number</Label>
            <Input className="cursor-pointer" type="text" value={phoneNumber} readOnly />
          </div>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
      <button
        className="mt-4 text-sm text-blue-500 hover:underline"
        onClick={onClose}
      >
        Close
      </button>
      </div>
    </div>
  );
};

export default MyAccount;
