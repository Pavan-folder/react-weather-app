import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [value1, setValue1] = useState("");
  const [weather, setWeather] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [ok, setOk] = useState(false);

  const handleInputChange = (e) => {
    setValue1(e.target.value);
  };

  const fetchWeather = () => {
    if (!value1.trim()) {
      alert("Please enter a city name.");
      return;
    }

    const apiKey = "777284349b5fa0554ad5e8ea62bd40a2";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value1}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          setOk(false);
          setWeather(null);
          alert("City not found!");
          return;
        }

        setWeather(data);
        setOk(true);

        const condition = data.weather[0].main;
        switch (condition) {
          case "Clouds":
            setImageUrl("https://up.yimg.com/ib/th?id=OIP.82FAs5Z8MRVehyW1Fj3y1QHaEf&pid=Api&rs=1&c=1&qlt=95&w=156&h=94");
            break;
          case "Clear":
            setImageUrl("https://wallpapercave.com/wp/wp5544455.jpg");
            break;
          case "Rain":
            setImageUrl("https://tse1.mm.bing.net/th?id=OIP.fkWr_1EeH5QcmzbfQ7GlvQHaE8&pid=Api&P=0&h=180");
            break;
          case "Thunderstorm":
            setImageUrl("https://tse3.mm.bing.net/th?id=OIP.MDm6UC0ixTnNwGvDw8YhsgHaE7&pid=Api&P=0&h=180");
            break;
          case "Snow":
            setImageUrl("https://tse1.mm.bing.net/th?id=OIP.4T-8vQVMsXZiX1I1c50EtAHaE4&pid=Api&P=0&h=180");
            break;
          case "Mist":
            setImageUrl("https://tse3.mm.bing.net/th?id=OIP.3Up8jUsps99LOeWSFpr_sQHaE8&pid=Api&P=0&h=180");
            break;
          default:
            setImageUrl("");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="container">
      <div className="search-box">
        <input type="text" placeholder="Search" value={value1} onChange={handleInputChange} />
        <button onClick={fetchWeather}>🔍</button>
      </div>

      {ok && weather && (
        <>
          <img className="weather-icon" src={imageUrl} alt="Weather" />
          <div className="temperature">{weather.main.temp}°C</div>
          <div className="city-name">{weather.name}</div>
          <div className="info-box">
            <div>
              <img src="https://cdn-icons-png.flaticon.com/128/481/481899.png" alt="Humidity" />
              <span>{weather.main.humidity}%</span>
              <span>Humidity</span>
            </div>
            <div>
              <img src="https://cdn-icons-png.flaticon.com/128/481/481896.png" alt="Wind" />
              <span>{weather.wind.speed} km/h</span>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

