"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import z from "zod";
import { MetadataFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { METADATA_FORM_CFG } from "@/config/form-cfg";
import { MultiSelect } from "../multi-select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "@/lib/utils";

export default function ModelForm2() {
  const form = useForm<z.infer<typeof MetadataFormSchema>>({
    resolver: zodResolver(MetadataFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      interpretation: "",
      tags: [],
      task: "",
      subtask: "",
      input: METADATA_FORM_CFG.inputs[0].value,
    },
  });

  function onSubmit(data: z.infer<typeof MetadataFormSchema>) {
    console.log("hey");

    console.log(data);
  }

  return (
    <>
      <form
        id="form-metadata"
        className="mb-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
              <div className="grid grid-cols-2 gap-2">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-plum/85">
                        Title
                      </FieldLabel>
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
                  )}
                />
                <Controller
                  name="slug"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-plum/85">
                        Slug
                      </FieldLabel>
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
                  )}
                />
              </div>
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
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-plum/85">
                      Description
                    </FieldLabel>
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
                )}
              />
              <Controller
                name="interpretation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-plum/85">
                      Interpretation
                    </FieldLabel>
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
                )}
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
              Searchable labels that categorize the model. Select relevant tags
              from predefined categories to help users discover this model when
              searching by disease, organism, application, or other criteria.
            </FieldDescription>
            <FieldGroup>
              <Controller
                name="tags"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-plum/85">
                      Tags
                    </FieldLabel>
                    <MultiSelect
                      hideSelectAll
                      maxCount={5}
                      options={METADATA_FORM_CFG.tags}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select tags..."
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
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
              Define the model&apos;s input/output behavior and machine learning
              task type. This section describes the technical characteristics of
              how the model processes data.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <Controller
                    name="task"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FieldSet data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-plum/85">Tasks</FieldLabel>
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
                                id={`form-metadata-radio-${task.value}`}
                                aria-invalid={fieldState.invalid}
                              />
                              <FieldLabel
                                htmlFor={`form-metadata-radio-${task.value}`}
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
                    )}
                  />
                  <Controller
                    name="subtask"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FieldSet data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-plum/85">
                          Subtasks
                        </FieldLabel>
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
                                id={`form-metadata-radio-${subTask.value}`}
                                aria-invalid={fieldState.invalid}
                              />
                              <FieldLabel
                                htmlFor={`form-metadata-radio-${subTask.value}`}
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
                    )}
                  />
                  <Controller
                    name="input"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FieldSet data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-plum/85">Input</FieldLabel>
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
                                id={`form-metadata-radio-${input.value}`}
                                aria-invalid={fieldState.invalid}
                                disabled
                              />
                              <FieldLabel
                                htmlFor={`form-metadata-radio-${input.value}`}
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
              publication and code repository, along with licensing details and
              authorship information.
            </FieldDescription>
            <FieldGroup></FieldGroup>
          </FieldSet>
          <FieldSeparator />
          {/* section 6 */}
          <FieldSet>
            <FieldLegend className="text-plum/90">
              Deployment & Access
            </FieldLegend>
            <FieldDescription className="text-gray-400">
              Specify how and where the model can be run. Indicate whether the
              model executes locally on user machines, on Ersilia servers, or on
              external third-party servers.
            </FieldDescription>
            <FieldGroup></FieldGroup>
          </FieldSet>
          <FieldSeparator />
          {/* section 7 */}
          <FieldSet>
            <FieldLegend className="text-plum/90">Research Context</FieldLegend>
            <FieldDescription className="text-gray-400">
              Scientific domain and target organism information. Categorize the
              biomedical research area and specify which organisms (pathogens,
              hosts, or general applicability) the model relates to.
            </FieldDescription>
            <FieldGroup></FieldGroup>
          </FieldSet>
          <FieldSeparator />
        </FieldGroup>
      </form>
      <Field orientation="horizontal">
        <Button variant="plum" type="submit" form="form-metadata">
          Save
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
      </Field>
    </>
  );
}
