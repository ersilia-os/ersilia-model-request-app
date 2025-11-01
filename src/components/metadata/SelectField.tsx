import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Field, FieldError } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FieldLabelWithAI } from "./FieldLabelWithAI";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  helpText: React.ReactNode;
  placeholder: string;
  options: SelectOption[];
  aiValue: string | null | undefined;
  onReset: () => void;
}

export function SelectField<T extends FieldValues>({
  name,
  control,
  label,
  helpText,
  placeholder,
  options,
  aiValue,
  onReset,
}: SelectFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isAiGenerated = aiValue === field.value;
        const selectId = `field-${name}`;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabelWithAI
              label={label}
              htmlFor={selectId}
              helpText={helpText}
              isAiGenerated={isAiGenerated}
              aiValue={aiValue}
              onReset={onReset}
            />

            <div className="mt-1">
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger
                  id={selectId}
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px] text-xs placeholder:text-xs sm:text-sm md:placeholder:text-sm">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
