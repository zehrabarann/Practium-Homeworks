import { useContext } from "react"
import { cities } from "../../constants"
import WeatherContext from "../../context/WeatherContext"
const Header = () => {

    const { fetchCityWeather, setCity } = useContext(WeatherContext)
    return (
        <>
            <div className="select-area">
                <select name="city" onChange={(e) => { setCity(e.target.value); fetchCityWeather(e.target.value) }}>
                    {cities.map((element) => {
                        return <option value={element.id} key={element.id}>{element.name}</option>
                    })}

                </select>
            </div>
        </>
    )
}

export default Header