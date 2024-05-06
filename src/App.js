import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import HomePage from "./components/HomePage";
import WeatherDisplay from "./components/WeatherDisplay";
import { Provider } from "react-redux";
import store from "./redux/store";
import NoAuth from "./components/NoAuth";
import PrivateComponent from "./components/PrivateComponent";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/weather" element={<WeatherDisplay />} />
            <Route path="/home" element={<HomePage />} />
          </Route>

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/noauth" element={<NoAuth />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
