// Variable declarations
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-submit");
var dayForecast = document.getElementById("current-forecast");
var weatherApi = "http://api.openweathermap.org/data/2.5/forecast?";
var apiKey = "898b277c6fc6f18c77b1aabe15516f58";
var cardBody = document.querySelectorAll(".card-body");
var buttonContainer = document.getElementById("recent-btn-container");

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API key}

// fetchCoords function - responsible for fetching api data
function fetchCoordinates(city) {
  // url end point for api
  var rootEndPoint = "http://api.openweathermap.org/geo/1.0/direct";
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

    //
    // cardBody.append(imgEl);
  }
}

function renderDayForecast(data) {
  var iconUrl = `https://openweathermap.org/img/wn/${data.list[0].weather[0]["icon"]}.png`;

  // Dom manipulation
  var h1El = document.createElement("h1");
  var h1El2 = document.createElement("h1");
  var h1El3 = document.createElement("h1");
  var h1El4 = document.createElement("h1");
  var h1El5 = document.createElement("h1");
  var imgEl = document.createElement("img");

  h1El.textContent = data.list[0].main.temp;
  h1El2.textContent = data.city.name;
  h1El3.textContent = data.list[0].dt_txt;
  // h1El3.textContent = data.list[0].dt_txt;
  h1El4.textContent = data.list[0].main.humidity;
  h1El5.textContent = data.list[0].wind.speed;
  imgEl.src = iconUrl;
  dayForecast.append(h1El2);
  dayForecast.append(h1El3);
  dayForecast.append(h1El4);
  dayForecast.append(h1El5);
  dayForecast.append(imgEl);
}

const previousButtons = JSON.parse(localStorage.getItem("previousButtons")) || [];
function renderButtons(newBtn) {
  previousButtons.push(newBtn);
  localStorage.setItem("previousButtons", JSON.stringify(previousButtons));

  const newButtonEl = document.createElement("button");
  newButtonEl.classList.add("btn", "px-5", "bg-dark", "text-light", "w-100", "my-2");
  newButtonEl.textContent = newBtn;
  buttonContainer.append(newButtonEl);
}
previousButtons.forEach(renderButtons);

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

userForm.onsubmit = (e) => {
  e.preventDefault();
  var cityInput = userInput.value;
  console.log(cityInput);
  fetchCoordinates(cityInput);
  renderButtons(cityInput);
  userInput.value = "";
};

// current and forecast weather - https://openweathermap.org/api/one-call-3
// geocoding api - https://openweathermap.org/api/geocoding-api
// function clearOpts() {
//   dayForecast.clear();
// }

// onsubmit arrow function - https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
