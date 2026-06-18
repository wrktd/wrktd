import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";
import "./globals.css";

const syne = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WRKTD — Turn Your Designs Into Real Products",
  description:
    "You already have designs and people who like your brand. We turn those designs into real home decor products — and when your fans buy something, it ships itself.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} h-full`}>
      <body className="min-h-full bg-black">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
