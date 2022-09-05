import { useContext } from "react"
import { cities } from "../../constants"
import WeatherContext from "../../context/WeatherContext"
const Header = () => {

    const { fetchCityWeather } = useContext(WeatherContext)
    return (
        <>
            <select name="city" onChange={(e) => fetchCityWeather(e.target.value) }>
                {cities.map((element) => {
                    return <option  value={element.id} key={element.id}>{element.name}</option>
                })}

            </select>
        </>
    )
}

export default Header