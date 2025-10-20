-- CreateTable
CREATE TABLE "ErsiliaIssue" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "issueNumber" INTEGER NOT NULL,
    "issueUrl" TEXT NOT NULL,
    "modelMetadataId" TEXT NOT NULL,

    CONSTRAINT "ErsiliaIssue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ErsiliaIssue" ADD CONSTRAINT "ErsiliaIssue_modelMetadataId_fkey" FOREIGN KEY ("modelMetadataId") REFERENCES "model_metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
