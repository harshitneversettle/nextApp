"use client";
import { Images } from "@/config/ImageList";
import { Meow_Script } from "next/font/google";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function MacbookSampleCarousal() {
  const [currIndex, setCurrIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIndex((prev) => (prev + 1) % Images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed top-100 right-149">
      <div className="pb-8 pt-4">See someof the testimonals generated :</div>
      <div className="flex items-center justify-center h-70 w-100 md:w-175 md:h-90 bg-black rounded-4xl border border-white/20 transition-all duration-150">
        <img src={Images[currIndex].src} alt={Images[currIndex].alt} />;
      </div>
      {/* <div className="flex gap-2 justify-center pt-2">
        <button
          onClick={() => {
            currIndex == 0
              ? setCurrIndex(Images.length - 1)
              : setCurrIndex((prev) => prev - 1);
          }}
          className="text-white"
        >
          <FiArrowLeft size={32} />
        </button>
        <button
          onClick={() => {
            currIndex == Images.length - 1
              ? setCurrIndex(0)
              : setCurrIndex((prev) => prev + 1);
          }}
          className="text-white"
        >
          <FiArrowRight size={32} />
        </button>
      </div> */}
    </div>
  );
}
