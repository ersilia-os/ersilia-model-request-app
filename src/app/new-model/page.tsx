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
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  if (!publication && !file) {
    alert("Please provide a link or upload a file.");
    return;
  }

  if (publication) {
    try {
      console.log("Uploading from link:", publication);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: publication }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Upload successful:", result);
        router.push("new-model/processing");
      } else {
        console.error("Upload error:", result.error);
        alert("Upload failed: " + result.error);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      alert("Something went wrong while uploading.");
    }
  } else {
    console.log("File upload not yet implemented.");
  }
};

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) setFile(acceptedFiles[0]);
  };

  const removeFile = () => setFile(null);

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
              onDrop={handleDrop}
              onRemoveFile={removeFile}
            />

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <Button
                asChild
                variant={"transparent"}
                className="w-full sm:flex-1"
              >
                <Link href="/">Back to Home</Link>
              </Button>

              <Button
                type="submit"
                variant={"plum"}
                className="w-full sm:flex-1"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}