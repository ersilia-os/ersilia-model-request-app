"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";

interface Props {
  userName?: string;
}

export default function PublicationForm({ userName }: Props) {
  const [publication, setPublication] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { publication, file });
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
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
            <div>
              <Input
                id="publication"
                placeholder="Publication name ..."
                value={publication}
                onChange={(e) => setPublication(e.target.value)}
                className="border-2 border-plum rounded-2xl focus:ring-2 focus:ring-plum/40 outline-none"
              />
            </div>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleDropZoneClick}
              className={cn(
                "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 text-sm transition-colors cursor-pointer",
                dragActive
                  ? "border-mint bg-mint/20"
                  : "border-gray-300 bg-gray-100"
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
                <>
                  <p className="text-gray-600 mb-1">
                    Drag & drop your file here
                  </p>
                  <p className="text-gray-400 text-xs">or click to browse</p>
                </>
              )}
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
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
