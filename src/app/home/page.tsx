import ButtonPair from "@/components/LandingPage/Buttons1";
import MacbookSampleCarousal from "@/components/LandingPage/MacbookSampleCarousal";
import SampleCarousal from "@/components/LandingPage/SampleCarousal";
import { Nanum_Pen_Script } from "next/font/google";

const nanum = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-zinc-900">
      <div className="text-white h-screen tracking-widest flex flex-col justify-center items-center   ">
        <div className="text-center pb-10">
          <h1 className={`text-3xl md:text-6xl pb-2 md:pb-4 meow-font`}>
            Generate the Testimonals
          </h1>
          <h1 className="text-2xl md:text-5xl">And use them anywhere </h1>
        </div>
        <div className="hidden xl:block">
          <MacbookSampleCarousal />
          <img src="./macbook.png" alt="" />
        </div>
        <div className="xl:hidden">
          <SampleCarousal />
        </div>
        <div className="flex gap-5 pt-7">
          <ButtonPair onClick_functionality="/generate" text="Get Started" />
          <ButtonPair onClick_functionality="/docs" text="view docs" />
        </div>
      </div>
    </div>
  );
}
