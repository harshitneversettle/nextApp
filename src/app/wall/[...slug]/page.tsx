"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface reviewData {
  name: string;
  email: string;
  eventId: string;
  userId: string;
  reviews: {
    review: string;
    stars: number;
    id: string;
  }[];
}

export default function WallOfLove({ params }: { params: { slug: string[] } }) {
  const { slug } = useParams();
  if (!slug || slug?.length < 2) {
    return <div className="">undefined</div>;
  }
  const eventName = slug[0];
  const adminId = slug[1];
  const [reviews, setReviews] = useState<reviewData[]>([]);
  const [rating, setRating] = useState<number | string>(0);

  // console.log(eventName, adminId);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post("/api/get-reviews", {
        adminId,
        eventName,
      });
      setReviews(response.data.data.allReviews);
      console.log(response.data.data.allReviews);
    };

    getData();
  }, [params]);

  useEffect(() => {
    if (!reviews || reviews.length === 0) return;

    let total = 0;

    reviews.forEach((i) => {
      total += Number(i.reviews[0].stars);
    });
    const rating = total / reviews.length;
    setRating(rating.toFixed(2));
  }, [reviews]);

  const col1 = reviews.filter((_, index) => index % 3 === 0);
  const col2 = reviews.filter((_, index) => index % 3 === 1);
  const col3 = reviews.filter((_, index) => index % 3 === 2);

  const randColor = [
    "bg-violet-500 text-violet-300",
    "bg-rose-500 text-rose-300",
    "bg-amber-500 text-amber-300",
    "bg-teal-500 text-teal-300",
    "bg-sky-500 text-sky-300",
    "bg-pink-500 text-pink-300",
    "bg-emerald-500 text-emerald-300",
    "bg-orange-500 text-orange-300",
  ];

  function RenderCard({ review }: { review: reviewData }) {
    const rand = Math.floor(Math.random() * randColor.length);
    console.log(rand, randColor.length);
    const avatarColor = randColor[rand] || "bg-gray-500/50";
    return (
      <div className="bg-white border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-zinc-700 transition-all duration-200">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              size={12}
              color={i < review.reviews[0].stars ? "#f59e0b" : "#3f3f46"}
            />
          ))}
        </div>

        <p className="text-sm leading-relaxed">
          &ldquo;{review.reviews[0].review}&rdquo;
        </p>

        <div className="border-t border-zinc-800/20" />

        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0 uppercase`}
          >
            {review.name.slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold">{review.name}</p>
            <p className="text-xs ">{review.email}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen ">
      <div className=" flex flex-col mx-auto max-w-6xl">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 rounded-full py-1 text-xs mb-3 text-white/50">
            <span className="text-yellow-400">
              <FaStar />
            </span>
            avg-rating = {rating}
            <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full">
              {reviews.length} reviews
            </span>
          </div>
          <div className="text-5xl font-bold text-white tracking-tight mb-3">
            Wall of love
          </div>
          <p className="text-base" style={{ color: "#52525b" }}>
            Real words from real people.
          </p>
          <div className="">{rating}</div>
        </div>

        <div className="max-w-5xl grid grid-cols-3 gap-4">
          <div className="">
            {col1.map((i, index) => {
              return (
                <div className="pb-3">
                  <RenderCard review={i} />
                </div>
              );
            })}
          </div>
          <div className="">
            {col2.map((i, index) => {
              return (
                <div className="pb-3">
                  <RenderCard review={i} />
                </div>
              );
            })}
          </div>
          <div className="">
            {col3.map((i, index) => {
              return (
                <div className="pb-3">
                  <RenderCard review={i} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
