import WeatherDetails from "./Components/WeatherDetails/WeatherDetails";
import { IoMdSearch } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa6";
import "./App.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { backgroundUrl } from "./backgroundUrl";
import cloudyImage from "./assets/images/cloudy.jpg";
import sunnyImage from "./assets/images/bg4.jpg";
import rainImage from "./assets/images/Rain.jpg";
import snowImage from "./assets/images/snow.jpg";
import mistImage from "./assets/images/mist.jpg";

function App() {
  let [currentLocation, setCurrentLocation] = useState("Gorgan");
  let [weatherData, setWeatherData] = useState({});
  let weatherConditions = {
    Clouds: "ابری",
    Sunny: "آفتابی",
    Rain: "بارانی",
    Mist: "مه آلود",
    Snow: "برفی",
    Smoke: "دودی",
    Dust: "غبارآلود",
    Haze: "مه آلود",
    Fog: "مه آلود",
    Clear: "آسمان صاف",
    Thunderstorm: "رعد و برق",
    Sand: "ماسه ای",
    Tornado: "گردباد",
  };
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=25b62347c5379fde164d3bba0f49c79c&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod == 404) {
          Swal.fire({
            icon: "error",
            title: "خطا",
            text: "اسم شهر یا کشور رو اشتباه زدی (:",
          });
        } else {
          console.log(data);
          setWeatherData(data);
        }
      });
  }, [currentLocation]);

  const searchHandler = (event) => {
    if (event.key === "Enter") {
      setCurrentLocation(event.target.value);
    }
  };

  return (
    <div className="container">
      <div className="right">
        <div className="weather-nav">
          <h3>Forcasting Weather</h3>
          <p>:آب و هوای امروز رو چک کن</p>
        </div>
        <div className="weather-location">
          <div className="weather-location_info">
            <FaLocationArrow style={{ fontSize: "25px", color: "#5c9ce4" }} />
            {typeof weatherData.sys !== "undefined" &&
            weatherData.name !== "undefined " ? (
              <h3>
                {weatherData.name},{weatherData.sys.country}
              </h3>
            ) : (
              ""
            )}
          </div>
          <h1>
            {typeof weatherData.main !== "undefined"
              ? `${Math.round(weatherData.main.temp)}`
              : ""}
            &#176;
          </h1>
          <img
            src={
              typeof weatherData.weather !== "undefined"
                ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
                : ""
            }
            alt="weather-icon"
          />
        </div>

        <div className="weather-details">
          <p>:اطلاعات بیشتر راجع به آب و هوای امروز</p>
          <div className="weather-details_container">
            <WeatherDetails
              condition={weatherData.main && weatherData.main.humidity}
              {...weatherData}
              text="رطوبت"
            />
            <WeatherDetails
              condition={weatherData.main && weatherData.main.pressure}
              {...weatherData}
              text={"فشار"}
            />
            <WeatherDetails
              condition={
                weatherData.main && Math.round(weatherData.main.temp_min)
              }
              {...weatherData}
              text={"پایین ترین دما"}
            />
            <WeatherDetails
              condition={
                weatherData.main && Math.round(weatherData.main.temp_max)
              }
              {...weatherData}
              text={"بالا ترین دما"}
            />
            <WeatherDetails
              condition={weatherData.visibility}
              {...weatherData}
              text={"بازه دید"}
            />
            <WeatherDetails
              condition={weatherData.wind && weatherData.wind.speed}
              {...weatherData}
              text={"سرعت باد"}
            />
          </div>
        </div>
      </div>
      <div
        className="left"
        style={
          typeof weatherData.weather !== "undefined"
            ? {
                background: `url(${backgroundUrl({
                  weather: weatherData.weather[0].main,
                })})no-repeat center / cover`,
              }
            : {}
        }
      >
        <div className="weather-search">
          <input
            type="text"
            placeholder="اسم یک شهر رو بنویس"
            onKeyDown={searchHandler}
          />
          <div className="search-icon">
            <IoMdSearch style={{ color: "#5c9ce4" }} />
          </div>
        </div>
        <div className="weather-condition">
          <span>
            {typeof weatherData.weather !== "undefined"
              ? `${weatherConditions[weatherData.weather[0].main]}`
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
export default App;
