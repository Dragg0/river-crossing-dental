import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "River Crossing Family Dental & Orthodontics | Riverton, UT",
  description: "Quality modern dentistry for the entire family in Riverton, UT. General dentistry, orthodontics, implants, and emergency dental care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-slate-900`}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-900">
              River Crossing Dental
            </div>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
              <a href="#offers" className="hover:text-blue-600 transition-colors">Special Offers</a>
              <a href="#location" className="hover:text-blue-600 transition-colors">Location</a>
            </nav>
            <a 
              href="https://modento.io/river-crossing-dental" 
              className="inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
            >
              Book Now
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t bg-slate-50 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h3 className="font-bold text-lg mb-4 text-blue-900">Contact Us</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  4121 13400 S Unit A<br />
                  Riverton, UT 84096<br />
                  <a href="tel:8015099937" className="font-semibold">(801) 509-9937</a>
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4 text-blue-900">Quick Links</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><a href="#services" className="hover:underline">Services</a></li>
                  <li><a href="#offers" className="hover:underline">Special Offers</a></li>
                  <li><a href="#membership" className="hover:underline">Membership Plan</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4 text-blue-900">Patient Resources</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Experience modern dentistry in a family-friendly environment.
                </p>
                <a 
                  href="https://modento.io/river-crossing-dental" 
                  className="inline-flex h-9 items-center justify-center rounded-full border border-blue-600 px-4 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50"
                >
                  Manage Appointments
                </a>
              </div>
            </div>
            <div className="mt-12 border-t pt-8 text-center text-xs text-slate-400">
              © {new Date().getFullYear()} River Crossing Family Dental. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}