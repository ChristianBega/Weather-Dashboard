import React from "react";

export default function Cards({ isSubmitted, index, name, date, temp, wind, humidity, iconUrl }) {
  return (
    <>
      {isSubmitted ? (
        <div key={index} className="w-full md:w-1/6 h-56 mt-10 lg:p-8 p-4 rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70">
          <div className="card-body text-white bg-dark rounded">
            <p className="fw-bold fs-4">{name}</p>
            <p className="fw-bold fs-4">{date}</p>
            <img src={iconUrl}></img>
            <p>Temp: {temp} </p>
            <p>Wind: {wind} MPH</p>
            <p>Humidity: {humidity} %</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
