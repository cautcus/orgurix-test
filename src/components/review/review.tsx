"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./marquee";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/auth/firebase"; // Adjust the path as needed

interface Review {
  rating: number;
  text: string;
  userId: string;
  userName: string;
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const fetchedReviews: Review[] = querySnapshot.docs.map(doc => doc.data() as Review);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, []);

  // Optionally, format reviews for display if needed
  const formattedReviews = reviews.map(review => ({
    quote: review.text,
    name: review.userName,
    title: `Rating: ${review.rating}`
  }));

  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={formattedReviews}
        direction="right"
        speed="fast"
      />
    </div>
  );
}
