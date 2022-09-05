import './App.css';
import Header from './components/Header/Header';
import Search from './components/Search/index.js';
import { WeatherProvider } from './context/WeatherContext';


function App() {
  return (
    <div className="App">
      <WeatherProvider>
        <Header />
        <Search />
      </WeatherProvider>
    </div>
  );
}

export default App;
