import React from 'react';
import '../App.css';

function WeatherDisplay(props){
  let activeCity;

  props.data.forEach((item) => 
    item.id === +props.activeCityId ? activeCity = item.city : ''
  );

  return (
    <div className="weather-display">
      <h2 className="city-status">{activeCity}</h2>
      <div className="weather-info">
        <div className="weather-info__item">Current:</div>
        <div className="weather-info__item">High:</div>
        <div className="weather-info__item">Low:</div>
        <div className="weather-info__item">Wind Speed:</div>
      </div>
    </div>
  )
}

export {WeatherDisplay}