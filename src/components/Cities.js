import React from 'react';
import {CityBtn} from './CityBtn';
import '../App.css';

class Cities extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleCityClick = this.handleCityClick.bind(this);
  //   this.state = {
  //     activeCityId: 1
  //   }
  // };

  // handleCityClick(activeCity) {
  //   this.setState({activeCityId: activeCity.id})
  // }

  render() {
    const {data, onCityClick, activeCityId} = this.props;
    // const {} = this.state;

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