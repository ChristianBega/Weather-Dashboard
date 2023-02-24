import axios from "axios";

var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";
var apiKey = "898b277c6fc6f18c77b1aabe15516f58";

const API = {
  getCoordinates: (city) => {
    // End point to get city coordinates
    const rootEndPoint = "https://api.openweathermap.org/geo/1.0/direct";
    // Concat url end point with needed query parameters
    const apiCall = `${rootEndPoint}?q=${city}&appid=${apiKey}`;
    return axios.get(apiCall).then((res) => {
      // console.log(res.data);
      return res.data;
    });
  },
  getWeather: (lat, lon) => {
    const apiCall = `${weatherApi}lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    return axios.get(apiCall).then((res) => {
      // console.log(res.data);
      return res.data;
    });
  },
};

export default API;
