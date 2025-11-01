import { redirect } from "next/navigation";

import {
  CircleArrowRight,
  HeartHandshake,
  MessageCircleWarningIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/SectionHeader";
import ModelMetadataForm from "@/components/metadata/ModelMetadataForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth0 } from "@/lib/auth0";

import { getGitHubAccount, getModelMetadatBySlug } from "./actions";

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
    <div className="mx-auto w-full max-w-7xl px-6">
      <div className="space-y-6">
        <SectionHeader
          title="New Model Metadata"
          description="Carefully review the pre-filled metadata. This information is
            crucial for successful Ersilia Hub integration."
          className=""
        />
        <div>
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-15">
            <aside className="space-y-4 lg:w-85">
              <Card className="from-plum/10 border-plum/20 bg-linear-to-t to-transparent">
                <CardHeader>
                  <CardTitle className="text-plum flex items-center gap-2">
                    <MessageCircleWarningIcon className="h-5 w-5" />
                    Review Model Metadata
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <p className="font-medium">
                    Please carefully review all fields below.
                  </p>
                  <p>
                    Our AI has pre-filled the metadata based on the publication.
                    This step is{" "}
                    <span className="text-plum font-semibold">critical</span>{" "}
                    for successful Ersilia Hub integration.
                  </p>
                  <p>
                    Fields with errors will be highlighted in red. Make sure to
                    correct them before proceeding.
                  </p>
                  <Separator />
                  <p className="text-xs text-gray-600">
                    💡 <span className="font-medium">Tip:</span> You can reset
                    any field to its original AI-generated value using the reset
                    button.
                  </p>
                </CardContent>
              </Card>
              <Card className="from-plum/10 border-plum/20 bg-linear-to-t to-transparent">
                <CardHeader>
                  <CardTitle className="text-plum flex items-center gap-2">
                    <CircleArrowRight className="h-5 w-5" />
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <div className="space-y-2">
                    <p>
                      <span className="text-plum font-semibold">Save: </span>
                      Save your progress and return later to continue editing.
                    </p>
                    <p>
                      <span className="text-plum font-semibold">Edit: </span>
                      Make changes to any field in the form as needed.
                    </p>
                    <p>
                      <span className="text-plum font-semibold">Preview: </span>
                      Review the final metadata before submitting to Ersilia.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-300 bg-linear-to-t from-gray-50 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <HeartHandshake className="h-5 w-5" />
                    Become a Contributor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <p>
                    Don&apos;t forget to check the contributor box and add your{" "}
                    <span className="font-semibold">GitHub account</span> if you
                    want to be recognized as a contributor to the Ersilia Hub.
                  </p>
                </CardContent>
              </Card>
            </aside>
            <div className="flex-1 lg:max-w-3xl">
              <ModelMetadataForm
                aiResults={aiResults.data}
                gitHubAccount={gitHubAccount.data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
