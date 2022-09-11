import { useContext } from "react"
import WeatherContext from "../../context/WeatherContext"


const Forecast = () => {
    const { forecast, weather1 } = useContext(WeatherContext)
    console.log(forecast)

    //Get Days and Show week

    const convertDay = (dt, weekday) => {
        return new Date(dt * 1000).toLocaleDateString('tr', {
            weekday: weekday,
        });
    };

    if (Object.keys(weather1).length > 0) {
        return (
            <>
                <label>Daily</label>
                <div className="daily-area">
                    {weather1.daily?.map((item, index) => {
                        return (
                            <div className="daily-item" key={index}>
                                <p className="days">{convertDay(item.dt, 'short')}</p>
                                <img alt="weather" src={`icons/${item.weather[0].icon}.png`} />
                                <div className="temp-area">
                                    <p className="max-temp">{Math.round(item.temp.max)}°C</p>
                                    <p className="min-temp">{Math.round(item.temp.min)}°C</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default Forecast