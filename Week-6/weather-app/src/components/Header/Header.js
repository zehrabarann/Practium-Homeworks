import { useContext } from "react"
import { cities } from "../../constants"
import WeatherContext from "../../context/WeatherContext"
const Header = () => {

    const { city, changeCity } = useContext(WeatherContext)
    return (
        <div className="header-container">
            <div className="select-area">
                <select name="city" value={city?.toString()} onChange={(e) => { changeCity(e.target.value); }}>
                    {cities.map((element) => {
                        return <option value={element.id} key={element.id}>{element.name}</option>
                    })}

                </select>
            </div>
        </div>
    )
}

export default Header