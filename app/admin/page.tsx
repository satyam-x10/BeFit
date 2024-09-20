// @ts-ignore
// @ts-nocheck

import Image from "next/image";
import Link from "next/link";
import { AlertCircle, Calendar, XCircle } from "lucide-react";
import React from "react";

import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="min-h-screen bg-[#115E59]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/images/befit.png"
                height={40}
                width={40}
                alt="BeFit logo"
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold text-blue-600">BeFit</span>
            </Link>
            <Link
              href="admin/patients"
              className="px-4 py-2 border border-blue-600 rounded-md text-blue-100  transition-colors"
            >
              View All Patients
            </Link>
          </nav>
        </header>

        <main className="py-10">
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-100 mb-4">
              Welcome to Your Health Dashboard
            </h1>
            <p className="text-xl text-gray-200">
              Manage appointments and patient care efficiently
            </p>
          </section>

          <section className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Scheduled Appointments
                </h3>
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.scheduledCount}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Pending Appointments
                </h3>
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.pendingCount}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Cancelled Appointments
                </h3>
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.cancelledCount}
              </p>
            </div>
          </section>

          <section className="bg-[#751D1D] shadow-md rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-100">
                Recent Appointments
              </h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <DataTable columns={columns} data={appointments.documents} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
