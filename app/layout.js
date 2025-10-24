import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SiteHeader from "@/components/ui/siteHeader";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://keyfab.com'),
  title: {
    default: 'Keyfab - Claviers Mécaniques Personnalisés',
    template: `%s | Keyfab`,
  },
  description: "Créez le clavier mécanique de vos rêves. Choisissez vos composants ou décrivez-nous votre projet, et notre équipe d'experts lui donnera vie.",
  openGraph: {
    title: 'Keyfab - Claviers Mécaniques Personnalisés',
    description: "Créez le clavier mécanique de vos rêves. Choisissez vos composants ou décrivez-nous votre projet, et notre équipe d'experts lui donnera vie.",
    url: 'https://keyfab.com',
    siteName: 'Keyfab',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keyfab - Claviers Mécaniques Personnalisés',
    description: "Créez le clavier mécanique de vos rêves. Choisissez vos composants ou décrivez-nous votre projet, et notre équipe d'experts lui donnera vie.",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
