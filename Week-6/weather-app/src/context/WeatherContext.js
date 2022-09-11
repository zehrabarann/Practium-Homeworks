import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";
import { createContext, useState } from "react";
import { cities } from "../constants";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weather1, setWeather] = useState([])
    const [forecast, setForecast] = useState({})
    const [city, setCity] = useState("")


    const fetchCityWeather = async (city, citiesCordinat) => {
        let citiesFind = {}
        if (city === "" && !!citiesCordinat) {
            citiesFind = citiesCordinat
        }
        else {
            citiesFind = cities.find((element) => element.id === parseInt(city));
            setCity(city)
        }
        await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${citiesFind.latitude}&lon=${citiesFind.longitude}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => {
                const findCityId = cities.find((element) => element.name.includes(response.data.city.name?.split(" ")[0]));
                setCity(findCityId.id)
                setForecast(response.data)
            })
        await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${citiesFind.latitude}&exclude=minutely,hourly&lang=tr&units=metric&lon=${citiesFind.longitude}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => setWeather(response.data))

    }

    const changeCity = useCallback((city) => {
        fetchCityWeather(city)
    }, [])

    useEffect(() => {
        //Get current location 
        navigator.geolocation.getCurrentPosition((position) => {
            const p = position.coords;
            fetchCityWeather("", p)
        })
    }, [])

    const values = { weather1, setWeather, city, changeCity, fetchCityWeather, forecast, setForecast }
    return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>

}
export default WeatherContext