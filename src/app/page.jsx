import WeatherInfo from "@/components/weatherInfo";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <WeatherInfo />
      <footer className="font-pop absolute bottom-0 left-0 right-0 flex justify-center items-center pl-4 pt-4 pb-4 gap-10 bg-[#222222] text-white font-light text-[10px]">
        <p>
          Created With 💖 by Nabil Putra, Github :{" "}
          <a
            href="https://github.com/Nai-12/weather-info"
            className="underline"
          >
            Nai-12
          </a>
        </p>
        <Image
          width={40}
          height={40}
          src="/bmkg.svg"
          alt="BMKG"
          loading="eager"
        />
      </footer>
    </>
  );
}
