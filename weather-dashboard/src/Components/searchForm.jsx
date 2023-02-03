import React, { useState } from "react";
import { fetchCoordinates, fetchWeather } from "../Utils/fetchCalls";
import WeatherDisplay from "./weatherDisplay";

export default function SearchForm() {
  const [userSearch, setUserSearch] = useState({ city: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // console.log(isSubmitted);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserSearch({ ...userSearch, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      setUserSearch(userSearch);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
        <button
          onClick={() => (isSubmitted === false ? setIsSubmitted(true) : null)}
          type="submit"
          className="w-5/6 py-3 text-base  rounded-md bg-green-600 shadow-lg  hover:shadow-green-400/30"
        >
          Submit
        </button>

        <button
          onClick={() => (isSubmitted === true ? setIsSubmitted(false) : null)}
          className="w-5/6 my-3 py-3 rounded-md bg-red-600 shadow-lg hover:shadow-red-400/30"
          id="clear-btn"
        >
          Clear
        </button>
        <div id="recent-btn-container" className="w-5/6 my-3 py-3 text-center rounded-md">
          Coming soon
        </div>
      </form>
      {isSubmitted ? <WeatherDisplay userSearch={userSearch} isSubmitted={isSubmitted} /> : <WeatherDisplay isSubmitted={false} />}
    </>
  );
}
