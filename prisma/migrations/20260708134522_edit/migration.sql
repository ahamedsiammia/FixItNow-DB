/*
  Warnings:

  - You are about to drop the `Technician` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Technician" DROP CONSTRAINT "Technician_userId_fkey";

-- DropTable
DROP TABLE "Technician";

-- CreateTable
CREATE TABLE "technicianProfiles " (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" VARCHAR(225) NOT NULL,
    "skills" VARCHAR NOT NULL,
    "experienceYear" INTEGER NOT NULL,
    "hourlyRate" INTEGER NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "totalReviews" INTEGER NOT NULL,
    "availabilitySlots" VARCHAR(255) NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "technicianProfiles _pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "technicianProfiles _userId_key" ON "technicianProfiles "("userId");

-- AddForeignKey
ALTER TABLE "technicianProfiles " ADD CONSTRAINT "technicianProfiles _userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
