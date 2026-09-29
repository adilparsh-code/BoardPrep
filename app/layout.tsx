import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BoardPrep — Board Exam Learning",
  description: "A multi-board learning platform for CBSE, ICSE and ISC."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}