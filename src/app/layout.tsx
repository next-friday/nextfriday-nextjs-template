import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { PropsWithChildren } from "react";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
};

export const metadata: Metadata = {
  title: "Next Friday Template",
  description: "Next Friday NextJS template with TypeScript, ESLint, Prettier, and Tailwind CSS",
};

export default RootLayout;
