import "./globals.css";

import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { Providers } from "./Provider";

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "Generated by create next app",
};

// eslint-disable-next-line prefer-arrow-functions/prefer-arrow-functions
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Roboto"
        }
      }}
    >
      <html lang="en">
        <body>
          <Toaster 
            position="top-right"
          />
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ConfigProvider>
  );
}
