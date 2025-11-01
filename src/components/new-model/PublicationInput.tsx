import { Input } from "@/components/ui/input";
import { Control, Controller } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import { z } from "zod";
import { UploadFormSchema } from "@/schema/upload-schema";

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
            className="border-2 border-plum/50 rounded-lg focus-visible:border-plum focus-visible:ring-plum focus-visible:ring-[1px] outline-none disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-xs md:placeholder:text-sm text-xs sm:text-sm"
            disabled={disabled}
          />
        </Field>
      )}
    />
  );
}
