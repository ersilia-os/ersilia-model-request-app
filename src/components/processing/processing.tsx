"use client";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

import TextType from "../TextType";

export function SpinnerEmpty() {
  return (
    <div className="bg-white-500 grid min-h-[calc(100svh-136px)] w-full content-center">
      <Empty className="w-full border-none p-6 md:p-8 lg:p-10">
        <div className="mb-4 p-0 text-center">
          <EmptyHeader>
            <div className="mb-6 flex justify-center">
              <EmptyMedia variant="icon">
                <Spinner className="text-plum size-15" />
              </EmptyMedia>
            </div>

            <EmptyTitle className="text-plum mb-3 text-2xl font-bold md:mb-4 md:text-3xl lg:text-4xl">
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
              className="mt-4 mb-6 block w-full text-center text-xs text-gray-400 sm:text-sm md:text-base lg:text-lg"
            />

            <EmptyDescription className="mb-2 text-center text-xs text-gray-400 sm:text-sm md:text-base">
              Please wait while we process your request. <br />
              Do not refresh the page.
            </EmptyDescription>
          </EmptyHeader>
        </div>
      </Empty>
    </div>
  );
}
