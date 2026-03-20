import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bamboo Money — Your money, growing.",
  description:
    "Bamboo Money brings your spending, subscriptions, and net worth into one calm, intelligent space — so you can focus on building the life you want.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fraunces.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('bamboo-theme')!=='dark')return;var el=document.getElementById('app-shell');if(el){el.classList.add('dark');return}var o=new MutationObserver(function(m,obs){var s=document.getElementById('app-shell');if(s){s.classList.add('dark');obs.disconnect()}});o.observe(document.documentElement,{childList:true,subtree:true})}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-bg-card focus:text-text-primary focus:rounded-[var(--radius-md)] focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-border-focus font-body text-sm"
        >
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
