import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: { default: "Owais Raza — Backend & AI Engineer", template: "%s | Owais Raza" },
  description: "Owais Raza builds AI systems, retrieval workflows, and reliable backend products. Explore selected work, engineering notes, and experiments.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
