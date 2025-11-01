import { Card, CardHeader } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center bg-white">
      <Card className="w-full border-none text-center shadow-none">
        <CardHeader className="mb-4 p-0">
          <h2 className="text-plum mb-3 text-xl font-semibold md:mb-4 md:text-2xl lg:text-2xl">
            Could not find the requested ressources
          </h2>
        </CardHeader>
      </Card>
    </div>
  );
}
