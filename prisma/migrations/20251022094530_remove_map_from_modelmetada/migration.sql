/*
  Warnings:

  - You are about to drop the column `biomedical_area` on the `model_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `input_dimension` on the `model_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `output_consistency` on the `model_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `output_dimension` on the `model_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `publication_type` on the `model_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `publication_url` on the `model_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `publication_year` on the `model_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `source_type` on the `model_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `source_url` on the `model_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `target_organism` on the `model_metadata` table. All the data in the column will be lost.
  - Added the required column `inputDimension` to the `model_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outputConsistency` to the `model_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outputDimension` to the `model_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicationType` to the `model_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicationUrl` to the `model_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicationYear` to the `model_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceType` to the `model_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceUrl` to the `model_metadata` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `model_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `interpretation` on table `model_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `task` on table `model_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subtask` on table `model_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `input` on table `model_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deployment` on table `model_metadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `license` on table `model_metadata` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "model_metadata" DROP COLUMN "biomedical_area",
DROP COLUMN "input_dimension",
DROP COLUMN "output_consistency",
DROP COLUMN "output_dimension",
DROP COLUMN "publication_type",
DROP COLUMN "publication_url",
DROP COLUMN "publication_year",
DROP COLUMN "source_type",
DROP COLUMN "source_url",
DROP COLUMN "target_organism",
ADD COLUMN     "biomedicalArea" TEXT[],
ADD COLUMN     "inputDimension" TEXT NOT NULL,
ADD COLUMN     "outputConsistency" TEXT NOT NULL,
ADD COLUMN     "outputDimension" TEXT NOT NULL,
ADD COLUMN     "publicationType" TEXT NOT NULL,
ADD COLUMN     "publicationUrl" TEXT NOT NULL,
ADD COLUMN     "publicationYear" TEXT NOT NULL,
ADD COLUMN     "sourceType" TEXT NOT NULL,
ADD COLUMN     "sourceUrl" TEXT NOT NULL,
ADD COLUMN     "targetOrganism" TEXT[],
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "interpretation" SET NOT NULL,
ALTER COLUMN "task" SET NOT NULL,
ALTER COLUMN "subtask" SET NOT NULL,
ALTER COLUMN "input" SET NOT NULL,
ALTER COLUMN "deployment" SET NOT NULL,
ALTER COLUMN "license" SET NOT NULL;
