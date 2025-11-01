import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Field, FieldError } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { FieldLabelWithAI } from "./FieldLabelWithAI";

interface TextareaFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  helpText: React.ReactNode;
  placeholder: string;
  aiValue: string;
  onReset: () => void;
}

export function TextAreaField<T extends FieldValues>({
  name,
  control,
  label,
  helpText,
  placeholder,
  aiValue,
  onReset,
}: TextareaFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isAiGenerated = aiValue === field.value;
        const textareaId = `field-${field.name}`;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabelWithAI
              label={label}
              htmlFor={textareaId}
              helpText={helpText}
              isAiGenerated={isAiGenerated}
              aiValue={aiValue}
              onReset={onReset}
            />

            <Textarea
              {...field}
              id={textareaId}
              aria-invalid={fieldState.invalid}
              className="focus-visible:border-plum text-xs placeholder:text-xs sm:text-sm md:placeholder:text-sm"
              placeholder={placeholder}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
