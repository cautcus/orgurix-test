"use client";
import React, {useState} from "react";
import { BentoGrid, BentoGridItem } from "@/components/grid/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { Label } from "@/components/login/label";
import { Input } from "@/components/login/input";
import { cn } from "@/lib/utils";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "@/app/auth/firebase";

export function DGrid() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>("");

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setAlertMessage("Password reset email sent successfully.");
      setShowAlert(true);
      setShowResetModal(false);
    } catch (error: any) {
      console.error("Error sending password reset email: ", error);
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  };


  return (
    <>
    <BentoGrid className="mt-12 max-w-4xl mx-auto max-h-2xl">
        <BentoGridItem
           className="md:col-span-2"
           title="Your Order"
           description="Explore the birth of groundbreaking ideas and inventions."
           icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
         />
        <a onClick={() => setShowResetModal(true)}>
        <BentoGridItem
          className="md:col-span-2 items-left cursor-pointer	"
          title="Password Reset"
          description="Explore the birth of groundbreaking ideas and inventions."
          icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
        /></a>
    </BentoGrid>


    {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-4 rounded-md shadow-md w-96">
            <h3 className="text-lg font-bold mb-4 text-white ">Reset Password</h3>
            <form onSubmit={handlePasswordReset}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="resetEmail">Email Address</Label>
                <Input
                  id="resetEmail"
                  placeholder="Enter your email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Send Reset Email
        </button>
            </form>
            <button
              className="mt-4 text-sm text-blue-500 hover:underline"
              onClick={() => setShowResetModal(false)}
            >
              Close
            </button>
            
          </div>
        </div>
      )}
    </>
  );
}


const LabelInputContainer = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("mb-4")}>
    {children}
  </div>
);