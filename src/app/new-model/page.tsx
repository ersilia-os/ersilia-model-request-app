"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PublicationInput from "@/components/new-model/PublicationInput";
import FileDrop from "@/components/new-model/FileDrop";
import { useRouter } from "next/navigation";

export default function Page() {
  const [publication, setPublication] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { publication, file });
    router.push("new-model/processing");
    };

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) setFile(acceptedFiles[0]);
  };

  const removeFile = () => setFile(null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white my-6">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-4xl shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
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
                className="w-full sm:flex-1 font-semibold text-sm md:text-base text-plum bg-transparent hover:bg-gray-100 border-2 border-plum/20 py-3 rounded-lg shadow-sm transition-all duration-200"
              >
                <Link href="/">Back to Home</Link>
              </Button>

              <Button
                type="submit"
                className="w-full sm:flex-1 font-bold text-sm md:text-base bg-plum hover:bg-plum-hover text-white px-6 py-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </main>
  );
}
