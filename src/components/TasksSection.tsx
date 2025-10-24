interface TaskSectionProps {
  task: string;
  subtask: string;
}

export function TaskSection({ task, subtask }: TaskSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {task && (
        <div>
          <h2 className="text-lg font-semibold text-plum mb-2">Task</h2>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            {task}
          </span>
        </div>
      )}

      {subtask && (
        <div>
          <h2 className="text-lg font-semibold text-plum mb-2">Subtask</h2>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            {subtask}
          </span>
        </div>
      )}
    </div>
  );
}
