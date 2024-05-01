import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/mian-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fredex",
  description: "Custom your Fred Charts easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNav />
        <main className="w-10/12 m-auto">{children}</main>
      </body>
    </html>
  );
}
