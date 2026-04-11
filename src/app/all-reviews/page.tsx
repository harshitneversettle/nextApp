"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaClosedCaptioning, FaCross, FaStar, FaTimes } from "react-icons/fa";
import { LuCroissant, LuCross, LuCrosshair } from "react-icons/lu";

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

export default function AllReviews() {
  const [data, setdata] = useState<reviewData[]>([]);
  const [eventName, setEventName] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<number | null>(null);
  const [sendingData, setSendingData] = useState({
    username: "",
    email: "",
    review: "",
    stars: 0,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const paramsAdminId = searchParams.get("adminId");
    const paramsEventName = searchParams.get("eventName");
    setAdminId(paramsAdminId);
    setEventName(paramsEventName);
    console.log(paramsAdminId, paramsEventName);
    async function getData() {
      const response = await axios.post("/api/get-reviews", {
        adminId: paramsAdminId,
        eventName: paramsEventName,
      });
      console.log(response.data);
      setdata(response.data.data.allReviews);
      setEventId(response.data.data.allReviews[0]?.eventId);
      console.log(response.data.data.allReviews);
    }
    getData();
  }, [searchParams]);

  const renderStars = (stars: number) => {
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      starElements.push(
        i < stars ? (
          <FaStar size={22} color="gold" />
        ) : (
          <FaStar size={20} className="text-zinc-600" />
        ),
      );
    }
    return starElements;
  };

  async function handleSend(data: {
    username: string;
    email: string;
    review: string;
    stars: number;
    reviewId: string;
  }) {
    // console.log(data.reviewId);
    router.push(`/review/${data.reviewId}`);
  }

  return (
    <div className="">
      <div className={`w-full h-screen bg-gray-950 `}>
        <div className="flex justify-center items-center text-white">
          <div className="w-300 p-5 h-300 border border-white">
            <div className="tracking-widest text-3xl">
              Event Name : {eventName}
            </div>
            <div className="bg-[#f7f1f1] w-full text-black pl-3 pt-2 rounded-2xl mt-5">
              <h1 className="text-xl">Event summary</h1>
              <div className="">EventId : {eventId}</div>
              <div className="">Number of reviews : {data.length}</div>
              <div className="">Average rating : {data.length}</div>
            </div>
            <div className="flex flex-col gap-5 mt-7">
              {data.length > 0 &&
                data.map((i, idx) => {
                  return (
                    <div className="flex justify-between bg-white text-black pl-3 pr-6 pt-2 rounded-2xl">
                      <div className="">
                        <div className="font-semibold text-2xl pb-1 ">
                          Reviewer name : {i.name}
                        </div>
                        <div className="font-mono text-black/80">
                          email : {i.email}
                        </div>
                        <div className="pt-5 text- pb-3">
                          {i.reviews[0]?.review}
                        </div>
                        {/* <div className="">stars : {Number(i.reviews[0]?.stars)}</div> */}
                      </div>
                      <div className="flex flex-col justify-between pb-2">
                        <div className="flex gap-1">
                          {renderStars(Number(i.reviews[0]?.stars))}
                        </div>
                        <button
                          onClick={() => {
                            const data = {
                              username: i.name,
                              email: i.email,
                              review: i.reviews[0]?.review,
                              stars: i.reviews[0]?.stars,
                              reviewId: i.reviews[0].id,
                            };

                            handleSend(data);
                          }}
                          className="bg-black hover:bg-black/80 tracking-widest text-white rounded-lg px-2 py-1 text-sm"
                        >
                          generate testimonal
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
