import { z } from "zod";

export const MetadataFormSchema = z.object({
  title: z.string().trim().min(10, {
    message: "Please provide a title with at least 10 characters.",
  }),
  slug: z
    .string()
    .trim()
    .min(5, { message: "Please provide a slug" })
    .max(60, { message: "Maxiumum 60 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be lowercase, alphanumeric, and hyphens only. It cannot start or end with a hyphen, or contain consecutive hyphens.",
    }),
  description: z.string().trim().min(200, {
    message: "Please provide a description of a minimum of 200 characters.",
  }),
  interpretation: z.string().trim().min(10, {
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
  inputDimension: z
    .string()
    .min(1, { message: "Please enter the input dimension of the model." }),
  output: z
    .array(z.string())
    .min(1, { message: "Please select at least one output." }),
  outputDimension: z
    .string()
    .min(1, { message: "Please enter a output dimension for the model." })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && Number.isInteger(num) && num > 0;
      },
      { message: "Please enter a valid output dimension for the model." }
    ),
  outputConsistency: z
    .string()
    .min(1, { message: "Please choose at least one option." }),
  publicationUrl: z.string().min(1, {
    message: "Please provide a publication url",
  }),
  publicationYear: z
    .string()
    .min(4, { message: "Please provide the year of the publication." })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && Number.isInteger(num) && num > 0;
      },
      { message: "Please provide a valid year " }
    ),
  sourceUrl: z.string().min(1, {
    message: "Please provide a source code url",
  }),
  publicationType: z.string().min(1, {
    message: "Please select one publication type",
  }),
  sourceType: z.string().min(1, {
    message: "Please select one source type",
  }),
  deployment: z.string().min(1, {
    message: "Please select one source deployment type",
  }),
  license: z.string().min(1, {
    message: "Please select one license",
  }),
  biomedicalArea: z
    .array(z.string())
    .min(1, { message: "Please provide at least one area." }),
  targetOrganism: z
    .array(z.string())
    .min(1, { message: "Please provide at least one target." }),
  isContributor: z.boolean(),
  githubAccount: z.string(),
});
