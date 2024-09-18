'use client'
import React, { useState } from 'react';

const UserProfile: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const appointments = [
    {
      doctor: 'Dr. John Doe',
      reason: 'General Checkup',
      date: '2024-09-20',
      time: '10:00 AM',
      location: 'City Hospital',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    {
      doctor: 'Dr. Jane Smith',
      reason: 'Dental Checkup',
      date: '2024-09-22',
      time: '02:00 PM',
      location: 'Dental Clinic',
    },
    // Add more appointments here
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-#131619">
      {/* Header for mobile */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-gray-700 focus:outline-none z"
        >
          {/* {isSidebarOpen ? <X size={28} /> : <Menu size={28} />} */}
          {/* use text instead */}
          {isSidebarOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Sidebar: User Info */}
      <div
        className={`lg:w-1/3 bg-white p-6 shadow-md lg:sticky lg:top-0 lg:self-start transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed inset-0 z-10 lg:relative lg:flex lg:flex-col lg:justify-start`}
      >
        <div className="text-center">
          <img
            src="/user-photo.jpg" // Replace with an actual image or path
            alt="User Photo"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-500">johndoe@example.com</p>
          <p className="text-gray-500">+1 234 567 890</p>
        </div>

        {/* Additional Info */}
        <div className="mt-6 space-y-2">
          <div className="text-gray-700 flex justify-between">
            <span>Gender:</span> <span>Male</span>
          </div>
          <div className="text-gray-700 flex justify-between">
            <span>Age:</span> <span>29</span>
          </div>
          <div className="text-gray-700 flex justify-between">
            <span>Address:</span> <span>123 Main St</span>
          </div>
        </div>
      </div>

      {/* Main Section: Appointments */}
      <div className="flex-grow p-4 lg:w-2/3">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Appointments</h1>
          <button className="bg-blue-300 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
            New Appointment
          </button>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col lg:flex-row justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{appointment.doctor}</h2>
                <p className="text-gray-500">Reason: {appointment.reason}</p>
                <p className="text-gray-500">Location: {appointment.location}</p>
              </div>
              <div className="mt-4 lg:mt-0 lg:text-right">
                <p className="text-gray-700">{appointment.date}</p>
                <p className="text-gray-700">{appointment.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
