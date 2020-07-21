function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}
// console.log(now);

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

//let currentDate = document.querySelector("#current-date");
//currentDate.innerHTML = `${formatDate}, ${formatHours}`;

// let currentDateandTime = `${day}, ${hour}:${minutes}`;

//let day = days[now.getDay()];
//let hour = now.getHours();
//let minutes = now.getMinutes();

//if (hour < 10) {
// let hour = `0${hours}`;
//}
//if (minutes < 10) {
//let minutes = `0${minutes}`;
//}

function showTemperature(response) {
  let weatherTemp = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#weather-details");
  let feels = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windBlowing = document.querySelector("#wind-blowing");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#current-icon");

  celsiusTemperature = response.data.main.temp;

  weatherTemp.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;
  feels.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )} ºC`;
  humidityElement.innerHTML = `Humidity:${response.data.main.humidity} %`;
  windBlowing.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 12; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
       <div class="col-2">
      <p>
        ${formatHours(forecast.dt * 1000)}
      </p>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
      </div>
  `;
  }
}

function search(city) {
  let apiKey = "c54fde1d9add944a5b0b98b1114e48fd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//function searchCity(event) {
//event.preventDefault();
//let apiKey = "c54fde1d9add944a5b0b98b1114e48fd";
//let typeCity = document.querySelector("#search-bar");
//let h1 = document.querySelector("#new-city");
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typeCity.value}&units=metric&appid=${apiKey}`;
//h1.innerHTML = `${typeCity.value}`;
//axios.get(apiUrl).then(showTemperature);
//}

//let searchForm = document.querySelector("#find-city");
//searchForm.addEventListener("submit", searchCity);

function retrieveLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c54fde1d9add944a5b0b98b1114e48fd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(retrieveLocation);
}

function showWeatherNow(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

let weatherNowButton = document.querySelector("#location-button");
weatherNowButton.addEventListener("click", showWeatherNow);

search("Toronto");
