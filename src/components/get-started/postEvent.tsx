"use client";

import axios from "axios";
import { useRef, useState } from "react";

export default function PostEvent() {
  const eventNameRef = useRef<HTMLInputElement | null>(null);
  const eventDescriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleCreate() {
    try {
      if (
        !eventNameRef.current ||
        !eventDescriptionRef.current ||
        !messageRef.current
      )
        return;
      console.log(
        eventNameRef.current.value,
        eventDescriptionRef.current.value,
        messageRef.current.value,
      );
      const response = await axios.post("/api/event", {
        eventName: eventNameRef.current.value,
        eventDescription: eventDescriptionRef.current.value,
        message: messageRef.current.value,
      });

      console.log(response.data);

      if (response.data.type === "success") {
        alert("event created");
      } else {
        alert(response.data.message);
      }
      setLoading(false);
      ((eventDescriptionRef.current.value = ""),
        (eventNameRef.current.value = ""),
        (messageRef.current.value = ""));
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-white  text-4xl tracking-widest">Create event </div>
      <div className="flex bg-black flex-col gap-5 border border-white/10 w-100 h-110 md:w-120 rounded-3xl">
        <div className="h-6 border-b border-white/10 mt-3.5 ">
          <div className="flex gap-1.5 ml-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-700"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
          </div>
        </div>
        <div className="flex justify-center gap-2  flex-col">
          <label htmlFor="" className="text-white text-lg px-10 md:px-20 ">
            Enter event name :
          </label>
          <div className="inline-flex justify-center md:px-20 ">
            <input
              type="text"
              ref={eventNameRef}
              name=""
              id=""
              placeholder="event name"
              className="bg-white text-xl rounded-lg px-2  w-80"
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 flex-col md:px-10">
          <label htmlFor="" className="text-white text-lg px-10 ">
            Enter event description
          </label>
          <div className="inline-flex justify-center">
            <textarea
              name=""
              ref={eventDescriptionRef}
              id=""
              placeholder="event description"
              className="bg-white text-xl rounded-lg px-2  w-80 "
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 flex-col md:px-10 ">
          <label htmlFor="" className="text-white text-lg  px-10 ">
            A message for user :
          </label>
          <div className="inline-flex justify-center ">
            <textarea
              name=""
              ref={messageRef}
              id=""
              placeholder="message for user"
              className="bg-white text-lg rounded-lg px-2 w-80 "
            />
          </div>
        </div>
        <div className="text-white flex justify-center pt-3 ">
          <button
            onClick={() => {
              setLoading(true);
              handleCreate();
            }}
            className=" bg-white text-black px-2 py-1 rounded-lg border border-yellow-100"
          >
            {loading ? "creating..." : "create event"}
          </button>
        </div>
      </div>
    </div>
  );
}
