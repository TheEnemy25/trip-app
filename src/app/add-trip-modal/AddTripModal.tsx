import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Trip } from '@/models/Trip';
import { CityOption } from '@/models/CityOption';

interface AddTripModalProps {
    cities: CityOption[];
    onAddTrip: (trip: Trip) => void;
    onClose: () => void;
}

const CityRadio: React.FC<{ city: CityOption; selectedCity: string; onSelect: (name: string) => void }> = ({
    city,
    selectedCity,
    onSelect,
}) => (
    <div className="flex items-center mb-2">
        <img src={city.image} alt={city.name} className="w-12 h-12 mr-2" />
        <label className="cursor-pointer">
            <input
                type="radio"
                value={city.name}
                checked={selectedCity === city.name}
                onChange={() => onSelect(city.name)}
                className="mr-2"
            />
            {city.name}
        </label>
    </div>
);

const AddTripModal: React.FC<AddTripModalProps> = ({ cities, onAddTrip, onClose }) => {
    const [city, setCity] = useState<string>(cities[0].name);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleAddTrip = () => {
        if (startDate && endDate && city) {
            if (endDate < startDate) {
                alert("End date must be after the start date.");
                return;
            }
            const newTrip: Trip = {
                id: Date.now(),
                city,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
            };
            onAddTrip(newTrip);
            onClose();
        }
    };

    return (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add a New Trip</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        &times;
                    </button>
                </div>
                <div className="mb-4">
                    {cities.map(cityOption => (
                        <CityRadio
                            key={cityOption.name}
                            city={cityOption}
                            selectedCity={city}
                            onSelect={setCity}
                        />
                    ))}
                </div>
                <div className="mb-4">
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        minDate={new Date()}
                        maxDate={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)}
                        placeholderText="Start Date"
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        minDate={startDate || new Date()}
                        maxDate={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)}
                        placeholderText="End Date"
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <button
                    onClick={handleAddTrip}
                    className="bg-blue-500 text-white rounded-md py-2 w-full hover:bg-blue-600 transition"
                >
                    Add Trip
                </button>
            </div>
        </section>
    );
};

export default AddTripModal;
