import { SCHEMA_DESCRIPTIONS } from "@/config/ai-prompt";
import { METADATA_FORM_CFG } from "@/config/form-cfg";
import { z } from "zod";

export const MetadataFormSchema = z.object({
  title: z.string().trim().min(50, {
    message: "Please provide a title with at least 50 characters.",
  }),
  slug: z
    .string()
    .trim()
    .min(1, { message: "Please provide a slug" })
    .max(60, { message: "Maxiumum 60 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be lowercase, alphanumeric, and hyphens only. It cannot start or end with a hyphen, or contain consecutive hyphens.",
    }),
  description: z.string().trim().min(200, {
    message: "Please provide a description of a minimum of 200 characters.",
  }),
  interpretation: z.string().trim().min(1, {
    message:
      "Please provide a description of how to interpret the model results.",
  }),
  tags: z
    .array(z.string())
    .min(1, { message: "Please provide at least one tag." })
    .max(5, { message: "Please select a maximum of 5 tags." }),
  task: z.string().min(1, {
    message: "Please select one task",
  }),
  subtask: z.string().min(1, {
    message: "Please select one subtask.",
  }),
  input: z.string().min(1, {
    message: "Please select one input.",
  }),
  input_dimension: z
    .string()
    .min(1, { message: "Please enter the input dimension of the model." }),
  output: z
    .array(z.string())
    .min(1, { message: "Please select at least one output." }),
  output_dimension: z
    .string()
    .min(1, { message: "Please enter a output dimension for the model." })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && Number.isInteger(num) && num > 0;
      },
      { message: "Please enter a valid output dimension for the model." }
    ),
  output_consistency: z
    .string()
    .min(1, { message: "Please choose at least one option." }),
  publication_url: z.string().min(1, {
    message: "Please provide a publication url",
  }),
  publication_year: z
    .string()
    .min(4, { message: "Please provide the year of the publication." })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && Number.isInteger(num) && num > 0;
      },
      { message: "Please provide a valid year " }
    ),
  source_url: z.string().min(1, {
    message: "Please provide a source code url",
  }),
  publication_type: z.string().min(1, {
    message: "Please select one publication type",
  }),
  source_type: z.string().min(1, {
    message: "Please select one source type",
  }),
  deployment: z.string().min(1, {
    message: "Please select one source deployment type",
  }),
  license: z.string().min(1, {
    message: "Please select one license",
  }),
  biomedical_area: z
    .array(z.string())
    .min(1, { message: "Please provide at least one area." }),
  target_organism: z
    .array(z.string())
    .min(1, { message: "Please provide at least one target." }),
});

const ALLOWED_TAGS = METADATA_FORM_CFG.tags.map((t) => t.value);
const ALLOWED_TASKS = METADATA_FORM_CFG.tasks.map((t) => t.value);
const ALLOWED_SUBTASKS = METADATA_FORM_CFG.subTasks.map((t) => t.value);
const ALLOWED_OUTPUTS = METADATA_FORM_CFG.outputs.map((t) => t.value);
const ALLOWED_OUTPUT_CONSISTENCY = METADATA_FORM_CFG.outputConsistencys.map(
  (t) => t.value
);
const ALLOWED_PUBLICATION_TYPES = METADATA_FORM_CFG.publicationType.map(
  (t) => t.value
);
const ALLOWED_BIOMEDICAL_AREAS = METADATA_FORM_CFG.biomedicalArea.map(
  (t) => t.value
);
const ALLOWED_TARGET_ORGANISMS = METADATA_FORM_CFG.targetOrganism.map(
  (t) => t.value
);
const ALLOWED_LICENSES = METADATA_FORM_CFG.licenses.map((t) => t.value);

export const AiAnalysisModelMetadataSchema = z.object({
  isBiomedicalModel: z
    .boolean()
    .describe(SCHEMA_DESCRIPTIONS.isBiomedicalModel),

  slug: z.string().trim().describe(SCHEMA_DESCRIPTIONS.slug),

  title: z.string().describe(SCHEMA_DESCRIPTIONS.title),

  description: z.string().describe(SCHEMA_DESCRIPTIONS.description),

  interpretation: z.string().describe(SCHEMA_DESCRIPTIONS.interpretation),

  tags: z
    .array(z.string())
    .min(0)
    .max(5)
    .describe(SCHEMA_DESCRIPTIONS.tags(ALLOWED_TAGS)),

  publication_url: z.string().describe(SCHEMA_DESCRIPTIONS.publication_url),

  source_url: z.string().describe(SCHEMA_DESCRIPTIONS.source_url),

  license: z.string().describe(SCHEMA_DESCRIPTIONS.license(ALLOWED_LICENSES)),

  deployment: z.string().describe(SCHEMA_DESCRIPTIONS.deployment),

  source_type: z.string().describe(SCHEMA_DESCRIPTIONS.source_type),

  task: z.string().describe(SCHEMA_DESCRIPTIONS.task(ALLOWED_TASKS)),

  subtask: z.string().describe(SCHEMA_DESCRIPTIONS.subtask(ALLOWED_SUBTASKS)),

  input: z.string().describe(SCHEMA_DESCRIPTIONS.input),

  input_dimension: z.string().describe(SCHEMA_DESCRIPTIONS.input_dimension),

  output: z
    .array(z.string())
    .min(0)
    .describe(SCHEMA_DESCRIPTIONS.output(ALLOWED_OUTPUTS)),

  output_dimension: z.string().describe(SCHEMA_DESCRIPTIONS.output_dimension),

  output_consistency: z
    .string()
    .describe(
      SCHEMA_DESCRIPTIONS.output_consistency(ALLOWED_OUTPUT_CONSISTENCY)
    ),

  publication_type: z
    .string()
    .describe(SCHEMA_DESCRIPTIONS.publication_type(ALLOWED_PUBLICATION_TYPES)),

  publication_year: z.string().describe(SCHEMA_DESCRIPTIONS.publication_year),

  biomedical_area: z
    .array(z.string())
    .min(0)
    .describe(SCHEMA_DESCRIPTIONS.biomedical_area(ALLOWED_BIOMEDICAL_AREAS)),

  target_organism: z
    .array(z.string())
    .min(0)
    .describe(SCHEMA_DESCRIPTIONS.target_organism(ALLOWED_TARGET_ORGANISMS)),
});

export type AiAnalysisModelMetadataSchema = z.infer<
  typeof AiAnalysisModelMetadataSchema
>;
