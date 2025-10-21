export default function CustomSeparator({ word }: { word: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative bg-white px-4">
        <span className="text-sm font-medium text-gray-500">{word}</span>
      </div>
    </div>
  );
}
