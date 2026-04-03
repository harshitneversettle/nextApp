"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface props {
  adminId: number;
  eventName: string;
}
export default function FIllform({ adminId, eventName }: props) {
  const [data, setData] = useState<{
    adminName: string;
    adminEmail: string;
    eventDesc: string;
    eventMessage: string;
  } | null>(null);

  const userNameref = useRef<HTMLInputElement | null>(null);
  const userEmailref = useRef<HTMLInputElement | null>(null);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);
  const starRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.post("/api/get-form-details", {
        adminId,
        eventName,
      });
      const data = response.data.data;
      setData(data);
    };

    fetch();
  }, [adminId, eventName]);

  if (!data)
    return (
      <div className=" h-screen text-white flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className=" h-screen text-white flex flex-col items-center ">
      <div className="absolute z-100 pl-5 pt-10 flex mt-5 flex-col gap-6 w-90 h-145 md:w-140 md:h-187 bg-gray-950 rounded-3xl border border-white ">
        <div className=" text-sm md:text-lg ">
          {/* name + email */}
          <div className="flex md:flex-col md:gap-3 mr-2 md:mb-5">
            <div className="mb-2">
              <span className="tracking-widest text-white/50">
                Admin name :
              </span>
              <input
                type="text"
                value={data.adminName}
                readOnly
                className="bg-gray-400 text-black max-w-30 md:min-w-70 rounded-md px-2 md:mx-4 border border-white "
              />
            </div>
            <div className="">
              <span className="tracking-widest text-white/50">
                Admin email :
              </span>
              <input
                type="text"
                value={data.adminEmail}
                readOnly
                className="bg-gray-400 text-black rounded-md px-2 md:min-w-70 md:mx-4 border border-white text-md "
              />
            </div>
          </div>
          {/* event desc + message */}
          <div className=" flex flex-col gap-4">
            <div className="flex flex-col mr-2">
              <span className="tracking-widest text-white/50">
                Event description :{" "}
              </span>
              <textarea
                rows={2}
                value={data.eventDesc}
                readOnly
                className="bg-gray-400 text-black rounded-md px-2 md:max-w-125 border border-white text-md "
              />
            </div>
            <div className="flex flex-col mr-2">
              <span className="tracking-widest text-white/50">
                Admin's message for you :
              </span>
              <textarea
                rows={2}
                value={data.eventMessage}
                readOnly
                className="bg-gray-400 text-black rounded-md md:max-w-125 px-2 border border-white text-md "
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row text-md md:text-lg  border-t border-white/10 pt-4 gap-3 md:gap-4 ">
          <div className="flex flex-col md:gap-3 mr-2 md:mb-5">
            <div className="mb-2">
              <span className="tracking-widest text-white/50">Your name :</span>
              <input
                type="text"
                ref={userNameref}
                placeholder="name "
                className="bg-gray-400 text-black max-w-52 mx-2 md:min-w-70 rounded-md px-2 md:mx-4 border border-white "
              />
            </div>
            <div className="">
              <span className="tracking-widest text-white/50">
                Your email :
              </span>
              <input
                type="text"
                ref={userEmailref}
                placeholder="email"
                className="bg-gray-400 text-black rounded-md max-w-52 px-2 md:min-w-70 mx-2 md:mx-4 border border-white "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mr-2 md:text-lg">
          <span className="tracking-widest text-white/50">Your review : </span>
          <textarea
            rows={2}
            ref={reviewRef}
            placeholder="write your review here ;) "
            className="bg-gray-400 text-black rounded-md px-2 md:max-w-125 border border-white "
          />
        </div>
        <div className="flex flex-col pt-5 text-md md:text-lg mr-3 md:mr-9">
          <span className="tracking-widest text-white/50 ">stars :</span>
          <input
            min={0}
            ref={starRef}
            max={5}
            step={0.1}
            type="range"
            className="text-center mt-1 md:mt-3 accent-white md:px-2 rounded-md border  border-white "
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-white text-black px-2 py-1 rounded-lg hover:bg-white/60 transition-all duration-100">
            submit
          </button>
        </div>
      </div>
      <Image
        alt=""
        src={"/hmm.png"}
        width={500}
        height={400}
        className="relative top-140 md:top-180 "
      />
    </div>
  );
}
