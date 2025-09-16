import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProviderWrapper } from '@/components/providers/clerk-provider';
import { QueryProviderWrapper } from '@/components/providers/query-provider';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorkoutX",
  description: "WorkoutX - Treinos de musculação",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryProviderWrapper>
          <ClerkProviderWrapper>
            <ThemeProvider
              defaultTheme="system"
              storageKey="workoutx-theme"
            >
              {children}
              <Toaster 
                position="top-right"
                expand={true}
                richColors={true}
                closeButton={true}
              />
            </ThemeProvider>
          </ClerkProviderWrapper>
        </QueryProviderWrapper>
      </body>
    </html>
  );
}
