"use client";

import React, { useEffect, useState } from "react";
import districtsData from "../../../public/assets/districts.json";

const Page = () => {
  const [doctors, setDoctors] = useState([]);
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleFetchDoctors = async (event) => {
    event.preventDefault();
    const lowerCaseLoation = location.toLowerCase();
    const link = `https://raw.githubusercontent.com/satyam-x10/BeFit/main/public/assets/${lowerCaseLoation}_doctors.json`;
    try {
      const response = await fetch(link);
      const data = await response.json();
      setDoctors(data); // Assuming the JSON structure has a "doctors" array
    } catch (error) {
      console.error("Error fetching doctors:", error);
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
      setSuggestions(["None exists"]);
    } else {
      setSuggestions(filteredSuggestions.slice(0, 5));
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row md:space-x-6 animate-fade-in min-h-[70vh]">
        {/* Ensures minimum height */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-center mb-6 text-teal-600">
            Find Your Doctor
          </h2>
          <form onSubmit={handleFetchDoctors} className="space-y-4">
            <div>
              <label
                htmlFor="location"
                className="block text-black font-semibold mb-2"
              >
                Enter Your Location
              </label>
              <input
                type="text"
                id="location"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition duration-200"
                placeholder="Enter your city or district"
                value={location}
                onChange={handleInputChange}
                required
              />

              {/* Suggestion List */}
              {suggestions.length > 0 && (
                <ul className=" mt-2 rounded-lg bg-black max-h-40 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 border border-white hover: cursor-pointer"
                      onClick={() => {
                        setLocation(suggestion);
                        setSuggestions([]);
                      }}
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

        {/* Right Column (Search Results) */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex-grow">
          {doctors?.length > 0 && (
            <>
              <h3 className="text-lg font-bold text-black mb-4">
                Search Results
              </h3>
              <ul className="space-y-4">
                {doctors?.map((doctor, index) => (
                  <li
                    key={index}
                    className="flex items-start bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition duration-200"
                  >
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full object-cover mr-4 border border-gray-200"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-teal-600">
                        {doctor.name}
                      </h4>
                      <p className="text-gray-600">{doctor.specialty}</p>
                      <p className="text-sm text-gray-500">
                        {doctor.rating} ({doctor.reviews} reviews)
                      </p>
                      <p className="text-sm text-red-600">{doctor.status}</p>
                      <p className="text-gray-500">{doctor.address}</p>
                      <p className="text-gray-500">{doctor.phone}</p>
                      <p className="text-gray-700 mt-2 italic">
                        "{doctor.description}"
                      </p>
                      <div className="mt-2">
                        <a
                          href={`https://${doctor.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:underline"
                        >
                          Website
                        </a>
                        <span className="mx-2">|</span>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            doctor.address
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:underline"
                        >
                          Directions
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
