import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";

export default async function LoginLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
