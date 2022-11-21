// Variable declarations
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-submit");
var submitBtn = document.querySelector(".submit-btn");
var clearBtn = document.getElementById("clear-btn");
var dayForecast = document.getElementById("current-forecast");
var cityName = document.getElementById("city-name");
var date = document.getElementById("date");
var weatherIcon = document.getElementById("weather-icon");
var temperature = document.getElementById("temperature");
var windSpeeds = document.getElementById("wind-speeds");
var humidity = document.getElementById("humidity");
var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";
var apiKey = "898b277c6fc6f18c77b1aabe15516f58";
var cardContainer = document.getElementById("card-container");
var buttonContainer = document.getElementById("recent-btn-container");

// Event listener to listen for click events on form
userForm.onsubmit = (e) => {
  e.preventDefault();
  var cityInput = userInput.value;
  fetchCoordinates(cityInput);
  userInput.value = "";

  let cities = JSON.parse(localStorage.getItem("previousButtons")) || [];

  let filteredData = cities.filter((city) => city === cityInput);
  console.log(filteredData);

  if (filteredData.length === 0) {
    cities.push(cityInput);
  } else {
  }
  // Setting search result to local storage
  console.log(cities);
  console.log(cities[0]);
  localStorage.setItem("previousButtons", JSON.stringify(cities));
  renderButtons(cities);
};

// Function responsible for fetching api data
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

// Function responsible for fetching api data
function fetchWeather(lat, lon) {
  var apiCall = weatherApi + "lat=" + lat + "&lon=" + lon + "&units=imperial&" + "appid=" + apiKey;
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderDayForecast(data);
      renderCards(data);
    });
}

// Function responsible for dynamically creating 5 day forecast
function renderCards(data) {
  cardContainer.innerHTML = "";
  let card = "";
  for (let i = 1; i < data.list.length; i += 8) {
    const res = data.list[i];
    let newDate = new Date(data.list[i].dt_txt);
    let iconUrl = `https://openweathermap.org/img/wn/${res.weather[0].icon}.png`;
    // Template literal that will create each day forecast card
    card += `
    <div class="card m-4 shadow-lg">
      <div class="card-body text-white bg-dark rounded">
        <p class="fw-bold fs-4">${newDate.toLocaleDateString("en-us", { year: "numeric", month: "numeric", day: "numeric" })}</p>
        <img src="${iconUrl}"></img>
        <p>Temp: ${res.main.temp}${"\u00B0F"}</p>
        <p>Wind: ${res.wind.speed} MPH</p>
        <p>Humidity: ${res.main.humidity} %</p>
      </div>
    </div>
    `;
  }
  $("#card-container").append(card);
}

// Function responsible for updating the current day forecast
function renderDayForecast(data) {
  var iconUrl = `https://openweathermap.org/img/wn/${data.list[0].weather[0]["icon"]}.png`;
  let newDate = new Date(data.list[0].dt_txt);

  cityName.textContent = data.city.name;
  date.textContent = newDate.toLocaleDateString("en-us", { year: "numeric", month: "numeric", day: "numeric" });
  temperature.textContent = `Temp: ${data.list[0].main.temp}${"\u00B0F"}`;
  windSpeeds.textContent = `Wind: ${data.list[0].main.humidity} MPH`;
  humidity.textContent = `Humidity: ${data.list[0].wind.speed} %`;
  weatherIcon.src = iconUrl;
}

// Getting search result from local storage (an array of search results)
const previousButtons = JSON.parse(localStorage.getItem("previousButtons")) || [];
console.log(previousButtons);
// Function responsible for dynamically creating recent searches buttons
function renderButtons(newBtn) {
  buttonContainer.innerHTML = "";
  for (let i = 0; i < newBtn.length; i++) {
    const newButtonEl = document.createElement("button");
    newButtonEl.classList.add("btn", "recentSearch", "px-5", "bg-success", "text-light", "w-100", "my-2");
    newButtonEl.textContent = newBtn[i];
    buttonContainer.append(newButtonEl);
  }
}
// For each previous button, call renderButtons function to create each search button
// previousButtons.forEach(renderButtons);
// Event listener to listen for click events in buttonContainer
buttonContainer.addEventListener("click", function (e) {
  let recentCities = e.target.innerText;
  fetchCoordinates(recentCities);
});

// Event listener to listen for click events on clearBtn
clearBtn.addEventListener("click", function () {
  // Clears local storage
  window.localStorage.clear();
  // Clears text-container, buttonContainer, and cardContainer
  buttonContainer.textContent = "";
  cardContainer.textContent = "";
});

// Resources ::

// current and forecast weather - https://openweathermap.org/api/one-call-3
// geocoding api - https://openweathermap.org/api/geocoding-api
// onsubmit arrow function - https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
// forEach () - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// toLocaleDateString () - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
// template literals - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
