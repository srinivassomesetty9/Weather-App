// actions/weatherActions.js
import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from "../types";
import { apiKey } from "../../Common";


// Define fetchWeatherByCoords action
export const fetchWeatherByCoords = (latitude, longitude) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_WEATHER_REQUEST });

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: FETCH_WEATHER_SUCCESS, payload: data });
      } else {
        dispatch({
          type: FETCH_WEATHER_FAILURE,
          payload: "Failed to fetch weather data",
        });
      }
    } catch (error) {
      dispatch({ type: FETCH_WEATHER_FAILURE, payload: error.message });
    }
  };
};

export const fetchCities = (query) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      );
      const data = await response.json();
      if (response.ok) {
        const cities = data.map((city) => city.name);
        return cities;
      } else {
        throw new Error("Failed to fetch city suggestions");
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      return [];
    }
  };
};

export const fetchWeather = (city) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_WEATHER_REQUEST });

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      // console.log(data, "ACTIOn");
      if (data) {
        dispatch({ type: FETCH_WEATHER_SUCCESS, payload: data });
      } else {
        dispatch({
          type: FETCH_WEATHER_FAILURE,
          payload: "Failed to fetch weather data",
        });
      }
    } catch (error) {
      dispatch({ type: FETCH_WEATHER_FAILURE, payload: error.message });
    }
  };
};
