import { Info, RotateCcw, Sparkles } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

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
    <div className="flex gap-2 items-center">
      <FieldLabel
        htmlFor={htmlFor}
        className="text-plum/85 flex items-center gap-1"
      >
        {label}

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-0 m-0 bg-transparent border-none cursor-pointer inline-flex"
              aria-label={`Help for ${label}`}
            >
              <Info size={16} className="relative top-[0.5px]" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-64 bg-white text-plum/85 text-sm"
            side="bottom"
            align="start"
          >
            {helpText}
          </PopoverContent>
        </Popover>
      </FieldLabel>

      {isManuallyEdited ? (
        <Button
          variant="ghost"
          size="sm"
          className="h-4 px-0 text-xs gap-1"
          onClick={onReset}
          type="button"
        >
          <Badge variant="secondary" className="gap-1 text-xs cursor-pointer">
            <RotateCcw className="w-1 h-1" color="blue" />
            <span className="hidden sm:inline">Reset to AI Suggestion</span>
          </Badge>
        </Button>
      ) : (
        hasAiValue && (
          <Badge variant="secondary" className="gap-1 text-xs">
            <Sparkles className="w-3 h-3" color="blue" />
            AI
          </Badge>
        )
      )}
    </div>
  );
}
