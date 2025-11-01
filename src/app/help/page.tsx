import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  FileText,
  HelpCircle,
  Mail,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HelpPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="space-y-8">
        <SectionHeader
          title="Get Help"
          description="Find answers to common questions and learn how to submit models to Ersilia"
        />

        <Card className="bg-linear-to-t from-plum/10 to-transparent border-plum/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <BookOpen className="h-6 w-6 text-plum shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Official Documentation
                </h3>
                <p className="text-gray-700 mb-4">
                  For more information regarding the submission process, please
                  visit the official Ersilia documentation.
                </p>
                <Button variant="plum" asChild>
                  <Link
                    href="https://ersilia.gitbook.io/ersilia-book"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    View Documentation
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-linear-to-t from-plum/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-plum">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  What file formats are supported?
                </h4>
                <p className="text-sm text-gray-700">
                  You can submit publications as PDF files or provide a URL to
                  the publication.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  How long does the review process take?
                </h4>
                <p className="text-sm text-gray-700">
                  The review process typically takes 1-2 weeks depending on the
                  complexity of the model.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Can I edit my submission after submitting?
                </h4>
                <p className="text-sm text-gray-700">
                  Yes, you can edit your submission before final approval by
                  navigating to your submissions page.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-t from-plum/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-plum">
                <FileText className="h-5 w-5" />
                Submission Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  1. Prepare Your Publication
                </h4>
                <p className="text-sm text-gray-700">
                  Ensure you have access to the full publication (PDF or URL)
                  and any supplementary materials.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  2. Provide Context
                </h4>
                <p className="text-sm text-gray-700">
                  Answer the contextual questions thoroughly to help our AI
                  extract accurate metadata.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  3. Review Metadata
                </h4>
                <p className="text-sm text-gray-700">
                  Carefully review and edit the AI-generated metadata before
                  final submission.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <Card className="bg-linear-to-t from-plum/10 to-transparent border-plum/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-plum">
              <MessageSquare className="h-5 w-5" />
              Need More Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              If you can&apos;t find the answer you&apos;re looking for, our
              support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" asChild>
                <Link
                  href="mailto:support@ersilia.io"
                  className="inline-flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Support
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com/ersilia-os/ersilia/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Community Forum
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
