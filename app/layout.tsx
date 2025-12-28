import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

// Do NOT export this
const yekanBakh = localFont({
  src: [
    {
      path: "../public/fonts/YekanBakhFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakhFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakhFaNum-Thin.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-yekan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "اپراتوری سلامت ناجی",
  description: "درگاه هوشمند سلامت",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${yekanBakh.variable} antialiased`}>
          {children}
      </body>
    </html>
  );
}
