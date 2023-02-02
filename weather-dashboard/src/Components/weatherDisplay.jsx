import React from "react";

export default function weatherDisplay() {
  return (
    <section className="mt-10 p-8 flex flex-col gap-3 rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70" id="current-forecast">
      <h2 className=" my-4 text-2xl text-center">Current Forecast</h2>
      <div className="flex justify-start">
        <h3 className="" id="city-name">
          Denver
        </h3>
        <span className="ml-5" id="date">
          11/23/2022
        </span>
        <img id="weather-icon" className="ml-5" src="" alt="Weather Icon" />
      </div>
      <p id="temperature">Temp: 75 deg</p>
      <p id="wind-speeds">Wind Speeds : 25mph</p>
      <p id="humidity">Humidity 2.83%</p>
    </section>
  );
}
