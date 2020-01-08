import React from 'react';
import {CityBtn} from './CityBtn';
import '../App.css';

function Cities(props){

  function handleDeleteBtnClick(deleteBtn) {
    props.onDeleteCityBtnClick(deleteBtn);
  }

  
  const {data, onCityClick, activeCityId} = props;

  return (
    <div className="cities-wrapper">
      <h2 className="cities-wrapper__label">Выберите город</h2>
      <div className="cities">
        {data.map(element => 
            <CityBtn 
              key={element.id} 
              id={element.id}
              name={element.city}
              onCityClick={onCityClick}
              onDeleteBtnClick={handleDeleteBtnClick}
              activeCityId={activeCityId}
            />
        )}
      </div>
    </div>
  )

}

export {Cities};