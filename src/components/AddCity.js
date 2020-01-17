import React from 'react';
import '../App.css';

//Компонент рендерит поисковую строку и сообщения о невалидных данных
const AddCity = (props) => {
  const handleChange = (e) => {
    e.preventDefault();
    props.onChange(e.target);
  }

  const handleClick = (e) => {
    e.preventDefault();
    props.onClick(e);
  }

  const handleKeyDown = (e) => {
    props.onKeyDown(e);
  }

  const handleLocationClick = (e) => {
    props.onLocationClick(e);
  }

  return (
    <div className="search-wrapper">
      <div className="search">
        <input 
          type="text" 
          className="search_input"
          onChange={handleChange}
          value={props.value}
          placeholder="Погода в вашем городе..."
          onKeyDown={handleKeyDown}
        />
        <button id="searchBtn" className="search_btn" onClick={handleClick}></button>
        <span className="search_location" onClick={handleLocationClick}>
          <img className="search_location-img" src="https://img.icons8.com/color/48/000000/gps-device.png" alt='GPS'/>
          Моё местоположение
        </span>
		  </div>
    {props.searchErr === 'no value' && <div className="search-err-message"><span>Необходимо ввестиназвание города</span></div>}
    {props.searchErr === 'duplicate' && <div className="search-err-message"><span>Данный город уже был добавлен ранее</span></div>}
    </div>
  );
}

export {AddCity};