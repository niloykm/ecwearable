import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { MotionProvider, ScrollProgressBar } from "@/components/motion/MotionPrimitives";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ECWEARABLE — Engineered Everyday Garments & Technical Wearables",
  description:
    "High-performance technical apparel and everyday essential brand. Heavyweight 280 GSM French Terry, water-repellent ripstop shells, and ergonomic activewear built for daily transit and training.",
  keywords: [
    "ECWEARABLE",
    "Technical Apparel",
    "Heavyweight Tee 280 GSM",
    "Ripstop Cargo Pants",
    "Storm Shell Windbreaker",
    "Merino Wool Crewneck",
    "Everyday Basics",
    "Cordura Daypack",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 font-sans antialiased selection:bg-zinc-950 selection:text-white">
        <MotionProvider>
          <ScrollProgressBar />
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
        </MotionProvider>
      </body>
    </html>
  );
}
