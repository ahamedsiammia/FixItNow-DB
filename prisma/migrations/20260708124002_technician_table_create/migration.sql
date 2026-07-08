-- CreateTable
CREATE TABLE "Technician" (
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

    CONSTRAINT "Technician_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technician_userId_key" ON "Technician"("userId");

-- AddForeignKey
ALTER TABLE "Technician" ADD CONSTRAINT "Technician_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
