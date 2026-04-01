"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function GetEvent() {
  const eventNameRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [getData, setGetData] = useState();
  const router = useRouter();

  async function handleGet() {
    try {
      if (!eventNameRef.current) return;
      const eventName = eventNameRef.current.value;
      let response = await axios.get(`/api/event/${eventName}`);

      console.log(response.data);

      if (response.data.message === "Access token expired") {
        const response2 = await axios.post("/api/refresh");
        console.log(response2.data);
        if (
          response2.data.status === "login again" ||
          response2.data.message === "unauthorized"
        ) {
          setLoading(false);
          router.push("admin/login");
        } else {
          const newAccess = response2.data.data;
          response = await axios.get(`/api/event/${eventName}`);
        }
      }
      if (response.data.message === "unauthorized") {
        setLoading(false);
        router.push("admin/login");
      }

      if (response.data.type === "success") {
        alert("event fetched");
      } else {
        alert(response.data.message);
      }
      setLoading(false);
      setGetData(response.data.data);
      eventNameRef.current.value = "";
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to fetch event");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-white text-4xl tracking-widest">Get Event</div>
      <div className="flex bg-black flex-col gap-5 border border-white/10 w-100 h-110 md:w-120 rounded-3xl">
        <div className="h-6 border-b border-white/10 mt-3.5 ">
          <div className="flex gap-1.5 ml-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-700"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
          </div>
        </div>
        <div className="flex justify-center gap-2 flex-col overflow-hidden">
          <label htmlFor="" className="text-white text-lg px-10 ">
            Enter event name :
          </label>
          <div className="inline-flex justify-center ">
            <input
              type="text"
              ref={eventNameRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setLoading(true);
                  handleGet();
                }
              }}
              name=""
              id=""
              placeholder="event name"
              className="bg-white text-xl rounded-lg px-2 w-80"
            />
          </div>
        </div>
        <div className="text-white flex flex-col items-center pt-3 ">
          <button
            onClick={() => {
              setLoading(true);
              handleGet();
            }}
            className=" bg-white text-black px-2 py-1 rounded-lg border border-yellow-100"
          >
            {loading ? "fetching..." : "get event"}
          </button>
          <div
            className={`pt-5 text-md text-green-400 overflow-hidden pl-5 ${getData ? "" : "text-center !text-white"}`}
          >
            <pre className="break-words whitespace-pre-wrap ">
              {JSON.stringify(getData, null, 2) ||
                "No events yet, create an event to see the details here !"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
