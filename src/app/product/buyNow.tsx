import React, { useState, useEffect } from 'react';
import { db, auth } from '@/app/auth/firebase'; // Ensure your Firebase imports are correct
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface BuyNowFormProps {
  product: any;
  onClose: () => void;
}

const BuyNowForm: React.FC<BuyNowFormProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    quantity: 1,
    giftWrap: false,  // New field for gift wrap option
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allAddresses, setAllAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null); // State for current user
  const buyText = `Hey I want to buy: ${product?.name}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'addresses'));
        const addressList = querySnapshot.docs.map((doc) => doc.data());
        setAllAddresses(addressList);
        setSuggestions([]);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
      setLoading(false);
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,  // Handle checkbox input
    });

    if (name === 'address') {
      const filteredSuggestions = allAddresses
        .map(
          (address: any) =>
            `${address.street}, ${address.city}, ${address.state}, ${address.zip}`
        )
        .filter((address) =>
          address.toLowerCase().includes(value.toLowerCase())
        );

      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData({ ...formData, address: suggestion });
    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert('User is not authenticated.');
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        ...formData,
        userId: currentUser.uid,
        productId: product.id,
        productName: product.name,
        productColor: product.color,
        productDescription: product.description,
        productGoto: product.goto,
        productImage: product.image,
        productOriginalPrice: product.originalPrice,
        productPrice: product.price,
        productRating: product.rating,
        productSize: product.size,
        orderDate: new Date(),
        status: 'Pending',
      });

      // Redirect to WhatsApp after successful submission
      window.location.href = `https://wa.me/918981918040/?text=${encodeURIComponent(
        buyText
      )}%20,from ${encodeURIComponent(shareUrl)}`;
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Buy Now</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded text-black"
            required
          />
          <label className="block mb-2">Address</label>
          <div className="relative">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded text-black"
              required
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border rounded-md shadow-md mt-1 w-full max-h-48 overflow-y-auto z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded text-black"
            required
          />
          <label className="block mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded text-black"
            required
          />
          <label className="block mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            className="w-full p-2 mb-4 border rounded text-black"
            required
          />
          <label className="block mb-2 flex items-center">
            <input
              type="checkbox"
              name="giftWrap"
              checked={formData.giftWrap}
              onChange={handleChange}
              className="mr-2"
            />
            Add Gift Wrap (₹50)
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyNowForm;
