import React, { useState } from "react";
import Pagination from "./Pagination";
import WeatherData from "./WeatherData";

const API_KEY = "0d03b6d879384011a6e61150251004";

const WeatherFetcher = () => {
  const [zipCode, setZipCode] = useState("");
  const [weekData, setWeekData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      if (!zipCode) return alert("Please enter a zip code.");

      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${zipCode}&days=7`
      );

      if (!response.ok) {
        alert("Invalid Zip Code");
        return;
      }

      const data = await response.json();
      setWeekData(data.forecast.forecastday || []);
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch data");
    }
  };

  return (
    <main className="mainContainer">
      <h1 className="apiName">Weather API</h1>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter zipcode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
        <input type="submit" value="Get Data" />
      </form>
      <WeatherData data={displayedData} />
      <Pagination data={weekData} itemsPerPage={1} setDisplayedData={setDisplayedData} />
    </main>
  );
};

export default WeatherFetcher;
