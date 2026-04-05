import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/component/ThemeProvider";

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-ebgaramond',
})


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TXY Portfolio",
  description: "tech portfolio",
  icons: {icon: '/icon.jpg'},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
