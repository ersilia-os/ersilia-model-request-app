"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

export function SpinnerEmpty() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Empty className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-xl border-2 border-solid border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <div className="text-center p-0 mb-4">
          <EmptyHeader>
            <div className="flex justify-center mb-6">
              <EmptyMedia variant="icon">
                <Spinner />
              </EmptyMedia>
            </div>
            
            <EmptyTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-plum mb-3 md:mb-4">
              Processing your request
            </EmptyTitle>

            <EmptyDescription className="text-center text-gray-400 text-sm md:text-base lg:text-lg mb-2">
              Please wait while we process your request. <br />
              Do not refresh the page.
            </EmptyDescription>
          </EmptyHeader>
        </div>

        <EmptyContent className="flex justify-center mt-4">
          <Button
            variant="outline"
            size="lg"
            className="text-plum border-2 border-plum/20 hover:bg-gray-100 text-sm md:text-base font-semibold rounded-lg shadow-sm transition-all duration-200"
          >
            Cancel
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}