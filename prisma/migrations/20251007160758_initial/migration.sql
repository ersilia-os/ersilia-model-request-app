/*
  Warnings:

  - You are about to drop the column `cid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."User_cid_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cid",
DROP COLUMN "email",
ADD COLUMN     "sid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_sid_key" ON "User"("sid");
