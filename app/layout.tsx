import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Design Event Websites & Brand Kits | Arrived Designer Partners",
  description:
    "Join Arrived's designer network. Get matched to event hosts who need brand kits, invites, signage, and custom design work, with real budgets and clear scope.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-brand-navy">
        {children}
      </body>
    </html>
  );
}
