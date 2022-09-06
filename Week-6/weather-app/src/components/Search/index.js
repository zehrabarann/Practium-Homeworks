import { useContext } from "react"
import WeatherContext from "../../context/WeatherContext"

const Search = () => {
    const { weather1 } = useContext(WeatherContext)
    console.log('weather', weather1)


    return (
        <div className="container">
            <div className="weather-box">
                <div className="weather-top">
                    <h1>{weather1.name}</h1>
                    <img alt="weather" src={`icons/${weather1.weather[0].icon}.png`} />

                </div>
                <div className="weather-bottom">
                    <p>{weather1.sys.sunrise}</p>
                    {/* <h1>{weather1.main.feels_like}</h1>
                    <h1>{weather1.main.temp_max}</h1> */}
                    {/* <p>{weather1.weather[0].description}</p> */}
                </div>
            </div>
        </div>
    )
}

export default Search