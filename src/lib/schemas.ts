import { METADATA_FORM_CFG } from "@/config/form-cfg";
import { z } from "zod";

export const MetadataFormSchema = z.object({
  title: z.string().trim().min(70, {
    message: "Please provide at least a title with at least 70 characters.",
  }),
  slug: z
    .string()
    .trim()
    .min(1, "Slug cannot be empty.")
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
  status: z.string().min(1, {
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

export const ModelMetadataSchema = z.object({
  title: z.string().trim().min(20, {
    message: "Please provide a title with at least 20 characters.",
  }),

  slug: z
    .string()
    .trim()
    .min(1, "Slug cannot be empty.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be lowercase, alphanumeric, and hyphens only. It cannot start or end with a hyphen, or contain consecutive hyphens.",
    }),

  description: z.string().trim().min(100, {
    message: "Please provide a description of at least 100 characters.",
  }),

  interpretation: z.string().trim().min(1),

  tags: z.array(z.string()).min(1).max(5),

  task: z.string(),
  subtask: z.string(),
  input: z.string(),
  status: z.string(),

  input_dimension: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((num) => Number.isInteger(num) && num > 0, {
      message: "Please enter a valid input dimension (positive integer).",
    }),

  output: z.array(z.string()).min(1),

  output_dimension: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((num) => Number.isInteger(num) && num > 0, {
      message: "Please enter a valid output dimension (positive integer).",
    }),

  output_consistency: z.string(),

  publication_url: z
    .string()
    .or(z.string().optional())
    .or(z.literal(""))
    .optional()
    .default("Not specified"),

  source_url: z
    .string()
    .or(z.string().optional())
    .or(z.literal(""))
    .optional()
    .default("Not specified"),

  license: z.string().min(1),

  deployment: z.union([
    z.string(),
    z.array(z.string()).transform((arr) => arr.join(", ")),
  ]),

  source_type: z.string(),
  publication_type: z.string(),

  publication_year: z
    .union([z.string().transform((v) => Number(v)), z.number()])
    .refine(
      (num) =>
        Number.isInteger(num) && num >= 1900 && num <= new Date().getFullYear(),
      { message: "Please provide a valid year." }
    ),

  biomedical_area: z.array(z.string()).min(1),
  target_organism: z
    .array(z.string())
    .default(["Not specified"])
    .transform((arr) => (arr.length === 0 ? ["Not specified"] : arr)),
});
export type ModelMetadata = z.infer<typeof ModelMetadataSchema>;
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
const ALLOWED_TARGET_ORGANISMS = METADATA_FORM_CFG.ttargetOrganism.map(
  (t) => t.value
);

export const AiAnalysisModelMetadataSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .describe(
      "A one-word or multi-word (linked by hyphens) human-readable identifier. Use lowercase, alphanumeric characters and hyphens only. Derive from the model title or paper title."
    ),

  title: z
    .string()
    .trim()
    .min(70)
    .describe(
      "A self-descriptive model title. Must be at least 70 characters."
    ),

  description: z
    .string()
    .trim()
    .min(200)
    .describe(
      "Minimum information about model type, results and the training dataset. Must be at least 200 characters. Include: what the model does, what type of ML approach is used, what data it was trained on, and key performance metrics if available."
    ),

  interpretation: z
    .string()
    .trim()
    .min(1)
    .describe(
      "Brief description of how to interpret the model results. For classification models, include experimental settings (time of incubation, strain, cell line, etc.) and the cut-off used. For regression models, explain the units and scale. For generative models, explain what the outputs represent."
    ),
  publication_url: z
    .string()
    .describe(
      "Link to the original publication. Prefer the journal page (DOI link) over PubMed, ResearchGate or other secondary sources. Format: full URL starting with https://. If not found in the PDF, leave empty."
    ),

  source_url: z
    .string()
    .describe(
      "Full URL to the original code repository (GitHub, GitLab, Bitbucket, etc.). Must be a complete repository URL, not just the domain (e.g., 'https://github.com/username/repo-name', not 'https://github.com'). If the exact repository URL is not found in the PDF, leave empty rather than providing an incomplete URL."
    ),

  license: z
    .string()
    .min(1)
    .describe(
      "License of the original code using SPDX abbreviations. Valid options: 'MIT', 'GPL-3.0-only', 'GPL-3.0-or-later', 'LGPL-3.0-only', 'LGPL-3.0-or-later', 'AGPL-3.0-only', 'AGPL-3.0-or-later', 'Apache-2.0', 'BSD-2-Clause', 'MPL-2.0', 'CC-BY-3.0', 'CC-BY-4.0', 'CC0-1.0', 'Proprietary', 'None'. Extract from the code repository or paper. If unclear or no license, use 'None'."
    ),

  deployment: z
    .string()
    .min(1)
    .describe(
      "Model availability for inference. Valid options: 'Local' (runs on user's computer), 'Online' (available via Ersilia servers). Use 'Local' as default if unclear."
    ),

  source_type: z
    .string()
    .min(1)
    .describe(
      "Origin of the model. Valid options: 'External' (third-party model from published research), 'Internal' (developed by Ersilia team), 'Replicated' (re-trained using original author's guides). Most models are 'External'."
    ),
  task: z
    .enum(ALLOWED_TASKS as [string, ...string[]])
    .describe(
      "The ML task performed by the model. Choose from: Annotation (predicting properties or activities), Representation (generating features or embeddings), or Sampling (generating or finding similar compounds). Select the most relevant one based on the model's primary purpose."
    ),
  subtask: z
    .union([z.enum(ALLOWED_SUBTASKS as [string, ...string[]]), z.literal("")])
    .describe(
      "More granular task description. For Representation: choose Featurization or Projection. For Annotation: choose Property calculation or prediction, or Activity prediction. For Sampling: choose Similarity search or Generation. Match to the main task selected. If uncertain, leave empty."
    ),

  input: z.string().min(1).describe("This is always 'Compound'"),

  status: z.string().min(1).describe("This is always 'In Progress' "),

  input_dimension: z.string().describe("This is always '1'"),

  output: z
    .array(z.enum(ALLOWED_OUTPUTS as [string, ...string[]]))
    .min(0) // Allow empty array
    .describe(
      "Data type(s) outputted by the model. Choose from: Score (probability, confidence), Value (experimental value, molecular descriptor, calculated property), Compound (new chemical structure), Text (natural language description). Can select multiple if the model outputs different types. If uncertain, leave empty."
    ),

  output_dimension: z
    .string()
    .describe(
      "Length of the output per each input compound. For single predictions use '1'. For binary classification use '1' or '2' (depending on output format). For multi-class classification, count the number of classes. For multiple descriptors, count the number of output values. Extract from the paper's methods or results section. If uncertain, leave empty."
    ),

  output_consistency: z
    .union([
      z.enum(ALLOWED_OUTPUT_CONSISTENCY as [string, ...string[]]),
      z.literal(""),
    ])
    .describe(
      "Whether the model produces the same prediction given the same input. Choose from: Fixed (deterministic, same input = same output, typical for QSAR models), Variable (stochastic, may vary between runs, typical for generative models). Use 'Fixed' for most predictive models. If uncertain, leave empty."
    ),

  publication_type: z
    .union([
      z.enum(ALLOWED_PUBLICATION_TYPES as [string, ...string[]]),
      z.literal(""),
    ])
    .describe(
      "Type of publication. Choose from: Peer reviewed (published in scientific journal), Preprint (arXiv, bioRxiv, medRxiv, chemRxiv), Other (technical report, thesis, white paper). If uncertain, leave empty."
    ),

  publication_year: z
    .string()
    .describe(
      "Year of publication of the original model. Extract from the publication date. Format: 4-digit year (e.g., '2023'). If not found, leave empty."
    ),

  biomedical_area: z
    .array(z.enum(ALLOWED_BIOMEDICAL_AREAS as [string, ...string[]]))
    .min(0) // Allow empty array
    .describe(
      "The pertinent area of research or disease targeted. Choose from: Any (general tool applicable to all fields, e.g., featurizers), ADMET, Antimicrobial resistance, Malaria, Tuberculosis, COVID-19, Gonorrhea, Cancer, Mycetoma, AIDS, Schistosomiasis, Hepatitis, Alzheimer, Chagas, Cryptosporidiosis, Leprosy. Can select multiple if relevant (e.g., both ADMET and Malaria). Use 'Any' for general-purpose models. If uncertain, leave empty."
    ),

  target_organism: z
    .array(z.enum(ALLOWED_TARGET_ORGANISMS as [string, ...string[]]))
    .min(0) // Allow empty array
    .describe(
      "The pathogen or organism the model is related to. Choose from the predefined list including: Any (not organism-specific), Homo sapiens, Mus musculus, Rattus norvegicus, Plasmodium falciparum, Mycobacterium tuberculosis, SARS-CoV-2, HIV, ESKAPE pathogens, gut microbiome species, and others. Can select multiple organisms. Use 'Any' if the model is unrelated to any specific organism. If uncertain, leave empty."
    ),
});

export type AiAnalysisModelMetadataSchema = z.infer<
  typeof AiAnalysisModelMetadataSchema
>;
