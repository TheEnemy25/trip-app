"use client";

import { useState, useEffect } from 'react';
import york from "../../public/images/york.jpg";
import london from "../../public/images/london.jpg";
import paris from "../../public/images/paris.jpg";
import { Trip } from '@/models/Trip';
import Header from '@/components/Header';
import AddTripModal from './add-trip-modal/AddTripModal';
import TripList from './trip-list/TripList';
import TripDetails from './trip-details/TripDetails';

const citiesWithImages = [
  { name: 'London', image: london.src },
  { name: 'Paris', image: paris.src },
  { name: 'York', image: york.src },
];

export default function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [originalTrips, setOriginalTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
      if (storedTrips.length === 0) {
        const defaultTrip: Trip = {
          id: Date.now(),
          city: 'London',
          startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        };
        setTrips([defaultTrip]);
        setOriginalTrips([defaultTrip]);
        localStorage.setItem('trips', JSON.stringify([defaultTrip]));
      } else {
        setTrips(storedTrips);
        setOriginalTrips(storedTrips);
      }
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('trips', JSON.stringify(trips));
    }
  }, [trips, isMounted]);

  const handleAddTrip = (trip: Trip) => {
    const updatedTrips = [...trips, trip].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    setTrips(updatedTrips);
    setOriginalTrips(updatedTrips);
    setShowModal(false);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleTripSelect = (trip: Trip) => setSelectedTrip(trip);

  const handleSearch = (term: string) => {
    const lowercasedTerm = term.toLowerCase();

    if (term.trim() === '') {
      setTrips(originalTrips);
    } else {
      const filteredTrips = originalTrips.filter(trip =>
        trip.city.toLowerCase().includes(lowercasedTerm) ||
        trip.startDate.includes(lowercasedTerm) ||
        trip.endDate.includes(lowercasedTerm)
      );
      setTrips(filteredTrips);
    }
  };

  return (
    <>
      <Header onAddTrip={() => setShowModal(true)} onSearch={handleSearch} />
      {showModal && (
        <AddTripModal
          cities={citiesWithImages}
          onAddTrip={handleAddTrip}
          onClose={handleCloseModal}
        />
      )}
      <div className="flex items-start justify-center w-full mt-24 space-x-4">
        <div className="w-1/3">
          <TripList trips={trips} onTripSelect={handleTripSelect} />
          {trips.length === 0 && <p>No trips found.</p>}
        </div>
        <div className="flex-1">
          {selectedTrip && <TripDetails trip={selectedTrip} />}
        </div>
      </div>
    </>
  );
}
