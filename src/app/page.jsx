import WeatherInfo from "@/components/weatherInfo";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <WeatherInfo />
      <footer className="font-pop absolute top-0 left-0 right-0 flex justify-between items-center pl-4 pt-4 text-white font-light text-[10px]">
        <p className="rotate-90 absolute top-45 -left-19">
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
