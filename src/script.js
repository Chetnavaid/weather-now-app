function formatdate(currentdate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[currentdate.getDay()];
  let month = months[currentdate.getMonth()];
  let date = currentdate.getDate();
  let hours = currentdate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentdate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${date} <br/>
  ${hours}:${minutes}`;
}
let updatedDate = document.querySelector(".day-date");
let now = new Date();

updatedDate.innerHTML = formatdate(now);

function convertC() {
  let celsiusTemp = document.querySelector("#live-temp");
  celsiusTemp.innerHTML = `23°`;
  fahrenheitButton.innerHTML = "°F";
}
let celsiusButton = document.querySelector("#celsius-link");
celsiusButton.addEventListener("click", convertC);

function convertF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#live-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", convertF);

function displayWeatherConditions(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;

  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity-value").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "ec5ec2c021874c86f5deaee5a915b6ee";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

search("Dubai");

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ec5ec2c021874c86f5deaee5a915b6ee";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiEndpoint).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
