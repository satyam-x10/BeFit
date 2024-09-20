"use client";

import React, { useEffect, useState } from "react";
import { fetchNearbyFacilitiesFromBing } from "@/lib/utils";

const LocationSearch = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNearbyFacilitiesFromBing("delhi", "clinic");
    };

    fetchData();
  }, []);

  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Replace with your actual API call
    const mockResults = [
      {
        name: "Dr. Himanshu Sekhar Sahoo",
        specialty: "Pediatrician",
        rating: 5.0,
        reviews: 39,
        status: "Closed ⋅ Opens 5 pm",
        address: "Bhubaneswar, Odisha",
        phone: "099373 93521",
        imageUrl:
          "https://images.unsplash.com/photo-1662724520253-e7157e9d6616?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Always proactive, listens to the patient's issues, and figures out the root cause.",
      },
    ];

    setSearchResults(mockResults);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 md:flex md:space-x-6 animate-fade-in">
        {/* Left Column (Form) */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-center mb-6 text-teal-600">
            Find Your Doctor
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="City, State"
                value={location}
                onChange={handleLocationChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="searchTerm"
                className="block text-black font-semibold mb-2"
              >
                What are you looking for?
              </label>
              <input
                type="text"
                id="searchTerm"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500 transition duration-200"
                placeholder="Doctor, Specialty, Condition"
                value={searchTerm}
                onChange={handleSearchTermChange}
                required
              />
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
        {searchResults.length > 0 && (
          <div className="w-full mt-6 md:mt-0 md:w-1/2">
            <h3 className="text-lg font-bold text-black mb-4">
              Search Results
            </h3>
            <ul className="space-y-4">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="flex items-start bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition duration-200"
                >
                  <img
                    src={result.imageUrl}
                    alt={result.name}
                    className="w-20 h-20 rounded-full object-cover mr-4 border border-gray-200"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-teal-600">
                      {result.name}
                    </h4>
                    <p className="text-gray-600">{result.specialty}</p>
                    <p className="text-sm text-gray-500">
                      {result.rating} ({result.reviews} reviews)
                    </p>
                    <p className="text-sm text-red-600">{result.status}</p>
                    <p className="text-gray-500">{result.address}</p>
                    <p className="text-gray-500">{result.phone}</p>
                    <p className="text-gray-700 mt-2 italic">
                      "{result.description}"
                    </p>
                    <div className="mt-2">
                      <a
                        href={`https://${result.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline"
                      >
                        Website
                      </a>
                      <span className="mx-2">|</span>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                          result.address
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
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
