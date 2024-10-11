import React, { useState } from 'react';

interface HeaderProps {
    onAddTrip: () => void;
    onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTrip, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <header className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Trip Planner</h1>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search for a trip..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-md p-2 mr-4"
                />
                <button
                    onClick={onAddTrip}
                    className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition"
                >
                    Add Trip
                </button>
            </div>
        </header>
    );
};

export default Header;
