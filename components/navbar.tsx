import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#24ae7c] h-[50px] shadow-md">
      <div className="container mx-auto flex justify-between items-center h-full">
        <a
          href="/"
          className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
        >
          Home
        </a>
        <a
          href="/patients/docbot"
          className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
        >
          DocBot
        </a>
        <a
          href="/patients/disease"
          className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
        >
          Disease
        </a>
        <a
          href="/patients/doctors"
          className="text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
        >
          Doctors
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
