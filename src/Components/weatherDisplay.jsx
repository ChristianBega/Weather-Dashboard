import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../Utils/fetchCalls";
import Cards from "./cards";
import { ArrowSmLeftIcon } from "@heroicons/react/solid";
import { format, parseISO } from "date-fns";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Framer motion
import { motion } from "framer-motion";

const weatherDisplayVariants = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      delay: 0.5,
      stiffness: 45,
      damping: 10,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeOut", stiffness: 75, damping: 8 },
  },
};

const formatDate = (date) => {
  return format(parseISO(date), "MMM-dd-yyyy").split("-").join(" ");
};

export default function WeatherDisplay() {
  // Access props passed from link state
  const location = useLocation();
  const currentSearch = location.state?.currentSearch;

  // data1 - that will track the state of the current day forecast
  let [data, setData] = useState({ name: "", date: 0, temp: 0, windSpeed: 0, humidity: 0, iconUrl: undefined });

  // data2 - that will track the state of the next 4 days forecast
  let [data2, setData2] = useState([{ name: "", date: 0, temp: 0, windSpeed: 0, humidity: 0, iconUrl: undefined }]);

  useEffect(() => {
    let lat, lon;
    const gettingCoords = async (query) => {
      let responseCoords = await API.getCoordinates(query);
      lat = responseCoords[0].lat;
      lon = responseCoords[0].lon;
      const responseCurrentWeather = await API.getWeather(lat, lon);

      // Setting current day forecast state

      setData({
        name: responseCurrentWeather.city.name,
        date: responseCurrentWeather.list[0].dt_txt,
        temp: responseCurrentWeather.list[0].main.temp,
        wind: responseCurrentWeather.list[0].wind.speed,
        humidity: responseCurrentWeather.list[0].main.humidity,
        iconUrl: `https://openweathermap.org/img/wn/${responseCurrentWeather.list[0].weather[0].icon}.png`,
      });
      // Setting four day forecast state
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
    };
    gettingCoords(currentSearch);
  }, [currentSearch]);

  return (
    <>
      <motion.div variants={weatherDisplayVariants} initial="hidden" animate="visible" exit="exit" className="container min-h-screen mt-10">
        <Link to="/">
          <ArrowSmLeftIcon className="h-6 w-6 text-white" />
        </Link>
        <motion.section
          className="mt-10 p-8 flex flex-col gap-3 rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70"
          id="current-forecast"
        >
          <h2 className=" my-4 text-4xl text-center">Current Forecast</h2>
          <div className="flex justify-start items-center">
            <h3 className="text-white" id="city-name">
              {data.name ? data.name : <Skeleton />}
            </h3>

            <span className="ml-5" id="date">
              {data.date ? formatDate(data.date) : <Skeleton />}
            </span>

            {data.iconUrl ? <img id="weather-icon" className="ml-5" src={data.iconUrl} alt="Weather Icon" /> : <Skeleton circle />}
          </div>
          <p id="temperature"> {data.temp ? `Temp: ${data.temp} \u00b0` : <Skeleton />} </p>
          <p id="wind"> {data.wind ? `Wind: ${data.wind} Mph` : <Skeleton />} </p>
          <p id="humidity">{data.humidity ? `Humidity : ${data.humidity}%` : <Skeleton />} </p>
        </motion.section>
        <motion.section className="flex flex-col flex-wrap items-center justify-between md:flex-row  gap-x-3  mb-10" id="card-container">
          {data2.map((dayForecast, index) => (
            <Cards
              key={index}
              name={dayForecast.name ? dayForecast.name : <Skeleton />}
              date={dayForecast.date ? formatDate(dayForecast.date) : <Skeleton />}
              temp={dayForecast.temp ? `${dayForecast.temp} \u00b0` : <Skeleton />}
              wind={dayForecast.wind ? `${dayForecast.wind} Mph` : <Skeleton />}
              humidity={dayForecast.humidity ? `${dayForecast.humidity}%` : <Skeleton />}
              iconUrl={dayForecast.iconUrl}
            />
          ))}
        </motion.section>
      </motion.div>
    </>
  );
}

// Date formatting reference - https://stackoverflow.com/questions/64362242/how-to-format-date-with-date-fns
