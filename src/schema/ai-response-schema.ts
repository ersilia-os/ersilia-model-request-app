import { SCHEMA_DESCRIPTIONS } from "@/config/ai-prompt";
import { METADATA_FORM_CFG } from "@/config/form-cfg";
import { z } from "zod";

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
  // isBiomedicalModel: z
  //   .boolean()
  //   .describe(SCHEMA_DESCRIPTIONS.isBiomedicalModel),

  slug: z.string().trim().describe(SCHEMA_DESCRIPTIONS.slug),

  title: z.string().describe(SCHEMA_DESCRIPTIONS.title),

  description: z.string().describe(SCHEMA_DESCRIPTIONS.description),

  interpretation: z.string().describe(SCHEMA_DESCRIPTIONS.interpretation),

  tags: z
    .array(z.string())
    .min(0)
    .max(5)
    .describe(SCHEMA_DESCRIPTIONS.tags(ALLOWED_TAGS)),

  publicationUrl: z.string().describe(SCHEMA_DESCRIPTIONS.publication_url),

  sourceUrl: z.string().describe(SCHEMA_DESCRIPTIONS.source_url),

  license: z.string().describe(SCHEMA_DESCRIPTIONS.license(ALLOWED_LICENSES)),

  deployment: z.string().describe(SCHEMA_DESCRIPTIONS.deployment),

  sourceType: z.string().describe(SCHEMA_DESCRIPTIONS.source_type),

  task: z.string().describe(SCHEMA_DESCRIPTIONS.task(ALLOWED_TASKS)),

  subtask: z.string().describe(SCHEMA_DESCRIPTIONS.subtask(ALLOWED_SUBTASKS)),

  input: z.string().describe(SCHEMA_DESCRIPTIONS.input),

  inputDimension: z.string().describe(SCHEMA_DESCRIPTIONS.input_dimension),

  output: z
    .array(z.string())
    .min(0)
    .describe(SCHEMA_DESCRIPTIONS.output(ALLOWED_OUTPUTS)),

  outputDimension: z.string().describe(SCHEMA_DESCRIPTIONS.output_dimension),

  outputConsistency: z
    .string()
    .describe(
      SCHEMA_DESCRIPTIONS.output_consistency(ALLOWED_OUTPUT_CONSISTENCY)
    ),

  publicationType: z
    .string()
    .describe(SCHEMA_DESCRIPTIONS.publication_type(ALLOWED_PUBLICATION_TYPES)),

  publicationYear: z.string().describe(SCHEMA_DESCRIPTIONS.publication_year),

  biomedicalArea: z
    .array(z.string())
    .min(0)
    .describe(SCHEMA_DESCRIPTIONS.biomedical_area(ALLOWED_BIOMEDICAL_AREAS)),

  targetOrganism: z
    .array(z.string())
    .min(0)
    .describe(SCHEMA_DESCRIPTIONS.target_organism(ALLOWED_TARGET_ORGANISMS)),
});

export type AiAnalysisModelMetadataSchema = z.infer<
  typeof AiAnalysisModelMetadataSchema
>;
