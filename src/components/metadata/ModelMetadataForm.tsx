"use client";

import { useEffect, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../ui/field";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { METADATA_FORM_CFG } from "@/config/form-cfg";
import { Info } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import MultiSelect from "../multi-select";
import {
  saveMetadataAction,
  saveValidatedMetadataAction,
} from "@/app/new-model/metadata/[slug]/actions";
import { useRouter } from "next/navigation";
import { Loader2, RotateCcw } from "lucide-react";
import { HELP_CFG } from "@/config/help-popover-form";
import { alertError, alertSuccess } from "@/lib/alerts";
import { MetadataFormSchema } from "@/schema/metadata-form-schema";
import { ModelMetadata } from "../../../generated/prisma";

interface ModelMetadataFormProps {
  aiResults: ModelMetadata;
}

export default function ModelMetadataForm({
  aiResults,
}: ModelMetadataFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof MetadataFormSchema>>({
    resolver: zodResolver(MetadataFormSchema),
    mode: "onChange",
    defaultValues: {
      title: aiResults.title || "",
      slug: aiResults.slug || "",
      description: aiResults.description || "",
      interpretation: aiResults.interpretation || "",
      tags: aiResults.tags || [],
      task: aiResults.task || "",
      subtask: aiResults.subtask || "",
      input: aiResults.input,
      inputDimension: aiResults.inputDimension,
      output: aiResults.output || [],
      outputDimension: aiResults.outputDimension || "",
      outputConsistency: aiResults.outputConsistency || "",
      publicationUrl: aiResults.publicationUrl || "",
      publicationYear: aiResults.publicationYear || "",
      publicationType: aiResults.publicationType || "",
      sourceUrl: aiResults.sourceUrl || "",
      sourceType: aiResults.sourceType || "",
      deployment: aiResults.deployment || "",
      biomedicalArea: aiResults.biomedicalArea || [],
      targetOrganism: aiResults.targetOrganism || [],
      license: aiResults.license || "",
    },
  });
  const [isLocked, setIsLocked] = useState(false);
  const [isValidated, setValidated] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof MetadataFormSchema>) {
    const action = await saveValidatedMetadataAction(data, aiResults.id);

    if (action.success === true) {
      setIsLocked(true);
      const slugToUse = action.newSlug || data.slug;
      router.push(`/new-model/preview/${slugToUse}`);
    } else {
      alertError("Something wrong happen and data were not saved");
    }

    setIsLocked(true);
  }

  const handleSaveClick = async () => {
    setIsLoading(true);

    try {
      const titleResult = await form.trigger("title");
      const slugResult = await form.trigger("slug");

      if (!titleResult || !slugResult) {
        setIsLocked(false);
        return;
      }

      const currentFormData = form.getValues();
      const action = await saveMetadataAction(currentFormData, aiResults.id);

      if (action.success === true) {
        alertSuccess("Metadata saved");
        setIsLocked(true);
        if (action.newSlug && action.newSlug !== aiResults.slug) {
          router.push(`/new-model/metadata/${action.newSlug}`);
        }
      } else {
        alertError("Something went wrong and data were not saved");
      }
    } catch (err) {
      console.error("Error while saving metadata:", err);
      alertError("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldResetToAi = (
    fieldName: keyof z.infer<typeof MetadataFormSchema>
  ) => {
    const aiValue = aiResults[fieldName];
    form.setValue(fieldName, aiValue as string);
  };

  const areArraysEqual = (a?: string[], b?: string[]) => {
    if (!a || !b) return a === b;
    if (a.length !== b.length) return false;
    return [...a].sort().join() === [...b].sort().join();
  };

  const watchedValues = form.watch();

  useEffect(() => {
    const checkValidation = async () => {
      const isValid = await form.trigger();
      if (isValid) setValidated("");
    };
    checkValidation();
  }, [watchedValues, form]);

  const handleEditClick = () => {
    setIsLocked(false);
  };

  const onInvalid = (
    errors: FieldErrors<z.infer<typeof MetadataFormSchema>>
  ) => {
    setValidated("*Please fix the highlighted errors first.");

    const firstErrorField = Object.keys(errors)[0];

    const element = document.querySelector(`[name="${firstErrorField}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      const fieldSet = document.querySelector(`[data-invalid="true"]`);
      if (fieldSet) {
        fieldSet.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <>
      <form
        id="form-metadata"
        className="mb-6"
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      >
        <fieldset disabled={isLocked} className="flex flex-col gap-7">
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Basic Identification
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                Essential identifiers for the model. The slug and title are how
                users will find and reference this model in the system.
                {HELP_CFG.basicIdentification.section}
              </FieldDescription>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const isAiGenerated = aiResults.title === field.value;
                    const isManuallyEdited = !isAiGenerated;
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex gap-2 items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="p-0 m-0 bg-transparent border-none"
                              >
                                <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                  Title
                                  <Info
                                    size={16}
                                    className="relative top-[0.5px]"
                                  />
                                </FieldLabel>
                              </button>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-64 bg-white text-plum/85 text-sm"
                              side="bottom"
                              align="start"
                            >
                              {HELP_CFG.basicIdentification.title}
                            </PopoverContent>
                          </Popover>

                          {isManuallyEdited ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 px-0 text-xs gap-1"
                              onClick={() => handleFieldResetToAi("title")}
                            >
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs cursor-pointer"
                              >
                                <RotateCcw className="w-1 h-1" color="blue" />
                                Reset to AI Suggestion
                              </Badge>
                            </Button>
                          ) : (
                            aiResults.title && (
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs "
                              >
                                <Sparkles className="w-3 h-3" color="blue" />
                                AI
                              </Badge>
                            )
                          )}
                        </div>

                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          className="focus-visible:border-plum"
                          placeholder="Model title (minimum 70 characters)"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
              <FieldGroup>
                <Controller
                  name="slug"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const isAiGenerated = aiResults.slug === field.value;
                    const isManuallyEdited = !isAiGenerated;

                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex gap-2 items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="p-0 m-0 bg-transparent border-none"
                              >
                                <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                  Slug
                                  <Info
                                    size={16}
                                    className="relative top-[0.5px]"
                                  />
                                </FieldLabel>
                              </button>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-64 bg-white text-plum/85 text-sm"
                              side="bottom"
                              align="start"
                            >
                              {HELP_CFG.basicIdentification.slug}
                            </PopoverContent>
                          </Popover>

                          {isManuallyEdited ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 px-0 text-xs gap-1"
                              onClick={() => handleFieldResetToAi("slug")}
                            >
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs cursor-pointer"
                              >
                                <RotateCcw className="w-1 h-1" color="blue" />
                                Reset to AI Suggestion
                              </Badge>
                            </Button>
                          ) : (
                            aiResults.slug && (
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs "
                              >
                                <Sparkles className="w-3 h-3" color="blue" />
                                AI
                              </Badge>
                            )
                          )}
                        </div>

                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          className="focus-visible:border-plum"
                          placeholder="e.g. model-name-slug"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Description & Interpretation
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                {HELP_CFG.descriptionInterpretation.section}
              </FieldDescription>
              <FieldGroup>
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const isAiGenerated = aiResults.description === field.value;
                    const isManuallyEdited = !isAiGenerated;

                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex gap-2 items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="p-0 m-0 bg-transparent border-none"
                              >
                                <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                  Description
                                  <Info
                                    size={16}
                                    className="relative top-[0.5px]"
                                  />
                                </FieldLabel>
                              </button>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-64 bg-white text-plum/85 text-sm"
                              side="bottom"
                              align="start"
                            >
                              {HELP_CFG.descriptionInterpretation.description}
                            </PopoverContent>
                          </Popover>

                          {isManuallyEdited ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 px-0 text-xs gap-1"
                              onClick={() =>
                                handleFieldResetToAi("description")
                              }
                            >
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs cursor-pointer"
                              >
                                <RotateCcw className="w-1 h-1" color="blue" />
                                Reset to AI Suggestion
                              </Badge>
                            </Button>
                          ) : (
                            aiResults.description && (
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs "
                              >
                                <Sparkles className="w-3 h-3" color="blue" />
                                AI
                              </Badge>
                            )
                          )}
                        </div>

                        <Textarea
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          className="focus-visible:border-plum"
                          placeholder="Minimum information about model type, results and the training dataset."
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
                <Controller
                  name="interpretation"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const isAiGenerated =
                      aiResults.interpretation === field.value;
                    const isManuallyEdited = !isAiGenerated;

                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex gap-2 items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="p-0 m-0 bg-transparent border-none"
                              >
                                <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                  Interpretation
                                  <Info
                                    size={16}
                                    className="relative top-[0.5px]"
                                  />
                                </FieldLabel>
                              </button>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-64 bg-white text-plum/85 text-sm"
                              side="bottom"
                              align="start"
                            >
                              {
                                HELP_CFG.descriptionInterpretation
                                  .interpretation
                              }
                            </PopoverContent>
                          </Popover>

                          {isManuallyEdited ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 px-0 text-xs gap-1"
                              onClick={() =>
                                handleFieldResetToAi("interpretation")
                              }
                            >
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs cursor-pointer"
                              >
                                <RotateCcw className="w-1 h-1" color="blue" />
                                Reset to AI Suggestion
                              </Badge>
                            </Button>
                          ) : (
                            aiResults.interpretation && (
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs "
                              >
                                <Sparkles className="w-3 h-3" color="blue" />
                                AI
                              </Badge>
                            )
                          )}
                        </div>

                        <Textarea
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          className="focus-visible:border-plum"
                          placeholder="A brief description of how to interpret the model results"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />

            <FieldSet>
              <FieldLegend className="text-plum/90">
                Classification & Tags
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                {HELP_CFG.classificationTags.section}
              </FieldDescription>
              <FieldGroup>
                <Controller
                  name="tags"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const currentTags = field.value || [];
                    const originalTags = aiResults.tags || [];

                    const isAiGenerated = areArraysEqual(
                      currentTags,
                      originalTags
                    );
                    const isManuallyEdited = !isAiGenerated;

                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex gap-2 items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="p-0 m-0 bg-transparent border-none"
                              >
                                <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                  Tags
                                  <Info
                                    size={16}
                                    className="relative top-[0.5px]"
                                  />
                                </FieldLabel>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-64 bg-white text-plum/85 text-sm"
                              side="bottom"
                              align="start"
                            >
                              {HELP_CFG.classificationTags.tags}
                            </PopoverContent>
                          </Popover>

                          {isManuallyEdited ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 px-0 text-xs gap-1"
                              onClick={() => handleFieldResetToAi("tags")}
                            >
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs cursor-pointer"
                              >
                                <RotateCcw className="w-1 h-1" color="blue" />
                                Reset to AI Suggestion
                              </Badge>
                            </Button>
                          ) : (
                            aiResults.tags &&
                            aiResults.tags.length > 0 && (
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs "
                              >
                                <Sparkles className="w-3 h-3" color="blue" />
                                AI
                              </Badge>
                            )
                          )}
                        </div>

                        <MultiSelect
                          id={field.name}
                          options={METADATA_FORM_CFG.tags}
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder="Select tags..."
                          className={cn(
                            fieldState.invalid &&
                              "border-red-500 focus-visible:border-red-500"
                          )}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Technical Specifications
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                {HELP_CFG.technicalSpecifications.section}
              </FieldDescription>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <FieldGroup>
                    <Controller
                      name="task"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const isAiGenerated = aiResults.task === field.value;
                        const isManuallyEdited = !isAiGenerated;

                        return (
                          <FieldSet data-invalid={fieldState.invalid}>
                            <div className="flex gap-2 items-center">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button
                                    type="button"
                                    className="p-0 m-0 bg-transparent border-none"
                                  >
                                    <FieldTitle className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                      Task
                                      <Info
                                        size={16}
                                        className="relative top-[0.5px]"
                                      />
                                    </FieldTitle>
                                  </button>
                                </PopoverTrigger>

                                <PopoverContent
                                  className="w-64 bg-white text-plum/85 text-sm"
                                  side="bottom"
                                  align="start"
                                >
                                  {HELP_CFG.technicalSpecifications.task}
                                </PopoverContent>
                              </Popover>

                              {isManuallyEdited ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 px-0 text-xs gap-1"
                                  onClick={() => handleFieldResetToAi("task")}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs cursor-pointer"
                                  >
                                    <RotateCcw
                                      className="w-1 h-1"
                                      color="blue"
                                    />
                                    Reset to AI Suggestion
                                  </Badge>
                                </Button>
                              ) : (
                                aiResults.task && (
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs "
                                  >
                                    <Sparkles
                                      className="w-3 h-3"
                                      color="blue"
                                    />
                                    AI
                                  </Badge>
                                )
                              )}
                            </div>

                            <RadioGroup
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                              aria-invalid={fieldState.invalid}
                            >
                              {METADATA_FORM_CFG.tasks.map((task) => (
                                <Field
                                  key={task.value}
                                  orientation="horizontal"
                                  data-invalid={fieldState.invalid}
                                >
                                  <RadioGroupItem
                                    value={task.value}
                                    id={`form-metadata-radio-task-${task.value}`}
                                    aria-invalid={fieldState.invalid}
                                  />
                                  <FieldLabel
                                    htmlFor={`form-metadata-radio-task-${task.value}`}
                                    className="font-normal text-gray-700"
                                  >
                                    {task.label}
                                  </FieldLabel>
                                </Field>
                              ))}
                            </RadioGroup>

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldSet>
                        );
                      }}
                    />
                    <Controller
                      name="subtask"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const isAiGenerated = aiResults.subtask === field.value;
                        const isManuallyEdited = !isAiGenerated;

                        return (
                          <FieldSet data-invalid={fieldState.invalid}>
                            <div className="flex gap-2 items-center">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button
                                    type="button"
                                    className="p-0 m-0 bg-transparent border-none"
                                  >
                                    <FieldTitle className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                      Subtask
                                      <Info
                                        size={16}
                                        className="relative top-[0.5px]"
                                      />
                                    </FieldTitle>
                                  </button>
                                </PopoverTrigger>

                                <PopoverContent
                                  className="w-64 bg-white text-plum/85 text-sm"
                                  side="bottom"
                                  align="start"
                                >
                                  {HELP_CFG.technicalSpecifications.subtask}
                                </PopoverContent>
                              </Popover>

                              {isManuallyEdited ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 px-0 text-xs gap-1"
                                  onClick={() =>
                                    handleFieldResetToAi("subtask")
                                  }
                                >
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs cursor-pointer"
                                  >
                                    <RotateCcw
                                      className="w-1 h-1"
                                      color="blue"
                                    />
                                    Reset to AI Suggestion
                                  </Badge>
                                </Button>
                              ) : (
                                aiResults.subtask && (
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs "
                                  >
                                    <Sparkles
                                      className="w-3 h-3"
                                      color="blue"
                                    />
                                    AI
                                  </Badge>
                                )
                              )}
                            </div>

                            <RadioGroup
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                              aria-invalid={fieldState.invalid}
                            >
                              {METADATA_FORM_CFG.subTasks.map((subTask) => (
                                <Field
                                  key={subTask.value}
                                  orientation="horizontal"
                                  data-invalid={fieldState.invalid}
                                >
                                  <RadioGroupItem
                                    value={subTask.value}
                                    id={`form-metadata-radio-subtask-${subTask.value}`}
                                    aria-invalid={fieldState.invalid}
                                  />
                                  <FieldLabel
                                    htmlFor={`form-metadata-radio-subtask-${subTask.value}`}
                                    className="font-normal text-gray-700"
                                  >
                                    {subTask.label}
                                  </FieldLabel>
                                </Field>
                              ))}
                            </RadioGroup>

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldSet>
                        );
                      }}
                    />
                    <Controller
                      name="input"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FieldSet data-invalid={fieldState.invalid}>
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="p-0 m-0 bg-transparent border-none"
                              >
                                <FieldTitle className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                  Input
                                  <Info
                                    size={16}
                                    className="relative top-[0.5px]"
                                  />
                                </FieldTitle>
                              </button>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-64 bg-white text-plum/85 text-sm"
                              side="bottom"
                              align="start"
                            >
                              {HELP_CFG.technicalSpecifications.input}
                            </PopoverContent>
                          </Popover>

                          <RadioGroup
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                            aria-invalid={fieldState.invalid}
                          >
                            {METADATA_FORM_CFG.inputs.map((input) => (
                              <Field
                                key={input.value}
                                orientation="horizontal"
                                data-invalid={fieldState.invalid}
                              >
                                <RadioGroupItem
                                  value={input.value}
                                  id={`form-metadata-radio-input-${input.value}`}
                                  aria-invalid={fieldState.invalid}
                                  disabled
                                />
                                <FieldLabel
                                  htmlFor={`form-metadata-radio-input-${input.value}`}
                                  className="font-normal text-gray-700"
                                >
                                  {input.label}
                                </FieldLabel>
                              </Field>
                            ))}
                          </RadioGroup>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldSet>
                      )}
                    />

                    <Controller
                      name="inputDimension"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="p-0 m-0 bg-transparent border-none"
                              >
                                <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                  Input Dimension
                                  <Info
                                    size={16}
                                    className="relative top-[0.5px]"
                                  />
                                </FieldLabel>
                              </button>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-64 bg-white text-plum/85 text-sm"
                              side="bottom"
                              align="start"
                            >
                              {HELP_CFG.technicalSpecifications.inputDimension}
                            </PopoverContent>
                          </Popover>

                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="focus-visible:border-plum"
                            placeholder="Input dimension"
                            disabled
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <Controller
                      name="output"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const currentOutput = field.value || [];
                        const originalOutput = aiResults.output || [];

                        const isAiGenerated = areArraysEqual(
                          currentOutput,
                          originalOutput
                        );
                        const isManuallyEdited = !isAiGenerated;

                        return (
                          <FieldSet>
                            <div className="flex gap-2 items-center">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button
                                    type="button"
                                    className="p-0 m-0 bg-transparent border-none"
                                  >
                                    <FieldTitle className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                      Output
                                      <Info
                                        size={16}
                                        className="relative top-[0.5px]"
                                      />
                                    </FieldTitle>
                                  </button>
                                </PopoverTrigger>

                                <PopoverContent
                                  className="w-64 bg-white text-plum/85 text-sm"
                                  side="bottom"
                                  align="start"
                                >
                                  {HELP_CFG.technicalSpecifications.output}
                                </PopoverContent>
                              </Popover>

                              {isManuallyEdited ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 px-0 text-xs gap-1"
                                  onClick={() => handleFieldResetToAi("output")}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs cursor-pointer"
                                  >
                                    <RotateCcw
                                      className="w-1 h-1"
                                      color="blue"
                                    />
                                    Reset to AI Suggestion
                                  </Badge>
                                </Button>
                              ) : (
                                aiResults.output &&
                                aiResults.output.length > 0 && (
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs "
                                  >
                                    <Sparkles
                                      className="w-3 h-3"
                                      color="blue"
                                    />
                                    AI
                                  </Badge>
                                )
                              )}
                            </div>

                            <FieldGroup data-slot="checkbox-group">
                              {METADATA_FORM_CFG.outputs.map((output) => (
                                <Field
                                  key={output.value}
                                  orientation="horizontal"
                                  data-invalid={fieldState.invalid}
                                >
                                  <Checkbox
                                    id={`form-metadata-checkbox-${output.value}`}
                                    name={field.name}
                                    aria-invalid={fieldState.invalid}
                                    checked={field.value.includes(output.value)}
                                    onCheckedChange={(checked) => {
                                      const newValue = checked
                                        ? [...field.value, output.value]
                                        : field.value.filter(
                                            (value) => value !== output.value
                                          );
                                      field.onChange(newValue);
                                    }}
                                  />
                                  <FieldLabel
                                    htmlFor={`form-metadata-checkbox-${output.value}`}
                                    className="font-normal text-gray-700"
                                  >
                                    {output.label}
                                  </FieldLabel>
                                </Field>
                              ))}
                            </FieldGroup>

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldSet>
                        );
                      }}
                    />
                    <Controller
                      name="outputDimension"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const isAiGenerated =
                          aiResults.outputDimension === field.value;
                        const isManuallyEdited = !isAiGenerated;

                        return (
                          <Field data-invalid={fieldState.invalid}>
                            <div className="flex gap-2 items-center">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button
                                    type="button"
                                    className="p-0 m-0 bg-transparent border-none"
                                  >
                                    <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                      Output Dimension
                                      <Info
                                        size={16}
                                        className="relative top-[0.5px]"
                                      />
                                    </FieldLabel>
                                  </button>
                                </PopoverTrigger>

                                <PopoverContent
                                  className="w-64 bg-white text-plum/85 text-sm"
                                  side="bottom"
                                  align="start"
                                >
                                  {
                                    HELP_CFG.technicalSpecifications
                                      .outputDimension
                                  }
                                </PopoverContent>
                              </Popover>

                              {isManuallyEdited ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 px-0 text-xs gap-1"
                                  onClick={() =>
                                    handleFieldResetToAi("outputDimension")
                                  }
                                >
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs cursor-pointer"
                                  >
                                    <RotateCcw
                                      className="w-1 h-1"
                                      color="blue"
                                    />
                                    Reset to AI Suggestion
                                  </Badge>
                                </Button>
                              ) : (
                                aiResults.outputDimension && (
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs "
                                  >
                                    <Sparkles
                                      className="w-3 h-3"
                                      color="blue"
                                    />
                                    AI
                                  </Badge>
                                )
                              )}
                            </div>

                            <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              className="focus-visible:border-plum"
                              placeholder="Output dimension"
                            />

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <Controller
                      name="outputConsistency"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const isAiGenerated =
                          aiResults.outputConsistency === field.value;
                        const isManuallyEdited = !isAiGenerated;

                        return (
                          <FieldSet data-invalid={fieldState.invalid}>
                            <div className="flex gap-2 items-center">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button
                                    type="button"
                                    className="p-0 m-0 bg-transparent border-none"
                                  >
                                    <FieldTitle className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                      Output consistency
                                      <Info
                                        size={16}
                                        className="relative top-[0.5px]"
                                      />
                                    </FieldTitle>
                                  </button>
                                </PopoverTrigger>

                                <PopoverContent
                                  className="w-64 bg-white text-plum/85 text-sm"
                                  side="bottom"
                                  align="start"
                                >
                                  {
                                    HELP_CFG.technicalSpecifications
                                      .outputConsistency
                                  }
                                </PopoverContent>
                              </Popover>

                              {isManuallyEdited ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 px-0 text-xs gap-1"
                                  onClick={() =>
                                    handleFieldResetToAi("outputConsistency")
                                  }
                                >
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs cursor-pointer"
                                  >
                                    <RotateCcw
                                      className="w-1 h-1"
                                      color="blue"
                                    />
                                    Reset to AI Suggestion
                                  </Badge>
                                </Button>
                              ) : (
                                aiResults.outputConsistency && (
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs "
                                  >
                                    <Sparkles
                                      className="w-3 h-3"
                                      color="blue"
                                    />
                                    AI
                                  </Badge>
                                )
                              )}
                            </div>

                            <RadioGroup
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                              aria-invalid={fieldState.invalid}
                            >
                              {METADATA_FORM_CFG.outputConsistencys.map(
                                (item) => (
                                  <Field
                                    key={item.value}
                                    orientation="horizontal"
                                    data-invalid={fieldState.invalid}
                                  >
                                    <RadioGroupItem
                                      value={item.value}
                                      id={`form-metadata-radio-outconst-${item.value}`}
                                      aria-invalid={fieldState.invalid}
                                    />
                                    <FieldLabel
                                      htmlFor={`form-metadata-radio-outconst-${item.value}`}
                                      className="font-normal text-gray-700"
                                    >
                                      {item.label}
                                    </FieldLabel>
                                  </Field>
                                )
                              )}
                            </RadioGroup>

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldSet>
                        );
                      }}
                    />
                  </FieldGroup>
                </div>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Source & Licensing
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                {HELP_CFG.sourceLicensing.section}
              </FieldDescription>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="publicationUrl"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const isAiGenerated =
                        aiResults.publicationUrl === field.value;
                      const isManuallyEdited = !isAiGenerated;

                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex flex-wrap items-center gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className="p-0 m-0 bg-transparent border-none"
                                >
                                  <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                    Publication URL
                                    <Info
                                      size={16}
                                      className="relative top-[0.5px]"
                                    />
                                  </FieldLabel>
                                </button>
                              </PopoverTrigger>

                              <PopoverContent
                                className="w-64 bg-white text-plum/85 text-sm"
                                side="bottom"
                                align="start"
                              >
                                {HELP_CFG.sourceLicensing.publicationUrl}
                              </PopoverContent>
                            </Popover>

                            {isManuallyEdited ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 px-0 text-xs gap-1"
                                onClick={() =>
                                  handleFieldResetToAi("publicationUrl")
                                }
                              >
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs cursor-pointer"
                                >
                                  <RotateCcw className="w-1 h-1" color="blue" />
                                  Reset to AI Suggestion
                                </Badge>
                              </Button>
                            ) : (
                              aiResults.publicationUrl && (
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs "
                                >
                                  <Sparkles className="w-3 h-3" color="blue" />
                                  AI
                                </Badge>
                              )
                            )}
                          </div>

                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="focus-visible:border-plum"
                            placeholder="Enter the publication URL"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <Controller
                    name="publicationYear"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const isAiGenerated =
                        aiResults.publicationYear === field.value;
                      const isManuallyEdited = !isAiGenerated;

                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex flex-wrap items-center gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className="p-0 m-0 bg-transparent border-none"
                                >
                                  <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                    Publication year
                                    <Info
                                      size={16}
                                      className="relative top-[0.5px]"
                                    />
                                  </FieldLabel>
                                </button>
                              </PopoverTrigger>

                              <PopoverContent
                                className="w-64 bg-white text-plum/85 text-sm"
                                side="bottom"
                                align="start"
                              >
                                {HELP_CFG.sourceLicensing.publicationYear}
                              </PopoverContent>
                            </Popover>

                            {isManuallyEdited ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 px-0 text-xs gap-1"
                                onClick={() =>
                                  handleFieldResetToAi("publicationYear")
                                }
                              >
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs cursor-pointer"
                                >
                                  <RotateCcw className="w-1 h-1" color="blue" />
                                  Reset to AI Suggestion
                                </Badge>
                              </Button>
                            ) : (
                              aiResults.publicationYear && (
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs "
                                >
                                  <Sparkles className="w-3 h-3" color="blue" />
                                  AI
                                </Badge>
                              )
                            )}
                          </div>

                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="focus-visible:border-plum"
                            placeholder="Enter publication year"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <Controller
                    name="publicationType"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const isAiGenerated =
                        aiResults.publicationType === field.value;
                      const isManuallyEdited = !isAiGenerated;

                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex flex-wrap items-center gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className="p-0 m-0 bg-transparent border-none"
                                >
                                  <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                    Publication type
                                    <Info
                                      size={16}
                                      className="relative top-[0.5px]"
                                    />
                                  </FieldLabel>
                                </button>
                              </PopoverTrigger>

                              <PopoverContent
                                className="w-64 bg-white text-plum/85 text-sm"
                                side="bottom"
                                align="start"
                              >
                                {HELP_CFG.sourceLicensing.publicationType}
                              </PopoverContent>
                            </Popover>

                            {isManuallyEdited ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 px-0 text-xs gap-1"
                                onClick={() =>
                                  handleFieldResetToAi("publicationType")
                                }
                              >
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs cursor-pointer"
                                >
                                  <RotateCcw className="w-1 h-1" color="blue" />
                                  Reset to AI Suggestion
                                </Badge>
                              </Button>
                            ) : (
                              aiResults.publicationType && (
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs "
                                >
                                  <Sparkles className="w-3 h-3" color="blue" />
                                  AI
                                </Badge>
                              )
                            )}
                          </div>

                          <div className="mt-1">
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                id="form-metadata-select-pubtype"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[120px]"
                              >
                                <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {METADATA_FORM_CFG.publicationType.map(
                                  (type) => (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value}
                                    >
                                      {type.label}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>
              </FieldGroup>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="sourceUrl"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="p-0 m-0 bg-transparent border-none"
                            >
                              <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                Source code URL
                                <Info
                                  size={16}
                                  className="relative top-[0.5px]"
                                />
                              </FieldLabel>
                            </button>
                          </PopoverTrigger>

                          <PopoverContent
                            className="w-64 bg-white text-plum/85 text-sm"
                            side="bottom"
                            align="start"
                          >
                            {HELP_CFG.sourceLicensing.sourceUrl}
                          </PopoverContent>
                        </Popover>

                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          className="focus-visible:border-plum"
                          placeholder="Enter a link to the source code"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="sourceType"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const isAiGenerated =
                        aiResults.sourceType === field.value;
                      const isManuallyEdited = !isAiGenerated;

                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex gap-2 items-center">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className="p-0 m-0 bg-transparent border-none"
                                >
                                  <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                    Source type
                                    <Info
                                      size={16}
                                      className="relative top-[0.5px]"
                                    />
                                  </FieldLabel>
                                </button>
                              </PopoverTrigger>

                              <PopoverContent
                                className="w-64 bg-white text-plum/85 text-sm"
                                side="bottom"
                                align="start"
                              >
                                {HELP_CFG.sourceLicensing.sourceType}
                              </PopoverContent>
                            </Popover>

                            {isManuallyEdited ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 px-0 text-xs gap-1"
                                onClick={() =>
                                  handleFieldResetToAi("sourceType")
                                }
                              >
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs cursor-pointer"
                                >
                                  <RotateCcw className="w-1 h-1" color="blue" />
                                  Reset to AI Suggestion
                                </Badge>
                              </Button>
                            ) : (
                              aiResults.sourceType && (
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs "
                                >
                                  <Sparkles className="w-3 h-3" color="blue" />
                                  AI
                                </Badge>
                              )
                            )}
                          </div>

                          <div className="mt-1">
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                id="form-metadata-select-source"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[120px]"
                              >
                                <SelectValue placeholder="Select a source type" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {METADATA_FORM_CFG.sourceType.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>
              </FieldGroup>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="license"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const isAiGenerated = aiResults.license === field.value;
                      const isManuallyEdited = !isAiGenerated;

                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex gap-2 items-center">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className="p-0 m-0 bg-transparent border-none"
                                >
                                  <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                    License
                                    <Info
                                      size={16}
                                      className="relative top-[0.5px]"
                                    />
                                  </FieldLabel>
                                </button>
                              </PopoverTrigger>

                              <PopoverContent
                                className="w-64 bg-white text-plum/85 text-sm"
                                side="bottom"
                                align="start"
                              >
                                {HELP_CFG.sourceLicensing.license}
                              </PopoverContent>
                            </Popover>

                            {isManuallyEdited ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 px-0 text-xs gap-1"
                                onClick={() => handleFieldResetToAi("license")}
                              >
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs cursor-pointer"
                                >
                                  <RotateCcw className="w-1 h-1" color="blue" />
                                  Reset to AI Suggestion
                                </Badge>
                              </Button>
                            ) : (
                              aiResults.license && (
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs "
                                >
                                  <Sparkles className="w-3 h-3" color="blue" />
                                  AI
                                </Badge>
                              )
                            )}
                          </div>

                          <div className="mt-1">
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                id="form-metadata-select-lic"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[120px]"
                              >
                                <SelectValue placeholder="Select a license" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {METADATA_FORM_CFG.licenses.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <Controller
                    name="deployment"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const isAiGenerated =
                        aiResults.deployment === field.value;
                      const isManuallyEdited = !isAiGenerated;

                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex gap-2 items-center">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className="p-0 m-0 bg-transparent border-none"
                                >
                                  <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                    Deployment
                                    <Info
                                      size={16}
                                      className="relative top-[0.5px]"
                                    />
                                  </FieldLabel>
                                </button>
                              </PopoverTrigger>

                              <PopoverContent
                                className="w-64 bg-white text-plum/85 text-sm"
                                side="bottom"
                                align="start"
                              >
                                {HELP_CFG.sourceLicensing.deployment}
                              </PopoverContent>
                            </Popover>

                            {isManuallyEdited ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 px-0 text-xs gap-1"
                                onClick={() =>
                                  handleFieldResetToAi("deployment")
                                }
                              >
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs cursor-pointer"
                                >
                                  <RotateCcw className="w-1 h-1" color="blue" />
                                  Reset to AI Suggestion
                                </Badge>
                              </Button>
                            ) : (
                              aiResults.deployment && (
                                <Badge
                                  variant="secondary"
                                  className="gap-1 text-xs "
                                >
                                  <Sparkles className="w-3 h-3" color="blue" />
                                  AI
                                </Badge>
                              )
                            )}
                          </div>

                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              id="form-metadata-select-dep"
                              aria-invalid={fieldState.invalid}
                              className="min-w-[120px]"
                            >
                              <SelectValue placeholder="Select a deployment" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              {METADATA_FORM_CFG.deployment.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Research Context
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                {HELP_CFG.researchContext.section}
              </FieldDescription>
              <FieldGroup>
                <Controller
                  name="biomedicalArea"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const currentBioArea = field.value || [];
                    const originalBioArea = aiResults.biomedicalArea || [];

                    const isAiGenerated = areArraysEqual(
                      currentBioArea,
                      originalBioArea
                    );
                    const isManuallyEdited = !isAiGenerated;

                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex gap-2 items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="p-0 m-0 bg-transparent border-none"
                              >
                                <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                  Biomedical area
                                  <Info
                                    size={16}
                                    className="relative top-[0.5px]"
                                  />
                                </FieldLabel>
                              </button>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-64 bg-white text-plum/85 text-sm"
                              side="bottom"
                              align="start"
                            >
                              {HELP_CFG.researchContext.biomedicalArea}
                            </PopoverContent>
                          </Popover>

                          {isManuallyEdited ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 px-0 text-xs gap-1"
                              onClick={() =>
                                handleFieldResetToAi("biomedicalArea")
                              }
                            >
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs cursor-pointer"
                              >
                                <RotateCcw className="w-1 h-1" color="blue" />
                                Reset to AI Suggestion
                              </Badge>
                            </Button>
                          ) : (
                            aiResults.biomedicalArea &&
                            aiResults.biomedicalArea.length > 0 && (
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs "
                              >
                                <Sparkles className="w-3 h-3" color="blue" />
                                AI
                              </Badge>
                            )
                          )}
                        </div>

                        <MultiSelect
                          id={field.name}
                          options={METADATA_FORM_CFG.biomedicalArea}
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder="Select areas..."
                          className={cn(
                            fieldState.invalid &&
                              "border-red-500 focus-visible:border-red-500"
                          )}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
                <Controller
                  name="targetOrganism"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const currentTargetOrganism = field.value || [];
                    const originalTargetOrganism =
                      aiResults.targetOrganism || [];

                    const isAiGenerated = areArraysEqual(
                      currentTargetOrganism,
                      originalTargetOrganism
                    );
                    const isManuallyEdited = !isAiGenerated;

                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex gap-2 items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="p-0 m-0 bg-transparent border-none"
                              >
                                <FieldLabel className="text-plum/85 cursor-pointer select-none flex items-center gap-1">
                                  Target organism
                                  <Info
                                    size={16}
                                    className="relative top-[0.5px]"
                                  />
                                </FieldLabel>
                              </button>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-64 bg-white text-plum/85 text-sm"
                              side="bottom"
                              align="start"
                            >
                              {HELP_CFG.researchContext.targetOrganism}
                            </PopoverContent>
                          </Popover>

                          {isManuallyEdited ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 px-0 text-xs gap-1"
                              onClick={() =>
                                handleFieldResetToAi("targetOrganism")
                              }
                            >
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs cursor-pointer"
                              >
                                <RotateCcw className="w-1 h-1" color="blue" />
                                Reset to AI Suggestion
                              </Badge>
                            </Button>
                          ) : (
                            aiResults.targetOrganism &&
                            aiResults.targetOrganism.length > 0 && (
                              <Badge
                                variant="secondary"
                                className="gap-1 text-xs "
                              >
                                <Sparkles className="w-3 h-3" color="blue" />
                                AI
                              </Badge>
                            )
                          )}
                        </div>

                        <MultiSelect
                          id={field.name}
                          options={METADATA_FORM_CFG.targetOrganism}
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder="Select targets..."
                          className={cn(
                            fieldState.invalid &&
                              "border-red-500 focus-visible:border-red-500"
                          )}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
          </FieldGroup>
        </fieldset>
      </form>
      <Field
        orientation="horizontal"
        className="flex justify-between items-center mb-1"
      >
        <div className="flex gap-2 items-center">
          <Button
            variant="plum"
            type="submit"
            form="form-metadata"
            onClick={handleSaveClick}
            disabled={isLocked || isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
          <Button
            type="button"
            variant="edit"
            onClick={handleEditClick}
            disabled={!isLocked}
          >
            Edit
          </Button>
        </div>

        <div className="relative">
          <Button type="submit" form="form-metadata" variant="plum">
            Preview
          </Button>

          {isValidated && (
            <p className="absolute right-0 mt-2 text-destructive font-bold text-xs whitespace-nowrap">
              {isValidated}
            </p>
          )}
        </div>
      </Field>
    </>
  );
}
