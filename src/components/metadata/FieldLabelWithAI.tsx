import { Info, RotateCcw, Sparkles } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface FieldLabelWithAIProps<T = string | string[]> {
  label: string;
  htmlFor: string;
  helpText: React.ReactNode;
  isAiGenerated: boolean;
  aiValue: T | null | undefined;
  onReset: () => void;
}

export function FieldLabelWithAI<T = string | string[]>({
  label,
  htmlFor,
  helpText,
  isAiGenerated,
  aiValue,
  onReset,
}: FieldLabelWithAIProps<T>) {
  const isManuallyEdited = !isAiGenerated;
  const hasAiValue =
    aiValue !== null &&
    aiValue !== undefined &&
    (Array.isArray(aiValue) ? aiValue.length > 0 : Boolean(aiValue));

  return (
    <div className="flex items-center gap-2">
      <FieldLabel
        htmlFor={htmlFor}
        className="text-plum/85 flex items-center gap-1">
        {label}

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="m-0 inline-flex cursor-pointer border-none bg-transparent p-0"
              aria-label={`Help for ${label}`}>
              <Info size={16} className="relative top-[0.5px]" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="text-plum/85 w-64 bg-white text-sm"
            side="bottom"
            align="start">
            {helpText}
          </PopoverContent>
        </Popover>
      </FieldLabel>

      {isManuallyEdited ? (
        <Button
          variant="ghost"
          size="sm"
          className="h-4 gap-1 px-0 text-xs"
          onClick={onReset}
          type="button">
          <Badge variant="secondary" className="cursor-pointer gap-1 text-xs">
            <RotateCcw className="h-1 w-1" color="blue" />
            <span className="hidden sm:inline">Reset to AI Suggestion</span>
          </Badge>
        </Button>
      ) : (
        hasAiValue && (
          <Badge variant="secondary" className="gap-1 text-xs">
            <Sparkles className="h-3 w-3" color="blue" />
            AI
          </Badge>
        )
      )}
    </div>
  );
}
