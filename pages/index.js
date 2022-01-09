import React, { useEffect, useState } from "react"
import { getAllCityWeather } from '../api';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [cityWeather, setCityWeather] = useState([]);

  useEffect(async () => {
    const allCityWeather = await fetch('http://localhost:3000/api/weather').then(res => res.json()).catch(err => err);

    setCityWeather(allCityWeather.weather);
  }, []);

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>城市</th>
            <th>溫度</th>
            <th>天氣</th>
            <th>更新時間</th>
          </tr>
        </thead>

        <tbody>
          {
            cityWeather.map(weather => (
              <tr key={weather.stationId} className={styles.card}>
                <td>{weather.stationId}</td>
                <td>{weather.locationName}</td>
                <td>{weather.weatherElement[3].elementValue}</td>
                <td>{weather.weatherElement[20].elementValue}</td>
                <td>{weather.time.obsTime}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </React.Fragment >
  )
}
