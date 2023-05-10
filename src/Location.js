import React from "react";
import moment from "moment";

const Location = ({ data }) => {
  const getIcon = (iconId) =>
    `http://openweathermap.org/img/wn/${iconId}@2x.png`;

  const { list, city } = data || {};
  const { name } = city || {};
  const { weather, main, wind } = list?.[0] || {};
  const { temp, feels_like, humidity } = main || {};
  const { description, icon } = weather?.[0] || {};

  const fiveDaysForecast = list
    ? list.filter(({ dt_txt }) => {
        const itemDate = new Date(dt_txt);
        return itemDate.getHours() === 12;
      })
    : [];

  return (
    <div className="container">
      <h3 className="city_name"> {name}</h3>
      <div className="main-weather-info">
        <img src={getIcon(icon)} alt="" />
        <span>{list && temp.toFixed() + "°C"}</span>
      </div>
      <p className="description">{description}</p>
      <div className="sub-weather-info">
        <span>{`Humidity ${list && humidity}%`}</span>
        <span>{`Wind ${list && wind.speed.toFixed()} m/s`}</span>
        <span>{`Feels Like ${list && feels_like.toFixed()}°`}</span>
      </div>

      <div className="forecast-container">
        <h3>Daily</h3>
        <div className="five-days">
          {fiveDaysForecast.map(
            ({
              dt,
              dt_txt,
              weather: [{ description, icon }],
              main: { temp_max, temp_min },
            }) => (
              <div key={dt} className="daily-forecast">
                <h5> {moment(dt_txt).format("ddd DD")} </h5>
                <img src={getIcon(icon)} alt="" />
                <div>
                  <span className="max-temp">{temp_max.toFixed() + "°"}</span>
                  <span className="min-temp">{temp_min.toFixed() + "°"}</span>
                </div>
                <p>{description}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default Location;
