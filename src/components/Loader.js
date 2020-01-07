import React from 'react';
import '../App.css';

function Loader(props) {
  return (
    <div className="weather-display">
      <div class="load-5">
        <div class="ring-2">
          <div class="ball-holder">
            <div class="ball"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Loader};