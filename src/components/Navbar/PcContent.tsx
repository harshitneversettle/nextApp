"use client";

import { contentList } from "@/config/contentList";
import NavButton from "./NavButton";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PcContent() {
  const [login, setlogin] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await axios.get("/api/me");
        if (response.data.message === "logged in") {
          setlogin(true);
        }
      } catch (error) {
        setlogin(false);
      }
    };
    check();
  }, []);

  return (
    <div className="hidden md:flex gap-10 md:flex-row transition-all duration-200 ">
      {contentList.map((i, index) => {
        const hide = login ? "Sign up" : "Logout";
        return (
          <div
            key={index}
            className={`${i.title !== "Sign up" && i.title !== "Logout" ? ` hover:border hover:rounded-lg ` : ``} ${i.title === "Logout" ? "text-white bg-red-600 hover:bg-red-600/70 rounded-lg duration-200" : ""} `}
          >
            {i.title !== hide && <NavButton title={i.title} to={i.to} />}
          </div>
        );
      })}
    </div>
  );
}
