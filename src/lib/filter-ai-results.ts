import { METADATA_FORM_CFG } from "@/config/form-cfg";
import { AiAnalysisModelMetadataSchema } from "./schemas";

const ALLOWED_TAGS = METADATA_FORM_CFG.tags.map((t) => t.value);
const ALLOWED_TASKS = METADATA_FORM_CFG.tasks.map((t) => t.value);
const ALLOWED_SUBTASKS = METADATA_FORM_CFG.subTasks.map((t) => t.value);
const ALLOWED_OUTPUTS = METADATA_FORM_CFG.outputs.map((t) => t.value);
const ALLOWED_LICENSES = METADATA_FORM_CFG.licenses.map((t) => t.value);
const ALLOWED_DEPLOYMENTS = METADATA_FORM_CFG.deployment.map((t) => t.value);
const ALLOWED_SOURCE_TYPES = METADATA_FORM_CFG.sourceType.map((t) => t.value);
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

export function filterAiResults(aiResults: AiAnalysisModelMetadataSchema) {
  const filtered = { ...aiResults };

  if (filtered.tags) {
    filtered.tags = filtered.tags.filter((t: string) =>
      ALLOWED_TAGS.includes(t)
    );
  }
  if (filtered.output) {
    filtered.output = filtered.output.filter((o: string) =>
      ALLOWED_OUTPUTS.includes(o)
    );
  }
  if (filtered.biomedical_area) {
    filtered.biomedical_area = filtered.biomedical_area.filter((a: string) =>
      ALLOWED_BIOMEDICAL_AREAS.includes(a)
    );
  }
  if (filtered.target_organism) {
    filtered.target_organism = filtered.target_organism.filter((o: string) =>
      ALLOWED_TARGET_ORGANISMS.includes(o)
    );
  }

  if (filtered.task && !ALLOWED_TASKS.includes(filtered.task)) {
    filtered.task = "";
  }

  if (filtered.subtask && !ALLOWED_SUBTASKS.includes(filtered.subtask)) {
    console.warn("Invalid subtask:", filtered.subtask);
    filtered.subtask = "";
  }

  if (filtered.license && !ALLOWED_LICENSES.includes(filtered.license)) {
    filtered.license = "";
  }
  if (
    filtered.deployment &&
    !ALLOWED_DEPLOYMENTS.includes(filtered.deployment)
  ) {
    filtered.deployment = "";
  }
  if (
    filtered.source_type &&
    !ALLOWED_SOURCE_TYPES.includes(filtered.source_type)
  ) {
    filtered.source_type = "";
  }
  if (
    filtered.output_consistency &&
    !ALLOWED_OUTPUT_CONSISTENCY.includes(filtered.output_consistency)
  ) {
    filtered.output_consistency = "";
  }
  if (
    filtered.publication_type &&
    !ALLOWED_PUBLICATION_TYPES.includes(filtered.publication_type)
  ) {
    filtered.publication_type = "";
  }

  return filtered;
}
