import { Baloo_2, Nunito } from "next/font/google";
import ClientLayout from '@/components/providers/ClientLayout';
import "./globals.css";

const baloo2 = Baloo_2({
  variable: "--font-baloo-2",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: 'Economy Place — Achadinhos • Promoções',
  description: 'Garimpamos as melhores promoções do Mercado Livre todos os dias. Histórico de preço real, comparação, alertas e favoritos.',
  openGraph: {
    title: 'Economy Place — Achadinhos • Promoções',
    description: 'As melhores ofertas do Mercado Livre com histórico de preço verificado.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Economy Place',
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${baloo2.variable} ${nunito.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}