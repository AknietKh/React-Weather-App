import React from 'react';
import '../App.css';

function AddCity(props) {
  function handleChange(e) {
    e.preventDefault();
    props.onChange(e.target);
  }

  function handleClick(e) {
    e.preventDefault();
    props.onClick(e);
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
      />
      <button className="search_btn" onClick={handleClick}></button>
		</div>
    {props.searchErr === 'no value' && <div className="search-err-message"><span>Необходимо ввести название города</span></div>}
    {props.searchErr === 'duplicate' && <div className="search-err-message"><span>Данный город уже был добавлен ранее</span></div>}
    </div>
  );
}

export {AddCity};