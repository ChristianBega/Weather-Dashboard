import React from "react";

export default function searchForm() {
  return (
    <form id="form-submit" className="flex flex-col items-center rounded-md bg-neutral-800 text-white shadow-lg shadow-black/70">
      <h2 class="py-3 my-4 text-2xl">Search for a City:</h2>
      <input
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
