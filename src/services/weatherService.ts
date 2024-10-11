import axios from "axios";

const WEATHER_API_KEY = "ZYJY2KXDPVVX5ELBB9PZM9CSW";

export const getWeatherForecast = (
  city: string,
  startDate: string,
  endDate: string
) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${WEATHER_API_KEY}&contentType=json`;
  return axios.get(url).then((response) => response.data.days);
};

export const getTodayWeather = (city: string) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${WEATHER_API_KEY}&contentType=json`;
  return axios.get(url).then((response) => response.data.days[0]);
};
