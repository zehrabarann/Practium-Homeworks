import { useContext } from "react"
import WeatherContext from "../../context/WeatherContext"


const Forecast = () => {
    const { forecast } = useContext(WeatherContext)
    console.log(forecast)

    //Get Days and Show week

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const dayInWeek = new Date().getDay()
    console.log(dayInWeek)
    const forecatDays = weekDays.slice(dayInWeek, weekDays.length).concat(weekDays.slice(0, dayInWeek))

    console.log(forecatDays)





    return (
        <>
            <label>Daily</label>
            <div className="daily-area">
                {forecast.list?.splice(0, 7).map((item, index) => {
                    return (
                        <div className="daily-item" key={index}>
                            <p className="days">{forecatDays[index]}</p>
                            <p className="desc">{item.weather[0].description}</p>
                            <img alt="weather" src={`icons/${item.weather[0].icon}.png`} />
                            {/* <p>{Math.round(item.main.temp_min)}°C / {""} {Math.round(item.main.temp_max)}°C </p> */}
                            <div className="temp-area">
                                <p className="max-temp">{String(Math.round(item.main.temp_max)).slice(0,2)}°C </p>
                                <p className="min-temp">{String(Math.round(item.main.temp_min)).slice(0,2)}°C </p>
                            </div>




                        </div>
                    )
                })}

            </div>

        </>
    )
}

export default Forecast