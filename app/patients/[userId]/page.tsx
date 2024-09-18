"use client";
import { getAppointmentByUserId } from "@/lib/actions/appointment.actions";
import { getUser, getPatient } from "@/lib/actions/patient.actions";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const params = useParams();
  const userId = params.userId;
  const router = useRouter();

  useEffect(() => {
    getUser(userId).then((userData) => {
      setUser(userData);
    });
    getPatient(userId).then((patientData) => {
      setPatient(patientData);
    });
    getAppointmentByUserId(userId).then((appointments) => {
      setAppointments(appointments);
    });
  }, [userId]);

  const TabButton = ({ label, isActive, onClick }) => (
    <button
      className={`px-4 py-2 font-semibold w-full ${
        isActive
          ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
          : "bg-white text-blue-600 border-t border-l border-r border-gray-200"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {appointment.primaryPhysician}
          </h3>
          <p className="text-gray-600">{appointment.reason}</p>
          <p className="text-sm text-gray-500 mt-1">{appointment.note}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end mb-1">
            <span className="text-sm font-medium text-gray-800">
              🗓️ {new Date(appointment.schedule).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-sm font-medium text-gray-800">
              🕒 {new Date(appointment.schedule).toLocaleTimeString()}
            </span>
          </div>
          <div className="mt-2">
            <span
              className={`text-sm font-medium px-2 py-1 rounded ${
                appointment.status === "pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : appointment.status === "confirmed"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
              }`}
            >
              {appointment.status.charAt(0).toUpperCase() +
                appointment.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const PatientDetails = ({ patient }) => (
    <div className="space-y-4 text-black">
      <div>
        <h4 className="font-semibold">Personal Information</h4>
        <p>Gender: {patient.gender}</p>
        <p>Date of Birth: {new Date(patient.birthDate).toLocaleDateString()}</p>
        <p>Address: {patient.address}</p>
        <p>Occupation: {patient.occupation}</p>
      </div>
      <div>
        <h4 className="font-semibold">Emergency Contact</h4>
        <p>Name: {patient.emergencyContactName}</p>
        <p>Number: {patient.emergencyContactNumber}</p>
      </div>
      <div>
        <h4 className="font-semibold">Insurance Information</h4>
        <p>Provider: {patient.insuranceProvider}</p>
        <p>Policy Number: {patient.insurancePolicyNumber}</p>
      </div>
      <div>
        <h4 className="font-semibold">Medical Information</h4>
        <p>Allergies: {patient.allergies || "None reported"}</p>
        <p>
          Current Medication: {patient.currentMedication || "None reported"}
        </p>
        <p>
          Past Medical History: {patient.pastMedicalHistory || "None reported"}
        </p>
        <p>
          Family Medical History:{" "}
          {patient.familyMedicalHistory || "None reported"}
        </p>
      </div>
      <div>
        <h4 className="font-semibold">Other Information</h4>
        <p>Primary Physician: {patient.primaryPhysician}</p>
        <p>Identification Type: {patient.identificationType}</p>
        <p>Identification Number: {patient.identificationNumber}</p>
      </div>
    </div>
  );

  if (!user || !patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 bg-blue-600 p-8 text-white">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <div className="mb-2">✉️ {user.email}</div>
                <div>📞 {user.phone}</div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Member since:</span>
                    <span>
                      {new Date(user.registration).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span
                      className={`px-2 py-1 rounded ${
                        user.status ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email verified:</span>
                    <span>{user.emailVerification ? "✅" : "⚠️"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone verified:</span>
                    <span>{user.phoneVerification ? "✅" : "⚠️"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <div className="mb-6">
                <div className="flex space-x-2 w-full">
                  <TabButton
                    label="Appointments"
                    isActive={activeTab === "appointments"}
                    onClick={() => setActiveTab("appointments")}
                  />
                  <TabButton
                    label="Medical History"
                    isActive={activeTab === "history"}
                    onClick={() => setActiveTab("history")}
                  />
                </div>
                <div className="border-t border-gray-200">
                  {activeTab === "appointments" && (
                    <div className="py-6">
                      <h3 className="text-xl font-semibold mb-4">
                        Upcoming Appointments
                      </h3>
                      {appointments.map((appointment) => (
                        <AppointmentCard
                          key={appointment.$id}
                          appointment={appointment}
                        />
                      ))}
                      <button
                        onClick={() =>
                          (window.location.href = `/patients/${userId}/new-appointment`)
                        }
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        Schedule New Appointment
                      </button>
                    </div>
                  )}
                  {activeTab === "history" && (
                    <div className="py-6">
                      <h3 className="text-xl font-semibold mb-4">
                        Medical History
                      </h3>
                      <PatientDetails patient={patient} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
