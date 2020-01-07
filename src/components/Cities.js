import React from 'react';
import {CityBtn} from './CityBtn';
import '../App.css';

class Cities extends React.Component {

  render() {
    const {data, onCityClick, activeCityId} = this.props;

    return (
      <div className="cities-wrapper">
        <h2 className="cities-wrapper__label">Select a city</h2>
        <div className="cities">
          {data.map(element => 
              <CityBtn 
                key={element.id} 
                id={element.id}
                name={element.city}
                onCityClick={onCityClick}
                activeCityId={activeCityId}
              />
          )}
        </div>
      </div>
    )
  }
}

export {Cities};