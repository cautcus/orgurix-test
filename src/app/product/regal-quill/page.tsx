"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, setDoc, arrayUnion, collection, addDoc, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/app/auth/firebase";
import { IconShoppingCart, IconShare, IconCopy, IconBrandFacebook , IconBrandTwitter, IconBrandWhatsapp, IconMail, IconStar,IconHeart, IconMessage  } from "@tabler/icons-react";
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import BuyNowForm from "../buyNow" ;
import SpinnerLoader from '@/components/ui/loader';
import Script from "next/script";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  description: string;
  size: string;
  color: string;
  rating: number;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  text: string;
  rating: number;
}

const ProductOverviewPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(1);
  const [shareUrl, setShareUrl] = useState('');
  const [showBuy, setShowBuy] = useState<boolean>(false);
  const productId = "product-id-5";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const images = [
    "/img/GOG/regalQuill/DSCN3261.jpg",
    "/img/GOG/regalQuill/DSCN3272.jpg",
    "/img/GOG/regalQuill/DSCN3332.jpg",
    "/img/GOG/regalQuill/DSCN3329.jpg",
    "/img/GOG/regalQuill/DSCN3330.jpg",
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDoc = doc(db, "products", productId);
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
          setProduct(productSnapshot.data() as Product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("productId", "==", productId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const reviewsData: Review[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Review, "id">),
          }));
          setReviews(reviewsData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleAddToWish = async (product: any) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setAlertMessage("No user is logged in.");
        setShowAlert(true);
        return;
      }

      const cartRef = doc(db, "wishlists", user.uid);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        await updateDoc(cartRef, {
          items: arrayUnion(product),
        });
      } else {
        await setDoc(cartRef, {
          items: [product],
        });
      }

      setAlertMessage("Product added to wishlist successfully.");
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding product to wishlist: ", error);
      setAlertMessage("Error adding product to wishlist.");
      setShowAlert(true);
    }
  };

  const handleAddToCart = async (product: any) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setAlertMessage("No user is logged in.");
        setShowAlert(true);
        return;
      }

      const cartRef = doc(db, "carts", user.uid);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        await updateDoc(cartRef, {
          items: arrayUnion(product),
        });
      } else {
        await setDoc(cartRef, {
          items: [product],
        });
      }

      setAlertMessage("Product added to cart successfully.");
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      setAlertMessage("Error adding product to cart.");
      setShowAlert(true);
    }
  };


  const handleSubmitReview = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setAlertMessage("No user is logged in.");
        setShowAlert(true);
        return;
      }

      await addDoc(collection(db, "reviews"), {
        productId: productId,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        text: reviewText,
        rating: reviewRating,
      });

      setReviewText("");
      setReviewRating(1);
      setShowReviewForm(false);
      setAlertMessage("Review submitted successfully.");
      setShowAlert(true);
    } catch (error) {
      console.error("Error submitting review:", error);
      setAlertMessage("Error submitting review.");
      setShowAlert(true);
    }
  };

  const shareText = `Check out this product: ${product?.name}`;


  if (loading) {
    return <SpinnerLoader />;
  }

  if (!product) {
    return <div className="text-white">Product not found.</div>;
  }

  return (
    <>
     <div>
      <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s=document.createElement("script");
              s.src='https://embed.tawk.to/66c9e94350c10f7a009fffd6/1i62bec3o'; // Replace with your Tawk.to ID
              s.async=true;
              s.charset='UTF-8';
              s.crossOrigin='*';
              document.head.appendChild(s);
            })();
          `,
        }}
      />
    </div>
      <GoogleAnalytics />
      <Topnav />
      <section className="text-gray-400 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
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
          <div className="lg:w-4/5 mx-auto flex flex-wrap pt-12">
  {/* Product Details Section */}
  <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 flex flex-col">
    <h1 className="text-white text-3xl title-font font-medium mb-4">
      {product.name}
    </h1>
    <div className="flex mb-4">
      <a className="flex-grow text-green-400 border-b-2 border-green-500 py-2 text-lg px-1">
        Description
      </a>
    </div>
    <p className="leading-relaxed mb-4">{product.description}</p>
    <div className="flex border-t border-gray-800 py-2">
      <span className="text-gray-500">Color</span>
      <span className="ml-auto text-white">{product.color}</span>
    </div>
    <div className="flex border-t border-gray-800 py-2">
      <span className="text-gray-500">Size</span>
      <span className="ml-auto text-white">{product.size}</span>
    </div>
    <div className="flex border-t border-gray-800 py-2">
      <span className="text-gray-500">Rating</span>
      <span className="ml-auto text-white">{product.rating}</span>
    </div>
    <div className="flex border-t border-b mb-6 border-gray-800 py-2">
      <span className="text-gray-500">Price <span className=" px-2 text-green-200">[70% OFF]</span></span>
      <span className="ml-auto text-green-500 flex items-center">
      <span className="line-through px-2 text-red-500">₹{product.originalPrice}</span> ₹{product.price}
      </span>
    </div>
    <div className="flex items-center py-2">
      <button className="flex mr-auto items-center text-white bg-green-800 border-0 py-2 px-6 focus:outline-none hover:bg-green-500 rounded-3xl" onClick={() => setShowBuy(true)}>
        Buy Now
      </button>
      <button
        className="rounded-full ml-auto w-12 h-12 bg-neutral-800 hover:bg-neutral-600 p-0 border-0 inline-flex items-center justify-center text-neutral-200 transition-transform duration-300 transform hover:scale-110"
        onClick={() => handleAddToCart(product)}
      >
        <IconShoppingCart stroke={2} />
      </button>
      <button
        className="rounded-full ml-2 w-12 h-12 bg-neutral-800 hover:bg-neutral-600 p-0 border-0 inline-flex items-center justify-center text-neutral-200 transition-transform duration-300 transform hover:scale-110"
        onClick={() => handleAddToWish(product)}
      >
        <IconHeart stroke={2} />
      </button>
      <button
        className="rounded-full ml-2 w-12 h-12 bg-neutral-800 hover:bg-neutral-600 p-0 border-0 inline-flex items-center justify-center text-neutral-200 transition-transform duration-300 transform hover:scale-110"
        onClick={() => setShowReviewForm(!showReviewForm)}
      >
        <IconMessage stroke={2} />
      </button>
      <div className="relative">
        <button
          className="rounded-full ml-2 w-12 h-12 bg-neutral-800 hover:bg-neutral-600 p-0 border-0 inline-flex items-center justify-center text-neutral-200 transition-transform duration-300 transform hover:scale-110"
          onClick={handleShare}
        >
          <IconShare stroke={2} />
        </button>
        {showShareOptions && (
          <div className="absolute bg-white shadow-lg rounded-lg mt-2 p-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl right-0 top-full transform translate-x-0 translate-y-2 sm:translate-x-0 sm:translate-y-2 z-50 flex flex-col space-y-2">
            <a
              href={`mailto:?subject=Check out this product&body=${shareText}`}
              className="flex items-center space-x-2 text-gray-800 hover:bg-gray-200 p-2 rounded-lg"
            >
              <IconMail stroke={2} />
              <span>Email</span>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-800 hover:bg-gray-200 p-2 rounded-lg"
            >
              <IconBrandFacebook stroke={2} />
              <span>Facebook</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-800 hover:bg-gray-200 p-2 rounded-lg"
            >
              <IconBrandTwitter stroke={2} />
              <span>Twitter</span>
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-800 hover:bg-gray-200 p-2 rounded-lg"
            >
              <IconBrandWhatsapp stroke={2} />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="flex items-center space-x-2 text-gray-800 hover:bg-gray-200 p-2 rounded-lg"
            >
              <IconCopy stroke={2} />
              <span>Copy Link</span>
            </button>
          </div>
        )}
      </div>
    </div>
    {showReviewForm && (
      <div className="mt-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg mb-2 text-neutral-950"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index}
              className={`p-2 ${index < reviewRating ? "text-yellow-400" : "text-gray-500"}`}
              onClick={() => setReviewRating(index + 1)}
            >
              <IconStar stroke={2} />
            </button>
          ))}
        </div>
        <button
          className="bg-neutral-800 hover:bg-neutral-600 p-3 rounded-3xl text-neutral-200"
          onClick={handleSubmitReview}
        >
          Submit Review
        </button>
      </div>
    )}
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-white mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-400">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-white font-semibold mr-2">{review.userName}</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <IconStar
                    key={index}
                    stroke={2}
                    className={`w-5 h-5 ${index < review.rating ? "text-yellow-400" : "text-gray-500"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-300">{review.text}</p>
          </div>
        ))
      )}
    </div>
  </div>
  {/* Product Image Section */}
  <div className="lg:w-1/2 w-full">
  <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              alt={`Product Image ${index + 1}`}
              className="w-full h-200 object-cover object-center rounded-3xl"
              src={image}
            />
          </div>
        ))}
      </Slider>
  </div>
</div>

        </div>
      </section>
      <Footer />
      {showBuy && <BuyNowForm onClose={() => setShowBuy(false)} product={product} />}
    </>
  );
};

export default ProductOverviewPage;
