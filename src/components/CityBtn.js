import React from 'react';
import '../App.css';

function CityBtn(props) {
  function hadleClick(e) {
   props.onCityClick(e.target);
  }

  return (
    +props.activeCityId === props.id ?
    <div id={props.id} className="city__active" onClick={hadleClick}>{props.name}</div> : 
    <div id={props.id} className="city" onClick={hadleClick}>{props.name}</div>
  )
}

export {CityBtn};