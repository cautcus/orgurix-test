"use client";
import React, { useEffect, useState } from 'react';
import { auth } from './auth/firebase'; // Import Firebase auth instance
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">MyApp</div>
        <div className="space-x-4">
          {user ? (
            <>
              <a
                href="/dashboard"
                className="text-white bg-blue-500 px-4 py-2 rounded"
              >
                {user.displayName || "Dashboard"}
              </a>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/auth"
              className="text-white bg-blue-500 px-4 py-2 rounded"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
