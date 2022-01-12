import React, { useEffect, useState } from "react"
import { server } from "../config";
import styles from '../styles/Home.module.css';

export default function Home(props) {
  const [currentCity, setCurrentCity] = useState('臺北');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    async function getCityWeather() {
      const data = await fetch(`${server}api/weather/${currentCity}`).then(res => res.json()).catch(err => err);

      setWeather(data.weather.records.location[0]);
    }

    getCityWeather();
  }, [currentCity]);

  return (
    <React.Fragment>
      {
        Object.keys(weather).length > 0 ? (
          <>
            <div className={`${styles.app} ${weather.weatherElement[1].elementValue.includes('晴') ? styles.warm : styles.cold}`}>
              <header className={styles.header}>
                <div className={styles.searchBox}>
                  <select
                    className={styles.selectBar}
                    onChange={e => setCurrentCity(e.target.value)}
                    value={currentCity}>
                    {

                      props.city.map(city => (
                        <option key={city.locationName}>{city.locationName}</option>
                      ))
                    }
                  </select>
                </div>
              </header>

              <main className={styles.main}>
                <div className={styles.updateTime}>
                  {new Date(weather.time.obsTime).toDateString()}
                </div>

                <div className={styles.weatherBox}>
                  <div className={styles.theDayWeather}>
                    {weather.weatherElement[1].elementValue}
                  </div>

                  <div className={styles.temp}>
                    {weather.weatherElement[0].elementValue}°C
                  </div>
                </div>
              </main>
            </div >
            )
          </>
        ) : "Loading Failed!"
      }
    </React.Fragment >
  )
}

export async function getStaticProps() {
  const city = await fetch(`${server}api/weather`).then(res => res.json()).catch(err => err);

  return {
    props: {
      city,
    }
  }
}