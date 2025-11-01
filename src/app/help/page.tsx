import Link from "next/link";

import {
  BookOpen,
  ExternalLink,
  FileText,
  HelpCircle,
  Mail,
  MessageSquare,
} from "lucide-react";

import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function HelpPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      <div className="space-y-8">
        <SectionHeader
          title="Get Help"
          description="Find answers to common questions and learn how to submit models to Ersilia"
        />

        <Card className="from-plum/10 border-plum/20 bg-linear-to-t to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <BookOpen className="text-plum mt-1 h-6 w-6 shrink-0" />
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Official Documentation
                </h3>
                <p className="mb-4 text-gray-700">
                  For more information regarding the submission process, please
                  visit the official Ersilia documentation.
                </p>
                <Button variant="plum" asChild>
                  <Link
                    href="https://ersilia.gitbook.io/ersilia-book"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2">
                    View Documentation
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="from-plum/5 bg-linear-to-t to-transparent">
            <CardHeader>
              <CardTitle className="text-plum flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">
                  What file formats are supported?
                </h4>
                <p className="text-sm text-gray-700">
                  You can submit publications as PDF files or provide a URL to
                  the publication.
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">
                  How long does the review process take?
                </h4>
                <p className="text-sm text-gray-700">
                  The review process typically takes 1-2 weeks depending on the
                  complexity of the model.
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">
                  Can I edit my submission after submitting?
                </h4>
                <p className="text-sm text-gray-700">
                  Yes, you can edit your submission before final approval by
                  navigating to your submissions page.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="from-plum/5 bg-linear-to-t to-transparent">
            <CardHeader>
              <CardTitle className="text-plum flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Submission Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">
                  1. Prepare Your Publication
                </h4>
                <p className="text-sm text-gray-700">
                  Ensure you have access to the full publication (PDF or URL)
                  and any supplementary materials.
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">
                  2. Provide Context
                </h4>
                <p className="text-sm text-gray-700">
                  Answer the contextual questions thoroughly to help our AI
                  extract accurate metadata.
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">
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
        <Card className="from-plum/10 border-plum/20 bg-linear-to-t to-transparent">
          <CardHeader>
            <CardTitle className="text-plum flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Need More Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              If you can&apos;t find the answer you&apos;re looking for, our
              support team is here to help.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="outline" asChild>
                <Link
                  href="mailto:support@ersilia.io"
                  className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Support
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com/ersilia-os/ersilia/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2">
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
