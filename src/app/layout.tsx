import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  ColorSchemeScript,
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";

import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";
import UserProvider from "@/providers/UserProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Revco",
    default: "Revco",
  },
  description: "The admin dashboard for the Revco platform",
};

const primary: MantineColorsTuple = [
  "#f6eaff",
  "#e6d0ff",
  "#c89cff",
  "#aa64fe",
  "#9037fd",
  "#801bfd",
  "#780bfe",
  "#6600e3",
  "#5b00cb",
  "#4d00b2",
];

const white: MantineColorsTuple = [
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
];

const theme = createTheme({
  colors: {
    primary,
    white,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Toaster />
        <MantineProvider theme={theme}>
          <AuthProvider>
            <UserProvider>{children}</UserProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
