import z from "zod";

export const UploadFormSchema = z.object({
  publication: z.string().optional(),
  question1: z.string().min(1, "Please provide the model target/endpoint"),
  question2: z
    .string()
    .min(1, "Please explain the relevance to drug discovery and global health"),
});
