import WeatherInfo from "@/components/weatherInfo";
// import Loading from "./loading";

export default function Home() {
  return (
    <>
      {/* <Loading /> */}
      <WeatherInfo />
      <footer className="font-pop absolute bottom-0 left-0 right-0 flex justify-center items-center py-2 gap-10 bg-[#222222] text-white font-light text-[10px]">
        <p>
          Created With 💖 by Nabil Putra, Github :{" "}
          <a
            href="https://github.com/Nai-12/weather-info"
            className="underline"
          >
            Nai-12
          </a>
        </p>
      </footer>
    </>
  );
}
