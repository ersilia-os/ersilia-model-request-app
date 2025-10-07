"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

import { Dropzone } from "@/components/ui/shadcn-io/dropzone";

interface Props {
  userName?: string;
}

export default function PublicationForm({ userName }: Props) {
  const [publication, setPublication] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { publication, file });
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const removeFile = () => setFile(null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-[repeating-linear-gradient(45deg,rgba(152,255,152,0.05)_0,rgba(152,255,152,0.05)_0.5px,transparent_0.5px,transparent_20px),repeating-linear-gradient(-45deg,rgba(152,255,152,0.05)_0,rgba(152,255,152,0.05)_0.5px,transparent_0.5px,transparent_20px)]">
      <div className="mb-12">
        <Image
          src="/images/ersilia_logo.png"
          alt="Ersilia Logo"
          width={240}
          height={240}
          priority
        />
      </div>

      <Card className="w-full max-w-md shadow-md border-2 border-plum rounded-2xl">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Hello {userName || "<UserName>"}
          </h1>
          <p className="text-sm text-gray-400 text-center mt-2">
            Enter the publication name and attach your file below
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              id="publication"
              placeholder="Publication name ..."
              value={publication}
              onChange={(e) => setPublication(e.target.value)}
              className="border-2 border-plum rounded-2xl focus:ring-2 focus:ring-plum/40 outline-none"
            />

            <div className="w-full">
              <Dropzone
                onDrop={handleDrop}
                accept={{
                  "application/pdf": [".pdf"],
                  "application/msword": [".doc", ".docx"],
                }}
                maxFiles={1}
                className="rounded-xl hover:bg-gray-200 p-16 transition-colors cursor-pointer"
              >
                {file ? (
                  <div className="flex items-center justify-between w-full max-w-xs bg-white px-3 py-2 rounded-md shadow-sm border">
                    <p className="text-gray-700 truncate">{file.name}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="p-1 h-auto"
                    >
                      <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-sm">
                    <p className="text-gray-600 mb-1">
                      Drag & drop your file here
                    </p>
                    <p className="text-gray-400 text-xs">or click to browse</p>
                  </div>
                )}
              </Dropzone>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end pt-3">
            <Button
              type="submit"
              className="bg-plum hover:[background-color:color-mix(in_oklab,var(--color-plum),white_10%)] text-white font-medium px-6 py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
