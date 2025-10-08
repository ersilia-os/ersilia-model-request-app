import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  userName?: string;
}

export default function WelcomeScreen({ userName }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-xl border-2 border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <CardHeader className="text-center p-0 mb-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-plum mb-3 md:mb-4">
            Welcome to Ersilia!
          </h1>

          <p className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
            Get started by adding a new model or <br></br>viewing your previous
            submissions.
          </p>
        </CardHeader>

        <CardContent className="space-y-3 p-0 flex flex-col items-center">
          <Link href="/new-model/step/1">
            <Button className="font-bold md:py-4 lg:py-5 text-sm md:text-base lg:text-lg bg-plum hover:bg-[#6f3b73] text-white px-6 py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer mb-2">
              Add New Model
            </Button>
          </Link>

          <Link href="/submissions">
            <Button className="text-plum-500 md:py-4 lg:py-5 text-sm md:text-base lg:text-lg bg-transparent hover:bg-gray-100 border-2 border-plum-200 py-3 font-semibold rounded-lg shadow-sm cursor-pointer mb-4">
              View Previous Submissions
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
