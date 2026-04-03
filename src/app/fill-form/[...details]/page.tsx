import axios from "axios";
import Image from "next/image";

export default async function FillForm({
  params,
}: {
  params: Promise<{ details: string[] }>;
}) {
  const { details } = await params;
  console.log(details);
  const [adminId, eventName] = details;
  // const adminId = "1";
  // const eventName = "okok";

  const response = await axios.post(
    "http://localhost:3000/api/get-form-details",
    {
      adminId,
      eventName,
    },
  );
  // console.log(response.data);

  const resObj = response.data.data;
  const { adminName, adminEmail, eventDesc, eventMessage } = resObj;
  // console.log(adminName, adminEmail, eventDesc, eventMessage);

  return (
    <div className=" bg-[#0e0e10] w-full min-h-screen ">
      <div className=" h-screen text-white flex flex-col items-center ">
        <div className="absolute z-100 pl-5 pt-10 flex mt-5 flex-col gap-6 w-90 h-140 md:w-140 md:h-180 bg-gray-950 rounded-3xl border border-white ">
          <div className="text-white">mll</div>
          <div className="">
            Name:
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
        {/* <img
          src=" /okok.png"
          alt=""
          className="relative w-500 h-400 top-135 md:top-173"
        /> */}
        <Image
          alt=""
          src={"/hmm.png"}
          width={500}
          height={400}
          className="relative top-135 md:top-173"
        />
      </div>
    </div>
  );
}
