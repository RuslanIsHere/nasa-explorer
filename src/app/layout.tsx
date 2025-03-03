import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: "NASA Explorer", 
  description: "Explore the universe with NASA APIs", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth';

  return (
    <html lang="en">
      <body className="antialiased">
        {!isAuthPage && <Header />}
        <main>{children}</main>
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
