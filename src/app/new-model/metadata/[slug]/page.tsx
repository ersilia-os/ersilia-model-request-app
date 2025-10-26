import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ModelMetadataForm from "@/components/metadata/ModelMetadataForm";

import { redirect } from "next/navigation";
import { getGitHubAccount, getModelMetadatBySlug } from "./actions";
import { auth0 } from "@/lib/auth0";

type Params = Promise<{ slug: string }>;

export default async function ModelMetadataFormPage(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }
  const gitHubAccount = await getGitHubAccount(session.user.sub);

  const aiResults = await getModelMetadatBySlug(slug);

  if (!aiResults.success || !aiResults.data || !gitHubAccount.success) {
    redirect("/new-model");
  }

  return (
    <main className="flex min-h-screen items-center justify-center py-10">
      <Card className="w-full border-2 border-plum rounded-2xl shadow-xl p-6 md:p-10">
        <CardHeader className="p-0 mb-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
            New Model Metadata
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-base mb-2 text-pretty">
            Carefully review the pre-filled metadata. This information is
            crucial for successful Ersilia Hub integration.
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <ModelMetadataForm
            aiResults={aiResults.data}
            gitHubAccount={gitHubAccount.data}
          />
        </CardContent>
      </Card>
    </main>
  );
}
