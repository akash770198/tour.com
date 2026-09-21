import type { Metadata } from "next";
import { Outfit, Great_Vibes } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tour.com",
  description: "Explore the World with Tour.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/pagebanner.jpg" />
      </head>
      <body className={`${outfit.variable} ${greatVibes.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <div className="flex-1 flex flex-col min-w-0">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
