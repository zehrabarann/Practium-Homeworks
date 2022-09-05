import { useContext } from "react"
import WeatherContext from "../../context/WeatherContext"

const Search = () => {
    const { weather } = useContext(WeatherContext)
    console.log('weather',weather)

   
    return (
        <>
            
        </>
    )
}

export default Search