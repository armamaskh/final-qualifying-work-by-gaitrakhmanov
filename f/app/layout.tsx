import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { DynamicTitle } from "./DynamicTitle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], });

export const metadata: Metadata = {
  description: "Гайтрахманов Марсель",  };




export default function RootLayout( { children}: Readonly<{children: React.ReactNode;}>)  {
  return (
    
    <html lang="en"  className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning >
      <body>
        <ClerkProvider>
          <NextTopLoader color="#DDDDDD" />
            <DynamicTitle />
            <ThemeProvider attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange >
              {children}
              <Toaster />
            </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
