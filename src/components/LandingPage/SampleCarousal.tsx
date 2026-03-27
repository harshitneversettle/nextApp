"use client";
import { useState } from "react";

const Images = [
  {
    src: "image1",
    alt: "image1",
  },
  {
    src: "image2",
    alt: "image2",
  },
  {
    src: "image3",
    alt: "image3",
  },
  {
    src: "image4",
    alt: "image4",
  },
  {
    src: "image5",
    alt: "image5",
  },
];
export default function SampleCarousal() {
  const [currIndex, setCurrIndex] = useState(0);
  return (
    <div className="">
      <div className="flex items-center justify-center h-70 md:w-150 md:h-90 bg-black rounded-4xl border border-white/20">
        <img src={Images[currIndex].src} alt={Images[currIndex].alt} />;
      </div>
      <div className="flex gap-2 justify-center pt-2">
        <button
          onClick={() => {
            console.log(currIndex);
            currIndex == 0
              ? setCurrIndex(Images.length-1)
              : setCurrIndex((prev) => prev - 1);
          }}
          className="bg-red-500"
        >
          left
        </button>
        <button
          onClick={() => {
            console.log(currIndex);
            currIndex == Images.length-1
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
