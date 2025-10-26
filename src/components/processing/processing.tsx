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
import TextType from "../TextType";

export function SpinnerEmpty() {
  return (
    <div className="min-h-[calc(100svh-70px-2px)] grid content-center bg-white-500 w-full">
      <Empty className="w-full shadow-xl border-2 border-solid border-plum rounded-2xl p-6 md:p-8 lg:p-10">
        <div className="text-center p-0 mb-4">
          <EmptyHeader>
            <div className="flex justify-center mb-6">
              <EmptyMedia variant="icon">
                <Spinner className="size-15 text-plum" />
              </EmptyMedia>
            </div>

            <EmptyTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-plum mb-3 md:mb-4">
              Processing your request
            </EmptyTitle>

          <TextType
            as="span"
            text={[
              "Analyzing metadata extracted from your publication...",
              "Preparing your model for integration into Ersilia...",
            ]}
            typingSpeed={70}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="_"
            className="block text-center text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mt-4 mb-6 w-full"
          />

            <EmptyDescription className="text-center text-gray-400 text-xs sm:text-sm md:text-base mb-2">
              Please wait while we process your request. <br />
              Do not refresh the page.
            </EmptyDescription>
          </EmptyHeader>
        </div>

        <EmptyContent className="flex justify-center mt-4">
          <Button variant="transparent" size="lg">
            Cancel
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
