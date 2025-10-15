import { METADATA_FORM_CFG } from "@/config/form-cfg";
import { z } from "zod";

export const MetadataFormSchema = z.object({
  title: z.string().trim().min(70, {
    message: "Please provide at least a title with at least 70 characters.",
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

// export const ModelMetadataSchema = z.object({
//   title: z.string().trim().min(20, {
//     message: "Please provide a title with at least 20 characters.",
//   }),

//   slug: z
//     .string()
//     .trim()
//     .min(1, "Slug cannot be empty.")
//     .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
//       message:
//         "Slug must be lowercase, alphanumeric, and hyphens only. It cannot start or end with a hyphen, or contain consecutive hyphens.",
//     }),

//   description: z.string().trim().min(100, {
//     message: "Please provide a description of at least 100 characters.",
//   }),

//   interpretation: z.string().trim().min(1),

//   tags: z.array(z.string()).min(1).max(5),

//   task: z.string(),
//   subtask: z.string(),
//   input: z.string(),
//   status: z.string(),

//   input_dimension: z
//     .union([z.string(), z.number()])
//     .transform((val) => Number(val))
//     .refine((num) => Number.isInteger(num) && num > 0, {
//       message: "Please enter a valid input dimension (positive integer).",
//     }),

//   output: z.array(z.string()).min(1),

//   output_dimension: z
//     .union([z.string(), z.number()])
//     .transform((val) => Number(val))
//     .refine((num) => Number.isInteger(num) && num > 0, {
//       message: "Please enter a valid output dimension (positive integer).",
//     }),

//   output_consistency: z.string(),

//   publication_url: z
//     .string()
//     .or(z.string().optional())
//     .or(z.literal(""))
//     .optional()
//     .default("Not specified"),

//   source_url: z
//     .string()
//     .or(z.string().optional())
//     .or(z.literal(""))
//     .optional()
//     .default("Not specified"),

//   license: z.string().min(1),

//   deployment: z.union([
//     z.string(),
//     z.array(z.string()).transform((arr) => arr.join(", ")),
//   ]),

//   source_type: z.string(),
//   publication_type: z.string(),

//   publication_year: z
//     .union([z.string().transform((v) => Number(v)), z.number()])
//     .refine(
//       (num) =>
//         Number.isInteger(num) && num >= 1900 && num <= new Date().getFullYear(),
//       { message: "Please provide a valid year." }
//     ),

//   biomedical_area: z.array(z.string()).min(1),
//   target_organism: z
//     .array(z.string())
//     .default(["Not specified"])
//     .transform((arr) => (arr.length === 0 ? ["Not specified"] : arr)),
// });
// export type ModelMetadata = z.infer<typeof ModelMetadataSchema>;

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

export const AiAnalysisModelMetadataSchema = z.object({
  slug: z
    .string()
    .trim()
    .describe(
      "A short version of the title, with hyphens instead of spaces. For example, 'deep-learning-for-malaria'. The slug should be all lowercase. It cannot be longer than 50 characters and should not contain more than 5 hyphens. If there is a name for the method, for example, chemprop, try to use it in the slug. Do not add dates or names of authors. If possible, do not include words such as ml (for machine learning) or ai (for artificial intelligence)."
    ),

  title: z
    .string()
    .describe(
      "Suggest a title for the computational tool. This should be a concise and informative title. It should be coherent with the title of the publication, and it can be inspired by the title in the raw metadata."
    ),

  description: z
    .string()
    .describe(
      "Write a short summary of the computational tool. This should be a high-level overview of the tool based on the publication summary provided. The description should have at least 200 characters. Strictly one paragraph."
    ),

  interpretation: z
    .string()
    .describe(
      "Provide a oneliner explaining how to interpret the output of the model. Is it a probability? Is it a regression value for a particular experimental assay? etc. No more than 150 characters."
    ),
  // todo
  tags: z
    .array(z.enum(ALLOWED_TAGS as [string, ...string[]]))
    .min(0)
    .max(5)
    .describe(
      "Select 1-5 relevant tags to facilitate model search. Categories include: diseases (AIDS, Alzheimer, Cancer, COVID19, Malaria, Tuberculosis, etc.), organisms (P.falciparum, M.tuberculosis, E.coli, Human, Mouse, Sars-CoV-2, etc.), molecular targets (HDAC1, BACE, CYP450, GPCR, hERG), properties (IC50, LogP, LogS, Solubility, Toxicity, Permeability, etc.), applications (ADME, Antimicrobial activity, Drug-likeness, etc.), databases (ChEMBL, DrugBank, MoleculeNet, ZINC, etc.), and model types (Descriptor, Embedding, Fingerprint, Chemical graph model, etc.). Choose tags that best represent the model's domain, purpose, training data, and outputs. If uncertain, leave empty."
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
    .describe(
      "Model availability for inference. Valid options: 'Local' (runs on user's computer), 'Online' (available via Ersilia servers). Use 'Local' as default if unclear."
    ),

  source_type: z
    .string()
    .describe(
      "Origin of the model. Valid options: 'External' (third-party model from published research), 'Internal' (developed by Ersilia team), 'Replicated' (re-trained using original author's guides). Most models are 'External'."
    ),
  // todo
  task: z
    .enum(ALLOWED_TASKS as [string, ...string[]])
    .describe(
      "The ML task performed by the model. Choose from: Annotation (predicting properties or activities), Representation (generating features or embeddings), or Sampling (generating or finding similar compounds). Select the most relevant one based on the model's primary purpose."
    ),
  // todo
  subtask: z
    .union([z.enum(ALLOWED_SUBTASKS as [string, ...string[]]), z.literal("")])
    .describe(
      "More granular task description. For Representation: choose Featurization or Projection. For Annotation: choose Property calculation or prediction, or Activity prediction. For Sampling: choose Similarity search or Generation. Match to the main task selected. If uncertain, leave empty."
    ),

  input: z.string().min(1).describe("This is always 'Compound'"),

  status: z.string().min(1).describe("This is always 'In Progress' "),

  input_dimension: z.string().describe("This is always '1'"),
  // todo
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
  // todo
  output_consistency: z
    .union([
      z.enum(ALLOWED_OUTPUT_CONSISTENCY as [string, ...string[]]),
      z.literal(""),
    ])
    .describe(
      "Whether the model produces the same prediction given the same input. Choose from: Fixed (deterministic, same input = same output, typical for QSAR models), Variable (stochastic, may vary between runs, typical for generative models). Use 'Fixed' for most predictive models. If uncertain, leave empty."
    ),
  // todo
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
  // todo
  biomedical_area: z
    .array(z.enum(ALLOWED_BIOMEDICAL_AREAS as [string, ...string[]]))
    .min(0)
    .describe(
      "The pertinent area of research or disease targeted. Choose from: Any (general tool applicable to all fields, e.g., featurizers), ADMET, Antimicrobial resistance, Malaria, Tuberculosis, COVID-19, Gonorrhea, Cancer, Mycetoma, AIDS, Schistosomiasis, Hepatitis, Alzheimer, Chagas, Cryptosporidiosis, Leprosy. Can select multiple if relevant (e.g., both ADMET and Malaria). Use 'Any' for general-purpose models. If uncertain, leave empty."
    ),
  // todo
  target_organism: z
    .array(z.enum(ALLOWED_TARGET_ORGANISMS as [string, ...string[]]))
    .min(0)
    .describe(
      "The pathogen or organism the model is related to. Choose from the predefined list including: Any (not organism-specific), Homo sapiens, Mus musculus, Rattus norvegicus, Plasmodium falciparum, Mycobacterium tuberculosis, SARS-CoV-2, HIV, ESKAPE pathogens, gut microbiome species, and others. Can select multiple organisms. Use 'Any' if the model is unrelated to any specific organism. If uncertain, leave empty."
    ),
});

export type AiAnalysisModelMetadataSchema = z.infer<
  typeof AiAnalysisModelMetadataSchema
>;
