"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SpinnerEmpty } from "@/components/processing/processing";

export default function ProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const report = sessionStorage.getItem("aiAnalysis");

      if (report) {
        router.push("/new-model/metadata");
      } else {
        router.push("/new-model");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SpinnerEmpty />
    </div>
  );
}
