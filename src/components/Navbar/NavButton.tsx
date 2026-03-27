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
    >
      {title}
    </button>
  );
}
