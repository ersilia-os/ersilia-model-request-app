"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SpinnerEmpty } from "@/components/processing/processing";

export default function ProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    const checkInterval = setInterval(() => {
      const result = sessionStorage.getItem("aiAnalysis");

      if (result) {
        clearInterval(checkInterval);
        router.push("/new-model/metadata");
      }
    }, 500); // Check every 500ms

    // Timeout after 2 minutes
    // const timeout = setTimeout(() => {
    //   clearInterval(checkInterval);
    //   const result = sessionStorage.getItem("aiAnalysis");

    //   if (!result) {
    //     alert("Analysis is taking longer than expected. Please try again.");
    //     router.push("/new-model");
    //   }
    // }, 120000);

    return () => {
      clearInterval(checkInterval);
      // clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SpinnerEmpty />
    </div>
  );
}
