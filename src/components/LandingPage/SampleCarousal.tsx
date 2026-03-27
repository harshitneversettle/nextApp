"use client";
import { Images } from "@/config/ImageList";
import { useEffect, useState } from "react";

export default function SampleCarousal() {
  const [currIndex, setCurrIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIndex((prev) => (prev + 1) % Images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="">
      <div className="flex items-center justify-center h-70 w-100 md:w-150 md:h-90 bg-black rounded-4xl border border-white/20">
        <img src={Images[currIndex].src} alt={Images[currIndex].alt} />;
      </div>

      <div className="flex gap-2 justify-center pt-2">
        <button
          onClick={() => {
            currIndex == 0
              ? setCurrIndex(Images.length - 1)
              : setCurrIndex((prev) => prev - 1);
          }}
          className="bg-red-500"
        >
          left
        </button>
        <button
          onClick={() => {
            currIndex == Images.length - 1
              ? setCurrIndex(0)
              : setCurrIndex((prev) => prev + 1);
          }}
          className="bg-red-500"
        >
          right
        </button>
      </div>
    </div>
  );
}
