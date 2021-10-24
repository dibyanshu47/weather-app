import React, { useState } from 'react';
import axios from 'axios';

const api = {
    key: "b55576efc74da9b3e22a8db1a2caf4ad",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [err, setErr] = useState({});

    const search = async evt => {
        if (evt.key === "Enter") {
            try {
                const { data } = await axios.get(`${api.base}weather?q=${query}&unit=metric&APPID=${api.key}`);
                setErr({});
                setQuery('');
                setWeather(data);
            } catch (error) {
                setWeather({});
                setErr(error.response.data);
            }
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        if (date % 10 === 1) {
            return `${day} ${date}st ${month}, ${year}`
        } else if (date % 10 === 2) {
            return `${day} ${date}nd ${month}, ${year}`
        } else if (date % 10 === 3) {
            return `${day} ${date}rd ${month}, ${year}`
        } else {
            return `${day} ${date}th ${month}, ${year}`
        }
    }

    const iconBuilder = (i) => {
        return (
            <img src={`https://openweathermap.org/img/wn/${i}.png`} alt="icon" />
        )
    }

    return (
        <div className="app">
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp - 273.15)}°C
                            </div>
                            <div className="weather-icon-box">
                                <div className="weather">{weather.weather[0].main}</div>
                                <div className="icon">{iconBuilder(weather.weather[0].icon)}</div>
                            </div>
                        </div>
                    </div>
                ) : ((typeof err.cod != "undefined") ? (
                    <div className="error">No such city exist.</div>
                ) : (''))}
            </main>
        </div>
    );
}

export default App;
