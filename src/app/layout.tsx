import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloClientProvider from "@/lib/apolloProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { GoogleAnalytics, GoogleTagManager  } from "@next/third-parties/google";
import ChargebeeConfiguration from "@/components/atom/chargebeeConfiguration";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Iconix Medical",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WKDKSZVC');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* <script
          src="https://js.chargebee.com/v2/chargebee.js"
          data-cb-site="https://iconix-test.chargebee.com"
          data-cb-ga-enabled="true"
        >
        </script> */}
        <ChargebeeConfiguration />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning>
        <AntdRegistry>
          <ApolloClientProvider>{children}</ApolloClientProvider>
        </AntdRegistry>
        <GoogleAnalytics gaId="G-9E5P1YMYMY" />
        <GoogleTagManager gtmId="GTM-5RKX9G3W"/>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WKDKSZVC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
      </body>
    </html>
  );
}
