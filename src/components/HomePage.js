import React, { useState, useEffect } from "react";
import { Container,TextField, Button, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeather,
  fetchWeatherByCoords,
} from "../redux/actions/weatherActions";
import WeatherDisplay from "./WeatherDisplay";
import TopBar from "./TopBar";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: weatherData, error } = useSelector((state) => state);

  useEffect(() => {
    fetchDefaultLocationWeather();
  }, []);

  const fetchDefaultLocationWeather = () => {
    if (!navigator.onLine) {
      setErrorMessage(
        "You are not connected to the internet. Please connect to see data"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(fetchWeatherByCoords(latitude, longitude));
      },
      (error) => {
        console.error("Error fetching default location weather:", error);
        setErrorMessage(
          "Error fetching default location weather. Please try again later."
        );
      }
    );
  };

  const handleSearch = () => {
    if (!navigator.onLine) {
      setErrorMessage("You are not connected to the internet.");
      return;
    }

    if (city.trim() !== "") {
      dispatch(fetchWeather(city)).then(() => {
        if (error) {
          setErrorMessage("City not found. Please enter a valid city name.");
        } else {
          setErrorMessage("");
        }
      });
      setCity("");
    }
  };

  return (
    <>
      <TopBar />
      <div className="home">
        <Container style={{ paddingTop: "70px" }}>
          {errorMessage ? (
            <Alert
              show={errorMessage}
              onClose={() => setErrorMessage(false)}
              dismissible
              style={{ marginTop: "10px" }}
              severity="warning"
            >
              {errorMessage}
            </Alert>
          ) : null}
          <div style={{ paddingTop: "20px" }}>
            <TextField
              label="Enter City"
              value={city}
              id="outlined-search"
              type="search"
              size="small"
              color="primary"
              style={{ marginRight: "5px" }}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button
              startIcon={<SearchIcon />}
              variant="contained"
              color="inherit"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          {/* {loading && <p>Loading...</p>} */}
          {error && <p>{error.message}</p>}
          {weatherData && <WeatherDisplay weatherData={weatherData} />}
        </Container>
      </div>
    </>
  );
};

export default HomePage;
