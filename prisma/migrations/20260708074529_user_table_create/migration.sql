-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('USER', 'TECHNICIAN', 'ADMIN');

-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('ACTIVE', 'BLOCKED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "role" "userRole" NOT NULL DEFAULT 'USER',
    "address" VARCHAR(255) NOT NULL,
    "status" "userStatus" NOT NULL DEFAULT 'ACTIVE',
    "profileImage" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
