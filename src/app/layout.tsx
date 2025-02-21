import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { Analytics } from "@vercel/analytics/react";

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export const metadata = {
    title: "Ritesh's Portfolio",
    description: "I make things that work... eventually.",
    metadataBase: new URL("https://ahlawat.dev"),
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            style={{ scrollBehavior: "smooth" }}
            className={fontSans.variable}
        >
            <body
                className={cn(
                    "bg-background min-h-screen font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <Analytics />
                <TRPCReactProvider>
                    <Toaster richColors closeButton />
                    <TooltipProvider>{children}</TooltipProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
