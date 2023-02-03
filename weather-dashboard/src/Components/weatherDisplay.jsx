import React, { useState, useEffect } from "react";
import API from "../Utils/fetchCalls";
import Cards from "./cards";

export default function WeatherDisplay({ userSearch, isSubmitted }) {
  let [data, setData] = useState({ name: "", date: "", temp: 0, windSpeed: 0, humidity: 0, iconUrl: undefined });
  // Creating use state to track lat and lon state

  useEffect(() => {
    let lat, lon;
    const gettingCoords = async (query) => {
      let responseCoords = await API.getCoordinates(query);
      // console.log("Coordinates Response :", responseCoords[0].lat, responseCoords[0].lon);
      lat = responseCoords[0].lat;
      lon = responseCoords[0].lon;
      const responseCurrentWeather = await API.getWeather(lat, lon);
      // console.log(lat, lon);
      console.log("Current Weather response", responseCurrentWeather);
      setData({
        name: responseCurrentWeather.city.name,
        date: responseCurrentWeather.list[0].dt_txt,
        temp: responseCurrentWeather.list[0].main.temp,
        wind: responseCurrentWeather.list[0].wind.speed,
        humidity: responseCurrentWeather.list[0].main.humidity,
        iconUrl: `https://openweathermap.org/img/wn/${responseCurrentWeather.list[0].weather[0].icon}.png`,
      });

      // Extra data from Api for future development
      // console.log("City Feels Like : ", responseCurrentWeather.list[0].main.feels_like);
      // console.log("City Min Temp : ", responseCurrentWeather.list[0].main.temp_min);
      // console.log("City Max Temp : ", responseCurrentWeather.list[0].main.temp_max);
      // console.log("City Weather : ", responseCurrentWeather.list[0].weather[0].main);
      // console.log("City Weather Desc : ", responseCurrentWeather.list[0].weather[0].description);
      // console.log("Weather Icon : ", responseCurrentWeather.list[0].weather[0].icon);
    };
    // If isSubmitted is true then call gettingCoords
    if (isSubmitted) {
      gettingCoords(userSearch);
    } else {
      // set to a loading screen????
      setData("");
    }
  }, [isSubmitted]);
  return (
    <>
      {isSubmitted ? (
        <>
          <section className="mt-10 p-8 flex flex-col gap-3 rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70" id="current-forecast">
            <h2 className=" my-4 text-2xl text-center">Current Forecast</h2>
            <div className="flex justify-start items-center">
              <h3 className="text-white" id="city-name">
                {data.name}
              </h3>

              <span className="ml-5" id="date">
                {data.date}
              </span>
              <img id="weather-icon" className="ml-5" src={data.iconUrl} alt="Weather Icon" />
            </div>
            <p id="temperature">Temp : {data.temp} degrees </p>
            <p id="wind">Temp : {data.wind} Mph </p>

            <p id="humidity">Humidity : {data.humidity} % </p>
          </section>
          <Cards isSubmitted={isSubmitted} />
        </>
      ) : null}
    </>
  );
}
