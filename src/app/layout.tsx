import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import { Merriweather } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import 'animate.css';

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'], // Specify the weights you need
});


export const metadata: Metadata = {
  title: "Melissa For Congress",
  description: "We have more in common than what divides us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192" />
        <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" />
      </Head>
      <body className={`${titilliumWeb.className}`}>{children}</body>
    </html>
  );
}
