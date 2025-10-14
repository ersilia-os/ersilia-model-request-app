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
  identifier: z.string().min(1, { message: "Identifier cannot be empty." }),

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
