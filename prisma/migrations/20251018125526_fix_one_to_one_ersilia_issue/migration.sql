/*
  Warnings:

  - A unique constraint covering the columns `[modelMetadataId]` on the table `ErsiliaIssue` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."ErsiliaIssue" DROP CONSTRAINT "ErsiliaIssue_modelMetadataId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "ErsiliaIssue_modelMetadataId_key" ON "ErsiliaIssue"("modelMetadataId");

-- AddForeignKey
ALTER TABLE "ErsiliaIssue" ADD CONSTRAINT "ErsiliaIssue_modelMetadataId_fkey" FOREIGN KEY ("modelMetadataId") REFERENCES "model_metadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
