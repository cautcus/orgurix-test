import React, { useState, useEffect } from "react";
import { db, auth } from "@/app/auth/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import SpinnerLoader from '@/components/ui/loader';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  quantity: number;
  deliveryDate: 'None' | string;
  status: string;
}

interface Order {
  orderId: string;
  items: OrderItem[];
  orderDate: string;
  totalAmount: number;
}

const Order = ({ onClose }: { onClose: () => void }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log('No user is logged in');
          setOrders([]);
          return;
        }

        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );
        const ordersSnapshot = await getDocs(ordersQuery);

        if (!ordersSnapshot.empty) {
          const fetchedOrders: Order[] = ordersSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              orderId: doc.id,
              items: [
                {
                  id: data.productId,
                  name: data.productName,
                  image: data.productImage,
                  originalPrice: parseFloat(data.productOriginalPrice),
                  price: parseFloat(data.productPrice),
                  quantity: data.quantity,
                  deliveryDate: data.deliveryDate,
                  status: data.status,
                },
              ],
              orderDate: data.orderDate.toDate().toLocaleString(), // Ensure date is properly formatted
              totalAmount: data.totalAmount,
            };
          });
          setOrders(fetchedOrders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20">
      <div className="bg-neutral-950 p-4 rounded-md shadow-md w-6/12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-200">Your Orders</h3>
          <button
            className="text-gray-600 text-3xl hover:text-gray-800"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {loading ? (
          <SpinnerLoader />
        ) : orders.length === 0 ? (
          <p className="text-gray-500">You have no orders.</p>
        ) : (
          orders.map((order) => (
            <div key={order.orderId} className="mb-6 rounded-3xl p-4 bg-black shadow-md">
              <div className="mb-4 text-sm text-gray-200">
                <p>Order Date: {order.orderDate}</p>
                <p>Order ID: {order.orderId}</p>
              </div>
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start mb-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md object-cover mb-4 sm:mb-0 sm:mr-4" />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                    <p className="text-sm text-gray-200">Price: ₹{item.price} x {item.quantity}</p>
                    <p className="text-sm text-gray-200">Delivery Date: {item.deliveryDate}</p>
                    <p className="text-sm text-gray-200">Status: {item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
         <button
          className="mt-4 text-sm text-green-500 hover:text-green-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Order;
