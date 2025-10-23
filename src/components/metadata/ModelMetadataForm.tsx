"use client";

import { useState } from "react";
import { FieldErrors, Path, PathValue, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldGroup,
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

interface ModelMetadataFormProps {
  aiResults: ModelMetadata;
}

type FormValues = z.infer<typeof MetadataFormSchema>;

export default function ModelMetadataForm({
  aiResults,
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
  //TODO: do we need a trycatch?
  async function handleSaveClick() {
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
  }

  function handleFieldResetToAi<K extends Path<FormValues>>(fieldName: K) {
    const aiValue = aiResults[fieldName as keyof typeof aiResults];
    form.setValue(fieldName, aiValue as PathValue<FormValues, K>, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  const handleFormChange = () => {
    if (isValidated) {
      setValidated("");
    }
  };

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
        onChange={handleFormChange}
      >
        <fieldset disabled={isLocked} className="flex flex-col gap-7">
          <FieldGroup>
            <FieldLegend className="text-plum/90">
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
              <FieldLegend className="text-plum/90">
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
              <FieldLegend className="text-plum/90">
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
              <FieldLegend className="text-plum/90">
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
              <FieldLegend className="text-plum/90">
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
              <FieldLegend className="text-plum/90">
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
