import "./globals.css"
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import ScrollToTop from "@/components/landing/ScrollToTop";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="min-h-screen px-4 py-6">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
