

const WeatherCard = ({ data }) => {
  return (
    <div className="weatherCard">
      <div className="result">
        {
          // when city is not valid
          data.data.cod === "404" ? (
            <h1>City Not Found</h1>
          ) : (
            <>
              <p className="nameOfCity">
                {data.data.name}, {data.data.sys.country}
              </p>
              <p>Humidity: {data.data.main.humidity}%</p>
              <p>
                Current temperature:{" "}
                <span>
                  <strong>
                    {Math.round(data.data.main.temp)} <sup>o</sup>F
                  </strong>
                </span>
              </p>
              <p>
                Feels Like{" "}
                <span>
                  <strong>
                    {Math.round(data.data.main.feels_like)} <sup>o</sup>F
                  </strong>
                </span>
              </p>
              <p>
                Max:{" "}
                <strong>
                  {Math.round(data.data.main.temp_max)}
                  <sup>o</sup>F
                </strong>{" "}
                Min:{" "}
                <strong>
                  {Math.round(data.data.main.temp_min)}
                  <sup>o</sup>F
                </strong>
              </p>
              <div className="weatherIconDiv">
                <div id="description">
                  <p className="description">
                    {data.data.weather[0].description}
                  </p>
                </div>
                <div id="icon">
                  <img
                    className="weatherIcon"
                    src={`http://openweathermap.org/img/wn/${data.data.weather[0].icon}@4x.png`}
                    alt={"Icon from Open Weather Api"}
                  />
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default WeatherCard;