"use client";
import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/grid/bento-grid";
import {
  IconUsers,
  IconKey,
  IconList,
  IconTruckDelivery,
  IconHelp,
  IconLogout,
  IconMapPin,
  IconCodePlus,
} from "@tabler/icons-react";
import { Label } from "@/components/login/label";
import { Input } from "@/components/login/input";
import { cn } from "@/lib/utils";
import { signOut } from "firebase/auth";
import { auth, sendPasswordResetEmail } from "@/app/auth/firebase";
import MyAccount from "../dashboard/my-account";
import SupportHelp from "../dashboard/supportHelp";
import Wishlist from "../wishlist/wishlist";
import SavedAddress from "../dashboard/addresses";
import Orders from "../dashboard/orders";
import AddProduct from "./productdb";

export function AGrid() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [showMyAccount, setShowMyAccount] = useState<boolean>(false);
  const [showSupportHelp, setShowSupportHelp] = useState<boolean>(false);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);
  const [showAddress, setShowAddress] = useState<boolean>(false);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [showProduct, setShowProduct] = useState<boolean>(false);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.href = "/"; // Redirect to home page
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <div className="pt-8" />
      {showAlert && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{alertMessage}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setShowAlert(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.36 5.652a.5.5 0 1 0-.707.707L9.293 10l-3.64 3.641a.5.5 0 0 0 .707.707L10 10.707l3.641 3.641a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.641a.5.5 0 0 0 0-.707z" />
            </svg>
          </span>
        </div>
      )}
      <BentoGrid className="mt-12 max-w-4xl mx-auto max-h-2xl cursor-pointer ">
        <a className="md:col-span-2" onClick={() => setShowMyAccount(true)}>
          <BentoGridItem
            className="text-teal-500"
            title="My Account"
            description="View and update your personal information and manage your account settings."
            icon={<IconUsers className="h-4 w-4 text-teal-500" />}
          />
        </a>
        <a onClick={() => setShowResetModal(true)}>
          <BentoGridItem
            className="md:col-span-2 text-cyan-500 items-left cursor-pointer"
            title="Password Reset"
            description="Reset it here to regain access to your account."
            icon={<IconKey className="h-4 w-4 text-cyan-500" />}
          />
        </a>
        <a onClick={() => setShowWishlist(true)}>
          <BentoGridItem
            className="text-purple-500"
            title="Wishlist"
            description="Save your favorite items and track of products."
            icon={<IconList className="h-4 w-4 text-purple-500" />}
          />
        </a>
        <a
          className="md:col-span-1 text-pink-500"
          onClick={() => setShowAddress(true)}
        >
          <BentoGridItem
            title="Saved Addresses"
            description="Manage your saved addresses."
            icon={<IconMapPin className="h-4 w-4 text-pink-500" />}
          />
        </a>
        <a
          className="md:col-span-1 text-orange-500"
          href="/admin/productdb"
        >
          <BentoGridItem
            title="Add Product"
            description="Add a new product to the store."
            icon={<IconCodePlus className="h-4 w-4 text-orange-500" />}
          />
        </a>
        <a
          className="md:col-span-3 text-yellow-500"
          onClick={() => setShowOrder(true)}
        >
          <BentoGridItem
            title="Your Order"
            description="Review your order history and track the status of your current orders."
            icon={<IconTruckDelivery className="h-4 w-4 text-yellow-500" />}
          />
        </a>
        <a className="md:col-span-2" onClick={() => setShowSupportHelp(true)}>
          <BentoGridItem
            className="text-white"
            title="Support/Help"
            description="Need assistance? Contact our support team for help with your orders and account."
            icon={<IconHelp className="h-4 w-4 text-white" />}
          />
        </a>
        <a onClick={handleLogout}>
          <BentoGridItem
            className="text-red-500"
            title="Logout"
            description="Sign out of your account securely."
            icon={<IconLogout className="h-4 w-4 text-red-500" />}
          />
        </a>
      </BentoGrid>

      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-4 rounded-md shadow-md w-96">
            <h3 className="text-lg font-bold mb-4 text-white">
              Reset Password
            </h3>
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
              className="mt-4 text-sm text-green-500 hover:text-green-200"
              onClick={() => setShowResetModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSupportHelp && (
        <SupportHelp onClose={() => setShowSupportHelp(false)} />
      )}
      {showMyAccount && <MyAccount onClose={() => setShowMyAccount(false)} />}
      {showWishlist && <Wishlist onClose={() => setShowWishlist(false)} />}
      {showAddress && <SavedAddress onClose={() => setShowAddress(false)} />}
      {showOrder && <Orders onClose={() => setShowOrder(false)} />}
      {showProduct && <AddProduct onClose={() => setShowProduct(false)} />}
    </>
  );
}

const LabelInputContainer = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("mb-4")}>{children}</div>;
