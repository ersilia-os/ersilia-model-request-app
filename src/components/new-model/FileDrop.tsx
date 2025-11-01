"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/ui/shadcn-io/dropzone";
import { cn } from "@/lib/utils";

interface Props {
  file: File | null;
  publication?: string;
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
    <div className="space-y-3">
      <Dropzone
        onDrop={onDrop}
        accept={{ "application/pdf": [".pdf"] }}
        maxFiles={1}
        disabled={!!publication}
        className={cn(
          "border-plum/20 min-h-48 cursor-pointer rounded-xl border-2 border-dashed transition-colors",
          publication
            ? "cursor-not-allowed bg-gray-100 opacity-60"
            : "hover:bg-gray-100 active:bg-gray-200"
        )}>
        <div className="text-center text-sm">
          <p
            className={cn(
              "mb-1 transition-colors",
              publication ? "text-gray-400" : "text-gray-600"
            )}>
            {publication
              ? "Disabled — clear the link to upload a file"
              : "Drag & drop your file here"}
          </p>
          {!publication && (
            <p className="text-xs text-gray-400">or click to browse</p>
          )}
        </div>
      </Dropzone>
      {file && (
        <div className="mx-auto flex w-full max-w-xs items-center justify-between rounded-md border bg-white px-3 py-2 shadow-sm">
          <p className="truncate text-gray-700">{file.name}</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFile();
            }}
            className="hover:text-plum h-auto cursor-pointer p-1">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
