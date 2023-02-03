import React, { useState, useEffect } from "react";
import API from "../Utils/fetchCalls";

export default function WeatherDisplay({ userSearch, isSubmitted }) {
  let [data, setData] = useState({ name: "", date: "", temp: 0, windSpeed: 0, humidity: 0, icon: "" });
  useEffect(() => {
    const gettingCoords = async (query) => {
      const responseCoords = await API.getCoordinates(query);
      // console.log("Coordinates Response :", responseCoords);
      let lat = responseCoords[0];
      let lon = responseCoords[1];
      const responseCurrentWeather = await API.getWeather(lat, lon);
      // console.log("Current Weather response", responseCurrentWeather);
      let name = responseCurrentWeather.city.name;
      let date = responseCurrentWeather.list[0].dt_txt;
      let temp = responseCurrentWeather.list[0].main.temp;
      let windSpeed = responseCurrentWeather.list[0].wind.speed;
      let humidity = responseCurrentWeather.list[0].main.humidity;
      let iconUrl = `https://openweathermap.org/img/wn/${responseCurrentWeather.list[0].weather[0].icon}.png`;

      // Extra data from Api for future development
      // console.log("City Feels Like : ", responseCurrentWeather.list[0].main.feels_like);
      // console.log("City Min Temp : ", responseCurrentWeather.list[0].main.temp_min);
      // console.log("City Max Temp : ", responseCurrentWeather.list[0].main.temp_max);
      // console.log("City Weather : ", responseCurrentWeather.list[0].weather[0].main);
      // console.log("City Weather Desc : ", responseCurrentWeather.list[0].weather[0].description);

      // Returning back object of {name, data, temp, windSpeed, humidity}
      return { name: name, date: date, temp: temp, windSpeed: windSpeed, humidity: humidity, icon: iconUrl };
    };
    // If isSubmitted is true then call gettingCoords
    if (isSubmitted) {
      gettingCoords(userSearch).then((dataFromResponse) => {
        //setData as the data back from the response.
        setData(dataFromResponse);
      });
    }
  }, [isSubmitted]);
  return (
    <>
      {isSubmitted ? (
        <section className="mt-10 p-8 flex flex-col gap-3 rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70" id="current-forecast">
          <h2 className=" my-4 text-2xl text-center">Current Forecast</h2>
          <div className="flex justify-start items-center">
            <h3 className="text-white" id="city-name">
              {data.name}
            </h3>

            <span className="ml-5" id="date">
              {data.date}
            </span>
            <img id="weather-icon" className="ml-5" src={data.icon} alt="Weather Icon" />
          </div>
          <p id="temperature">Temp : {data.temp} degrees </p>
          <p id="wind-speeds">Wind Speeds : {data.windSpeed} Mph </p>
          <p id="humidity">Humidity : {data.humidity} </p>
        </section>
      ) : null}
    </>
  );
}
