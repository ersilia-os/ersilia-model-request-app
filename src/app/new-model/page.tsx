"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PublicationInput from "@/components/new-model/PublicationInput";
import FileDrop from "@/components/new-model/FileDrop";
import { useRouter } from "next/navigation";

export default function NewModelPage() {
  const [publication, setPublication] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function uploadPdf(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    setIsLoading(true);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      console.log("Upload response:", res.status, data);

      if (!res.ok) throw new Error(data.error || "Upload failed");

      sessionStorage.setItem("generatedReport", data.report);

      router.push("/new-model/processing");
    } catch (err) {
      console.error(err);
      alert("⚠️ Error generating report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      await uploadPdf(file);
    } else if (publication) {
      console.log("Handle publication link:", publication);
    } else {
      alert("Please upload a PDF or provide a publication link.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white my-6">
      <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 mb-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Hello {"<UserName>"}
          </h1>
          <p className="text-sm text-gray-400 text-center mt-2">
            Place link for your publication or attach your file below
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <CardContent className="flex flex-col gap-4 p-0">
            <PublicationInput
              publication={publication}
              setPublication={setPublication}
              disabled={!!file}
            />

            <FileDrop
              file={file}
              publication={publication}
              onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
              onRemoveFile={() => setFile(null)}
            />

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <Button
                asChild
                variant="transparent"
                className="w-full sm:flex-1"
              >
                <Link href="/">Back to Home</Link>
              </Button>

              <Button
                type="submit"
                variant="plum"
                disabled={isLoading || (!file && !publication)}
                className="w-full sm:flex-1"
              >
                {isLoading ? "Uploading..." : "Submit"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}