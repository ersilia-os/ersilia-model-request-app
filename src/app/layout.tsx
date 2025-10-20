import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

import Header from "@/components/header";
import Container from "@/components/ui/container";

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
        <Header />
        <Container>{children}</Container>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
