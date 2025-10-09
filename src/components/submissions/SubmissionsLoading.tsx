export default function SubmissionsLoading() {
  return (
    <div className="space-y-3 mb-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="border-2 border-plum/20 rounded-lg p-4 animate-pulse"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
