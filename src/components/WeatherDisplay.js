import React from 'react';
import '../App.css';

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      weatherData: null
    }
  }

  fetchData(activeCity) {
    const APPID = 'ef598dd48091a3a2eb6a63ef6c4d75b2'
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + 
                activeCity + `&units=metric&lang=ru&APPID=${APPID}`;
    fetch(URL).then(response => {
      if (response.ok) {
        return response.json(); 
      } else {
        throw new Error('Данные не были получены, ошибка: ' + response.status);
      }
    })
    .then(data => {
      this.setState({weatherData: data});
    })
    .catch(err => {
      console.warn(err);
    })
  }

  componentDidMount() {
    const {activeCity} = this.props;
    this.fetchData(activeCity);
  }

  componentDidUpdate(prevProps) {
    prevProps.activeCity !== this.props.activeCity && this.fetchData(this.props.activeCity)
  }

  render() {
    const {weatherData} = this.state;

    if (!weatherData) return <div className="weather-display__loader">Loading...</div>
    const weather = weatherData.weather[0];
    const weatherIcon = `http://openweathermap.org/img/wn/${weather.icon}.png`
    
    return (
      <div className="weather-display">
        <h2 className="city-status">
          {`${weather.main} in ${weatherData.name}`}
          <img 
            src={weatherIcon} 
            alt={weather.description} 
            title={weather.description}/>  
        </h2>
        <div className="weather-info">
          <p className="weather-info__item">Температура: {weatherData.main.temp}°</p>
          <p className="weather-info__item">По ощущению: {weatherData.main.feels_like}°</p>
          <p className="weather-info__item">Ветер: {weatherData.wind.speed} м/с</p>
          <p className="weather-info__item">Облачность: {weather.description}</p>
          <p className="weather-info__item">Давление: {(weatherData.main.pressure *  0.75006375541921).toFixed(2)} мм рт. ст.</p>
          <p className="weather-info__item">Влажность: {weatherData.main.humidity}%</p>
          <p className="weather-info__item">Координаты: {`[${weatherData.coord.lat}, ${weatherData.coord.lon}]`}</p>
        </div>
      </div>
    )
  }
}

export {WeatherDisplay}