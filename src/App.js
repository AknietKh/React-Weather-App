import React from 'react';
import {Cities} from './components/Cities';
import {WeatherDisplay} from './components/WeatherDisplay';
import './App.css'

const CITIES = [
  {
    "id": 1,
    "city": "Karaganda"
  },
  {
    "id": 2,
    "city": "London"
  },
  {
    "id": 3,
    "city": "Tokyo"
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleCityClick = this.handleCityClick.bind(this);
    this.state = {
      activeCityId: 1
    }
  }

  handleCityClick(activeCity) {
    this.setState({activeCityId: activeCity.id})
  }

  render() {
    const {activeCityId} = this.state;
    let activeCity;
    CITIES.forEach((item) => item.id === +activeCityId ? activeCity = item.city : '')

    return (
      <React.Fragment>
        <header className="header">
          <h1 className="header__name">Weather App</h1>
        </header>
        <hr className="header__line"></hr>
        <main className="main-info">
          <Cities 
            data={CITIES} 
            onCityClick={this.handleCityClick} 
            activeCityId={activeCityId}
          />
          <WeatherDisplay
            activeCity={activeCity}
          />
        </main>
      </React.Fragment>
    )
  }
}

export default App;