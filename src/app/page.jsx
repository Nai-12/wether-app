import WeatherInfo from "@/components/weatherInfo";

export default function Home() {
  return (
    <>
      <WeatherInfo />
      <footer className="font-pop absolute bottom-0 left-0 right-0 flex justify-center items-center text-white font-light text-[10px]">
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
