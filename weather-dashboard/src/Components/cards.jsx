import React from "react";

export default function cards() {
  return (
    <section className="flex flex-col items-center md:flex-row md:justify-between gap-x-7 flex-wrap mb-10" id="card-container">
      <div className="w-full md:w-1/6 h-56 mt-10 lg:p-8 p-4 rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70">
        <div className="card-body text-white bg-dark rounded">
          <p class="fw-bold fs-4">12/12/12</p>
          <img src="${iconUrl}"></img>
          <p>Temp: </p>
          <p>Wind: MPH</p>
          <p>Humidity: %</p>
        </div>
      </div>
    </section>
  );
}
