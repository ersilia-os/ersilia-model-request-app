import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError } from "../ui/field";
import { FieldLabelWithAI } from "./FieldLabelWithAI";
import { Input } from "../ui/input";

interface TextInputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  helpText: React.ReactNode;
  placeholder: string;
  aiValue: string | null | undefined;
  onReset: () => void;
  disabled?: boolean;
}

export function TextInputField<T extends FieldValues>({
  name,
  control,
  label,
  helpText,
  placeholder,
  aiValue,
  onReset,
  disabled = false,
}: TextInputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isAiGenerated = aiValue === field.value;
        const inputId = `field-${field.name}`;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabelWithAI
              label={label}
              htmlFor={inputId}
              helpText={helpText}
              isAiGenerated={isAiGenerated}
              aiValue={aiValue}
              onReset={onReset}
            />

            <Input
              {...field}
              id={inputId}
              aria-invalid={fieldState.invalid}
              className="focus-visible:border-plum placeholder:text-xs md:placeholder:text-sm text-xs sm:text-sm"
              placeholder={placeholder}
              disabled={disabled}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
