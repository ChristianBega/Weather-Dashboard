import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchForm() {
  const [currentSearch, setCurrentSearch] = useState("");
  const [previousSearch, setPreviousSearch] = useState([]);

  // Responsible for clearing local storage
  const handleClear = () => {
    async function removeCities() {
      // Clearing local storing
      localStorage.clear();
      // Do not update local-storage, instead update state to rerender components
      await setPreviousSearch([]);
    }
    removeCities();
  };
  // Responsible for input change events
  const handleChange = (event) => {
    setCurrentSearch(event.target.value);
  };

  // Responsible for submit events
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentSearch) {
      setCurrentSearch(currentSearch);

      // Messing around with trying to update state to reflect local storage changes.
      // async function addCity(city) {
      //   // Do not update local-storage, instead update state to rerender components
      //   await setPreviousSearch((city) => previousSearch.push(city));
      // }
      // addCity(currentSearch);
    } else {
      console.log("Please provide a valid search...");
      return;
    }
    setCurrentSearch("");
  };

  // Executes on handleSubmit - responsible for setting previous and current local storage objects.
  useEffect(() => {
    if (currentSearch === "" || currentSearch === "null") {
      return;
    }
    localStorage.setItem("city", JSON.stringify([...previousSearch, currentSearch]));
  }, [currentSearch, previousSearch]);

  // Executes on page load - responsible for getting local storage items, so recent search buttons can render.
  useEffect(() => {
    setPreviousSearch(JSON.parse(localStorage.getItem("city")) || []);
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-[500px] max-h-[800px] flex flex-col items-center rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70"
      >
        <h2 className="py-3 my-10 text-4xl">Search for a City:</h2>
        {/* User search input */}
        <input
          name="city"
          onChange={handleChange}
          value={currentSearch}
          className="w-5/6 md:w-1/2 mb-10 p-3 rounded-md bg-neutral-500 placeholder-white"
          placeholder="Search for a city..."
          type="text"
          aria-describedby="userInput"
        />
        {/* Submit button */}
        <Link
          //! resource on passing state through links : https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4
          className="w-5/6 md:w-1/2 py-3 text-base  rounded-md bg-green-600 shadow-lg hover:shadow-green-700/60 hover:bg-green-300/70"
          to="/Weather-Display"
          state={{
            currentSearch: currentSearch,
          }}
        >
          {" "}
          <button className="text-center w-full" type="submit">
            {/* Passing currentSearch state as prop to /Weather-Display link */}
            Submit
          </button>
        </Link>
        {/* Clear button*/}
        <Link to="/" className="w-5/6 md:w-1/2 my-3 py-3 rounded-md bg-red-700 shadow-lg hover:shadow-red-700/50 hover:bg-red-400/70">
          <button onClick={handleClear} className="text-center w-full" type="reset" id="clear-btn">
            Clear
          </button>
        </Link>
        {/* Recent search buttons */}
        <div id="recent-btn-container" className="flex flex-wrap justify-center gap-5 items-center w-5/6 my-3 py-3 text-center rounded-md">
          {previousSearch.map((city, index) => (
            <Link
              to="/Weather-Display"
              className="w-1/4 my-2 py-3 rounded-full bg-neutral-500/50 shadow-lg hover:shadow-blue-900/50 hover:bg-slate-400/50"
              key={index}
              state={{ currentSearch: city }}
            >
              {city}
            </Link>
          ))}
        </div>
      </form>
    </>
  );
}
