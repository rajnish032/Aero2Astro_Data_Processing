"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../../providers";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import "../styles/app.css";
import { GoogleAnalytics } from '@next/third-parties/google'
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
const APP_NAME = "Aero2Astro";
const APP_DEFAULT_TITLE = "Aero2Astro Gis | Build Your Portfolio & Earn Rewards";
const APP_TITLE_TEMPLATE = "%s - Aero2Astro";
const APP_DESCRIPTION = "Join the AERO2ASTRO Gis Data Processing Network to manage your complete gis profile, access exclusive job listings, and connect with top professionals. Explore cutting-edge drone applications and elevate your aerial services.";


export const viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{APP_DEFAULT_TITLE}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="keywords" content="Gis Pilots, Aerial Services, Gis Jobs, Gis Technology, UAV, AERO2ASTRO" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon512_maskable.png" />
        <link rel="apple-touch-icon" href="/rounded.png" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta property="og:title" content={APP_DEFAULT_TITLE} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:site_name" content={APP_NAME} />
        <meta name="twitter:card" content="summary" />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <RecoilRoot>
          <Providers>
            {children}
            <div id="portal"></div>
            <Toaster />
            <ToastContainer />
          </Providers>
        </RecoilRoot>
         {/* Cloudflare Analytics */}
         <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN}"}`}
            strategy="afterInteractive"
          />
      </body>
    </html>
  );
}
