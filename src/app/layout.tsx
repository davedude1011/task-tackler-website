"use client";

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "~/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import AccountCreationWrapper from "~/components/custom/account-creation-wrapper";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <AccountCreationWrapper>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </AccountCreationWrapper>
    </ClerkProvider>
  );
}
