import axios from "axios";

const weatherRequest = axios.create({
    baseURL: process.env.baseURL
});

weatherRequest.interceptors.response.use(res => res.data, err => err.response);

export const getAllCityWeather = (weatherParams = {}) => weatherRequest.get('', {
    params: {
        Authorization: process.env.apiKey,
        ...weatherParams
    }
})
export const getCityWeather = (locationName, weatherParams = {}) => weatherRequest.get('', {
    params: {
        Authorization: process.env.apiKey,
        locationName,
        ...weatherParams
    }
})