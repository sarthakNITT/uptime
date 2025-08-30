-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('UP', 'DOWN');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Websites" ADD COLUMN     "lastChecked" TIMESTAMP(3),
ADD COLUMN     "responseTime" TEXT,
ADD COLUMN     "status" "public"."Role";
