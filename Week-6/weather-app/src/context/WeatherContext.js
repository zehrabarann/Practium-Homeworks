import axios from "axios";
import { createContext, useState } from "react";
import { cities } from "../constants";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weather1, setWeather] = useState([])
    const [forecast, setForecast] = useState({})
    const [city, setCity] = useState("")


    const fetchCityWeather = async (city) => {
        const citiesFind = cities.find((element) => element.id === parseInt(city));
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${citiesFind.latitude}&lon=${citiesFind.longitude}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => setWeather(response.data))
        await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${citiesFind.latitude}&lon=${citiesFind.longitude}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => setForecast(response.data))

    }


    const values = { weather1, setWeather, city, setCity, fetchCityWeather, forecast, setForecast }
    return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>

}
export default WeatherContext