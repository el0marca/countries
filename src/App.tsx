import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CountriesList } from "./components/CountriesList";
import { CountryInfo } from "./components/CountryInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CountriesList />} />
      <Route path="/:countryName" element={<CountryInfo />} />
    </Routes>
  );
}

export default App;
