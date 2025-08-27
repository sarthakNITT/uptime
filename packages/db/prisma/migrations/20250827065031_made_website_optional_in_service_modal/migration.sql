-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_websiteId_fkey";

-- AlterTable
ALTER TABLE "public"."Service" ALTER COLUMN "websiteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "public"."Websites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
