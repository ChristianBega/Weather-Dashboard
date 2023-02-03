import React, { useState, useEffect } from "react";
import API from "../Utils/fetchCalls";

export default function Cards({ userSearch, isSubmitted }) {
  // let [data, setData] = useState({ name: "", date: "", temp: 0, windSpeed: 0, humidity: 0, icon: "" });
  // useEffect(() => {
  //   const gettingCoords = async (query) => {
  //     const responseCoords = await API.getCoordinates(query);
  //     console.log("Coordinates Response (Card) :", responseCoords);
  //     let lat = responseCoords[0];
  //     let lon = responseCoords[1];
  //     const responseCurrentWeather = await API.getWeather(lat, lon);
  //     console.log("Current Weather response", responseCurrentWeather);
  //     let name = responseCurrentWeather.city.name;
  //     let date = responseCurrentWeather.list[0].dt_txt;
  //     let temp = responseCurrentWeather.list[0].main.temp;
  //     let windSpeed = responseCurrentWeather.list[0].wind.speed;
  //     let humidity = responseCurrentWeather.list[0].main.humidity;
  //     let iconUrl = `https://openweathermap.org/img/wn/${responseCurrentWeather.list[0].weather[0].icon}.png`;

  //     // Extra data from Api for future development
  //     // console.log("City Feels Like : ", responseCurrentWeather.list[0].main.feels_like);
  //     // console.log("City Min Temp : ", responseCurrentWeather.list[0].main.temp_min);
  //     // console.log("City Max Temp : ", responseCurrentWeather.list[0].main.temp_max);
  //     // console.log("City Weather : ", responseCurrentWeather.list[0].weather[0].main);
  //     // console.log("City Weather Desc : ", responseCurrentWeather.list[0].weather[0].description);

  //     // Returning back object of {name, data, temp, windSpeed, humidity}
  //     return { name: name, date: date, temp: temp, windSpeed: windSpeed, humidity: humidity, icon: iconUrl };
  //   };
  //   // If isSubmitted is true then call gettingCoords
  //   if (isSubmitted) {
  //     gettingCoords(userSearch).then((dataFromResponse) => {
  //       //setData as the data back from the response.
  //       setData(dataFromResponse);
  //     });
  //   }
  // }, [isSubmitted]);
  return (
    <>
      {isSubmitted ? (
        <section className="flex flex-col items-center md:flex-row md:justify-between gap-x-7 flex-wrap mb-10" id="card-container">
          {/* Conditionally render cards from data */}
          <div className="w-full md:w-1/6 h-56 mt-10 lg:p-8 p-4 rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70">
            <div className="card-body text-white bg-dark rounded">
              <p className="fw-bold fs-4">12/12/12</p>
              <img src="${iconUrl}"></img>
              <p>Temp: </p>
              <p>Wind: MPH</p>
              <p>Humidity: %</p>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
