//Live Day/Date/Time
function dateFormat(current) {
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = dayNames[current.getDay()];

  let monthNumbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  let monthNumber = monthNumbers[current.getMonth()];

  let day = current.getDay();
  let year = current.getFullYear();
  let hour = current.getHours();
  let amPm = "am";

  if (hour >= 12) {
    hour = `${hour}` - 12;
    amPm = `pm`;
  }

  if (hour === 0) {
    hour = `12`;
    amPm = `am`;
  }

  let minutes = current.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${dayName} ${monthNumber}/${day}/${year} &nbsp ${hour}:${minutes}${amPm}`;
}

let currentDateTime = document.querySelector("#currentDateTime");
let current = new Date();
currentDateTime.innerHTML = dateFormat(current);

//display Weather Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayWeatherForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row week gradientP">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
        <div class="col-2">
          ${formatDay(forecastDay.time)}
          <div class="icon">
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
            class="importedIcon" />
            </div>
          <div class="weatherMax">${Math.round(
            forecastDay.temperature.maximum
          )}°</div>
          <div class="humidity"><i class="fa-solid fa-droplet rainDrop"></i> ${
            forecastDay.temperature.humidity
          }%</div>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//display Weather Info
function displayWeatherInfo(response) {
  document.querySelector("#currentCity").innerHTML = response.data.city;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    response.data.temperature.current
  )}°`;
  //document.querySelector("#maxTemp").innerHTML = `${Math.round(
  //response.data.main.temp_max
  //)}°`;
  //document.querySelector("#minTemp").innerHTML = `${Math.round(
  //response.data.main.temp_min
  //)}°`;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°`;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#windSpeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph`;

  let windDegree = response.data.wind.degree;
  if (windDegree === 0) {
    degreeLabel = ``;
  } else if (windDegree >= 337.55 || windDegree <= 22.54) {
    degreeLabel = "N";
  } else if (windDegree >= 22.55 && windDegree <= 67.54) {
    degreeLabel = "NE";
  } else if (windDegree >= 67.55 && windDegree <= 112.54) {
    degreeLabel = "E";
  } else if (windDegree >= 112.55 && windDegree <= 157.54) {
    degreeLabel = "SE";
  } else if (windDegree >= 157.55 && windDegree <= 202.54) {
    degreeLabel = "S";
  } else if (windDegree >= 202.55 && windDegree <= 247.54) {
    degreeLabel = "SW";
  } else if (windDegree >= 247.55 && windDegree <= 292.54) {
    degreeLabel = "W";
  } else if (windDegree >= 292.55 && windDegree <= 337.54) {
    degreeLabel = "NW";
  }

  document.querySelector("#windDir").innerHTML = `${degreeLabel}`;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  //let theDate = new Date(response.data.sys.sunrise);
  //document.querySelector("#sunrise").innerHTML = theDate.toLocaleString();
  //console.log(theDate.toLocaleString());

  //sunrise();
  //document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  //document.querySelector("#sunset").innerHTML = response.data.sys.sunset;

  let lat = response.data.coordinates.latitude;
  let lon = response.data.coordinates.longitude;
  let units = "imperial";
  let apiKey = "0bbef54a49efc7of4df96ea8t63e36a3";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/forecast";
  let apiUrl = `${apiEndpoint}?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherForecast);
  console.log(apiUrl);
}

//Search Bar
function searchCity(city) {
  let units = "imperial";
  let apiKey = "0bbef54a49efc7of4df96ea8t63e36a3";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiEndpoint}?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherInfo);
  console.log(apiUrl);
}

function searchBar(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearchInput").value;
  searchCity(city);
}

let citySearch = document.querySelector("#citySearchForm");
citySearch.addEventListener("submit", searchBar);

//Button
function processLatLon(response) {
  let city = response.data.city;

  searchCity(city);
}

function locateCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "0bbef54a49efc7of4df96ea8t63e36a3";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiEndpoint}?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(processLatLon);
  console.log(apiUrl);
}

function currentLocationPlaceTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateCurrentLocation);
}

let currentCityButton = document.querySelector("#buttonCurrentCity");
currentCityButton.addEventListener("click", currentLocationPlaceTemp);

//Default City
searchCity("Detroit");
