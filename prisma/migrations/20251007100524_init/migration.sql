-- CreateTable
CREATE TABLE "User" (
    "cid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cid_key" ON "User"("cid");
