import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchForm() {
  // Tracking user input state- initial state is is object = {city : ""}
  const [userSearch, setUserSearch] = useState("");

  const [userPrevSearch, setUserPrevSearch] = useState([]);

  const handleChange = (event) => {
    const userInput = event.target.value;
    setUserSearch(userInput);
    // console.log("User Search Line 14 (searchForm)", userSearch); // return should be === userInput = Denver
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userSearch) {
      setUserSearch(userSearch);
    } else {
      console.log("Please provide a valid search...");
      return;
    }
    setUserSearch("");

    // setPreviousUserSearch((userPreviousSearch) => [...userPreviousSearch, userSearch]);
    // setTheArray((oldArray) => [...oldArray, `Entry ${oldArray.length}`]);
  };
  // Handle change function - setting user search state from input value
  useEffect(() => {
    // setUserPrevSearch(...userPrevSearch, userSearch);
    localStorage.setItem("prevSearch", JSON.stringify(userSearch));
    // console.log(userPrevSearch);
    // setUserSearch("");
  }, [userSearch]);
  useEffect(() => {
    const data = localStorage.getItem("prevSearch");
    const initialValue = JSON.parse(data);
    // if (data) {
    //   setUserPrevSearch(...userPrevSearch, data);
    //   return userPrevSearch;
    // }
    console.log("Line 37", initialValue);
    // return initialValue || "";
  }, [userSearch]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // console.log("This will run after 2 second after the form submission. And will clear the input");
  //     setUserSearch("");
  //   }, 1200);
  //   return () => clearTimeout(timer);
  // }, [handleSubmit]);
  console.log(userPrevSearch);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70">
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
          {/* Passing userSearch state as prop to /weatherdisplay link */}
          <Link
            //! resource on passing state through links : https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4
            to="/weatherdisplay"
            state={{
              userSearch: userSearch,
            }}
          >
            Submit
          </Link>
        </button>
        <button className="w-5/6 md:w-1/2 my-3 py-3 rounded-md bg-red-600 shadow-lg hover:shadow-red-400/30" id="clear-btn">
          <Link to="/Weather-Dashboard">Clear</Link>
        </button>
        <div id="recent-btn-container" className="w-5/6 my-3 py-3 text-center rounded-md">
          Coming soon
        </div>
      </form>
    </>
  );
}
