import Navbar from "@/components/navbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* make a simple navbar */}
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
