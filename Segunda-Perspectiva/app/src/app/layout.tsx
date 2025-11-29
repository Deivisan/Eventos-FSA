import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventosFSA - Música ao Vivo em Feira de Santana",
  description: "A maior plataforma de eventos e música ao vivo de Feira de Santana, Bahia. Conectando artistas, estabelecimentos e você.",
  keywords: ["eventos", "música ao vivo", "Feira de Santana", "shows", "bares", "artistas", "Bahia"],
  authors: [{ name: "EventosFSA" }],
  creator: "EventosFSA",
  publisher: "EventosFSA",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://eventosfsa.com.br",
    siteName: "EventosFSA",
    title: "EventosFSA - Música ao Vivo em Feira de Santana",
    description: "A maior plataforma de eventos e música ao vivo de Feira de Santana, Bahia.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EventosFSA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EventosFSA - Música ao Vivo em Feira de Santana",
    description: "A maior plataforma de eventos e música ao vivo de Feira de Santana, Bahia.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "EventosFSA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
