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

  const [bgColor, setBgColor] = useState<string>("black");
  const bgColorRef = useRef<HTMLInputElement | null>(null);
  const [imageSize, setImageSize] = useState<number>(150);
  const imageSizeRef = useRef<HTMLInputElement | null>(null);
  const [imageradious, setImageradious] = useState<number>(1);
  const imageradiousRef = useRef<HTMLInputElement | null>(null);
  const [nameSize, setNameSize] = useState<number>(25);
  const nameSizeRef = useRef<HTMLInputElement | null>(null);
  const [emailSize, setEmailSize] = useState<number>(15);
  const emailSizeRef = useRef<HTMLInputElement | null>(null);
  const [reviewSize, setReviewSize] = useState<number>(15);
  const reviewSizeRef = useRef<HTMLInputElement | null>(null);

  const [defaultStyle, setDefaultStyle] = useState<boolean>(true);

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
      <div className="flex justify-center uppercase items-center w-30 h-30 text-black bg-white text-xl rounded-full font-semibold">
        {complete}
      </div>
    );
  };

  const Customavtar = (name: string) => {
    if (!imageSize || !imageradious) return;
    if (!data) return;
    const first = name.split(" ")[0]?.slice(0, 1);
    const second = name.split(" ")[1]?.slice(0, 1) || null;
    const complete = first.concat(second || "");
    return (
      <div
        className={`flex justify-center uppercase items-center text-black bg-white text-xl font-semibold`}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: imageradious,
        }}
      >
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
        {defaultStyle ? (
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
        ) : (
          <div
            className={`border flex border-white/10 rounded-xl w-fit h-fit pr-5 gap-7 `}
            style={{
              backgroundColor: bgColor,
            }}
          >
            <div className={`flex items-center h-60 pl-5`}>
              <div className="">{Customavtar(data?.user.name!)}</div>
            </div>
            <div className="pt-10">
              <div className="flex">
                {renderStars(Math.floor(Number(data?.stars)))}
              </div>
              <div className=" pt-3 pb-3">
                <div style={{ fontSize: nameSize! }}>{data?.user.name}</div>
                <div className="text-white/70" style={{ fontSize: emailSize! }}>
                  {data?.user.email}
                </div>
              </div>
              <div style={{ fontSize: reviewSize! }}>{data?.review}</div>
            </div>
          </div>
        )}
        <div className="flex gap-3">
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

          <button
            className="bg-white text-black px-2 py-1 hover:bg-white/70 tracking-widest rounded-lg transition-all"
            onClick={() => setDefaultStyle((prev) => !prev)}
          >
            {defaultStyle ? "Customize" : "Default"}
          </button>
        </div>
      </div>

      <div className="">
        <div className="text-white">Customize</div>
        <div className="text-white flex">
          <div className="flex flex-col">
            <input
              ref={bgColorRef}
              type="text"
              placeholder="bg-color (hex)"
              className="border w-fit rounded-lg px-2 "
            />

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
                      style={{ backgroundColor: `${shade}` }}
                      title={shade}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <div className="">
                {" "}
                name heading size :{" "}
                <input
                  ref={nameSizeRef}
                  defaultValue={nameSize}
                  type="text"
                  placeholder="name text"
                  className="ml-3"
                />
              </div>
              <input
                type="range"
                onChange={(e) => {
                  if (!nameSizeRef.current) return;
                  setNameSize(Number(e.target.value));
                  nameSizeRef.current!.value = e.target.value;
                }}
                defaultValue={nameSize}
                step={1}
                max={55}
                min={25}
                className="text-white"
              />
            </div>
            <div className="flex flex-col">
              <div className="">
                email size:
                <input
                  ref={emailSizeRef}
                  defaultValue={emailSize}
                  type="text"
                  placeholder="email text"
                  className="ml-3"
                />
              </div>
              <input
                type="range"
                onChange={(e) => {
                  if (!emailSizeRef.current) return;
                  setEmailSize(Number(e.target.value));
                  emailSizeRef.current.value = e.target.value;
                }}
                defaultValue={emailSize}
                step={1}
                max={25}
                min={15}
                className="text-white"
              />
            </div>
            <div className="flex flex-col">
              <div className="">
                review size:
                <input
                  ref={reviewSizeRef}
                  defaultValue={reviewSize}
                  type="text"
                  placeholder="review text"
                  className="ml-3"
                />
              </div>
              <input
                type="range"
                defaultValue={reviewSize}
                onChange={(e) => {
                  if (!reviewSizeRef.current) return;
                  setReviewSize(Number(e.target.value));
                  reviewSizeRef.current.value = e.target.value;
                }}
                step={1}
                max={40}
                className="text-white"
              />
            </div>
            <div className="flex flex-col">
              <div className="">
                image size :
                <input
                  ref={imageSizeRef}
                  defaultValue={imageSize}
                  type="text"
                  placeholder="image size"
                  className="ml-3"
                />
              </div>
              <input
                type="range"
                onChange={(e) => {
                  if (!imageSizeRef.current) return;
                  let val = Number(e.target.value);
                  setImageSize(val);
                  imageSizeRef.current.value = e.target.value;
                }}
                defaultValue={imageSize}
                step={1}
                max={200}
                min={50}
                className="text-white"
              />
            </div>
            <div className="flex flex-col">
              <div className="">
                image border radius :
                <input
                  ref={imageradiousRef}
                  defaultValue={imageradious}
                  type="text"
                  placeholder="image border radious"
                  className="ml-3"
                />
              </div>
              <input
                type="range"
                onChange={(e) => {
                  if (!imageradiousRef.current) return;
                  let val = Number(e.target.value);
                  setImageradious(val);
                  imageradiousRef.current.value = e.target.value;
                }}
                defaultValue={imageradious}
                step={1}
                max={100}
                min={1}
                className="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
