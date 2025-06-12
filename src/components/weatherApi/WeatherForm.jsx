import React from "react";

const WeatherForm = ({ zipCode, setZipCode, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="zipCode"
        placeholder="Enter zipcode"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required
      />
      <input type="submit" value="Get Data" id="getData" />
    </form>
  );
};

export default WeatherForm;
