/*
  Warnings:

  - Added the required column `isContributor` to the `model_metadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "model_metadata" ADD COLUMN     "isContributor" BOOLEAN NOT NULL;
