import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ListView } from "@/components/sider";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tabulr",
  description: "A simple and easy to use MySQL/MariaDB management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen ">
            <SidebarProvider>
              <ListView />
              <SidebarTrigger />
              <main className="flex-1 flex flex-col px-4 py-12">
                {children}
              </main>
              <Toaster />
              {/* <Footer /> */}
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
