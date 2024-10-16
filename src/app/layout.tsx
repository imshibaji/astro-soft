import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import PrelineScript from "@/components/common/PrelineScript";
import NavBar from "@/components/ui/NavBar";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Astrology App for Astrologers",
    template: "%s | AstroSoft",
  },
  keywords: ["Astro", "Next.js", "Tailwind CSS", "Bhava Calculator"],
  description: "AstroSoft App created by Shibaji Debnath",
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
        suppressHydrationWarning={true}
      >
        <NavBar logo="/logo.svg" title="AstroSoft" menus={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: "Core Concepts",
            link: "/core-concepts",
            children: [
              {
                name: "Nakshatras",
                link: "/nakshatras",
              },
              {
                name: "Planets",
                link: "/planets",
              },
              {
                name: "Rashis",
                link: "/rashis",
              },
              {
                name: "Houses",
                link: "/houses",
              },
              {
                name: "Planet Moves",
                link: "/planet-moves",
              },
              {
                name: "House Rashi Moves",
                link: "/house-rashi-moves",
              },
            ]
          },
        ]} />
        {children}

        <PrelineScript />
      </body>
    </html>
  );
}
