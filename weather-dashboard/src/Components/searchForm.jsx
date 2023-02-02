import React, { useState } from "react";

var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";
var apiKey = "898b277c6fc6f18c77b1aabe15516f58";

function fetchCoordinates(city) {
  // url end point for api
  var rootEndPoint = "https://api.openweathermap.org/geo/1.0/direct";
  // Concat url end point with needed query parameters
  var apiCall = rootEndPoint + "?q=" + city + "&appid=" + apiKey;
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      fetchWeather(lat, lon);
    });
}
function fetchWeather(lat, lon) {
  var apiCall = weatherApi + "lat=" + lat + "&lon=" + lon + "&units=imperial&" + "appid=" + apiKey;
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // renderDayForecast(data);
      // renderCards(data);
    });
}

export default function SearchForm() {
  const [userSearch, setUserSearch] = useState({ city: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserSearch({ ...userSearch, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(userSearch);
      fetchCoordinates(userSearch);
      // Take userSearch and make fetch call to weather api
    } catch (error) {
      console.error(error);
    }
    setUserSearch({ city: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="form-submit"
      className="flex flex-col items-center rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70"
    >
      <h2 className="py-3 my-4 text-2xl">Search for a City:</h2>
      <input
        name="city"
        onChange={handleChange}
        value={userSearch.city}
        className="w-5/6 mb-10 p-3 rounded-md bg-neutral-500 placeholder-white"
        placeholder="Search for a city..."
        type="text"
        aria-describedby="userInput"
      />
      <button type="submit" className="w-5/6 py-3 text-base  rounded-md bg-green-600 shadow-lg  hover:shadow-green-400/30">
        Submit
      </button>
      <button className="w-5/6 my-3 py-3 rounded-md bg-red-600 shadow-lg hover:shadow-red-400/30" id="clear-btn">
        Clear
      </button>
      <div id="recent-btn-container" className="w-5/6 my-3 py-3 text-center rounded-md">
        Coming soon
      </div>
    </form>
  );
}
