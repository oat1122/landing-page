import type { Metadata } from "next";
import { Kanit, Prompt } from "next/font/google"; // Import Kanit and Prompt
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

// Configure Kanit for Headings
const kanit = Kanit({
  weight: ["400", "600", "700"],
  subsets: ["latin", "thai"], // Added 'thai' subset
  variable: "--font-kanit",
  display: "swap", // Recommended for performance
});

// Configure Prompt for Body
const prompt = Prompt({
  weight: ["300", "400", "500"],
  subsets: ["latin", "thai"], // Added 'thai' subset
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "โรงงานผลิตเสื้อ | เสื้อยืด เสื้อโปโล ราคาโรงงาน",
  description:
    "โรงงานผลิตเสื้อคุณภาพ เสื้อยืด เสื้อโปโล ราคาถูกกว่าเพราะผลิตเอง",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} ${prompt.variable} antialiased`}>
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
