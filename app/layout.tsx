import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarePulse",
  description:
    "A healthcare patient management System designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* make a navbar */}
          <nav className="flex justify-between items-center p-4 bg-dark-400 text-white">
            <div>
              <a href="/" className="text-lg font-bold">
                CarePulse
              </a>
            </div>
            <div>
              <a href="/" className="mr-4">
                login
              </a>

              <a href="/bot" className="mr-4">
                chatbot
              </a>
              <a href="/sdk" className="mr-4">
                sdk
              </a>
            </div>
          </nav>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
