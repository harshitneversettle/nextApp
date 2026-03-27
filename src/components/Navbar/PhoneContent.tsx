"use client";

import { contentList } from "@/config/contentList";
import { useState } from "react";
import NavButton from "./NavButton";

export default function PhoneContent() {
  const [show, setShow] = useState(false);
  return (
    <div className="absolute block md:hidden ">
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
        className="text-white "
      >
        hello
      </button>
      <div className="relative bg-white text-black">
        {show &&
          contentList.map((i, index) => {
            return (
              <div key={index} className="">
                <NavButton title={i.title} to={i.to} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
