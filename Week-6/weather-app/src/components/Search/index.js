import { useContext } from "react"
import WeatherContext from "../../context/WeatherContext"

const Search = () => {
    const { weather1, forecast } = useContext(WeatherContext)
    console.log('weather', weather1)

    if (Object.keys(weather1).length > 0) {

        return (
            <div className="container">
                <div className="weather-box">
                    <div className="weather-top">
                        <div className="name-image">
                            <h1>{forecast.city.name}</h1>
                            <h3>{forecast.list[0].weather[0].description}</h3>
                        </div>
                        <img alt="weather" src={`icons/${weather1?.daily[0].weather[0].icon}.png`} />
                    </div>
                    <div className="weather-bottom">
                        <p className="detail-temp">{Math.floor(weather1.daily[0].temp.day)}°C</p>
                        <div className="detail">
                            <div className="weather-detail">
                                <h4>Details</h4>
                                <div className="detail-values">
                                    <label>Max Temp:</label>
                                    <label> {Math.floor(weather1.daily[0].temp.max)}°C</label>
                                </div>
                                <div className="detail-values">
                                    <label>Min Temp:</label>
                                    <label>{Math.floor(weather1.daily[0].temp.min)}°C</label>
                                </div>
                                <div className="detail-values">
                                    <label>Wind Speed:</label>
                                    <label>{weather1.daily[0].wind_speed}ms</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    return (
        <>Loading</>
    )
}

export default Search