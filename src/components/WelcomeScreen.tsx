import Link from "next/link";

import { InfoIcon } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function WelcomeScreen() {
  return (
    <div className="flex h-[calc(100vh-70px-2px)] flex-col justify-center gap-20">
      <div className="flex flex-col items-center justify-center">
        <Card className="border-plum w-full rounded-2xl border-2 p-6 shadow-xl md:p-8 lg:p-10">
          <CardHeader className="mb-4 p-0 text-center">
            <h1 className="text-plum mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
              Welcome to Ersilia!
            </h1>

            <p className="mb-2 text-center text-sm text-gray-400 md:text-base lg:text-lg">
              Get started by adding a new model or <br></br>viewing your
              previous submissions.
            </p>
          </CardHeader>

          <CardContent className="flex flex-col items-center space-y-3 p-0">
            <Link href="/new-model" className="w-3/4 md:w-2/3">
              <Button variant={"plum"} className="w-full text-xs md:text-sm">
                Add New Model
              </Button>
            </Link>

            <Link href="/submissions" className="w-3/4 md:w-2/3">
              <Button
                variant={"transparent"}
                className="w-full text-xs md:text-sm">
                View Previous Submissions
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Alert className="sm:max-2/3 border-plum/40 mx-auto max-w-4/5">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription className="inline text-xs md:text-sm lg:text-base">
          For more information regarding the submission process, please visit
          the official{" "}
          <Link
            href="https://ersilia.gitbook.io/ersilia-book/"
            target="_blank"
            className="text-plum hover:text-plum/80 whitespace-nowrap underline">
            Ersilia documentation
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  );
}
