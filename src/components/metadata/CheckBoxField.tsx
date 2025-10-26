import { Controller, Control, FieldValues, Path } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { FieldLabelWithAI } from "./FieldLabelWithAI";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  helpText: React.ReactNode;
  options: CheckboxOption[];
  aiValue: string[] | null | undefined;
  onReset: () => void;
}

export function CheckboxGroupField<T extends FieldValues>({
  name,
  control,
  label,
  helpText,
  options,
  aiValue,
  onReset,
}: CheckboxGroupFieldProps<T>) {
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
        const firstOptionId = `${field.name}-checkbox-${options[0]?.value}`;

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

            <FieldGroup data-slot="checkbox-group">
              {options.map((option) => (
                <Field
                  key={option.value}
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <Checkbox
                    id={`${field.name}-checkbox-${option.value}`}
                    name={field.name}
                    aria-invalid={fieldState.invalid}
                    checked={field.value?.includes(option.value) || false}
                    onCheckedChange={(checked) => {
                      const currentValues = field.value || [];
                      const newValue = checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(
                            (value: string) => value !== option.value
                          );
                      field.onChange(newValue);
                    }}
                  />
                  <FieldLabel
                    htmlFor={`${field.name}-checkbox-${option.value}`}
                    className="font-normal text-gray-700 text-xs sm:text-sm"
                  >
                    {option.label}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
        );
      }}
    />
  );
}
