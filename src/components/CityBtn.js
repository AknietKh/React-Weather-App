import React from 'react';
import '../App.css';

function CityBtn(props) {
  function hadleClick(e) {
   props.onCityClick(e.target);
  }

  function handleDeleteBtnClick(e) {
    e.preventDefault();
    props.onDeleteBtnClick(e.target);
  }

  return (
    +props.activeCityId === props.id ?
      <div className="city-wrapper city__active">
        <div id={props.id} className="city" onClick={hadleClick}>
          {props.name}
        </div>
        <button id={props.id} className="delete-city" onClick={handleDeleteBtnClick}>Удалить</button>
      </div> 
    : 
      <div className="city-wrapper">
        <div id={props.id} className="city" onClick={hadleClick}>
        {props.name}
        </div>
        <button id={props.id} className="delete-city" onClick={handleDeleteBtnClick}>Удалить</button>
      </div>
  )
}

export {CityBtn};