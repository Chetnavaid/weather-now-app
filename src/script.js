function formatDate(currentdate) {
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
  return `<strong>${day}, ${month} ${date}</strong> <br/>
  ${hours}:${minutes}`;
}
let updatedDate = document.querySelector(".day-date");
let now = new Date();

updatedDate.innerHTML = formatDate(now);

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  if (0 < minutes && minutes < 2) {
    return `${minutes} min`;
  } else {
    return `${minutes} mins`;
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayWeatherIcon(icon) {
  let iconClass = "";
  if (icon === "01d") {
    iconClass = `fa-solid fa-sun`;
  } else if (icon === "01n") {
    iconClass = `fa-solid fa-moon`;
  } else if (icon === "02d") {
    iconClass = `fa-solid fa-cloud-sun`;
  } else if (icon === "02n") {
    iconClass = `fa-solid fa-cloud-moon`;
  } else if (icon === "03d") {
    iconClass = `fa-solid fa-cloud`;
  } else if (icon === "03n") {
    iconClass = `fa-solid fa-cloud`;
  } else if (icon === "04d") {
    iconClass = `fa-solid fa-cloud`;
  } else if (icon === "04n") {
    iconClass = `fa-solid fa-cloud`;
  } else if (icon === "09d") {
    iconClass = `fa-solid fa-cloud-showers-heavy`;
  } else if (icon === "09n") {
    iconClass = `fa-solid fa-cloud-showers-heavy`;
  } else if (icon === "10d") {
    iconClass = `fa-solid fa-cloud-sun-rain`;
  } else if (icon === "10n") {
    iconClass = `fa-solid fa-cloud-moon-rain`;
  } else if (icon === "11d") {
    iconClass = `fa-solid fa-bolt-lightning`;
  } else if (icon === "11n") {
    iconClass = `fa-solid fa-bolt-lightning`;
  } else if (icon === "13d") {
    iconClass = `fa-solid fa-snowflake`;
  } else if (icon === "13n") {
    iconClass = `fa-solid fa-snowflake`;
  } else if (icon === "50d") {
    iconClass = `fa-solid fa-smog`;
  } else if (icon === "50n") {
    iconClass = `fa-solid fa-smog`;
  }
  return iconClass;
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
       <div class="forecast-icon">
       <i class="${displayWeatherIcon(forecastDay.weather[0].icon)}"></i>
       </div>
       <div class="forecast-temperature">
       <span class="forecast-temperature-max"> ${Math.round(
         forecastDay.temp.max
       )}?? </span>
        / <span class="forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )}??</span>
        </div>
       <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ec5ec2c021874c86f5deaee5a915b6ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherConditions(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity-value").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );

  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );

  celsiusTemp = Math.round(response.data.main.temp);
  document.querySelector("#current-temp").innerHTML = celsiusTemp;

  let timeElement = document.querySelector("#updated-time");
  timeElement.innerHTML = formatTime(response.data.dt * 1000);

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.innerHTML = `<i class= "${displayWeatherIcon(
    response.data.weather[0].icon
  )}"></i>`;

  getForecast(response.data.coord);
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
