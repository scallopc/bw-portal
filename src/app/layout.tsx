import type { Metadata } from "next";
import { Montserrat, Oswald } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BuildWeb - Sites e Sistemas que Vendem",
  description: "Transformamos ideias em sites e sistemas que geram resultados reais. Criação de sites institucionais, CRMs personalizados e automações com IA.",
  keywords: "criação de sites, desenvolvimento web, CRM personalizado, automação, IA, WhatsApp, landing page",
  authors: [{ name: "BuildWeb" }],
  openGraph: {
    title: "BuildWeb - Sites e Sistemas que Vendem",
    description: "Transformamos ideias em sites e sistemas que geram resultados reais.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} ${oswald.variable} font-montserrat antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
