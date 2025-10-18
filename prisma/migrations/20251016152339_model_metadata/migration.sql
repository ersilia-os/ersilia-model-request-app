/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('DRAFT', 'SUBMITTED');

-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_authorName_fkey";

-- DropIndex
DROP INDEX "public"."User_username_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "username",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "sub" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("sub");

-- DropTable
DROP TABLE "public"."Message";

-- CreateTable
CREATE TABLE "model_metadata" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "FormStatus" NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "description" TEXT,
    "interpretation" TEXT,
    "tags" TEXT[],
    "task" TEXT,
    "subtask" TEXT,
    "input" TEXT,
    "input_dimension" INTEGER,
    "output" TEXT[],
    "output_dimension" INTEGER,
    "output_consistency" TEXT,
    "publication_url" TEXT,
    "publication_year" INTEGER,
    "publication_type" TEXT,
    "source_url" TEXT,
    "source_type" TEXT,
    "deployment" TEXT,
    "license" TEXT,
    "biomedical_area" TEXT[],
    "target_organism" TEXT[],

    CONSTRAINT "model_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "model_metadata_title_key" ON "model_metadata"("title");

-- CreateIndex
CREATE UNIQUE INDEX "model_metadata_slug_key" ON "model_metadata"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "model_metadata" ADD CONSTRAINT "model_metadata_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("sub") ON DELETE RESTRICT ON UPDATE CASCADE;
