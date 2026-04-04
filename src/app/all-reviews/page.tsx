"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface reviewData {
  name: string;
  email: string;
  reviews: {
    review: string;
    stars: number;
  }[];
}

export default function AllReviews() {
  const [data, setdata] = useState<reviewData[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const adminId = searchParams.get("adminId");
    const eventName = searchParams.get("eventName");
    async function getData() {
      const response = await axios.post("/api/get-reviews", {
        adminId,
        eventName,
      });

      setdata(response.data.data.allReviews);
      console.log(response.data.data.allReviews);
    }
    getData();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-950">
      <div className="flex justify-center items-center text-white">
        <div className="w-300 h-300 border border-white">
          <div className="">Event Name</div>
          <div className="">EventId</div>
          {/* <div className="">Number of reviews : {JSON.stringify(data)}</div> */}
          {data.length > 0 &&
            data.map((i, idx) => {
              return (
                <div className="">
                  <div className="">name : {i.name}</div>
                  <div className="">email : {i.email}</div>

                  <div className="">
                    <div className="">review : {i.reviews[0]?.review}</div>
                    <div className="">
                      stars : {Number(i.reviews[0]?.stars)}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
