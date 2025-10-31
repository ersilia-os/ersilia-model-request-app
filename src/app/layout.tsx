import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

import Header from "@/components/header";
import Container from "@/components/ui/container";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebard/AppSideBar";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Ersilia - Model Submission Platform",
  description: "Model Submission Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* <Header /> */}
        {/* <Container>{children}</Container> */}
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" className="bg-[#f5f4f6]" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                  <Toaster position="top-right" />
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
