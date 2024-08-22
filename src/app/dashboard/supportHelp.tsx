import React, { useState, useEffect } from "react";
import { Label } from "@/components/login/label";
import { Input } from "@/components/login/input";
import { db, auth } from "@/app/auth/firebase"; // Adjust path as necessary
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

const SupportHelp = ({ onClose }: { onClose: () => void }) => {
  const [issue, setIssue] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      console.error("No user logged in.");
      return;
    }

    try {
      // Add the issue to Firestore with user details
      await addDoc(collection(db, "supportIssues"), {
        userId: user.uid,
        name: user.displayName || "Anonymous", // Use display name or "Anonymous"
        email: user.email || "No email provided",
        issue: issue,
        timestamp: new Date(),
      });

      console.log("Issue submitted:", issue);
      setIssue(""); // Clear the input field
      onClose();    // Close the support form
    } catch (error) {
      console.error("Error submitting issue:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black p-4 rounded-md shadow-md w-96">
        <h3 className="text-lg font-bold mb-4 text-white">Report an Issue</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="issue">Describe your issue</Label>
            <Input
              id="issue"
              placeholder="Enter your issue"
              type="text"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit
          </button>
          <button
            className="mt-4 text-sm text-blue-500 hover:underline"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportHelp;
