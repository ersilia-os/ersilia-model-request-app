import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";

import MultiSelect from "../multi-select";
import { Field, FieldError } from "../ui/field";
import { FieldLabelWithAI } from "./FieldLabelWithAI";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  helpText: React.ReactNode;
  placeholder: string;
  options: MultiSelectOption[];
  aiValue: string[] | null | undefined;
  onReset: () => void;
}

export function MultiSelectField<T extends FieldValues>({
  name,
  control,
  label,
  helpText,
  placeholder,
  options,
  aiValue,
  onReset,
}: MultiSelectFieldProps<T>) {
  const areArraysEqual = (a?: string[], b?: string[]) => {
    if (!a || !b) return a === b;
    if (a.length !== b.length) return false;
    return [...a].sort().join() === [...b].sort().join();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const currentValue = field.value || [];
        const isAiGenerated = areArraysEqual(currentValue, aiValue || []);
        const multiSelectId = `field-${field.name}`;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabelWithAI
              label={label}
              htmlFor={multiSelectId}
              helpText={helpText}
              isAiGenerated={isAiGenerated}
              aiValue={aiValue}
              onReset={onReset}
            />

            <MultiSelect
              id={multiSelectId}
              options={options}
              value={field.value || []}
              onChange={field.onChange}
              placeholder={placeholder}
              className={cn(
                fieldState.invalid &&
                  "border-red-500 focus-visible:border-red-500"
              )}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
