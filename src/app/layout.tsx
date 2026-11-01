import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { SearchModal } from "@/components/search/SearchModal";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURELIA STUDIO — Editorial Garments, Bespoke Apparel & Luxury Wearables",
  description:
    "A human-crafted editorial garment and horology commerce flagship. Featuring pure Normandy linen, Dhakai muslin, organic cotton, and mechanical timepieces.",
  keywords: [
    "Garments",
    "Wearables",
    "Linen Shirt",
    "Festive Panjabi",
    "Handloom Saree",
    "Chronograph Watch",
    "Editorial Fashion",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen flex flex-col bg-canvas text-ink antialiased selection:bg-[#181816] selection:text-[#FAF8F5]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <WishlistDrawer />
        <SearchModal />
      </body>
    </html>
  );
}
