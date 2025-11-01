import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Field, FieldError, FieldLabel, FieldSet } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FieldLabelWithAI } from "./FieldLabelWithAI";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  helpText: React.ReactNode;
  options: RadioOption[];
  aiValue: string | null | undefined;
  onReset: () => void;
  disabled?: boolean;
}

export function RadioGroupField<T extends FieldValues>({
  name,
  control,
  label,
  helpText,
  options,
  aiValue,
  onReset,
  disabled = false,
}: RadioGroupFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isAiGenerated = aiValue === field.value;
        const firstOptionId = `${field.name}-${options[0]?.value}`;

        return (
          <FieldSet data-invalid={fieldState.invalid}>
            <FieldLabelWithAI
              label={label}
              htmlFor={firstOptionId}
              helpText={helpText}
              isAiGenerated={isAiGenerated}
              aiValue={aiValue}
              onReset={onReset}
            />

            <RadioGroup
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}
              disabled={disabled}>
              {options.map((option) => (
                <Field
                  key={option.value}
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}>
                  <RadioGroupItem
                    value={option.value}
                    id={`${field.name}-${option.value}`}
                    aria-invalid={fieldState.invalid}
                    disabled={disabled}
                  />
                  <FieldLabel
                    htmlFor={`${field.name}-${option.value}`}
                    className="text-xs font-normal text-gray-700 sm:text-sm">
                    {option.label}
                  </FieldLabel>
                </Field>
              ))}
            </RadioGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
        );
      }}
    />
  );
}
