/*
  Warnings:

  - The values [PAID] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMPLETED] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."bookings" ALTER COLUMN "stats" DROP DEFAULT;
ALTER TABLE "bookings" ALTER COLUMN "stats" TYPE "BookingStatus_new" USING ("stats"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "public"."BookingStatus_old";
ALTER TABLE "bookings" ALTER COLUMN "stats" SET DEFAULT 'REQUESTED';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELLED');
ALTER TABLE "public"."Payments" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Payments" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "public"."PaymentStatus_old";
ALTER TABLE "Payments" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
