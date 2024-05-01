import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import AidEyeKit from "@/components/aideyekit/AidEyeKit";

export const metadata: Metadata = {
  title: "AidEyeKit Demo | A demo of how AidEyeKit would work on a dashboard",
  description:
    "This is a demo of how AidEyeKit would work on a dashboard, showcasing the visual guide and element highlighting capabilities.",
  authors: [{ name: "Sean Chuah", url: "schuah.com" }],
  openGraph: {
    title: "AidEyeKit Demo | A demo of how AidEyeKit would work on a dashboard",
    type: "website",
    url: "https://aideyekit.com",
    siteName: "AidEyeKit",
    description:
      "This is a demo of how AidEyeKit would work on a dashboard, showcasing the visual guide and element highlighting capabilities.",
    images: [
      {
        url: "https://aideyekit.com/brand/metaTagImage.svg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AidEyeKit",
    creator: "@DoughnutNCookie",
    images: "https://aideyekit.com/brand/metaTagImage.svg",
  },
  alternates: {
    canonical: "https://aideyekit.com",
  },
  publisher: "AidEyeKit",
  icons: {
    icon: "https://aideyekit.com/brand/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${clsx(
          "font-sans antialiased",
          fontSans.className
        )} text-text `}
      >
        <Providers>
          {children}
          <AidEyeKit />
        </Providers>
      </body>
    </html>
  );
}
