import React from 'react';
import {Cities} from './components/Cities';
import {WeatherDisplay} from './components/WeatherDisplay';
import {AddCity} from './components/AddCity';
import './App.css'
// import { CityBtn } from './components/CityBtn';

let CITIES = [
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
    this.handleDeleteCityBtnClick = this.handleDeleteCityBtnClick.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      cities: CITIES,
      activeCityId: null,
      value: ''
    }
  }

  validate(value) {
    const {cities} = this.state;
    if (!value) return false;

    for (let i = 0; i < cities.length; i++) {
      if (cities[i].city === value) return false;
    }
    
    return true;
  }

  handleCityClick(activeCity) {
    this.setState({activeCityId: activeCity.id})
  }

  handleInputChange(input) {
    const value = input.value.slice(0,1).toUpperCase() + input.value.slice(1).toLowerCase();
    this.setState({value: value});
  }

  handleSearchBtn(event) {
    const {cities, value} = this.state;
    const validateResult = this.validate(value);
    const citiesClone = cities.slice();
  
    if (validateResult) {
      const newCity = {
        id: cities[cities.length-1].id + 1,
        city: value
      }
      citiesClone.push(newCity);
      
      this.setState({
        cities: citiesClone,
        activeCityId: newCity.id, 
        value: ''
      })
    }
  }

  handleDeleteCityBtnClick(deleteBtn) {
    const {cities} = this.state;
    const citiesClone = cities.slice();
    
    for (let i = 0; i < citiesClone.length; i++) {
      if (citiesClone[i].id === +deleteBtn.id) citiesClone.splice(i, 1);
    }
    
    this.setState({
      activeCityId: '',
      cities: citiesClone
    });
  }

  render() {
    const {cities, activeCityId, value} = this.state;
    let activeCity;
    cities.forEach((item) => item.id === +activeCityId ? activeCity = item.city : '')

    return (
      <React.Fragment>
        <header className="header">
          <h1 className="header__name">Weather App</h1>
        </header>
        <hr className="header__line"></hr>
        <main className="main-wrapper">
          <AddCity  
            value={value}
            onChange={this.handleInputChange}
            onClick={this.handleSearchBtn}
          />
          <div className='main-info'>
            <Cities 
              data={cities} 
              onCityClick={this.handleCityClick} 
              activeCityId={activeCityId}
              onDeleteCityBtnClick={this.handleDeleteCityBtnClick}
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