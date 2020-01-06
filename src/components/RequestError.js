import React from 'react';
import '../App.css';

function RequestError(props) {
 const errStatus = +props.errStatus;
  return (
    <div className="weather-display">
      <div className="weather-display__error">
        <h2>Произошла ошибка!</h2>
        {
          (errStatus >= 400 && errStatus < 500)  && 
          <p>Ошибка {errStatus} (Not Found). Данные не были получены, попробуйте еще раз.</p>
        }
        {
          (errStatus >= 500 && errStatus < 600)  && 
          <p>Сервер не отвечает, ошибка {errStatus}. Попробуйте позже.</p>
        }
      </div>
    </div>
  )
}

export {RequestError};