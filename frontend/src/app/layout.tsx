import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "PokeTrade",
  description: "GoとNext.jsで作るポケモン交換マッチングアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
