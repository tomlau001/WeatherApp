import "./App.css";
import React, { useEffect, useState } from "react";
import Location from "./Location";
import { RxMagnifyingGlass } from "react-icons/rx";

const App = () => {
  const API = `976ab31dc18dc8f508dfc4b2630cf1fc`;

  const [data, setData] = useState({});

  const [location, setLocation] = useState("");

  const searchLocation = async (cityName) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API}&units=metric`
    );
    const data = await response.json();
    if (data.cod === "404") {
      alert("The place you entered is not valid. Please try again.");
      return
    }

    setData(data);
    console.log(data);
  };

  useEffect(() => {
    searchLocation("HongKong");
  }, []);

  return (
    <div className="main">
      <div className="overlay">
        <div className="search">
          <input
            required
            placeholder="Search Here"
            value={location}
            onKeyPress={(e) =>
            e.key === "Enter" ? searchLocation(location) : {}
            }
            onChange={(e) => setLocation(e.target.value)}
            type="text"
          />
          <RxMagnifyingGlass
            className="search_icon"
            alt="search"
            onClick={() => searchLocation(location)}
          />
        </div>
        <div>
          <Location data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
