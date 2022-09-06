import './App.css';
import Forecast from './components/Forecast/forecast';
import Header from './components/Header/Header';
import Search from './components/Search/index.js';
import { WeatherProvider } from './context/WeatherContext';


function App() {
  return (
    <div className="App">
      <WeatherProvider>
        <Header />
        <Search />
        <Forecast/>
      </WeatherProvider>
    </div>
  );
}

export default App;
