import type { Metadata } from "next";
import { Inter, Podkova, Poppins } from "next/font/google";
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
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const podvoka = Podkova({
  subsets: ["latin"],
  variable: "--font-podkova",
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Revco",
    default: "Revco",
  },
  description: "The admin dashboard for the Revco platform",
};

const primary: MantineColorsTuple = [
  "#9ca3af",
  "#9ca3af",
  "#9ca3af",
  "#9ca3af",
  "#9ca3af",
  "#9ca3af",
  "#9ca3af",
  "#9ca3af",
  "#9ca3af",
  "#9ca3af",
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

const red: MantineColorsTuple = [
  "#EB5757",
  "#EB5757",
  "#EB5757",
  "#EB5757",
  "#EB5757",
  "#EB5757",
  "#EB5757",
  "#EB5757",
  "#EB5757",
  "#EB5757",
];
const orange: MantineColorsTuple = [
  "#F2994A",
  "#F2994A",
  "#F2994A",
  "#F2994A",
  "#F2994A",
  "#F2994A",
  "#F2994A",
  "#F2994A",
  "#F2994A",
  "#F2994A",
];
const blue: MantineColorsTuple = [
  "#32ADE6",
  "#32ADE6",
  "#32ADE6",
  "#32ADE6",
  "#32ADE6",
  "#32ADE6",
  "#32ADE6",
  "#32ADE6",
  "#32ADE6",
  "#32ADE6",
];
const green: MantineColorsTuple = [
  "#27AE60",
  "#27AE60",
  "#27AE60",
  "#27AE60",
  "#27AE60",
  "#27AE60",
  "#27AE60",
  "#27AE60",
  "#27AE60",
  "#27AE60",
];

const theme = createTheme({
  colors: {
    primary,
    white,
    red,
    orange,
    blue,
    green,
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
      <body
        className={`${podvoka.variable} ${inter.className} ${poppins.variable} antialiased`}
      >
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
