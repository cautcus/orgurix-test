// components/support/support-help.tsx
import React, { useState } from "react";
import { Label } from "@/components/login/label";
import { Input } from "@/components/login/input";
import { cn } from "@/lib/utils";

const SupportHelp = ({ onClose }: { onClose: () => void }) => {
  const [issue, setIssue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send issue to support team)
    console.log("Issue submitted:", issue);
    setIssue("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-4 rounded-md shadow-md w-96">
            <h3 className="text-lg font-bold mb-4 text-white">Reset Password</h3>
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
>
  Close
</button>
        </form>
      </div>
    </div>
  );
};

export default SupportHelp;
