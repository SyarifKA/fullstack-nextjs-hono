import { Geist, Geist_Mono } from "next/font/google";
import MainHeader from "../components/MainHeader"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Product Management",
  description: "Aplication for manage product",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainHeader/>
        {children}
      </body>
    </html>
  );
}
