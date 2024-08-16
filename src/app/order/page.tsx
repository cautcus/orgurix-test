"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/auth/firebase"; // Ensure correct import paths
import { doc, getDoc } from "firebase/firestore";
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SpinnerLoader from '@/components/ui/loader';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  quantity: number;
  deliveryDate: string;
  status: string;
}

interface Order {
  orderId: string;
  items: OrderItem[];
  orderDate: string;
  totalAmount: number;
}

const OrderPage = ({ onClose }: { onClose: () => void }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const ordersDoc = doc(db, "orders", user.uid);
          const ordersSnapshot = await getDoc(ordersDoc);

          if (ordersSnapshot.exists()) {
            setOrders(ordersSnapshot.data().orders || []);
          } else {
            setOrders([]);
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return  <SpinnerLoader />;
  }

  return (
    <>
        <GoogleAnalytics/>
      <Topnav />
      <div className="h-screen pt-20">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-3xl font-bold text-green-200 mb-8">Your Orders</h1>

          {orders.length === 0 ? (
            <p className="text-neutral-200">You have no orders.</p>
          ) : (
            orders.map((order) => (
              <div key={order.orderId} className="mb-8 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Order Placed: {order.orderDate}</p>
                  <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
                  <p className="text-sm text-gray-500">Total: ₹{order.totalAmount}</p>
                </div>

                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between mb-6">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                    <div className="ml-4 flex-1">
                      <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                      <p className="text-sm text-gray-700">₹{item.price} x {item.quantity}</p>
                      <p className="text-sm text-gray-500 mt-1">Delivery Date: {item.deliveryDate}</p>
                      <p className="text-sm text-gray-500 mt-1">Status: {item.status}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Track Package
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <button
        className="mt-4 text-sm text-blue-500 hover:underline"
        onClick={onClose}
      >
        Close
      </button>
      <Footer />
    </>
  );
};

export default OrderPage;
