import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../Utils/fetchCalls";
import Cards from "./cards";
// import SearchForm from "./searchForm";
import { ArrowSmLeftIcon } from "@heroicons/react/solid";

export default function WeatherDisplay() {
  const location = useLocation();
  const currentSearch = location.state?.currentSearch;
  // console.log("Current search input test : ", currentSearch);

  let [data, setData] = useState({ name: "", date: "", temp: 0, windSpeed: 0, humidity: 0, iconUrl: undefined });

  // data2 - that will track the state of the next 5 days forecast an array of objects
  let [data2, setData2] = useState([{ name: "", date: "", temp: 0, windSpeed: 0, humidity: 0, iconUrl: undefined }]);

  // Creating use state to track lat and lon state

  useEffect(() => {
    let lat, lon;
    const gettingCoords = async (query) => {
      let responseCoords = await API.getCoordinates(query);
      // console.log("Coordinates Response :", responseCoords[0].lat, responseCoords[0].lon);
      lat = responseCoords[0].lat;
      lon = responseCoords[0].lon;
      const responseCurrentWeather = await API.getWeather(lat, lon);
      // console.log("Latitude and longitude : "lat, lon);
      // console.log("Current Weather response", responseCurrentWeather);
      setData({
        name: responseCurrentWeather.city.name,
        date: responseCurrentWeather.list[0].dt_txt,
        temp: responseCurrentWeather.list[0].main.temp,
        wind: responseCurrentWeather.list[0].wind.speed,
        humidity: responseCurrentWeather.list[0].main.humidity,
        iconUrl: `https://openweathermap.org/img/wn/${responseCurrentWeather.list[0].weather[0].icon}.png`,
      });
      // console.log("Data for current day forecast (Line 37)", data);

      setData2([
        {
          name: responseCurrentWeather.city.name,
          date: responseCurrentWeather.list[8].dt_txt,
          temp: responseCurrentWeather.list[8].main.temp,
          wind: responseCurrentWeather.list[8].wind.speed,
          humidity: responseCurrentWeather.list[8].main.humidity,
          iconUrl: `https://openweathermap.org/img/wn/${responseCurrentWeather.list[8].weather[0].icon}.png`,
        },
        {
          name: responseCurrentWeather.city.name,
          date: responseCurrentWeather.list[16].dt_txt,
          temp: responseCurrentWeather.list[16].main.temp,
          wind: responseCurrentWeather.list[16].wind.speed,
          humidity: responseCurrentWeather.list[16].main.humidity,
          iconUrl: `https://openweathermap.org/img/wn/${responseCurrentWeather.list[16].weather[0].icon}.png`,
        },
        {
          name: responseCurrentWeather.city.name,
          date: responseCurrentWeather.list[24].dt_txt,
          temp: responseCurrentWeather.list[24].main.temp,
          wind: responseCurrentWeather.list[24].wind.speed,
          humidity: responseCurrentWeather.list[24].main.humidity,
          iconUrl: `https://openweathermap.org/img/wn/${responseCurrentWeather.list[24].weather[0].icon}.png`,
        },
        {
          name: responseCurrentWeather.city.name,
          date: responseCurrentWeather.list[32].dt_txt,
          temp: responseCurrentWeather.list[32].main.temp,
          wind: responseCurrentWeather.list[32].wind.speed,
          humidity: responseCurrentWeather.list[32].main.humidity,
          iconUrl: `https://openweathermap.org/img/wn/${responseCurrentWeather.list[32].weather[0].icon}.png`,
        },
      ]);
      // console.log("Data for 5 day forecast (Line 67)", data2);

      // Extra data from Api for future development
      // console.log("City Feels Like : ", responseCurrentWeather.list[0].main.feels_like);
      // console.log("City Min Temp : ", responseCurrentWeather.list[0].main.temp_min);
      // console.log("City Max Temp : ", responseCurrentWeather.list[0].main.temp_max);
      // console.log("City Weather : ", responseCurrentWeather.list[0].weather[0].main);
      // console.log("City Weather Desc : ", responseCurrentWeather.list[0].weather[0].description);
      // console.log("Weather Icon : ", responseCurrentWeather.list[0].weather[0].icon);
    };
    gettingCoords(currentSearch);
  }, [currentSearch]);

  return (
    <>
      <div className="container min-h-screen mt-10">
        <Link to="/Weather-Display"></Link>
        {/* <SearchForm /> */}
        <Link to="/Weather-Dashboard">
          <ArrowSmLeftIcon className="h-6 w-6 text-white" />
        </Link>
        <section className="mt-10 p-8 flex flex-col gap-3 rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70" id="current-forecast">
          <h2 className=" my-4 text-4xl text-center">Current Forecast</h2>
          <div className="flex justify-start items-center">
            <h3 className="text-white" id="city-name">
              {data.name}
            </h3>

            <span className="ml-5" id="date">
              {data.date}
              {/* {new Intl.DateTimeFormat("en-us").format(data.date)}   */}
            </span>
            <img id="weather-icon" className="ml-5" src={data.iconUrl} alt="Weather Icon" />
          </div>
          <p id="temperature">Temp : {data.temp} degrees </p>
          <p id="wind">Temp : {data.wind} Mph </p>

          <p id="humidity">Humidity : {data.humidity} % </p>
        </section>
        <section className="flex flex-col flex-wrap items-center justify-between md:flex-row  gap-x-3  mb-10" id="card-container">
          {data2.map((dayForecast, index) => (
            <Cards
              key={index}
              name={dayForecast.name}
              date={dayForecast.date}
              temp={dayForecast.temp}
              wind={dayForecast.wind}
              humidity={dayForecast.humidity}
              iconUrl={dayForecast.iconUrl}
            />
          ))}
        </section>
      </div>
    </>
  );
}
