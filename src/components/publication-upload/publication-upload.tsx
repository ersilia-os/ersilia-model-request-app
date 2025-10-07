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
import { cn } from "@/lib/utils";

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
            Place link for your publication or attach your file below
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              id="publication"
              placeholder={
                file
                  ? "Disabled — remove the file to insert a link"
                  : "Insert link here"
              }
              value={publication}
              onChange={(e) => setPublication(e.target.value)}
              className="border-2 border-plum rounded-lg focus-visible:border-plum focus-visible:ring-plum focus-visible:ring-[1px] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={!!file}
            />

            <div className="w-full">
              <Dropzone
                onDrop={handleDrop}
                accept={{
                  "application/pdf": [".pdf"],
                }}
                maxFiles={1}
                disabled={!!publication}
                className={cn(
                  "rounded-xl p-16 transition-colors cursor-pointer border-2 border-dashed border-gray-300",
                  publication
                    ? "bg-gray-100 opacity-60 cursor-not-allowed"
                    : "hover:bg-gray-100 active:bg-gray-200"
                )}
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
                    <p
                      className={cn(
                        "mb-1 transition-colors",
                        publication ? "text-gray-400" : "text-gray-600"
                      )}
                    >
                      {publication
                        ? "Disabled — clear the link to upload a file"
                        : "Drag & drop your file here"}
                    </p>
                    {!publication && (
                      <p className="text-gray-400 text-xs">
                        or click to browse
                      </p>
                    )}
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
