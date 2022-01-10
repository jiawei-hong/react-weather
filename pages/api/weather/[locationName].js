import { getCityWeather } from '../../../api';

export default async function handler(req, res) {
	const { locationName } = req.query;
	const weather = await getCityWeather(locationName, {
		elementName: 'TEMP,Weather',
	});

	res.status(200).json({ weather });
}