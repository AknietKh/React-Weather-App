import React from 'react';
import {Cities} from './components/Cities';
import {WeatherDisplay} from './components/WeatherDisplay';
import {AddCity} from './components/AddCity';
import { Loader } from './components/Loader';
import './App.css'
import { RequestError } from './components/RequestError';

// import { CityBtn } from './components/CityBtn';

let CITIES = [
  {
    "id": 1,
    "city": "New York"
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
    this.handleLocationClick = this.handleLocationClick.bind(this);
    this.validate = this.validate.bind(this);
    this.fetchDataByGeo = this.fetchDataByGeo.bind(this);
    this.geoLocation = this.geoLocation.bind(this);

    this.state = {
      cities: CITIES,
      activeCityId: null,
      value: '',
      searchErr: '',
      weatherDataByGeo: null,
      loading: false,
      errGeo: null
    }
  }

  fetchDataByGeo(latitude, longitude) {
    const APPID = 'ef598dd48091a3a2eb6a63ef6c4d75b2'
    const URL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + 
          latitude + '&lon=' + longitude + `&units=metric&lang=ru&APPID=${APPID}`;

    this.setState({loading: true});

    fetch(URL).then(response => {
      if (response.ok) {
        return response.json(); 
      } else {
        throw response.status
      }
    })
    .then(data => {
      console.log(data);
      this.setState({
        weatherDataByGeo: data,
        loading: false
      });
    })
    .catch(err => {
      console.warn('Данные не были получены, ошибка: ' + err);
    })
  }

  geoLocation() {
    if("geolocation" in  navigator){
      console.log('navigator');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("loading");
          this.fetchDataByGeo(position.coords.latitude, position.coords.longitude)
        },
        (err) => {
          console.log(err.code, err.message);
          this.setState({errGeo: err});
        } //Если данные не получены, то показывать ReqestError на 177 строке
      )
    } else {
      alert('Геолакация не поддерживается вашим браузером.'
            + 'Используйте другой браузер или обновите ваш браузер до последней версии.' )
    }
  }
 
  //функция валидации для поиска. Не дает добавить город, если ничего не введенно в поиск
  //так же не дает добавить город, который уже есть в navbar
  validate(value) {
    const {cities} = this.state;
    if (!value) return 'no value';

    for (let i = 0; i < cities.length; i++) {
      if (cities[i].city === value.trim()) return 'duplicate';
    }
    
    return 'true';
  }

  handleCityClick(activeCity) {
    this.setState({activeCityId: activeCity.id, errGeo: null})
  }

  handleInputChange(input) {
    const value = input.value.slice(0,1).toUpperCase() + input.value.slice(1).toLowerCase();
    this.setState({value: value});
  }

  handleSearchBtn(event) {
    if (event.key === 'Enter' || event.target.id === 'searchBtn') {
      const {cities, value} = this.state;
      const validateResult = this.validate(value);
      const citiesClone = cities.slice();
      
      if (validateResult === 'true') {
        const newCity = {
          id: cities[cities.length-1].id + 1,
          city: value
        }
        citiesClone.push(newCity);
        
        this.setState({
          cities: citiesClone,
          activeCityId: newCity.id, 
          value: '',
          searchErr: '',
          errGeo: null
        })
      } else if (validateResult === 'duplicate') {
        this.setState({value: '', searchErr: 'duplicate', errGeo: null})
      } else this.setState({searchErr: 'no value', errGeo: null})
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

  handleLocationClick(e) {
    const {errGeo} = this.state;
    errGeo && this.setState({errGeo: null});
    this.geoLocation();
  }

  componentDidMount() {
    alert(`
    Для корректной работы приложения необходимо дать разрешение на доступ к геоданным.
    (Нажмите "разрешить" в следующем всплывающем окне в правом углу поисковой строки браузера).
    Это необходимо для автоматического определения местоположения и последующего определения
    местоположения при запросе.
    `)
    this.geoLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    const {cities, weatherDataByGeo} = this.state;
    const citiesClone = cities.slice();
    if (prevState.weatherDataByGeo !== weatherDataByGeo) {
      let duplicate = true;
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].city === weatherDataByGeo.name) {
          duplicate = false;
          this.setState({activeCityId: i+1});
        }
      }
      if (duplicate) {
        const newCity = {
          id: cities[cities.length-1].id + 1,
          city: weatherDataByGeo.name
        }
        citiesClone.push(newCity);
        
        this.setState({
          cities: citiesClone,
          activeCityId: newCity.id
        })
      }
      
    }

  }

  render() {
    const {cities, activeCityId, value, searchErr} = this.state;
    const { weatherDataByGeo, loading, errGeo} = this.state;
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
            searchErr={searchErr}
            onKeyDown={this.handleSearchBtn}
            onLocationClick={this.handleLocationClick}
          />
          <div className='main-info'>
            <Cities 
              data={cities} 
              onCityClick={this.handleCityClick} 
              activeCityId={activeCityId}
              onDeleteCityBtnClick={this.handleDeleteCityBtnClick}
            />
            {
              !loading && !errGeo && (activeCityId || weatherDataByGeo ? 
              <WeatherDisplay activeCity={activeCity} weatherDataByGeo={weatherDataByGeo}/> : 
              <div className="weather-display">
                <p className="weather-display__loader">Выберите город</p>
              </div>)
            }
            { loading && <Loader /> }
            { errGeo && <RequestError errGeo={errGeo}/>}
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default App;