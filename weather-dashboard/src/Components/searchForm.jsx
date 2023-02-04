import React, { useEffect, useState } from "react";
import WeatherDisplay from "./weatherDisplay";

export default function SearchForm() {
  // Tracking user input state- initial state is is object = {city : ""}
  const [userSearch, setUserSearch] = useState("");
  // Tracking boolean state for submitting
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle change function - setting user search state from input value
  const handleChange = (event) => {
    const test = event.target.value;
    setUserSearch(test);
    // console.log("User Search Line 14 (searchForm)", userSearch); // return should be === userInput = Denver
  };

  const handleSubmit = (event) => {
    console.log("Test");
    event.preventDefault();

    try {
      setUserSearch(userSearch);
      if (isSubmitted === false) {
        setIsSubmitted(true);
        // setUserSearch("");
      } else {
        setIsSubmitted(false);
        setUserSearch("");
      }

      // console.log("User Search Line 22 (searchForm)", userSearch); // return should be === line 14 userInput
    } catch (error) {
      console.error(error);
    }

    // console.log("User Search Line 22 (searchForm)", userSearch); // return should be === ""
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      setUserSearch("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [isSubmitted]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        id="form-submit"
        className="flex flex-col items-center rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70"
      >
        <h2 className="py-3 my-4 text-4xl">Search for a City:</h2>
        <input
          name="city"
          onChange={handleChange}
          value={userSearch}
          className="w-5/6 md:w-1/2 mb-10 p-3 rounded-md bg-neutral-500 placeholder-white"
          placeholder="Search for a city..."
          type="text"
          aria-describedby="userInput"
        />
        {/* Submit button */}
        <button type="submit" className="w-5/6 md:w-1/2 py-3 text-base  rounded-md bg-green-600 shadow-lg  hover:shadow-green-400/30">
          Submit
        </button>

        <button className="w-5/6 md:w-1/2 my-3 py-3 rounded-md bg-red-600 shadow-lg hover:shadow-red-400/30" id="clear-btn">
          Clear
        </button>
        <div id="recent-btn-container" className="w-5/6 my-3 py-3 text-center rounded-md">
          Coming soon
        </div>
      </form>
      {isSubmitted ? <WeatherDisplay userSearch={userSearch} isSubmitted={isSubmitted} /> : <WeatherDisplay userSearch="" isSubmitted={false} />}
      {console.log(isSubmitted)}
    </>
  );
}
