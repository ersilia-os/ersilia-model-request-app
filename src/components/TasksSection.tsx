import { ModelMetadata } from "../../generated/prisma";

type MetadataTask = ModelMetadata["task"];
type MetadataSubTask = ModelMetadata["subtask"];

interface TaskSectionProps {
  task: MetadataTask;
  subtask: MetadataSubTask;
}

export function TaskSection({ task, subtask }: TaskSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {task && (
        <div>
          <h2 className="text-plum mb-2 text-lg font-semibold">Task</h2>
          <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">
            {task}
          </span>
        </div>
      )}

      {subtask && (
        <div>
          <h2 className="text-plum mb-2 text-lg font-semibold">Subtask</h2>
          <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">
            {subtask}
          </span>
        </div>
      )}
    </div>
  );
}
