import Image from "next/image";
import Error from "@/assets/not found.png";
import Thumbnail from "@/assets/Grid Vectors.svg";

export default function NotfoundPage() {
  return (
    <div className="w-[100vw] h-[100vh] grid place-content-center bg-white relative">
      <Image
        src={Thumbnail}
        alt="vector"
        className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
      />
      <div className="w-full h-full grid place-content-center gap-10">
        <Image
          src={Error}
          alt="logo"
          className="w-[400px] h-auto object-cover"
        />
      </div>
    </div>
  );
}
