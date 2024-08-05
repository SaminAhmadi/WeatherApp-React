import "./WeatherDetails.css";
import { FiDroplet } from "react-icons/fi";

function WeatherDetails({ condition, text }) {
  return (
    <div className="details-container">
      <div className="condition">
        <h3>{text}</h3>
        <FiDroplet
          style={{
            fontSize: "23px",
            backgroundColor: "#5c9ce4",
            color: "#fff",
            padding: "4px 3px",
            borderRadius: "6px",
          }}
        />
      </div>
      <div className="degree">
        <h2>{condition}</h2>
      </div>
    </div>
  );
}
export default WeatherDetails;
