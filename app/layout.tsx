import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jobly — Find jobs you actually want",
  description:
    "Curated opportunities from top companies. Apply smarter, hire faster — all on one beautifully simple platform.",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${figtree.variable} antialiased`}
      >
        <ClerkProvider
          dynamic
          appearance={{
            layout: {
              unsafe_disableDevelopmentModeWarnings: true,
            },
            variables: {
              colorPrimary: "#e54d2e",
              colorBackground: "var(--card)",
              colorText: "var(--foreground)",
              colorTextSecondary: "var(--muted-foreground)",
              colorInputBackground: "var(--background)",
              colorInputText: "var(--foreground)",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-figtree), system-ui, sans-serif",
            },
            elements: {
              // Place Clerk styles in the "clerk" CSS layer so Tailwind
              // utilities can override when needed
              rootBox: "",
            },
          }}
        >
          <ConvexClientProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
