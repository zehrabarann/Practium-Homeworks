import { useContext } from "react"
import WeatherContext from "../../context/WeatherContext"


const Forecast = () => {
    const { forecast, weather1 } = useContext(WeatherContext)
    console.log(forecast)

    //Get Days and Show week

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const dayInWeek = new Date().getDay()
    console.log(dayInWeek)
    const forecatDays = weekDays.slice(dayInWeek, weekDays.length).concat(weekDays.slice(0, dayInWeek))

    console.log(forecatDays)

    if (Object.keys(weather1).length > 0) {

        return (
            <>
                <label>Daily</label>
                <div className="daily-area">
                    {forecast.list?.splice(0, 7).map((item, index) => {
                        return (
                            <div className="daily-item" key={index}>
                                <p className="days">{forecatDays[index].slice(0, 3)}</p>
                                <img alt="weather" src={`icons/${item.weather[0].icon}.png`} />
                                <div className="temp-area">
                                    <p className="max-temp">{Math.round(weather1.daily[0].temp.max)}°C</p>
                                    <p className="min-temp">{Math.round(weather1.daily[0].temp.min)}°C</p>
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