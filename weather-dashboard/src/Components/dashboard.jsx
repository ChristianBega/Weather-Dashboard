import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../Components/searchForm";

export default function dashboard() {
  return (
    <>
      <div className="container min-h-screen mt-10">
        <Link to="/"></Link>
        <SearchForm />
      </div>
    </>
  );
}
