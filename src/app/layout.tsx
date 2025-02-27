import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "NASA Explorer", 
  description: "Explore the universe with NASA APIs", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
