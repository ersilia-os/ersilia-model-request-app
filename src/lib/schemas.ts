import z from "zod";

export const MetadataFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(70, "Please provide at least a title with at least 70 characters."),
  slug: z
    .string()
    .trim()
    .min(1, "Slug cannot be empty.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be lowercase, alphanumeric, and hyphens only. It cannot start or end with a hyphen, or contain consecutive hyphens.",
    }),
  description: z
    .string()
    .trim()
    .min(200, "Please provide a description about the model"),
  interpretation: z
    .string()
    .trim()
    .min(
      1,
      "Please provide a description of how to interpret the model results."
    ),
});
