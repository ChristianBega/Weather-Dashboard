import React from "react";

export default function searchForm() {
  return (
    <form id="form-submit" className="flex flex-col items-center border">
      <h2 class="py-3">Search for a City:</h2>
      <input className="w-5/6 my-3 p-3 bg-indigo-100" placeholder="Search for a city..." type="text" aria-describedby="userInput" />
      <button type="submit" class="w-5/6 py-3 text-base bg-green-600">
        Submit
      </button>
      <button class="w-5/6 my-3 py-3 bg-red-600" id="clear-btn">
        Clear
      </button>
      <div id="recent-btn-container" class="w-5/6 my-3 py-3 text-center">
        Coming soon
      </div>
    </form>
  );
}
