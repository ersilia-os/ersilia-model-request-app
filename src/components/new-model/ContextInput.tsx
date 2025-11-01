import { Control, Controller } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { UploadFormSchema } from "@/schema/upload-schema";
import z from "zod";

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
              className="border-2 border-plum/50 rounded-lg focus-visible:border-plum focus-visible:ring-plum focus-visible:ring-[1px] outline-none disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-xs md:placeholder:text-sm text-xs sm:text-sm"
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
              className="border-2 border-plum/50 rounded-lg focus-visible:border-plum focus-visible:ring-plum focus-visible:ring-[1px] outline-none disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-xs md:placeholder:text-sm text-xs sm:text-sm"
              placeholder="Enter your response here"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
