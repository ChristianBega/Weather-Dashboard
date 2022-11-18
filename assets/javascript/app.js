// Variable declarations
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-submit");
var dayForecast = document.getElementById("current-forecast");
var cityName = document.getElementById("city-name");
var date = document.getElementById("date");
var weatherIcon = document.getElementById("weather-icon");
var temperature = document.getElementById("temperature");
var windSpeeds = document.getElementById("wind-speeds");
var humidity = document.getElementById("humidity");
var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";
var apiKey = "898b277c6fc6f18c77b1aabe15516f58";
var cardBody = document.querySelectorAll(".card-body");
var buttonContainer = document.getElementById("recent-btn-container");

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API key}
// fetchCoords function - responsible for fetching api data

userForm.onsubmit = (e) => {
  e.preventDefault();
  var cityInput = userInput.value;
  fetchCoordinates(cityInput);
  renderButtons(cityInput);
  userInput.value = "";
  localStorage.setItem("previousButtons", JSON.stringify(previousButtons));
};

function fetchCoordinates(city) {
  // url end point for api
  var rootEndPoint = "https://api.openweathermap.org/geo/1.0/direct";
  // Concat url end point with needed query parameters
  // var apiCall = `${rootEndPoint}?q=${city}&appid=${apiKey}`;
  var apiCall = rootEndPoint + "?q=" + city + "&appid=" + apiKey;
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      fetchWeather(lat, lon);
    });
}

// fetchCoords function - responsible for fetching api data
function fetchWeather(lat, lon) {
  // var apiCall = `${weatherApi}lat=${lat}&lon${lon}&units=imperial&appid=${apiKey}`;
  var apiCall = weatherApi + "lat=" + lat + "&lon=" + lon + "&units=imperial&" + "appid=" + apiKey;
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // // take the temp and lets display to the user as an h1

      // // Create an h1 element dynamically
      // // add text to that html element
      // // append to dayForeCast
      renderDayForecast(data);
      renderCards(data);
    });

  // render the temperature as an h1 to the user
}

// responsible for the dynamic creation of the cards based on the data the user inputs
function renderCards(data) {
  // var iconUrl = `https://openweathermap.org/img/wn/${data.list[i].weather[i]["icon"]}.png`;
  for (let i = 1; i < data.list.length; i += 8) {
    var date = document.getElementById(`date${i}`);
    var icon = document.getElementById(`icon${i}`);
    var temp = document.getElementById(`temp${i}`);
    var wind = document.getElementById(`wind${i}`);
    var humidity = document.getElementById(`humidity${i}`);

    // date.textContent = data.list[i].dt_txt;
    date.textContent = data.list[i].dt_txt;
    temp.textContent = `Temperature: ${data.list[i].main.temp}`;
    wind.textContent = `Wind Speed: ${data.list[i].wind.speed}`;
    humidity.textContent = `Humidity: ${data.list[0].main.humidity} %`;
    // imgEl.src = iconUrl;
  }
}

function renderDayForecast(data) {
  var iconUrl = `https://openweathermap.org/img/wn/${data.list[0].weather[0]["icon"]}.png`;

  cityName.textContent = data.city.name;
  date.textContent = data.list[0].dt_txt;
  temperature.textContent = data.list[0].main.temp;
  windSpeeds.textContent = data.list[0].main.humidity;
  humidity.textContent = data.list[0].wind.speed;
  weatherIcon.src = iconUrl;
}

const previousButtons = JSON.parse(localStorage.getItem("previousButtons")) || [];
function renderButtons(newBtn) {
  previousButtons.push(newBtn);
  const newButtonEl = document.createElement("button");
  newButtonEl.classList.add("btn", "px-5", "bg-danger", "text-light", "w-100", "my-2"); 
  newButtonEl.textContent = newBtn;
  // newButtonEl.addEventListener("click", fetchCoordinates(cityInput));
  buttonContainer.append(newButtonEl);
}
previousButtons.forEach(renderButtons);
// function passedCities(e) {
//   e.preventDefault();
//   var button = e.target();
//   var cityInput = button.textContent;
//   fetchCoordinates(cityInput);
// }

// This function is responsible for form submission and by capturing user input
function localStorageSet(city) {
  let recentSearch = [];
  localStorage.setItem("city", city);
  recentSearch.push(city);
  console.log(city);
}

function localStoreGet(city) {
  localStorage.getItem("city");
  // renderButtons(city);
}
// Event listeners

var submitBtn = document.querySelector(".submit-btn");
// userForm.addEventListener("submit", handleFormSubmit);

// current and forecast weather - https://openweathermap.org/api/one-call-3
// geocoding api - https://openweathermap.org/api/geocoding-api

// onsubmit arrow function - https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
