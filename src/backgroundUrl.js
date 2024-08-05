import cloudyImage from "./assets/images/cloudy.jpg";
import sunnyImage from "./assets/images/bg4.jpg";
import rainImage from "./assets/images/Rain.jpg";
import snowImage from "./assets/images/snow.jpg";
import mistImage from "./assets/images/mist.jpg";
export const backgroundUrl = ({ weather }) => {
  console.log(weather);
  let sourcebg;
  if (weather === "Rain") {
    sourcebg = rainImage;
  } else if (weather === "Snow") {
    sourcebg = snowImage;
  } else if (weather === "Clouds") {
    sourcebg = cloudyImage;
  } else if (
    weather === "Mist" ||
    weather === "Fog" ||
    weather === "Smoke" ||
    weather === "Dust" ||
    weather === "Haze"
  ) {
    sourcebg = mistImage;
  } else {
    sourcebg = sunnyImage;
  }

  return sourcebg;
};
