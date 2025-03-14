import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from '@/components/LayoutWrapper'

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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
