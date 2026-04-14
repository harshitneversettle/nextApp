import PcContent from "./PcContent";
import PhoneContent from "./PhoneContent";

export default function Navbar() {
  return (
    <div className=" bg-black text-white">
      <div className="w-full h-20 flex justify-between items-center px-5 md:px-10 ">
        <div className="h-20">
          <video
            src="/heading.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="text-lg flex flex-col md:flex-row md:gap-10 md:text-xl md:pr-10">
          <PcContent />
          <PhoneContent />
        </div>
      </div>
    </div>
  );
}
