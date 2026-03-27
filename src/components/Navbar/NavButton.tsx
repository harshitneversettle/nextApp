"use client";

import { Route } from "next";
import { useRouter } from "next/navigation";

interface props {
  title: string;
  to: Route;
}

export default function NavButton({ title, to }: props) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(to);
      }}
      className={`font-mono p-1 transition-all duration-100 tracking-widest ${title === "Sign up" ? `bg-white text-black rounded-lg hover:bg-white/50 border-1 ` : ``} `}
    >
      {title}
    </button>
  );
}
