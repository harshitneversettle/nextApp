"use client";

import { colors } from "@/config/colors";
import axios from "axios";
import { use, useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Review({
  params,
}: {
  params: Promise<{ reviewId: string }>;
}) {
  const body = use(params);
  const [data, setData] = useState<{
    review: string;
    stars: number;
    user: {
      name: string;
      email: string;
    };
  } | null>(null);

  const [bgColor, setBgColor] = useState<string | null>(null);
  const bgColorRef = useRef<HTMLInputElement | null>(null);

  const reviewId = body.reviewId;
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post("/api/fetch-review", {
        reviewId: body.reviewId,
      });

      console.log(response.data.data);
      setData(response.data.data);
    };
    getData();
  }, []);

  const avtar = (name: string) => {
    if (!data) return;
    const first = name.split(" ")[0]?.slice(0, 1);
    const second = name.split(" ")[1]?.slice(0, 1) || null;
    const complete = first.concat(second || "");
    return (
      <div className=" flex justify-center uppercase items-center w-30 h-30 text-black bg-white text-xl rounded-full font-semibold">
        {complete}
      </div>
    );
  };

  const renderStars = (stars: number) => {
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      starElements.push(
        i < stars ? (
          <FaStar size={22} color="gold" />
        ) : (
          <FaStar size={20} className="text-zinc-600" />
        ),
      );
    }
    return starElements;
  };

  return (
    <div className="flex flex-col bg-black h-screen">
      <div className="text-white w-full flex flex-col gap-4 justify-center items-center ">
        <div className="border flex border-white/10 rounded-xl w-120 h-60 pr-3 gap-7">
          <div className="flex items-center h-60 pl-5">
            <div className="">{avtar(data?.user.name!)}</div>
          </div>
          <div className="pt-10">
            <div className="flex">
              {renderStars(Math.floor(Number(data?.stars)))}
            </div>
            <div className=" pt-3 pb-3">
              <div className="text-2xl">{data?.user.name}</div>
              <div className="text-sm text-white/70">{data?.user.email}</div>
            </div>
            <div className="">{data?.review}</div>
          </div>
        </div>
        <button
          onClick={() =>
            navigator.clipboard.writeText(
              `<iframe src="http://localhost:3000/embed/${reviewId}" width="500" height="250" frameborder="0"></iframe>`,
            )
          }
          className="bg-white text-black px-2 py-1 hover:bg-white/70 tracking-widest rounded-lg transition-all"
        >
          copy iframe
        </button>
      </div>

      <div className="">
        <div className="text-white">Customize</div>
        <div className="text-white">
          <div className="flex flex-col">
            <input ref={bgColorRef} type="text" placeholder="bg-color (hex)" />

            <div className="bg-white w-fit text-black border rounded-xl px-2 py-1">
              {Object.entries(colors).map(([colorName, shades]) => (
                <div
                  key={colorName}
                  className="flex items-center gap-2 space-y-1"
                >
                  <span className="text-xs w-12 capitalize">{colorName}</span>
                  {shades.map((shade) => (
                    <span
                      key={shade}
                      onClick={() => {
                        if (!bgColorRef.current) return;
                        setBgColor(shade);
                        bgColorRef.current.value = shade;
                      }}
                      className={`inline-block w-5 h-5 rounded-full border border-black/50 cursor-pointer ${shade}`}
                      title={shade}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <input type="text" placeholder="text-color (hex)" />
          <input type="text" placeholder="bg-color (hex)" />
          <input type="text" placeholder="bg-color (hex)" />
        </div>
      </div>
    </div>
  );
}
