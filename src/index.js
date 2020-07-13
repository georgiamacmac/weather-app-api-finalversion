// Current Date
let now = new Date();
console.log(now);

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
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${hour}:${minutes}`;

let currentDateandTime = `${day}, ${hour}:${minutes}`;

if (hour < 10) {
  let hour = `0${hours}`;
}
//if (minutes < 10) {
//let minutes = `0${minutes}`;
//}

function showTemperature(response) {
  let weatherTemp = document.querySelector("#current-temp");
  let tempNow = Math.round(response.data.main.temp);

  weatherTemp.innerHTML = `${tempNow}`;

  let description = document.querySelector("#weather-details");
  description.innerHTML = response.data.weather[0].main;
  //console.log(response);
  let feels = document.querySelector("#feels-like");
  feels.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )} ºC`;

  let humidity = response.data.main.humidity;
  let div = document.querySelector(`#humidity`);
  div.innerHTML = `Humidity: ${humidity} %`;

  let windBlowing = document.querySelector("#wind-blowing");
  windBlowing.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
}
function searchCity(event) {
  event.preventDefault();
  let apiKey = "c54fde1d9add944a5b0b98b1114e48fd";
  let typeCity = document.querySelector("#search-bar");
  let h1 = document.querySelector("#new-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typeCity.value}&units=metric&appid=${apiKey}`;
  h1.innerHTML = `${typeCity.value}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#find-city");
searchForm.addEventListener("submit", searchCity);

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
