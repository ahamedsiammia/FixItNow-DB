/*
  Warnings:

  - You are about to alter the column `rating` on the `technicianProfiles ` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "technicianProfiles " ALTER COLUMN "rating" SET DATA TYPE INTEGER;
