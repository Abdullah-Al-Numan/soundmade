"use client";
import localFont from "next/font/local";
import "./globals.css";
import ApolloClientProvider from "@/provider/apollo-client";
import ReduxProvider from "@/provider/redux";
import { usePathname } from "next/navigation";
import DashboardLayout from "@/components/dashboardLayout";
import { metadata } from "./metadata";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route

  const isAuthPage = pathname === "/login";
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/soundmade.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800`}
      >
        <ReduxProvider>
          <ApolloClientProvider>
            {isAuthPage ? (
              <>{children}</>
            ) : (
              <DashboardLayout>{children}</DashboardLayout>
            )}
          </ApolloClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
