import { getAllCityWeather } from "../../../api"

export default async function handler(req, res) {
    const weather = await getAllCityWeather();

    res.status(200).json(weather.records.location);
}