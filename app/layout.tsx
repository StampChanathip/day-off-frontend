import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { QueryProviders } from "@/shared/providers/QueryProvider";
import { Suspense } from "react";
import Loading from "@/components/utils/Loading";
import { ToastProvider } from "@/shared/providers/ToastProvider";
import ToastWrapper from "@/components/utils/ToastWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS Boilerplate",
  description: "NextJS Frontend Boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="bumblebee">
      <QueryProviders>
        <Suspense fallback={<Loading children={undefined} />}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ToastProvider>
              <ToastWrapper />
              <Header />
              <div className="w-full p-4 md:p-16">{children}</div>
            </ToastProvider>
          </body>
        </Suspense>
      </QueryProviders>
    </html>
  );
}
