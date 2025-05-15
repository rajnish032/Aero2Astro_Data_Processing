import Link from "next/link";
import hero from "../assets/hero.png";
import { WiDirectionRight } from "react-icons/wi";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-center">
      <Image
        src={hero}
        alt="Aero2Astro  Geospatial Network Join and Register"
        className="absolute  md:object-cover object-center  w-full h-full max-sm:h-[35%] max-sm:scale-150"
      />
      <div className="absolute bg-black h-full w-full opacity-80">
        <div className="flex items-center justify-center flex-col h-full">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-xl text-gray-200 mt-2">Oops! Page not found.</p>
        <Link
          href="/"
          className="mt-4 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
        </div>
      </div>
    </div>
  );
}
