"use client";

import { useState } from "react";
import {
  Controller,
  FieldErrors,
  Path,
  PathValue,
  useForm,
} from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
} from "../ui/field";

import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { METADATA_FORM_CFG } from "@/config/form-cfg";

import {
  saveMetadataAction,
  saveValidatedMetadataAction,
} from "@/app/new-model/metadata/[slug]/actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { HELP_CFG } from "@/config/help-popover-form";
import { alertError, alertSuccess } from "@/lib/alerts";
import { MetadataFormSchema } from "@/schema/metadata-form-schema";
import { ModelMetadata } from "../../../generated/prisma";
import { TextInputField } from "./TextInputField";
import { TextAreaField } from "./TextAreaField";
import { MultiSelectField } from "./MultiSelectField";
import { RadioGroupField } from "./RadioGroupField";
import { CheckboxGroupField } from "./CheckBoxField";
import { SelectField } from "./SelectField";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import Link from "next/link";

interface ModelMetadataFormProps {
  aiResults: ModelMetadata;
  gitHubAccount: string | null | undefined;
}

type FormValues = z.infer<typeof MetadataFormSchema>;

export default function ModelMetadataForm({
  aiResults,
  gitHubAccount,
}: ModelMetadataFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof MetadataFormSchema>>({
    resolver: zodResolver(MetadataFormSchema),
    mode: "onBlur",
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
      isContributor: aiResults.isContributor,
      githubAccount: gitHubAccount || "",
    },
  });
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof MetadataFormSchema>) {
    setIsLoading(true);

    try {
      const action = await saveValidatedMetadataAction(data, aiResults.id);

      if (action.success) {
        setIsLocked(true);
        alertSuccess("Model metadata saved successfully");
        const slugToUse = action.newSlug || data.slug;
        router.push(`/new-model/preview/${slugToUse}`);
      } else {
        alertError(action.message || "Failed to submit metadata");
      }
    } catch (err) {
      console.error("Unexpected client error:", err);
      alertError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveClick() {
    setIsLoading(true);

    try {
      const titleResult = await form.trigger("title");
      const slugResult = await form.trigger("slug");

      if (!titleResult || !slugResult) {
        alertError("Please title and slug are required");
        setIsLocked(false);
        return;
      }

      const currentFormData = form.getValues();
      const action = await saveMetadataAction(currentFormData, aiResults.id);

      if (action.success) {
        alertSuccess("Metadata saved successfully");
        setIsLocked(true);
        if (action.newSlug && action.newSlug !== aiResults.slug) {
          router.push(`/new-model/metadata/${action.newSlug}`);
        }
      } else {
        alertError(action.message || "Failed to save metadata");
      }
    } catch (err) {
      console.error("Unexpected client error:", err);
      alertError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleFieldResetToAi<K extends Path<FormValues>>(fieldName: K) {
    const aiValue = aiResults[fieldName as keyof typeof aiResults];
    form.setValue(fieldName, aiValue as PathValue<FormValues, K>, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  function handleEditClick() {
    setIsLocked(false);
  }

  function onInvalid(errors: FieldErrors<z.infer<typeof MetadataFormSchema>>) {
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
  }

  return (
    <>
      <form
        id="form-metadata"
        className="mb-6"
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      >
        <fieldset disabled={isLocked} className="w-full">
          <FieldGroup>
            <FieldLegend className="text-plum font-semibold">
              Basic Identification
            </FieldLegend>
            <FieldDescription className="text-gray-400">
              {HELP_CFG.basicIdentification.section}
            </FieldDescription>
            <TextInputField
              name="title"
              control={form.control}
              label="Title"
              helpText={HELP_CFG.basicIdentification.title}
              placeholder="Model title (minimum 70 characters)"
              aiValue={aiResults.title}
              onReset={() => handleFieldResetToAi("title")}
            />

            <TextInputField
              name="slug"
              control={form.control}
              label="Slug"
              helpText={HELP_CFG.basicIdentification.slug}
              placeholder="e.g. model-name-slug"
              aiValue={aiResults.slug}
              onReset={() => handleFieldResetToAi("slug")}
            />
            <FieldSeparator />
            <FieldGroup>
              <FieldLegend className="text-plum font-semibold">
                Description & Interpretation
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                {HELP_CFG.descriptionInterpretation.section}
              </FieldDescription>
              <TextAreaField
                name="description"
                control={form.control}
                label="Description"
                helpText={HELP_CFG.descriptionInterpretation.description}
                placeholder="Minimum information about model type, results and the training dataset."
                aiValue={aiResults.description}
                onReset={() => handleFieldResetToAi("description")}
              />
              <TextAreaField
                name="interpretation"
                control={form.control}
                label="Interpretation"
                helpText={HELP_CFG.descriptionInterpretation.interpretation}
                placeholder="A description of how to interpret the model results"
                aiValue={aiResults.interpretation}
                onReset={() => handleFieldResetToAi("interpretation")}
              />
            </FieldGroup>
            <FieldSeparator />

            <FieldGroup>
              <FieldLegend className="text-plum font-semibold">
                Classification & Tags
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                {HELP_CFG.classificationTags.section}
              </FieldDescription>
              <MultiSelectField
                name="tags"
                control={form.control}
                label="Tags"
                helpText={HELP_CFG.classificationTags.tags}
                placeholder="Select tags..."
                options={METADATA_FORM_CFG.tags}
                aiValue={aiResults.tags}
                onReset={() => handleFieldResetToAi("tags")}
              />
            </FieldGroup>
            <FieldSeparator />
            <FieldGroup>
              <FieldLegend className="text-plum font-semibold">
                Technical Specifications
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                {HELP_CFG.technicalSpecifications.section}
              </FieldDescription>

              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <RadioGroupField
                    name="task"
                    control={form.control}
                    label="Task"
                    helpText={HELP_CFG.technicalSpecifications.task}
                    options={METADATA_FORM_CFG.tasks}
                    aiValue={aiResults.task}
                    onReset={() => handleFieldResetToAi("task")}
                  />
                  <RadioGroupField
                    name="subtask"
                    control={form.control}
                    label="Subtask"
                    helpText={HELP_CFG.technicalSpecifications.subtask}
                    options={METADATA_FORM_CFG.subTasks}
                    aiValue={aiResults.subtask}
                    onReset={() => handleFieldResetToAi("subtask")}
                  />
                  <RadioGroupField
                    name="input"
                    control={form.control}
                    label="Input"
                    helpText={HELP_CFG.technicalSpecifications.input}
                    options={METADATA_FORM_CFG.inputs}
                    aiValue={aiResults.input}
                    onReset={() => handleFieldResetToAi("input")}
                    disabled
                  />
                  <TextInputField
                    name="inputDimension"
                    control={form.control}
                    label="Input Dimension"
                    helpText={HELP_CFG.technicalSpecifications.inputDimension}
                    placeholder="Input dimension"
                    aiValue={aiResults.inputDimension}
                    onReset={() => handleFieldResetToAi("inputDimension")}
                    disabled
                  />
                </FieldGroup>
                <FieldGroup>
                  <CheckboxGroupField
                    name="output"
                    control={form.control}
                    label="Output"
                    helpText={HELP_CFG.technicalSpecifications.output}
                    options={METADATA_FORM_CFG.outputs}
                    aiValue={aiResults.output}
                    onReset={() => handleFieldResetToAi("output")}
                  />
                  <TextInputField
                    name="outputDimension"
                    control={form.control}
                    label="Output Dimension"
                    helpText={HELP_CFG.technicalSpecifications.outputDimension}
                    placeholder="Output dimension"
                    aiValue={aiResults.outputDimension}
                    onReset={() => handleFieldResetToAi("outputDimension")}
                  />

                  <RadioGroupField
                    name="outputConsistency"
                    control={form.control}
                    label="Output consistency"
                    helpText={
                      HELP_CFG.technicalSpecifications.outputConsistency
                    }
                    options={METADATA_FORM_CFG.outputConsistencys}
                    aiValue={aiResults.outputConsistency}
                    onReset={() => handleFieldResetToAi("outputConsistency")}
                  />
                </FieldGroup>
              </div>
            </FieldGroup>
            <FieldSeparator />
            <FieldGroup>
              <FieldLegend className="text-plum font-semibold">
                Source & Licensing
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                {HELP_CFG.sourceLicensing.section}
              </FieldDescription>
              <div className="grid grid-cols-2 gap-4">
                <TextInputField
                  name="publicationUrl"
                  control={form.control}
                  label="Publication URL"
                  helpText={HELP_CFG.sourceLicensing.publicationUrl}
                  placeholder="Enter the publication URL"
                  aiValue={aiResults.publicationUrl}
                  onReset={() => handleFieldResetToAi("publicationUrl")}
                />
                <TextInputField
                  name="publicationYear"
                  control={form.control}
                  label="Publication year"
                  helpText={HELP_CFG.sourceLicensing.publicationYear}
                  placeholder="Enter publication year"
                  aiValue={aiResults.publicationYear}
                  onReset={() => handleFieldResetToAi("publicationYear")}
                />
                <SelectField
                  name="publicationType"
                  control={form.control}
                  label="Publication type"
                  helpText={HELP_CFG.sourceLicensing.publicationType}
                  placeholder="Select a type"
                  options={METADATA_FORM_CFG.publicationType}
                  aiValue={aiResults.publicationType}
                  onReset={() => handleFieldResetToAi("publicationType")}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextInputField
                  name="sourceUrl"
                  control={form.control}
                  label="Source code URL"
                  helpText={HELP_CFG.sourceLicensing.sourceUrl}
                  placeholder="Enter a link to the source code"
                  aiValue={aiResults.sourceUrl}
                  onReset={() => handleFieldResetToAi("sourceUrl")}
                />
                <SelectField
                  name="sourceType"
                  control={form.control}
                  label="Source type"
                  helpText={HELP_CFG.sourceLicensing.sourceType}
                  placeholder="Select a source type"
                  options={METADATA_FORM_CFG.sourceType}
                  aiValue={aiResults.sourceType}
                  onReset={() => handleFieldResetToAi("sourceType")}
                />
              </div>
            </FieldGroup>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  name="license"
                  control={form.control}
                  label="License"
                  helpText={HELP_CFG.sourceLicensing.license}
                  placeholder="Select a license"
                  options={METADATA_FORM_CFG.licenses}
                  aiValue={aiResults.license}
                  onReset={() => handleFieldResetToAi("license")}
                />

                <SelectField
                  name="deployment"
                  control={form.control}
                  label="Deployment"
                  helpText={HELP_CFG.sourceLicensing.deployment}
                  placeholder="Select a deployment"
                  options={METADATA_FORM_CFG.deployment}
                  aiValue={aiResults.deployment}
                  onReset={() => handleFieldResetToAi("deployment")}
                />
              </div>
            </FieldGroup>
            <FieldSeparator />
            <FieldGroup>
              <FieldLegend className="text-plum font-semibold">
                Research Context
              </FieldLegend>
              <FieldDescription className="text-gray-400">
                {HELP_CFG.researchContext.section}
              </FieldDescription>
              <MultiSelectField
                name="biomedicalArea"
                control={form.control}
                label="Biomedical area"
                helpText={HELP_CFG.researchContext.biomedicalArea}
                placeholder="Select areas..."
                options={METADATA_FORM_CFG.biomedicalArea}
                aiValue={aiResults.biomedicalArea}
                onReset={() => handleFieldResetToAi("biomedicalArea")}
              />

              <MultiSelectField
                name="targetOrganism"
                control={form.control}
                label="Target organism"
                helpText={HELP_CFG.researchContext.targetOrganism}
                placeholder="Select targets..."
                options={METADATA_FORM_CFG.targetOrganism}
                aiValue={aiResults.targetOrganism}
                onReset={() => handleFieldResetToAi("targetOrganism")}
              />
            </FieldGroup>

            <FieldSeparator />
            <FieldGroup>
              <FieldLegend className="text-plum font-semibold">
                Contribution
              </FieldLegend>
              <div className="space-y-4">
                <Controller
                  name="isContributor"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Checkbox
                        id="form-metadata-checkbox-contributor"
                        name={field.name}
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                      />

                      <FieldLabel
                        htmlFor="form-metadata-checkbox-contributor"
                        className="font-normal text-gray-700"
                      >
                        I want to be listed as a contributor
                      </FieldLabel>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {form.watch("isContributor") && (
                  <Controller
                    name="githubAccount"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="w-[300px]"
                      >
                        <FieldLabel
                          htmlFor={`field-${field.name}`}
                          className="text-plum/85"
                        >
                          Github Account
                        </FieldLabel>
                        <Input
                          aria-invalid={fieldState.invalid}
                          className="focus-visible:border-plum placeholder:text-xs md:placeholder:text-sm text-xs sm:text-sm"
                          {...field}
                          id={`field-${field.name}`}
                          placeholder="Enter your Github account name"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                )}
              </div>
            </FieldGroup>
            <FieldSeparator />
          </FieldGroup>
        </fieldset>
      </form>
      <Field
        orientation="horizontal"
        className="flex justify-between items-center mb-4 sm:mb-2"
      >
        <div className="flex gap-1 sm:gap-2 items-center">
          <Button
            variant="plum"
            type="submit"
            form="form-metadata"
            onClick={handleSaveClick}
            disabled={isLocked || isLoading}
            className="flex px-4 sm:px-6 md:px-10 items-center gap-2 text-xs sm:text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
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
            className="text-xs sm:text-sm px-4 sm:px-6 md:px-10"
          >
            Edit
          </Button>
          <Link href="/">
            <Button
              type="button"
              variant="transparent"
              className="text-xs sm:text-sm px-4 sm:px-6 md:px-10"
            >
              Home
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Button
            type="submit"
            form="form-metadata"
            onClick={() => {
              if (!form.formState.isValid) {
                handleEditClick?.();
              }
            }}
            variant="plum"
            className="text-xs sm:text-sm px-4 sm:px-6 md:px-12"
          >
            Preview
          </Button>

          {form.formState.isSubmitted && !form.formState.isValid && (
            <p className="absolute right-0 mt-2 text-destructive font-bold whitespace-nowrap text-[0.65rem] sm:text-xs">
              *Please fix the highlighted errors first.
            </p>
          )}
        </div>
      </Field>
    </>
  );
}
