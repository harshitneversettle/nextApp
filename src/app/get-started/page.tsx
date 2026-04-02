"use client";

import { GetEvent } from "@/components/get-started/getEvent";
import PostEvent from "@/components/get-started/postEvent";
import { useEffect, useState } from "react";

export default function GetStarted() {
  const [showManage, setShowManage] = useState<boolean>(true);
  const [eventState, setEventState] = useState<{
    success: boolean;
    link: string;
  }>({
    success: false,
    link: "",
  });
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  function handlecopy(id: string) {
    const text = document.getElementById(id)?.innerText;
    navigator.clipboard.writeText(text || "");
    setCopyStatus(true);
  }

  useEffect(() => {
    const task = setTimeout(() => {
      setCopyStatus(false);
    }, 5000);
    return () => clearTimeout(task);
  }, [copyStatus]);

  return (
    <div className="bg-gray-950 w-full h-screen ">
      <div className=" flex flex-col gap-3 mt-10">
        {showManage ? (
          <PostEvent />
        ) : (
          <GetEvent setEventState={setEventState} />
        )}
        <button
          onClick={() => setShowManage((prev) => !prev)}
          className="text-blue-600 text-sm hover:text-blue-600/70 duration-200"
        >
          {showManage ? "get / manage your event" : "create a new Event"}
        </button>
      </div>
      {eventState.success && (
        <div className="text-white flex flex-col gap-3 justify-center items-center mt-5 text-md">
          <div className=" border border-white/10 px-4 py-2 rounded-lg">
            {" "}
            <span className="tracking-widest">sharable link : </span>
            <span
              id="form-link"
              className="text-blue-600 pl-2 hover:text-blue-600/60 transition-all"
            >
              {eventState.link}
            </span>
          </div>
          <button
            onClick={() => handlecopy("form-link")}
            className="bg-white text-black px-2 py-1 rounded-xl tracking-widest hover:bg-white/60 transition-all"
          >
            {copyStatus ? "copied" : "copy"}
          </button>
        </div>
      )}
    </div>
  );
}
