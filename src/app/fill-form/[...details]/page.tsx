import axios from "axios";
import Image from "next/image";
import { NextResponse } from "next/server";

export default async function FillForm({
  params,
}: {
  params: Promise<{ details: string[] }>;
}) {
  let adminName, adminEmail, eventDesc, eventMessage;
  try {
    const { details } = await params;
    const [adminId, eventName] = details;
    console.log(adminId, eventName);
    const response = await axios.post(
      "http://localhost:3000/api/get-form-details",
      {
        adminId,
        eventName,
      },
    );

    const resObj = JSON.parse(response.data.data);
    ({ adminName, adminEmail, eventDesc, eventMessage } = resObj);
  } catch (error) {
    return NextResponse.json(
      { message: "failed", type: "error" },
      { status: 400 },
    );
  }

  return (
    <div className=" bg-[#0e0e10] w-full min-h-screen ">
      <div className=" h-screen text-white flex flex-col items-center ">
        <div className="absolute z-100 pl-5 pt-10 flex mt-5 flex-col gap-6 w-90 h-140 md:w-140 md:h-180 bg-gray-950 rounded-3xl border border-white ">
          <div className="">
            Name :
            <input
              type="text"
              placeholder="kmask"
              className="bg-white text-black ml-4 px-1"
            />
          </div>
          <div className="">
            email :
            <input
              type="text"
              placeholder="kmask"
              className="bg-white text-black ml-5 px-1"
            />
          </div>
          <div className="">
            review :
            <input
              type="text"
              placeholder="kmask"
              className="bg-white text-black ml-3 px-1"
            />
          </div>
          <div className="">
            review :
            <input
              type="text"
              placeholder="kmask"
              className="bg-white text-black ml-3 px-1"
            />
          </div>
        </div>
        <Image
          alt=""
          src={"/okok.png"}
          width={500}
          height={400}
          className="relative top-135 md:top-173"
        />
      </div>
    </div>
  );
}
