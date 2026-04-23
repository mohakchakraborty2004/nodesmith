import type { Metadata } from "next";
import { Epilogue, Manrope, Inter, La_Belle_Aurore } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Provider } from "jotai";

// Font for headlines and titles
const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-headline",
});

// Primary font for body text
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

// Font for smaller labels, accents, and tags
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-label",
});

// Font for handwritten accents (Nodesmith specific)
const handwritten = La_Belle_Aurore({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-handwritten",
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
    <html 
      lang="en" 
      className={`${epilogue.variable} ${manrope.variable} ${inter.variable} ${handwritten.variable} antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="font-body overflow-x-hidden">
        <TRPCReactProvider>
          <NuqsAdapter>
            <Provider>
              {children}
            </Provider>
            <Toaster />
          </NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}