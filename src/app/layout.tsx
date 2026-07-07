import type { Metadata } from "next";
import { Anek_Latin } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CalEmbedProvider } from "@/components/cal-embed-provider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const anekLatin = Anek_Latin({
  variable: "--font-anek",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anekLatin.variable} h-full overflow-x-hidden antialiased`}>
      <body className="min-h-full overflow-x-hidden font-sans">
        <CalEmbedProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </CalEmbedProvider>
      </body>
    </html>
  );
}
