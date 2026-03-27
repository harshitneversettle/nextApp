import SampleCarousal from "@/components/LandingPage/SampleCarousal";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-gray-900">
      <div className="text-white h-screen tracking-widest flex flex-col justify-center items-center   ">
        <div className="text-center pb-10">
          <h1 className="text-3xl md:text-6xl pb-2 md:pb-4">
            Generate the Testimonals
          </h1>
          <h1 className="text-2xl md:text-5xl">And use them anywhere </h1>
        </div>
        <SampleCarousal />
      </div>
    </div>
  );
}
