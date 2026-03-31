"use client";

import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  id : number
  type: "success" | "error";
  message: string;
  status?: number;
}

export function ShowNotification({ id ,type, message, status }: Props) {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [id]);

  return (
    <div className="absolute text-white z-100 top-[-40] right-18  md:right-205">
      <div
        className={`w-70 h-20 px-2 pt-2 mt-15 transition-all duration-800 ease-in-out
        rounded-lg text-xl ${type === "success" ? `bg-green-700` : `bg-red-700`} ${show ? `opacity-100` : `opacity-100 -translate-y-100`}`}
      >
        <div className="w-full flex flex-row text-white text-sm justify-between ">
          <div className="">status code : {status}</div>
          <div className="">
            <button onClick={() => setShow(false)} className="">
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="">
          <div className="mt-2 text-xl">{message}</div>
        </div>
      </div>
    </div>
  );
}
