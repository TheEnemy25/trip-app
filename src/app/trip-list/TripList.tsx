import { useState } from 'react';
import { Trip } from '@/models/Trip';

interface TripListProps {
    trips: Trip[];
    onTripSelect: (trip: Trip) => void;
}

const TripList: React.FC<TripListProps> = ({ trips, onTripSelect }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const tripsPerPage = 3;

    const totalPages = Math.ceil(trips.length / tripsPerPage);
    const currentTrips = trips.slice(currentPage * tripsPerPage, (currentPage + 1) * tripsPerPage);

    return (
        <section className="trip-list">
            <ul className="border border-gray-300 rounded-md max-h-60 overflow-y-auto">
                {currentTrips.map(trip => (
                    <li
                        key={trip.id}
                        onClick={() => onTripSelect(trip)}
                        className="trip-item p-2 hover:bg-gray-200 cursor-pointer"
                    >
                        {trip.city} ({trip.startDate} - {trip.endDate})
                    </li>
                ))}
            </ul>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                    className="bg-gray-300 rounded-md p-2"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                    className="bg-gray-300 rounded-md p-2"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default TripList;
