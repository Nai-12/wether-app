"use client";

import axios from "axios";
import { useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import NotFound from "./error";

function WeatherInfo() {
  const [weather, setWeather] = useState(null);
  const [button, setButton] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const showPrompt = useRef();
  const area = valueInput.replace(/\s+/g, "").split(",");

  showPrompt.current = () => {
    if (valueInput) {
      setButton(true);
    } else return alert("Masukan lokasi anda");

    async function run() {
      try {
        const api = await axios.get(
          `/api/weather?adm3=${area[0]}&adm4=${area[1]}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          },
        );
        setWeather(api.data);
      } catch (error) {
        console.log(error);
        alert("Gagal mengambil data cuaca. Periksa konsol untuk detail.");
        setButton(false);
      }
    }
    run();

    setValueInput("");
  };
  return (
    <>
      <div className="flex-wrap pt-20 pb-20 justify-center items-center w-full h-[100vh] overflow-scroll lg:flex xl:flex xl:gap-3 2xl:gap-10">
        <div
          className={`flex justify-center items-center gap-3 flex-col ${
            weather ? "absolute top-6 w-full" : ""
          }`}
          id="search"
        >
          <h1
            className={`text-white font-bold font-mont text-3xl mb-0 ${
              weather ? "hidden" : ""
            }`}
          >
            Masukan Lokasi
          </h1>
          <div
            className={`flex justify-center items-center gap-3 bg-white z-20 py-1.5 pl-2 pr-5 rounded-3xl`}
          >
            <input
              type="text"
              aria-label="Input"
              name="Input Location"
              id="locate"
              value={valueInput}
              placeholder="Contoh: Kecamatan, Kelurahan"
              onChange={(e) => setValueInput(e.target.value)}
              className="bg-[#222222] rounded-2xl w-2xs text-white py-1 pl-4 font-pop"
            />
            <button
              type="submit"
              aria-label="Button"
              className={`cursor-pointer text-2xl`}
              onClick={showPrompt.current}
            >
              <AiOutlineSearch />
            </button>
          </div>
        </div>

        {button && weather && weather.code === 500 ? (
          <NotFound />
        ) : (
          weather &&
          weather.data[0].cuaca[1].map((cuaca) => (
            <div
              className=" flex justify-center items-center mt-10"
              id="weather"
              key={cuaca.datetime}
            >
              <div className="bg-white h-[31rem] rounded-2xl py-1 md:w-6/12 lg:w-[95%] xl:w-20/12">
                <div className="bg-[#222222] flex justify-between items-center m-4 p-3 rounded-2xl">
                  <Image
                    src={cuaca.image}
                    width={70}
                    height={70}
                    alt="Icon weather"
                    loading="eager"
                  />
                  <div className="flex justify-end items-end flex-col text-white mr-3 font-mont">
                    <p>Kondisi : {cuaca.weather_desc}</p>
                    <p>Tanggal : {cuaca.datetime.split("T")[0]}</p>
                  </div>
                </div>

                <div
                  className="flex justify-between items-start mx-3.5"
                  id="location"
                >
                  <h3 className="font-bold text-[15px] w-56 text-start font-mont">
                    {weather.lokasi.kecamatan}, {weather.lokasi.desa}
                  </h3>
                  <p className="w-36 text-end font-pop">
                    {weather.lokasi.kotkab}
                  </p>
                </div>

                <div className={`h-[270px]`}>
                  <div>
                    <div className="flex justify-between items-center mx-3.5 font-mont">
                      <p className="text-4xl relative after:content-['Cloud_Cover'] after:w-32 after:absolute after:-bottom-4 after:left-0 after:text-sm">
                        {cuaca.tcc}%
                      </p>
                      <p className="text-4xl relative after:content-['Temperature'] after:absolute after:-bottom-4 after:right-0 after:text-sm">
                        {cuaca.t}°C
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#222222] flex justify-between items-center flex-col m-4 mt-8 p-3 rounded-2xl text-white py-6 px-5 font-mont">
                    <div className="w-full ">
                      <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 32 32"
                            aria-label="Wind icon"
                          >
                            <path
                              fill="#fff"
                              d="M16 3c-3.227 0-6.043 2.258-6.797 5.344a5.04 5.04 0 0 0-2.785 2.672C2.922 10.758 0 13.555 0 17c0 3.309 2.691 6 6 6v-2c-2.207 0-4-1.793-4-4s1.793-4 4-4c.277 0 .566.035.883.105l.976.223l.22-.98a3 3 0 0 1 2.226-2.254l.66-.156l.098-.672C11.418 6.832 13.543 5 16 5a4.98 4.98 0 0 1 4.46 2.75l.395.781l.829-.289C22.152 8.082 22.582 8 23 8c2.207 0 4 1.793 4 4c0 .04-.008.074-.016.11l-.02.206l-.062.72l.664.284A3.99 3.99 0 0 1 30 17c0 2.207-1.793 4-4 4h-2.543q.393.434.691.938q.301.503.5 1.062H26c3.309 0 6-2.688 6-6a6 6 0 0 0-3.004-5.2A6.01 6.01 0 0 0 23 6c-.39 0-.777.043-1.172.125A6.97 6.97 0 0 0 16 3m-.5 9c-1.137 0-2.16.55-2.797 1.398l1.598 1.2A1.49 1.49 0 0 1 15.5 14c.84 0 1.5.66 1.5 1.5s-.66 1.5-1.5 1.5H9v2h6.5c1.922 0 3.5-1.578 3.5-3.5S17.422 12 15.5 12M8 21v2h3c.566 0 1 .434 1 1s-.434 1-1 1a.98.98 0 0 1-.863-.5l-1.73 1.012A3.02 3.02 0 0 0 11 27c1.645 0 3-1.355 3-3a3 3 0 0 0-.188-1H19c1.117 0 2 .883 2 2s-.883 2-2 2a2 2 0 0 1-1.887-1.336l-1.886.664A4 4 0 0 0 19 29c2.2 0 4-1.8 4-4s-1.8-4-4-4z"
                            />
                          </svg>
                          <p className="font-light text-sm">Wind Speed</p>
                        </div>
                        <p className="text-[18px] font-medium">
                          {cuaca.ws} Kph
                        </p>
                      </div>
                      <hr className="mt-3" />
                    </div>
                    <div className="w-full pt-3">
                      <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            aria-label="Humidity Icon"
                          >
                            <g
                              fill="none"
                              stroke="#fff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              color="#fff"
                            >
                              <path d="M3.5 13.678c0-4.184 3.58-8.319 6.094-10.706a3.463 3.463 0 0 1 4.812 0C16.919 5.36 20.5 9.494 20.5 13.678C20.5 17.78 17.281 22 12 22s-8.5-4.22-8.5-8.322" />
                              <path d="M4 12.284c1.465-.454 4.392-.6 7.984 1.418c3.586 2.014 6.532 1.296 8.016.433" />
                            </g>
                          </svg>
                          <p className="font-light text-sm">Humidity</p>
                        </div>
                        <p className="text-[18px] font-medium">
                          {cuaca.hu} g/m³
                        </p>
                      </div>
                      <hr className="mt-3" />
                    </div>
                    <div className="w-full pt-3">
                      <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            aria-label="Precip Icon"
                          >
                            <path
                              fill="#fff"
                              d="M23.5 22h-15A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22M16 4a7 7 0 0 0-6.94 6.14L9 11h-.86a4.5 4.5 0 0 0 .36 9h15a4.5 4.5 0 0 0 .36-9H23l-.1-.82A7 7 0 0 0 16 4m-2 26a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 14 30m6 0a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 20 30M8 30a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 8 30"
                            />
                          </svg>
                          <p className="font-light text-sm">Precip</p>
                        </div>
                        <p className="text-[18px] font-medium">{cuaca.tp} mm</p>
                      </div>
                      <hr className="mt-3" />
                    </div>
                    <div className="w-full pt-3">
                      <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-eye"
                          >
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          <p className="font-light text-sm">Visibility</p>
                        </div>
                        <p className="text-[18px] font-medium">
                          {cuaca.vs_text}
                        </p>
                      </div>
                      <hr className="mt-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* <WeatherInfoMobile /> */}
    </>
  );
}

export default WeatherInfo;
