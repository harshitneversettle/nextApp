"use client";

import { contentList } from "@/config/contentList";
import { useState } from "react";
import NavButton from "./NavButton";

export default function PhoneContent() {
  const [show, setShow] = useState(false);
  return (
    <div className="fixed right-15 top-7">
      <div className="absolute block md:hidden ">
        <button
          onClick={() => {
            setShow((prev) => !prev);
          }}
          className="text-white "
        >
          ☰
        </button>
        <div
          className={`min-w-50 relative text-center right-40 w-fit bg-black text-white rounded-lg ${show ? `border-1 border-white pb-5` : ``}   `}
        >
          {show &&
            contentList.map((i, index) => {
              return (
                <div
                  key={index}
                  className={`pt-2 hover:text-white/80 ${i.title !== "Sign up" ? ` hover:border-1 hover:rounded-lg ` : ``}`}
                >
                  <NavButton title={i.title} to={i.to} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
