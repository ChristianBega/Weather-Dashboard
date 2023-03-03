import axios from "axios";
var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";
const API = {
  getCoordinates: (city) => {
    // End point to get city coordinates
    const rootEndPoint = "https://api.openweathermap.org/geo/1.0/direct";
    // Concat url end point with needed query parameters
    const apiCall = `${rootEndPoint}?q=${city}&appid=${process.env.REACT_APP_KEY_Open_Weather_API}`;
    return axios.get(apiCall).then((res) => {
      console.log(res.data);
      return res.data;
    });
  },
  getWeather: (lat, lon) => {
    const apiCall = `${weatherApi}lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_KEY_Open_Weather_API}`;
    return axios.get(apiCall).then((res) => {
      console.log(res.data);
      return res.data;
    });
  },
};

export default API;
