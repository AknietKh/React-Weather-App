import React from 'react';
import '../App.css';

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null
    }
  }
  
  // let activeCity;

  // props.data.forEach((item) => 
  //   item.id === +props.activeCityId ? activeCity = item.city : ''
  // );

  // componentDidMount() {
  //   const {data, activeCityId} = this.props;
  //   const URL = `http://api.openweathermap.org/data/2.5/weather?q=${data[activeCityId]}`;
  // }

  render() {
    return (
      <div className="weather-display">
        <h2 className="city-status">{this.props.activeCity}</h2>
        <div className="weather-info">
          <p className="weather-info__item">Current:</p>
          <p className="weather-info__item">High:</p>
          <p className="weather-info__item">Low:</p>
          <p className="weather-info__item">Wind Speed:</p>
        </div>
      </div>
    )
  }
}

export {WeatherDisplay}