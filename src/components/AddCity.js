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
    <div className="search">
      <input 
        type="text" 
        className="search-wrapper_input"
        onChange={handleChange}
      />
      <button className="search-btn" onClick={handleClick}></button>
		</div>
  );
}

export {AddCity};