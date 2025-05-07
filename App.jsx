import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [iconUrl, setIconUrl] = useState("");
  const [showWeather, setShowWeather] = useState(false);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (!city) return;

    const apiKey = "777284349b5fa0554ad5e8ea62bd40a2";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          alert("City not found!");
          return;
        }

        setWeatherData(data);
        const condition = data.weather[0].main;

        const images = {
          Clouds:
            "https://up.yimg.com/ib/th?id=OIP.82FAs5Z8MRVehyW1Fj3y1QHaEf&pid=Api&rs=1&c=1&qlt=95&w=156&h=94",
          Clear: "https://wallpapercave.com/wp/wp5544455.jpg",
          Rain: "https://tse1.mm.bing.net/th?id=OIP.fkWr_1EeH5QcmzbfQ7GlvQHaE8&pid=Api&P=0&h=180",
          Thunderstorm:
            "https://tse3.mm.bing.net/th?id=OIP.MDm6UC0ixTnNwGvDw8YhsgHaE7&pid=Api&P=0&h=180",
          Snow: "https://tse1.mm.bing.net/th?id=OIP.4T-8vQVMsXZiX1I1c50EtAHaE4&pid=Api&P=0&h=180",
          Mist: "https://tse3.mm.bing.net/th?id=OIP.3Up8jUsps99LOeWSFpr_sQHaE8&pid=Api&P=0&h=180",
        };

        setIconUrl(images[condition] || "");
        setShowWeather(true);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
      });
  };

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      {showWeather && weatherData && weatherData.main && (
        <>
          <img className="weather-icon" src={iconUrl} alt="Weather Icon" />
          <div className="temperature">{weatherData.main.temp}°C</div>
          <div className="city-name">{weatherData.name}</div>
          <div className="info-box">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/728/728093.png"
                alt="Humidity Icon"
                style={{ width: "24px", height: "24px" }}
              />
              <span>{weatherData.main.humidity}%</span>
              <span>Humidity</span>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/724/724742.png"
                alt="Air Flow Icon"
                style={{ width: "24px", height: "24px" }}
              />

              <span>{weatherData.wind.speed} km/h</span>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
