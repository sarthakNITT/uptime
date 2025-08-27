/*
  Warnings:

  - You are about to drop the column `userId` on the `Websites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[websiteId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Websites" DROP CONSTRAINT "Websites_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Websites" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Service_websiteId_key" ON "public"."Service"("websiteId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_userId_key" ON "public"."Service"("userId");
