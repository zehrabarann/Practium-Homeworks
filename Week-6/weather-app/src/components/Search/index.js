import { useContext } from "react"
import WeatherContext from "../../context/WeatherContext"

const Search = () => {
    const { weather1 } = useContext(WeatherContext)
    console.log('weather', weather1)


    return (
        <div className="container">
            <div className="weather-box">
                <div className="weather-top">
                    <div className="name-image">
                        <h1>{weather1.name}</h1>
                        <img alt="weather" src={`icons/${weather1.weather[0].icon}.png`} />
                    </div>
                </div>
                <div className="weather-bottom">
                    <div className="weather-temp">
                        <p className="detail-temp">{weather1.main.feels_like}</p>
                    </div>
                    <div className="weather-detail">
                        <h4>Details</h4>
                        <div className="detail-values">
                            <label>Feels Like:</label>
                            <label> {weather1.main.feels_like}</label>
                        </div>
                        <div className="detail-values">
                            <label>Wind:</label>
                            {/* <label>{weather1.wind.speed}</label> */}
                        </div>
                        <div className="detail-values">
                            <label>Humidity:</label>
                            {/* <label>{weather1.main.humidity}</label> */}
                        </div>
                        <div className="detail-values">
                            <label>Pressure:</label>
                            {/* <label>{weather1.main.pressure}</label> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search