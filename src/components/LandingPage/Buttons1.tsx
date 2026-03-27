import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface Props {
  onClick_functionality: string;
  text: string;
}

export default function ButtonPair({ onClick_functionality, text }: Props) {
  return (
    <div className="">
      <Link href={onClick_functionality}>
        <button
          className={`flex items-center tracking-widest px-2 py-1 rounded-lg transition-all ${text == "Get Started" ? `bg-white text-black hover:bg-white/40` : `text-white border hover:bg-white/10`} gap-1 `}
        >
          {text} {text === "Get Started" ? <FiArrowRight size={18} /> : ""}
        </button>
      </Link>
    </div>
  );
}
