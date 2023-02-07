import React from "react";

export default function Cards({ index, name, date, temp, wind, humidity, iconUrl }) {
  return (
    <>
      <div
        key={index}
        className="w-full md:w-40 lg:w-48 xl:w-72 h-56 mt-10 xl:p-8 p-4 rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70"
      >
        <div className="card-body text-white bg-dark rounded">
          <p className="fw-bold fs-4">{name}</p>
          <p className="fw-bold fs-4">{date}</p>
          <img src={iconUrl} alt="weather icon"></img>
          <p>Temp: {temp} </p>
          <p>Wind: {wind} MPH</p>
          <p>Humidity: {humidity} %</p>
        </div>
      </div>
    </>
  );
}
