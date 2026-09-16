import WeatherInfo from "@/components/weatherInfo";
import Image from "next/image";
// import Loading from "./loading";

export default function Home() {
  return (
    <>
      {/* <Loading /> */}
      <WeatherInfo />
      <footer className="font-pop fixed bottom-0 left-0 right-0 flex justify-center items-center py-2 gap-3 bg-[#222222] text-white font-light text-[10px]">
        <p>
          Created With 💖 by Nabil Putra, Github :{" "}
          <a
            href="https://github.com/Nai-12/weather-info"
            className="underline"
          >
            Nai-12
          </a>
        </p>
        <div className="flex justify-center items-center gap-2">
          <Image src="/bmkg.svg" alt="bmkg image" width={30} height={30} />
          <h1 className="font-pop font-bold">BMKG</h1>
        </div>
      </footer>
    </>
  );
}
