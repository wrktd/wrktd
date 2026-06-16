import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WRKTD — Turn Your Designs Into Real Products",
  description: "You already have designs and people who like your brand. We turn those designs into real home decor products — and when your fans buy something, it ships itself.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
