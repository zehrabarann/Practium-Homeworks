import axios from "axios";
import { createContext, useState } from "react";
import { cities } from "../constants";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState([])
    const [city, setCity] = useState([])


    const fetchCityWeather = (city) => {
        const citiesFind = cities.find((element) => element.id === parseInt(city));
        console.log('cities',process.env.REACT_APP_API_KEY)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${citiesFind.latitude}&lon=${citiesFind.longitude}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => setWeather(response.data))
      
    }

    const values = { weather, setWeather, city, setCity, fetchCityWeather }
    return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>

}
export default WeatherContext