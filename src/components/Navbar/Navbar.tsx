import PcContent from "./PcContent";
import PhoneContent from "./PhoneContent";

export default function Navbar() {
  return (
    <div className=" bg-black text-white">
      <div className="w-full h-20 flex justify-between items-center px-5 md:px-10 ">
        <div className="text-red-600 text-4xl md:text-6xl">webApp</div>
        <div className="text-lg flex flex-col md:flex-row md:gap-10 md:text-xl md:pr-10">
          <PcContent />
          <PhoneContent />
        </div>
      </div>
    </div>
  );
}
