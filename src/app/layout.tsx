import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "@/lib/styles/animations.css";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "mentoria importação",
    "comércio exterior",
    "Alfredo ABN8",
    "importação China",
    "negócios",
    "empreendedorismo",
    "exportação",
    "trading",
    "primeiro contêiner",
    "mentoria empresarial"
  ],
  authors: [{ name: "Alfredo ABN8 Trading" }],
  creator: "Alfredo ABN8 Trading",
  publisher: "Alfredo ABN8 Trading",
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: "@abn8trading",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://i.ibb.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.ibb.co" />
        <link rel="preconnect" href="https://script.google.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://script.google.com" />
      </head>
      <body className={`${inter.variable} font-sans gpu-accelerated`}>
        {/* Critical CSS loaded inline for better performance */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .critical-loading {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #000000;
              color: #ffffff;
            }
          `
        }} />

        {children}

        {/* Analytics and tracking scripts - loaded after content */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            {process.env.NEXT_PUBLIC_GA_ID && (
              <>
                <Script
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                  strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                  {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                      page_title: document.title,
                      page_location: window.location.href,
                    });
                  `}
                </Script>
              </>
            )}

            {/* Meta Pixel */}
            {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
              <Script id="facebook-pixel" strategy="afterInteractive">
                {`
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
                  fbq('track', 'PageView');
                `}
              </Script>
            )}

            {/* Conversion tracking for form submissions */}
            <Script id="conversion-tracking" strategy="afterInteractive">
              {`
                window.trackFormSubmission = function() {
                  // Google Analytics event
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                      event_category: 'engagement',
                      event_label: 'mentoria_inscription'
                    });
                  }

                  // Facebook Pixel event
                  if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead', {
                      content_name: 'Mentoria Alfredo ABN8',
                      content_category: 'education'
                    });
                  }
                };
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}