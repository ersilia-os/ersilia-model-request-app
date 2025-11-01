import { Control, Controller } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { UploadFormSchema } from "@/schema/upload-schema";

import { Field, FieldLabel } from "../ui/field";

interface PublicationInputProps {
  control: Control<z.infer<typeof UploadFormSchema>>;
  disabled?: boolean;
}

export default function PublicationInput({
  control,
  disabled = false,
}: PublicationInputProps) {
  return (
    <Controller
      name="publication"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel className="text-plum font-semibold">
            Publication URL
          </FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={
              disabled
                ? "Disabled — remove the file to insert a link"
                : "Enter publication URL (PDF or article link)"
            }
            className="border-plum/50 focus-visible:border-plum focus-visible:ring-plum rounded-lg border-2 text-xs outline-none placeholder:text-xs focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm md:placeholder:text-sm"
            disabled={disabled}
          />
        </Field>
      )}
    />
  );
}
