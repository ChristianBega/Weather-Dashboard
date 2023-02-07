import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchForm() {
  // Tracking user input state- initial state is is object = {city : ""}
  const [currentSearch, setCurrentSearch] = useState("");
  const [previousSearch, setPreviousSearch] = useState(JSON.parse(localStorage.getItem("city") || "[]"));

  // Responsible for clearing local storage
  const handleClear = () => {
    localStorage.clear();
  };
  // Responsible for input change events
  const handleChange = (event) => {
    setCurrentSearch(event.target.value);
  };

  // Responsible for submit events
  const handleSubmit = (event) => {
    // event.preventDefault();
    if (currentSearch) {
      setCurrentSearch(currentSearch);
      setPreviousSearch(JSON.parse(localStorage.getItem("city") || "[]"));
    } else {
      console.log("Please provide a valid search...");
      return;
    }
    setCurrentSearch("");
  };

  // Executes on handleSubmit - responsible for setting local storage objects
  useEffect(() => {
    if (currentSearch === "" || currentSearch === "null") {
      return;
    }
    localStorage.setItem("city", JSON.stringify([...previousSearch, currentSearch]));
  }, [handleSubmit]);

  // useEffect(() => {

  // },[previousSearch])

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70">
        <h2 className="py-3 my-4 text-4xl">Search for a City:</h2>
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
        <button type="submit" className="w-5/6 md:w-1/2 py-3 text-base  rounded-md bg-green-600 shadow-lg  hover:shadow-green-400/30">
          {/* Passing currentSearch state as prop to /weatherdisplay link */}
          <Link
            //! resource on passing state through links : https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4
            to="/weatherdisplay"
            state={{
              currentSearch: currentSearch,
            }}
          >
            Submit
          </Link>
        </button>
        <button onClick={handleClear} className="w-5/6 md:w-1/2 my-3 py-3 rounded-md bg-red-600 shadow-lg hover:shadow-red-400/30" id="clear-btn">
          <Link to="/Weather-Dashboard">Clear</Link>
        </button>
        <div id="recent-btn-container" className="w-full my-3 py-3 text-center rounded-md">
          {previousSearch.map((city, index) => (
            <button className="w-5/6 md:w-1/2 my-2 py-3 rounded-md bg-neutral-500 shadow-lg hover:shadow-red-400/30" key={index}>
              {city}
            </button>
          ))}
        </div>
      </form>
    </>
  );
}
