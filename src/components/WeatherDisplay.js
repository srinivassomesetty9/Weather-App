import React from "react";
import { Paper, Typography, Grid } from "@mui/material";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import WavesOutlinedIcon from "@mui/icons-material/WavesOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";

const WeatherDisplay = ({ weatherData, error }) => {
  // Error handling
  if (error) {
    return (
      <Paper
        elevation={3}
        style={{
          padding: "16px",
          textAlign: "center",
          borderRadius: "10px",
          backgroundColor: "rgba(173, 216, 230, 0.5)",
          backdropFilter: "blur(5px)",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" gutterBottom style={{ color: "#721c24" }}>
          Error Fetching Weather Data
        </Typography>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Paper>
    );
  }

  // Loading state or weather data not available
  if (!weatherData || !weatherData.main) {
    return (
      <Grid
        elevation={0}
        style={{
          padding: "16px",
          textAlign: "center",
          borderRadius: "10px",
          backgroundColor: "rgba(173, 216, 230, 0.5)",
          backdropFilter: "blur(5px)",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {/* Loading... */}! City Not Found / Try Entering Correct City Name
        </Typography>
      </Grid>
    );
  }

  const { name, weather, main, wind, sys } = weatherData;

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        backgroundColor: "rgba(173, 216, 230, 0.5)",
        backdropFilter: "blur(5px)",
        paddingTop: "20px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginBottom: "10px" }}
      >
        <Grid item>
          {weather && weather[0] && weather[0].icon && (
            <img
              src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
              alt="Weather Icon"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </Grid>
        <Grid item>
          {weather && weather[0] && weather[0].description && (
            <Typography variant="subtitle1">
              {weather[0].description}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {main.temp.toFixed(1)}°C
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Feels Like: {main.feels_like.toFixed(1)}°C
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Min: {main.temp_min.toFixed(1)}°C, Max: {main.temp_max.toFixed(1)}°C
      </Typography>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        style={{ marginTop: "20px" }}
      >
        <Grid item>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "rgb(104 153 169 / 50%)",
            }}
          >
            <Brightness5Icon
              style={{
                fontSize: "40px",
                marginBottom: "10px",
                color: "#ffcc35",
              }}
            />

            <Typography variant="h6" gutterBottom>
              Sunrise
            </Typography>
            <Typography variant="body2">
              {new Date(sys.sunrise * 1000).toLocaleTimeString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "rgb(104 153 169 / 50%)",
            }}
          >
            <Brightness6Icon
              style={{
                fontSize: "40px",
                marginBottom: "10px",
                color: "rgb(239 147 48)",
              }}
            />
            <Typography variant="h6" gutterBottom>
              Sunset
            </Typography>
            <Typography variant="body2">
              {new Date(sys.sunset * 1000).toLocaleTimeString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "rgb(104 153 169 / 50%)",
            }}
          >
            <CloudOutlinedIcon
              style={{
                fontSize: "40px",
                marginBottom: "10px",
                color: "rgb(53 95 255)",
              }}
            />
            <Typography variant="h6" gutterBottom>
              Humidity
            </Typography>
            <Typography variant="body2">{main.humidity}%</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "rgb(104 153 169 / 50%)",
            }}
          >
            <WavesOutlinedIcon
              style={{
                fontSize: "40px",
                marginBottom: "10px",
                color: "rgb(36 63 143)",
              }}
            />
            <Typography variant="h6" gutterBottom>
              Pressure
            </Typography>
            <Typography variant="body2">{main.pressure} hPa</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "rgb(104 153 169 / 50%)",
            }}
          >
            <WhatshotOutlinedIcon
              style={{
                fontSize: "40px",
                marginBottom: "10px",
                color: "rgb(53 151 255)",
              }}
            />
            <Typography variant="h6" gutterBottom>
              Wind Speed
            </Typography>
            <Typography variant="body2">{wind.speed} m/s</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WeatherDisplay;
