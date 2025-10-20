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
import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import z from "zod";
import {
  AiAnalysisModelMetadataSchema,
  MetadataFormSchema,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { METADATA_FORM_CFG } from "@/config/form-cfg";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
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
} from "@/app/new-model/metadata/actions";
import { useRouter } from "next/navigation";
import { Loader2, RotateCcw } from "lucide-react";

interface ModelMetadataFormProps {
  aiResults: AiAnalysisModelMetadataSchema;
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
      status: METADATA_FORM_CFG.status[0].value,
      description: aiResults.description || "",
      interpretation: aiResults.interpretation || "",
      tags: aiResults.tags || [],
      task: aiResults.task || "",
      subtask: aiResults.subtask || "",
      input: aiResults.input,
      input_dimension: aiResults.input_dimension,
      output: aiResults.output || [],
      output_dimension: aiResults.output_dimension || "",
      output_consistency: aiResults.output_consistency || "",
      publication_url: aiResults.publication_url || "",
      publication_year: aiResults.publication_year || "",
      publication_type: aiResults.publication_type || "",
      source_url: aiResults.source_url || "",
      source_type: aiResults.source_type || "",
      deployment: aiResults.deployment || "",
      biomedical_area: aiResults.biomedical_area || [],
      target_organism: aiResults.target_organism || [],
      license: aiResults.license || "",
    },
  });
  const [isLocked, setIsLocked] = useState(false);
  const [isValidated, setValidated] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldResetToAi = (
    fieldName: keyof z.infer<typeof MetadataFormSchema>
  ) => {
    const aiValue = aiResults[fieldName];
    form.setValue(fieldName, aiValue as string);
  };

  // Funcion to compare field values (for arrays)
  const areArraysEqual = (a?: string[], b?: string[]) => {
    if (!a || !b) return a === b;
    if (a.length !== b.length) return false;
    return [...a].sort().join() === [...b].sort().join();
  };

  async function onSubmit(data: z.infer<typeof MetadataFormSchema>) {
    const action = await saveValidatedMetadataAction(data);

    if (action.success === true) {
      alert("Metadata saved");
      setIsLocked(true);
      router.push(`/new-model/preview/${data.slug}`);
    } else {
      alert("Something wrong happen and data were not saved");
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
      const action = await saveMetadataAction(currentFormData);

      if (action.success === true) {
        console.log("Metadata saved");
        setIsLocked(true);
      } else {
        console.log("Something went wrong and data were not saved");
      }
    } catch (err) {
      console.error("Error while saving metadata:", err);
      console.log("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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
            {/* section 1 */}
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Basic Identification
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                Essential identifiers for the model. The slug and title are how
                users will find and reference this model in the system.
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
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-plum/85"
                          >
                            Title
                          </FieldLabel>{" "}
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
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-plum/85"
                          >
                            Slug
                          </FieldLabel>
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
                          placeholder="e.g. model-name-slug"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FieldSet data-invalid={fieldState.invalid}>
                      <FieldTitle className="text-plum/85">Status</FieldTitle>
                      <RadioGroup
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                        disabled
                      >
                        {METADATA_FORM_CFG.status.map((item) => (
                          <Field
                            key={item.value}
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                          >
                            <RadioGroupItem
                              value={item.value}
                              id={`form-metadata-radio-status-${item.value}`}
                              aria-invalid={fieldState.invalid}
                            />
                            <FieldLabel
                              htmlFor={`form-metadata-radio-status-${item.value}`}
                              className="font-normal text-gray-700"
                            >
                              {item.label}
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
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            {/* section 2 */}
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Description & Interpretation
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                Detailed information about what the model does and how to
                understand its results. Explain the model&apos;s purpose,
                methodology, and how to interpret its predictions.
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
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-plum/85"
                          >
                            Description
                          </FieldLabel>
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
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-plum/85"
                          >
                            Interpretation
                          </FieldLabel>
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
            {/* section 3 */}
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Classification & Tags
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                Searchable labels that categorize the model. Select relevant
                tags from predefined categories to help users discover this
                model when searching by disease, organism, application, or other
                criteria.
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
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-plum/85"
                          >
                            Tags
                          </FieldLabel>
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
            {/* section 4 */}
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Technical Specifications
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                Define the model&apos;s input/output behavior and machine
                learning task type. This section describes the technical
                characteristics of how the model processes data.
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
                              <FieldTitle className="text-plum/85">
                                Task
                              </FieldTitle>
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
                                aiResults.title && (
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
                              <FieldTitle className="text-plum/85">
                                Subtask
                              </FieldTitle>
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
                                aiResults.title && (
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
                          <FieldTitle className="text-plum/85">
                            Input
                          </FieldTitle>
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
                      name="input_dimension"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-plum/85"
                          >
                            Input Dimension
                          </FieldLabel>
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
                              <FieldTitle className="text-plum/85">
                                Output
                              </FieldTitle>
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
                                aiResults.title && (
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
                      name="output_dimension"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const isAiGenerated =
                          aiResults.output_dimension === field.value;
                        const isManuallyEdited = !isAiGenerated;
                        return (
                          <Field data-invalid={fieldState.invalid}>
                            <div className="flex gap-2 items-center">
                              <FieldLabel
                                htmlFor={field.name}
                                className="text-plum/85"
                              >
                                Output Dimension
                              </FieldLabel>
                              {isManuallyEdited ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 px-0 text-xs gap-1"
                                  onClick={() =>
                                    handleFieldResetToAi("output_dimension")
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
                                aiResults.title && (
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
                      name="output_consistency"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const isAiGenerated =
                          aiResults.output_consistency === field.value;
                        const isManuallyEdited = !isAiGenerated;
                        return (
                          <FieldSet data-invalid={fieldState.invalid}>
                            <div className="flex gap-2 items-center">
                              <FieldTitle className="text-plum/85">
                                Output consistency
                              </FieldTitle>
                              {isManuallyEdited ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 px-0 text-xs gap-1"
                                  onClick={() =>
                                    handleFieldResetToAi("output_consistency")
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
                                aiResults.title && (
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
            {/* section 5 */}
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Source & Licensing
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                Attribution and legal information. Provide links to the original
                publication and code repository, along with licensing details
                and authorship information.
              </FieldDescription>
              <FieldGroup>
                <div className="grid grid-cols-[50%_30%_auto] gap-1 ">
                  <Controller
                    name="publication_url"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const isAiGenerated =
                        aiResults.publication_url === field.value;
                      const isManuallyEdited = !isAiGenerated;
                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex flex-wrap gap-2">
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-plum/85"
                            >
                              Publication URL
                            </FieldLabel>
                            {isManuallyEdited ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 px-0 text-xs gap-1"
                                onClick={() =>
                                  handleFieldResetToAi("publication_url")
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
                    name="publication_year"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const isAiGenerated =
                        aiResults.publication_year === field.value;
                      const isManuallyEdited = !isAiGenerated;
                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex flex-wrap gap-2">
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-plum/85"
                            >
                              Publication year
                            </FieldLabel>
                            {isManuallyEdited ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 px-0 text-xs gap-1"
                                onClick={() =>
                                  handleFieldResetToAi("publication_year")
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
                    name="publication_type"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const isAiGenerated =
                        aiResults.publication_type === field.value;
                      const isManuallyEdited = !isAiGenerated;
                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex flex-wrap gap-2">
                            <FieldLabel
                              htmlFor="form-metadata-select-pubtype"
                              className="text-plum/85"
                            >
                              Publication type
                            </FieldLabel>
                            {isManuallyEdited ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 px-0 text-xs gap-1"
                                onClick={() =>
                                  handleFieldResetToAi("publication_type")
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
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={isLocked}
                          >
                            <SelectTrigger
                              id="form-metadata-select-pubtype"
                              aria-invalid={fieldState.invalid}
                              className="min-w-[120px]"
                              disabled={isLocked}
                            >
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              {METADATA_FORM_CFG.publicationType.map((type) => (
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
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="source_url"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-plum/85"
                        >
                          Source code URL
                        </FieldLabel>
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
                    name="source_type"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const isAiGenerated =
                        aiResults.source_type === field.value;
                      const isManuallyEdited = !isAiGenerated;
                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex gap-2 items-center">
                            <FieldLabel
                              htmlFor="form-metadata-select-source"
                              className="text-plum/85"
                            >
                              Source type
                            </FieldLabel>
                            {isManuallyEdited ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 px-0 text-xs gap-1"
                                onClick={() =>
                                  handleFieldResetToAi("source_type")
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
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={isLocked}
                          >
                            <SelectTrigger
                              id="form-metadata-select-source"
                              aria-invalid={fieldState.invalid}
                              className="min-w-[120px]"
                              disabled={isLocked}
                            >
                              <SelectValue placeholder="Select a source type" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              {METADATA_FORM_CFG.sourceType.map((type) => (
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
                            <FieldLabel
                              htmlFor="form-metadata-select-lic"
                              className="text-plum/85"
                            >
                              License
                            </FieldLabel>
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
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={isLocked}
                          >
                            <SelectTrigger
                              id="form-metadata-select-lic"
                              aria-invalid={fieldState.invalid}
                              className="min-w-[120px]"
                              disabled={isLocked}
                            >
                              <SelectValue placeholder="Select a license" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              {METADATA_FORM_CFG.licenses.map((type) => (
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
                            <FieldLabel
                              htmlFor="form-metadata-select-dep"
                              className="text-plum/85"
                            >
                              Deployment
                            </FieldLabel>
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
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={isLocked}
                          >
                            <SelectTrigger
                              id="form-metadata-select-dep"
                              aria-invalid={fieldState.invalid}
                              className="min-w-[120px]"
                              disabled={isLocked}
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
            {/* section 6 */}
            <FieldSet>
              <FieldLegend className="text-plum/90">
                Research Context
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                Scientific domain and target organism information. Categorize
                the biomedical research area and specify which organisms
                (pathogens, hosts, or general applicability) the model relates
                to.
              </FieldDescription>
              <FieldGroup>
                <Controller
                  name="biomedical_area"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const currentBioArea = field.value || [];
                    const originalBioArea = aiResults.biomedical_area || [];

                    const isAiGenerated = areArraysEqual(
                      currentBioArea,
                      originalBioArea
                    );
                    const isManuallyEdited = !isAiGenerated;
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex gap-2 items-center">
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-plum/85"
                          >
                            Biomedical area
                          </FieldLabel>
                          {isManuallyEdited ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 px-0 text-xs gap-1"
                              onClick={() =>
                                handleFieldResetToAi("biomedical_area")
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
                  name="target_organism"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const currentTargetOrganism = field.value || [];
                    const originalTargetOrganism =
                      aiResults.target_organism || [];

                    const isAiGenerated = areArraysEqual(
                      currentTargetOrganism,
                      originalTargetOrganism
                    );
                    const isManuallyEdited = !isAiGenerated;
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex gap-2 items-center">
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-plum/85"
                          >
                            Target organism
                          </FieldLabel>
                          {isManuallyEdited ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 px-0 text-xs gap-1"
                              onClick={() =>
                                handleFieldResetToAi("target_organism")
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
