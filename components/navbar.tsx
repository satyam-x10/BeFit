import React from "react";

const navbar = () => {
  return (
    <div className="container h-[50px] mx-auto flex justify-between items-center">
      <a href="/" className="text-white">
        Home
      </a>
      <a href="/patients/docbot" className="text-white">
        docbot
      </a>
      <a href="/patients/disease" className="text-white">
        disease
      </a>
      <a href="/patients/medicine" className="text-white">
        medicine
      </a>
      <a href="/patients/sdk" className="text-white">
        sdk
      </a>
    </div>
  );
};

export default navbar;
