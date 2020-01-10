This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About project (dev version)

Проект представляет из себя небольшое погодное одностраничное веб-приложение.
Данные о погоде берутся с сайта [ openweathermap.org](https://openweathermap.org/).
Ниже представлены скриншоты приложения.

Приложение умеет:<br />
1. Автоматически запрашивать погоду по координатам пользователя - этот город становится городом по умолчанию.<br/>
2. Определять метосположение пользователя при нажатии на кнопки "Моё местоположение".<br/>
3. Реализована строка поиска города.<br/>
4. При поиске города или при определении местоположения, город добавляется в navbar, при условии, что такого города там еще нет.<br/>
5. Можно удалять города из navbar.<br/>
6. Показываются уведомления об ошибках, если возникают ошибки при запросе на API или ошибки при определении местоположения.<br/>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

![Скриншот приложения](https://github.com/AknietKh/React-Weather-App/raw/master/public/weather-app.png)
![Скриншот приложения](https://github.com/AknietKh/React-Weather-App/raw/master/public/weather-app__errors.png)