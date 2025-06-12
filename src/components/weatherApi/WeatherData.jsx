import React from "react";

const WeatherData = ({ data }) => {
  return (
    <div id="weatherData">
      {data.length > 0 ? (
        data.map((ele, index) => (
          <div key={index}>
            <p>{ele.date}</p>
            <img src={ele.day.condition.icon} alt={ele.day.condition.text} />
            <p>{ele.day.condition.text}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default WeatherData;
