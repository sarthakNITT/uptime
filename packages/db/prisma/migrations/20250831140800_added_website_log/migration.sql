/*
  Warnings:

  - The `status` column on the `Websites` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."MonitorStatus" AS ENUM ('UP', 'DOWN');

-- DropIndex
DROP INDEX "public"."Service_email_key";

-- DropIndex
DROP INDEX "public"."Service_phone_key";

-- AlterTable
ALTER TABLE "public"."Websites" ADD COLUMN     "avgResponseMs" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "public"."MonitorStatus" NOT NULL DEFAULT 'DOWN';

-- CreateTable
CREATE TABLE "public"."WebsiteLog" (
    "id" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responseMs" INTEGER,

    CONSTRAINT "WebsiteLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WebsiteLog_websiteId_checkedAt_idx" ON "public"."WebsiteLog"("websiteId", "checkedAt");

-- CreateIndex
CREATE INDEX "WebsiteLog_checkedAt_idx" ON "public"."WebsiteLog"("checkedAt");

-- CreateIndex
CREATE INDEX "Websites_userId_idx" ON "public"."Websites"("userId");

-- AddForeignKey
ALTER TABLE "public"."WebsiteLog" ADD CONSTRAINT "WebsiteLog_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "public"."Websites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
