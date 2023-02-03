var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";
var apiKey = "898b277c6fc6f18c77b1aabe15516f58";

const API = {
  getCoordinates: (city) => {
    var rootEndPoint = "https://api.openweathermap.org/geo/1.0/direct";
    // Concat url end point with needed query parameters
    var apiCall = rootEndPoint + "?q=" + city + "&appid=" + apiKey;
    return fetch(apiCall)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        // console.log("data from response", lat, lon);
        return [lat, lon];
      });
  },
  getWeather: (lat, lon) => {
    var apiCall = weatherApi + "lat=" + lat + "&lon=" + lon + "&units=imperial&" + "appid=" + apiKey;
    return fetch(apiCall)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log("data from response", data);
        return data;
      });
  },
};

export default API;
