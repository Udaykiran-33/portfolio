import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CursorGlow } from "@/components/ui/cursor-glow";
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
  title: "Uday Kiran Peraboina — MERN Stack Developer",
  description:
    "Portfolio of Uday Kiran Peraboina, MERN stack developer with a focus on AI-powered web applications, accessible education platforms, and farmer-first digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Blocking script: prevents flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.remove("dark")}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
