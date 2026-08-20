import type { Metadata } from "next";
import { Geist, Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const UMAMI_WEBSITE_ID = "b6539573-7b07-408c-9633-525ae3a21b6d";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Open Sans is the only face on the partner page. Labels and numerals are
// separated by weight, size, and tracking rather than by a second family.
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const title = "Design Event Websites & Brand Kits | Arrived Designer Partners";
const description =
  "Join Arrived's designer network. Get matched to event hosts who need brand kits, invites, signage, and custom design work, with real budgets and clear scope.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/arrived-hero.png", width: 1969, height: 1118 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/arrived-hero.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-navy">
        {children}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
        <Script
          src="https://cloud.umami.is/recorder.js"
          data-website-id={UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
