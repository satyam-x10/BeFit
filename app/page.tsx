// @ts-ignore
// @ts-nocheck

"use client";

import { motion } from "framer-motion";

import Image from "next/image";

import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";

import { PasskeyModal } from "@/components/PasskeyModal";

import { fetchUnsplashImage } from "@/lib/utils";

import { useEffect, useState } from "react";

const Home = ({ searchParams }: SearchParamProps) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const getimg = async () => {
      const image = await fetchUnsplashImage(
        "health, fitness, doctor, patient, happy",
      );
      setBackgroundImage(image);
    };

    getimg();
  }, []);

  const isAdmin = searchParams?.admin === "true";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 relative p-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30" />

      {/* Admin Modal */}
      {isAdmin && <PasskeyModal />}

      {/* Main Content */}
      <motion.main
        className="flex flex-col md:flex-row items-center justify-between relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo and Admin Button */}
        <motion.div
          className="w-full md:w-1/3 mb-8 md:mb-0 flex flex-col items-center md:items-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src="/assets/images/befit.png"
            height={4000}
            width={4000}
            alt="patient"
            className="h-24 md:h-36 w-fit mb-4"
          />
          <Link
            href="/?admin=true"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
          >
            Admin Login
          </Link>
        </motion.div>

        {/* Patient Form */}
        <motion.div
          className="w-full md:w-2/3 max-w-[496px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PatientForm />
        </motion.div>
      </motion.main>

      {/* Footer */}
      <footer className="mt-8 p-4 text-center relative z-10">
        <p className="text-gray-700">© 2024 BeFit</p>
      </footer>
    </div>
  );
};

export default Home;
