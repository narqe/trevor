import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from '@/context/context';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Challenge",
  description: "Coded by Joel Acef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="en">
        <body className={inter.className} style={{ background: '#FFF' }}>{children}</body>
      </html>
    </AppProvider>
  );
}
