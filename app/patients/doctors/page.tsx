// @ts-ignore
// @ts-nocheck

"use client";

import React, { useEffect, useState } from "react";
import { fetchDoctors } from "@/lib/utils"; // Ensure this function can accept dynamic parameters

const Page = () => {
  const [doctors, setDoctors] = useState([]);
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFetchDoctors = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      const data = await fetchDoctors(location, searchTerm); // Use dynamic values

      setDoctors(data.scrapedData); // Store fetched doctors in state
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 md:flex md:space-x-6 animate-fade-in">
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
                  placeholder="City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                  onChange={(e) => setSearchTerm(e.target.value)}
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
          {doctors.length > 0 && (
            <div className="w-full mt-6 md:mt-0 md:w-1/2">
              <h3 className="text-lg font-bold text-black mb-4">
                Search Results
              </h3>
              <ul className="space-y-4">
                {doctors.map((doctor, index) => (
                  <li
                    key={index}
                    className="flex items-start bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition duration-200"
                  >
                    <img
                      src={doctor.imageUrl} // Assuming imageUrl is part of the fetched data
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
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(doctor.address)}`}
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
    </div>
  );
};

export default Page;
