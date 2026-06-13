import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black, Geist_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studiaios.com"),
  title: {
    default: "Studia — Lock in. Prove it. Climb.",
    template: "%s — Studia",
  },
  description:
    "Strava for studying. Studia shields your phone, an AI witness verifies your proof photo, and your school leaderboard watches you climb. Free on iOS.",
  keywords: [
    "study app",
    "focus app",
    "app blocker",
    "study leaderboard",
    "study streak",
    "Studia",
  ],
  openGraph: {
    title: "Studia — Lock in. Prove it. Climb.",
    description:
      "Strava for studying. Shield your phone, prove your session to an AI witness, and climb your school leaderboard.",
    url: "https://studiaios.com",
    siteName: "Studia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studia — Lock in. Prove it. Climb.",
    description:
      "Strava for studying. Shield your phone, prove your session to an AI witness, and climb your school leaderboard.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#15181f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${archivoBlack.variable} ${geistMono.variable} grain`}
      >
        {children}
      </body>
    </html>
  );
}
