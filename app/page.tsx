"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import { fetchUnsplashImage } from "@/lib/utils";
import { set } from "zod";

const Home = ({ searchParams }: SearchParamProps) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const getimg = async () => {
      const image = await fetchUnsplashImage(
        "health,fitness,doctor,patient,happy"
      );
      setBackgroundImage(image);
    };

    getimg(); // Call the function
  }, []);
  const isAdmin = searchParams?.admin === "true";

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30" />

      {isAdmin && <PasskeyModal />}

      <main className="flex-1 flex flex-col md:flex-row items-center justify-between p-4 md:p-8 relative z-10">
        {/* Logo and Admin Button */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0 flex flex-col items-center md:items-start">
          <Image
            src="/assets/images/befit.png"
            height={4000}
            width={4000}
            alt="patient"
            className="h-24 md:h-36 w-fit mb-4"
          />
          <Link
            href="/?admin=true"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Admin Login
          </Link>
        </div>

        {/* Form */}
        <div className="w-full md:w-2/3 max-w-[496px]">
          <PatientForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-14-regular mt-4 p-4 text-center md:text-left relative z-10">
        <p className="text-dark-600">© 2024 BeFit</p>
      </footer>
    </div>
  );
};

export default Home;
