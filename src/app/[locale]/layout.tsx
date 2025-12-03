import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav/bottom-nav";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper";
import { RegisterSW } from "@/app/register-sw";
import { LoadingCursor } from "@/components/loading-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Template",
  description: "Next.js Template with i18n",
  icons: {
    icon: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Next.js',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <RegisterSW />
          <LoadingCursor />
          <div className="flex flex-col min-h-screen">
            <header className="p-4 bg-white shadow-md w-full">
              <div className="flex items-center justify-center max-w-md mx-auto">
                <h1 className="text-lg font-bold text-gray-800 text-center">
                  Next.js Template
                </h1>
              </div>
            </header>
            <main className="flex-grow pb-16 max-w-md mx-auto w-full px-4">
              <PageTransitionWrapper>
                {children}
              </PageTransitionWrapper>
            </main>
            <BottomNav />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
