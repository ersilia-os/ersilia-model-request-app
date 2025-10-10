"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Dropzone } from "@/components/ui/shadcn-io/dropzone";
import { cn } from "@/lib/utils";

interface Props {
  file: File | null;
  publication: string;
  onDrop: (acceptedFiles: File[]) => void;
  onRemoveFile: () => void;
}

export default function FileDrop({
  file,
  publication,
  onDrop,
  onRemoveFile,
}: Props) {
  return (
    <Dropzone
      onDrop={onDrop}
      accept={{ "application/pdf": [".pdf"] }}
      maxFiles={1}
      disabled={!!publication}
      className={cn(
        "rounded-xl min-h-48 transition-colors cursor-pointer border-2 border-dashed border-gray-300",
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
              onRemoveFile();
            }}
            className="p-1 h-auto hover:text-plum cursor-pointer"
          >
            <X className="w-4 h-4" />
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
            <p className="text-gray-400 text-xs">or click to browse</p>
          )}
        </div>
      )}
    </Dropzone>
  );
}
