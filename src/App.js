import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import WeatherDisplay from "./components/WeatherDisplay";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/weather" element={<WeatherDisplay />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
