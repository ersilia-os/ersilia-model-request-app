import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col h-[calc(100vh-70px)] justify-center gap-20">
      <div className="flex flex-col items-center justify-center">
        <Card className="w-full shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
          <CardHeader className="text-center p-0 mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
              Welcome to Ersilia!
            </h1>

            <p className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
              Get started by adding a new model or <br></br>viewing your
              previous submissions.
            </p>
          </CardHeader>

          <CardContent className="space-y-3 p-0 flex flex-col items-center">
            <Link href="/new-model" className="w-2/3">
              <Button variant={"plum"} className="w-full">
                Add New Model
              </Button>
            </Link>

            <Link href="/submissions" className="w-2/3">
              <Button variant={"transparent"} className="w-full">
                View Previous Submissions
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Alert className="mx-auto max-w-2/3 min-w-3/4 border-plum/40">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription className="text-pretty text-xs md:text-sm lg:text-base">
          For more information regarding the submission process, please visit
          the official{" "}
          <Link
            href="https://ersilia.gitbook.io/ersilia-book/"
            target="_blank"
            className="underline text-plum hover:text-plum/80"
          >
            Ersilia documentation
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  );
}
