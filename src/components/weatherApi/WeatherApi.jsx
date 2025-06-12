import React, { useState } from "react";
import Pagination from "./Pagination";
import WeatherForm from "./WeatherForm";
import WeatherChoices from "./WeatherChoices";
import WeatherData from "./WeatherData";

const WeatherApi = () => {
  const [zipCode, setZipCode] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  const KEY = "0d03b6d879384011a6e61150251004";


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${zipCode}&days=7`);
      const data = await response.json();
      setWeatherData(data.forecast || []);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <main className="main">
      <h1 className="apiName">Weather API</h1>
      <WeatherForm zipCode={zipCode} setZipCode={setZipCode} handleSubmit={handleSubmit} />
      <WeatherChoices />
      <WeatherData data={displayedData} />
      <Pagination data={weatherData} itemsPerPage={1} setDisplayedData={setDisplayedData} />
    </main>
  );
};

export default WeatherApi;
