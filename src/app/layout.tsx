import type { Metadata } from "next";
import { Epilogue, Manrope, Inter } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

// Font for headlines and titles
const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-epilogue",
});

// Primary font for body text
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

// Font for smaller labels, accents, and tags
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nodesmith | Automation Lab",
  description: "Connect logic, data, and human intent into seamless automated narratives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${epilogue.variable} ${manrope.variable} ${inter.variable} antialiased`}
      >
        <TRPCReactProvider>
          <NuqsAdapter>
            {children}
            <Toaster />
          </NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}