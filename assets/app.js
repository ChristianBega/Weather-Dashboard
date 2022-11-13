// Variable declarations
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-submit");
var dayForecast = document.getElementById("current-forecast");
var weatherApi = "http://api.openweathermap.org/data/2.5/forecast?";
var apiKey = "898b277c6fc6f18c77b1aabe15516f58";

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API key}

// Functions
function fetchCoordinates(city) {
  // This will make the call to get the coordinates for that city
  var rootEndPoint = "http://api.openweathermap.org/geo/1.0/direct";
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

function fetchWeather(lat, lon) {
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
// responsible for the dynamic creation of the cards based on the data the user wants
//                 parameter
function renderCards(data) {
  index = data.length;
  // console.log(index);
  //
  // console.log(data);
  for (let i = 1; i < data.list.length; i += 8) {
    // Created elements
    // var testEl = document.createElement("div");
    // var testEl2 = document.createElement("div");
    // var testEl3 = document.createElement("p");

    // Change elements
    // testEl.classList.add("card");
    // testEl2.classList.add("card-body");
    // testEl3.textContent = data.list[i].dt_txt;

    // Append Elements
    // test.append(testEl);
    // testEl.appendChild(testEl2);
    // testEl2.appendChild(testEl3);

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
  }
}

function renderDayForecast(data) {
  console.log(data);
  // var test = data.list[0].weather[0].icon;
  // console.log(data.city.name);
  // console.log(data.list[0].dt_txt);
  // console.log(data.list[0].main.humidity);
  // console.log(data.list[0].wind.speed);
  // console.log(data.list[0].weather[0].icon);
  var test = `https://openweathermap.org/img/wn/${data.list[0].weather[0]["icon"]}`;
  console.log(test);

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
  imgEl.src = test;
  // imgEl.src = dayForecast.append(h1El);
  dayForecast.append(h1El2);
  dayForecast.append(h1El3);
  dayForecast.append(h1El4);
  dayForecast.append(h1El5);
  dayForecast.append(imgEl);
}

// This function is responsible for form submission and by capturing user input
function handleFormSubmit(e) {
  e.preventDefault();
  var cityInput = userInput.value;
  fetchCoordinates(cityInput);
  // localStorageSet(cityInput);
  // Make an api call with that search term and confirm data is sent back
}

function localStorageSet(city) {
  localStorage.setItem("city", city);
}

function localStoreGet() {
  var test = localStorageSet.getItem("city");
}
// Event listeners
userForm.addEventListener("submit", handleFormSubmit);

// current and forecast weather - https://openweathermap.org/api/one-call-3
// geocoding api - https://openweathermap.org/api/geocoding-api

// local storage -
// Create global empty array
// push that value (name of the city) to that array

// localStorage.getItem("cities");

// localStorage.setItem("cities");
// ["austin","denver"]
