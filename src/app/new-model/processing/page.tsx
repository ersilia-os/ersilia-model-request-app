"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SpinnerEmpty } from "@/components/processing/processing";

export default function ProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    const checkInterval = setInterval(() => {
      const slugRaw = localStorage.getItem("slug");

      if (slugRaw) {
        clearInterval(checkInterval);
        const slug = JSON.parse(slugRaw);
        localStorage.removeItem("slug");
        router.push(`/new-model/metadata/${slug}`);
      }
    }, 500);

    return () => {
      clearInterval(checkInterval);
    };
  }, [router]);

  return <SpinnerEmpty />;
}
