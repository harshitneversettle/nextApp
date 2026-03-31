"use client";

import { GetEvent } from "@/components/get-started/getEvent";
import PostEvent from "@/components/get-started/postEvent";
import { useState } from "react";

export default function GetStarted() {
  const [showManage, setShowManage] = useState<boolean>(true);

  return (
    <div className="bg-gray-950 w-full h-screen ">
      <div className=" flex flex-col gap-3 mt-10">
        {showManage ? <PostEvent /> : <GetEvent />}

        <button
          onClick={() => setShowManage((prev) => !prev)}
          className="text-blue-600 text-sm hover:text-blue-600/70 duration-200"
        >
          {showManage ? "get / manage your event" : "create a new Event"}
        </button>

      </div>
    </div>
  );
}
