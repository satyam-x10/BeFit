// @ts-ignore
// @ts-nocheck

"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import districtsData from "../../../public/assets/districts.json";

const DoctorSearchForm = ({
  onSearch,
  onLocationChange,
  location,
  suggestions,
}) => (
  <div className="w-full max-w-md mx-auto">
    <h2 className="text-3xl font-semibold text-center mb-6 text-teal-600">
      Find Your Doctor
    </h2>
    <form onSubmit={onSearch} className="space-y-4">
      <div>
        <label
          htmlFor="location"
          className="block text-black font-semibold mb-2"
        >
          Enter Your Location
        </label>
        <div className="relative">
          <input
            type="text"
            id="location"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-teal-500 transition duration-200"
            placeholder="Enter your city or district"
            value={location}
            onChange={onLocationChange}
            required
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {suggestions.length > 0 && (
          <ul className="mt-2 rounded-lg bg-white border border-gray-200 shadow-md max-h-40 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                onClick={() =>
                  onLocationChange({ target: { value: suggestion } })
                }
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 transition duration-200"
      >
        Search
      </button>
    </form>
  </div>
);

const DoctorCard = ({ doctor }) => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200">
    <div className="flex items-start">
      <img
        src={doctor.image_url || "/api/placeholder/80/80"}
        alt={doctor.name}
        className="w-20 h-20 rounded-full object-cover mr-4 border border-gray-200"
      />
      <div className="flex-1">
        <h4 className="text-xl font-semibold text-teal-600">{doctor.name}</h4>
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-sm text-red-600">{doctor.status}</p>
        <p className="text-gray-500">{doctor.address}</p>
        <p className="text-gray-500">{doctor.phone}</p>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(doctor.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 hover:underline mt-2 inline-block"
        >
          Get Directions
        </a>
      </div>
    </div>
  </div>
);

const Page = () => {
  const [doctors, setDoctors] = useState([]);
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchDoctors = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formattedLocation = location.toLowerCase().replace(" ", "_");
    const link = `https://raw.githubusercontent.com/satyam-x10/BeFit/refs/heads/main/public/assets/doctors/${formattedLocation}_doctors.json`;
    try {
      const response = await fetch(link);
      if (!response.ok) throw new Error("Failed to fetch doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setLocation(input);

    if (input.length === 0) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = districtsData.filter((district) =>
      district.toLowerCase().startsWith(input.toLowerCase())
    );

    if (filteredSuggestions.length === 0) {
      setSuggestions(["No matches found"]);
    } else {
      setSuggestions(filteredSuggestions.slice(0, 5));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DoctorSearchForm
            onSearch={handleFetchDoctors}
            onLocationChange={handleInputChange}
            location={location}
            suggestions={suggestions}
          />
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">
              Search Results
            </h3>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && doctors.length === 0 && (
              <p className="text-center text-gray-500">
                No results found. Try a different location.
              </p>
            )}
            {doctors.map((doctor, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
