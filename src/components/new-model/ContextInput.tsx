import { Control, Controller } from "react-hook-form";
import z from "zod";

import { UploadFormSchema } from "@/schema/upload-schema";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface ContextFormProps {
  control: Control<z.infer<typeof UploadFormSchema>>;
}

export default function ContextInput({ control }: ContextFormProps) {
  return (
    <>
      <Controller
        name="question1"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-plum font-semibold">
              What is the model target/endpoint?
            </FieldLabel>
            <FieldDescription>
              E.g: malaria, tuberculosis, molecular description, cytotoxicity
            </FieldDescription>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              className="border-plum/50 focus-visible:border-plum focus-visible:ring-plum rounded-lg border-2 text-xs outline-none placeholder:text-xs focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm md:placeholder:text-sm"
              placeholder="Enter your response here"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="question2"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-plum font-semibold">
              Why is it relevant to drug discovery and global health?
            </FieldLabel>
            <FieldDescription>
              E.g: the model predicts the activity of small molecules against a
              well known pathogen, plasmodium falciparum
            </FieldDescription>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              className="border-plum/50 focus-visible:border-plum focus-visible:ring-plum rounded-lg border-2 text-xs outline-none placeholder:text-xs focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm md:placeholder:text-sm"
              placeholder="Enter your response here"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
