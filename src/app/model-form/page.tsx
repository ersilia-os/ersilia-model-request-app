import ModelMetadataForm from "@/components/model-form/modelform";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white py-10">
      <Card className="w-full max-w-4xl border-2 border-plum rounded-2xl shadow-xl p-6 md:p-10">
        <CardHeader className="p-0 mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Model Metadata
          </h1>
        </CardHeader>

        <CardContent className="p-0">
          <ModelMetadataForm />
        </CardContent>
      </Card>
    </main>
  );
}
