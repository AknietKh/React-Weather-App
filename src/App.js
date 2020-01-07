import React from 'react';
import {Cities} from './components/Cities';
import {WeatherDisplay} from './components/WeatherDisplay';
import {AddCity} from './components/AddCity';
import './App.css'
// import { CityBtn } from './components/CityBtn';

const CITIES = [
  {
    "id": 1,
    "city": "Qaraghandy"
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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchBtn = this.handleSearchBtn.bind(this);
    this.state = {
      activeCityId: null,
      value: ''
    }
  }

  handleCityClick(activeCity) {
    this.setState({activeCityId: activeCity.id})
  }

  handleInputChange(input) {
    this.setState({value: input.value});
  }

  handleSearchBtn(event) {
    const {value} = this.state;
    // console.log(value);
    // console.log(CITIES);
    const newCity = {
      id: CITIES.length + 1,
      city: value
    }
    CITIES.push(newCity);
    // console.log(CITIES);
    this.setState({activeCityId: newCity.id})
  }

  render() {
    console.log(CITIES);
    const {activeCityId} = this.state;
    let activeCity;
    CITIES.forEach((item) => item.id === +activeCityId ? activeCity = item.city : '')

    return (
      <React.Fragment>
        <header className="header">
          <h1 className="header__name">Weather App</h1>
        </header>
        <hr className="header__line"></hr>
        <main className="main-wrapper">
          <AddCity  
            onChange={this.handleInputChange}
            onClick={this.handleSearchBtn}
          />
          <div className='main-info'>
            <Cities 
              data={CITIES} 
              onCityClick={this.handleCityClick} 
              activeCityId={activeCityId}
            />
            {
              activeCityId ? 
              <WeatherDisplay activeCity={activeCity}/> : 
              <div className="weather-display">
                <p className="weather-display__loader">Выберите город</p>
              </div>
            }
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default App;