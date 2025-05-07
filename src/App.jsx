import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [value1, setvalue] = useState("");
  const [wheather1, setwheather] = useState(null);
  const [imh, setimg] = useState("");
  const [ok, setok] = useState(false);

  const oo = (e) => {
    setvalue(e.target.value);
  };

  const ll = () => {
    if (!wheather1 || !wheather1.weather) return;

    setok(true);
    const condition = wheather1.weather[0].main;

    if (condition === "Clouds") {
      setimg(
        "https://up.yimg.com/ib/th?id=OIP.82FAs5Z8MRVehyW1Fj3y1QHaEf&pid=Api&rs=1&c=1&qlt=95&w=156&h=94"
      );
    } else if (condition === "Clear") {
      setimg("https://wallpapercave.com/wp/wp5544455.jpg");
    } else if (condition === "Rain") {
      setimg(
        "https://tse1.mm.bing.net/th?id=OIP.fkWr_1EeH5QcmzbfQ7GlvQHaE8&pid=Api&P=0&h=180"
      );
    } else if (condition === "Thunderstorm") {
      setimg(
        "https://tse3.mm.bing.net/th?id=OIP.MDm6UC0ixTnNwGvDw8YhsgHaE7&pid=Api&P=0&h=180"
      );
    } else if (condition === "Snow") {
      setimg(
        "https://tse1.mm.bing.net/th?id=OIP.4T-8vQVMsXZiX1I1c50EtAHaE4&pid=Api&P=0&h=180"
      );
    } else if (condition === "Mist") {
      setimg(
        "https://tse3.mm.bing.net/th?id=OIP.3Up8jUsps99LOeWSFpr_sQHaE8&pid=Api&P=0&h=180"
      );
    } else {
      setimg(""); // default or unknown condition
    }
  };

  useEffect(() => {
    if (!value1) return;

    const apiKey = "777284349b5fa0554ad5e8ea62bd40a2";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value1}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setwheather(data);
        setok(false); // reset display until ll is clicked
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
      });
  }, [value1]);

  return (
    <div className="container">
      <div className="search-box">
        <input type="text" placeholder="Search" value={value1} onChange={oo} />
        <button onClick={ll}>🔍</button>
      </div>

      {ok && wheather1 && (
        <>
          <img className="weather-icon" src={imh} alt="Weather Icon" />
          <div className="temperature">{wheather1.main.temp}°C</div>
          <div className="city-name">{wheather1.name}</div>
          <div className="info-box">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/481/481899.png"
                alt="Humidity"
              />
              <span>{wheather1.main.humidity}%</span>
              <span>Humidity</span>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/481/481896.png"
                alt="Wind"
              />
              <span>{wheather1.wind.speed} km/h</span>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
