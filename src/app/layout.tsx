import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/providers/ClientProviders";
import { Navbar } from "@/components/navbars/navbar";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          
           
              {/* Sidebar */}
              
              
              {/* Main Content Area */}
              <div className="flex flex-1 flex-col">
                {/* Navbar */}
                <Navbar />
                
                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                  {children}
                </main>
              </div>
          
          
        </ClientProviders>
      </body>
    </html>
  );
}