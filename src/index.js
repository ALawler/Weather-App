import "./styles.css";

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

//Wind Cardinal Direction

//display Weather Info

function displayWeatherInfo(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#maxTemp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#minTemp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph`;

  function windDegreeLabel() {
    if (windDegree === 0) {
      degreeLabel = ``;
    } else {
      if (windDegree >= 337.55) {
        degreeLabel = "N";
      } else {
        if (windDegree <= 22.54) {
          degreeLabel = "N";
        } else {
          if (windDegree >= 22.55) {
            degreeLabel = "NE";
          } else {
            if (windDegree <= 67.54) {
              degreeLabel = "NE";
            } else {
              if (windDegree >= 67.55) {
                degreeLabel = "E";
              } else {
                if (windDegree <= 112.54) {
                  degreeLabel = "E";
                } else {
                  if (windDegree >= 112.55) {
                    degreeLabel = "SE";
                  } else {
                    if (windDegree <= 157.54) {
                      degreeLabel = "SE";
                    } else {
                      if (windDegree >= 157.55) {
                        degreeLabel = "S";
                      } else {
                        if (windDegree <= 202.54) {
                          degreeLabel = "S";
                        } else {
                          if (windDegree >= 202.55) {
                            degreeLabel = "SW";
                          } else {
                            if (windDegree <= 247.54) {
                              degreeLabel = "SW";
                            } else {
                              if (windDegree >= 247.55) {
                                degreeLabel = "W";
                              } else {
                                if (windDegree <= 292.54) {
                                  degreeLabel = "W";
                                } else {
                                  if (windDegree >= 292.55) {
                                    degreeLabel = "NW";
                                  } else {
                                    if (windDegree <= 337.54) {
                                      degreeLabel = "NW";
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log(windDegree);
    console.log(degreeLabel);
    return `${degreeLabel}`;
    console.log(degreeLabel);
  }

  let degreeLabel = document.querySelector("#windDir");
  let windDegree = response.data.wind.deg;

  //document.querySelector("#description").innerHTML = response.data.weather.description;
  //document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  //document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
}

//Search Bar
function searchCity(city) {
  let units = "imperial";
  let apiKey = "8ef8ca0ec715c44991bd49b28615705a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherInfo);
}

function searchBar(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearchInput").value;
  searchCity(city);
}

let citySearch = document.querySelector("#citySearchForm");
citySearch.addEventListener("submit", searchBar);

//Button
function locateCurrentLocation(position) {
  let units = "imperial";
  let apiKey = "8ef8ca0ec715c44991bd49b28615705a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherInfo);
}

function currentLocationPlaceTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateCurrentLocation);
}

let currentCityButton = document.querySelector("#buttonCurrentCity");
currentCityButton.addEventListener("click", currentLocationPlaceTemp);

//Default City
searchCity("Detroit");
