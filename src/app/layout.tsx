import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wonderpunk — Wonder, Delivered.",
  description:
    "Magic mail from magical friends and family. A subscription service for sending personalised, AI-crafted magic letters to the kids you love — no matter how far away you are.",
  openGraph: {
    title: "Wonderpunk — Wonder, Delivered.",
    description:
      "Magic mail from magical friends and family. Send personalised, illustrated magic letters to the kids you love.",
    url: "https://wonderpunk.studio",
    siteName: "Wonderpunk",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wonderpunk — Wonder, Delivered.",
    description:
      "Magic mail from magical friends and family. Send personalised, illustrated magic letters to the kids you love.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
