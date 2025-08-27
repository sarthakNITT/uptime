/*
  Warnings:

  - Added the required column `userId` to the `Websites` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Service_userId_key";

-- AlterTable
ALTER TABLE "public"."Service" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Websites" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Websites" ADD CONSTRAINT "Websites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
