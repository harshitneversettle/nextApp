"use client";

import { contentList } from "@/config/contentList";
import NavButton from "./NavButton";

export default function PcContent() {
  return (
    <div className="hidden md:flex gap-10 md:flex-row transition-all duration-200 ">
      {contentList.map((i, index) => {
        return (
          <div
            key={index}
            className={`${i.title !== "Sign up" ? ` hover:border-1 hover:rounded-lg ` : ``}`}
          >
            <NavButton title={i.title} to={i.to} />
          </div>
        );
      })}
    </div>
  );
}
