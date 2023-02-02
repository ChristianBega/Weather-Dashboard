import React from "react";
import CardDisplay from "../Components/cards";
import SearchForm from "../Components/searchForm";
import WeatherDisplay from "../Components/weatherDisplay";

export default function dashboard() {
  return (
    <>
      <div className="container">
        <SearchForm className="w-50" />
        <WeatherDisplay className="w-50" />
        <CardDisplay />
      </div>
    </>
  );
}
