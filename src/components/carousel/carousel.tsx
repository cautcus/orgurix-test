"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "./apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-10">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-green-300 font-sans">
        Discover Your, Next Favorite Find...
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ index }: { index: number }) => {
  const images = [
    {
      img: "/img/GOG/carousel/DSCN3289-removebg-preview.png",
      para: "Immerse yourself in the captivating allure of Blue Hues—a mesmerizing fusion of vivid contrasts that tell a story of elegance and vibrancy. This unique piece features a graceful figure adorned in a striking orange dress, set against a deep blue background that evokes the tranquility of twilight. The bold colors and artistic design make this product a true statement piece, perfect for adding a touch of sophistication and charm to any space. Whether displayed as a centerpiece or a subtle accent, Blue Hues captures the essence of timeless beauty and modern artistry. Embrace the harmonious blend of warmth and coolness with this one-of-a-kind creation.",
      buy: "/product/blue-hues",
    },
    {
      img: "/img/GOG/carousel/DSCN3293-removebg-preview.png",
      para: "Step into the world of Crimson Craft, where tradition meets modern artistry in a striking red canvas adorned with intricate white tribal designs. This masterpiece captures the essence of ancient cultures with a contemporary twist, creating a bold statement that speaks of heritage and creativity. The vibrant crimson background symbolizes passion and energy, while the delicate tribal patterns add a touch of mystique and depth. Perfect for those who appreciate the fusion of art and culture, Crimson Craft is more than just a decorative piece—it's a celebration of the timeless beauty found in traditional designs, reimagined for the modern world. Make this distinctive artwork the centerpiece of your space and let its powerful presence inspire and captivate.",
      buy: "/product/crimson-craft",
    },
    {
      img: "/img/GOG/carousel/DSCN3325-removebg-preview.png",
      para: "Discover the enchanting charm of Floral Fusion, where nature's beauty comes alive in a vibrant display of colors and patterns. This exquisite piece showcases a delightful array of blooming flowers, hand-painted in delicate detail, set against a background that bursts with life. The harmonious blend of hues—rich reds, soft pinks, and refreshing greens—creates a visual symphony that embodies the essence of springtime. Floral Fusion is more than just a decorative item; it's a celebration of growth, renewal, and the timeless elegance of nature. Perfect for brightening up any space, this piece adds a touch of serenity and joy to your home. Let Floral Fusion be a constant reminder of the beauty that surrounds us, bringing warmth and freshness to your everyday life.",
      buy: "/product/floral-fusion",
    },
    {
      img: "/img/GOG/carousel/DSCN3250-removebg-preview.png",
      para: "Bask in the glow of Radiant Flora, a stunning piece that captures the vibrant energy of nature in full bloom. This artwork features a striking yellow flower set against a harmonious backdrop of white, green, and yellow, radiating warmth and vitality. Each brushstroke is a tribute to the delicate balance of color and form, creating a piece that is both uplifting and soothing. Radiant Flora embodies the joy of sunny days and the peacefulness of a flourishing garden, making it a perfect addition to any room that needs a touch of natural beauty. Whether as a centerpiece or an accent, this piece will bring light and life to your space, reminding you of the simple pleasures found in nature’s brilliance. Let Radiant Flora be your daily source of inspiration and serenity.",
      buy: "/product/radiant-flora",
    },
    {
      img: "/img/GOG/carousel/DSCN3272-removebg-preview.png",
      para: "Embrace the elegance of Regal Quill, where the timeless beauty of the peacock meets the artistry of refined design. This exquisite piece features a majestic peacock feather, intricately detailed and richly hued, symbolizing grace, pride, and sophistication. The vibrant blues and greens of the feather shimmer against a subtle background, creating a captivating contrast that draws the eye and stirs the imagination. Regal Quill is more than just a decorative item; it’s a statement of opulence and artistry, perfect for those who appreciate the finer things in life. Whether adorning your living space or serving as a unique gift, this piece adds a touch of luxury and elegance wherever it is placed. Let Regal Quill be a reminder of the beauty and nobility that lies in the natural world, bringing a sense of regality and splendor to your home.",
      buy: "/product/regal-quill",
    },
    {
      img: "/img/GOG/carousel/DSCN3242-removebg-preview.png",
      para: "Step into the world of Warriors Vessel, where strength and tradition converge in a powerful design that echoes the spirit of ancient warriors. This striking piece features a bold red backdrop, symbolizing courage and vitality, adorned with intricate white tribal patterns that tell a story of heritage and valor. Each element of the design is a tribute to the resilience and bravery of those who came before us, making Warriors Vessel not just a decorative item, but a symbol of perseverance and pride. Perfect for those who appreciate art with depth and meaning, this piece adds a touch of boldness and cultural richness to any space. Let Warriors Vessel serve as a reminder of the strength that lies within, inspiring you to face life's challenges with the heart of a warrior.",
      buy: "/product/warriors-vessel",
    },
  ];

  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        {images[index % images.length].para}
      </p>
      <Image
        src={images[index % images.length].img}
        alt="Product mockup"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
      <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
        <a href={images[index % images.length].buy}>Buy Now</a>
      </button>
    </div>
  );
};

const data = [
  {
    category: "Glass Bottle",
    title: "Blue Hues",
    src: "/img/GOG/carousel/DSCN3286.jpg",
    content: <DummyContent index={0} />,
  },
  {
    category: "Glass Bottle",
    title: "Crimson Craft",
    src:"/img/GOG/carousel/DSCN3295.jpg",
    content: <DummyContent index={1} />,
  },
  {
    category: "Glass Bottle",
    title: "Floral Fusion",
    src: "/img/GOG/carousel/DSCN3234.jpg",
    content: <DummyContent index={2} />,
  },

  {
    category: "Glass Bottle",
    title: "Radiant Flora",
    src: "/img/GOG/carousel/DSCN3250.jpg",
    content: <DummyContent index={3} />,
  },
  {
    category: "Glass Bottle",
    title: "Regal Quill",
    src: "/img/GOG/carousel/DSCN3269.jpg",
    content: <DummyContent index={4} />,
  },
  {
    category: "Glass Bottle",
    title: "Warriors Vessel",
    src: "/img/GOG/carousel/DSCN3243.jpg",
    content: <DummyContent index={5} />,
  },
];
