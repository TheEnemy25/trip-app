import { useState, useEffect } from 'react';
import { Trip } from '@/models/Trip';
import { Weather } from '@/models/Weather';
import { getTodayWeather, getWeatherForecast } from '@/services/weatherService';

interface TripDetailsProps {
    trip: Trip;
}

const TripDetails: React.FC<TripDetailsProps> = ({ trip }) => {
    const [weatherForecast, setWeatherForecast] = useState<Weather[]>([]);
    const [todayWeather, setTodayWeather] = useState<Weather | null>(null);
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (trip) {
                const { city, startDate } = trip;

                const forecast = await getWeatherForecast(city, startDate, trip.endDate);
                setWeatherForecast(forecast);

                const todayWeather = await getTodayWeather(city);
                setTodayWeather(todayWeather);

                const currentDate = new Date();
                const tripStartDate = new Date(startDate);
                const diffTime = tripStartDate.getTime() - currentDate.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setCountdown(`${diffDays} days left until the trip`);
            }
        };

        fetchWeatherData();
    }, [trip]);

    return (
        <div className="trip-details p-4 border border-gray-300 rounded-md">
            <h2 className="text-2xl font-bold">Trip Details</h2>
            <img
                src={`/images/${trip.city.toLowerCase()}.jpg`}
                alt={trip.city}
                className="object-cover mb-4 rounded"
                width={300}
                height={300}
            />
            <p><strong>ID:</strong> {trip.id}</p>
            <p><strong>City:</strong> {trip.city}</p>
            <p><strong>Start Date:</strong> {trip.startDate}</p>
            <p><strong>End Date:</strong> {trip.endDate}</p>
            <div className="font-semibold">{countdown}</div>
            <h3 className="text-xl font-semibold mt-4">Todays Weather:</h3>
            {todayWeather ? (
                <div>
                    <p>{todayWeather.temp}°C - {todayWeather.conditions}</p>
                </div>
            ) : (
                <p>No weather data available.</p>
            )}
            <h3 className="text-xl font-semibold mt-4">Trip Forecast:</h3>
            <ul>
                {weatherForecast.length > 0 ? (
                    weatherForecast.map((day, idx) => (
                        <li key={idx} className="py-1">
                            {day.datetime}: {day.temp}°C - {day.conditions}
                        </li>
                    ))
                ) : (
                    <p>No forecast available.</p>
                )}
            </ul>
        </div>
    );
};

export default TripDetails;
