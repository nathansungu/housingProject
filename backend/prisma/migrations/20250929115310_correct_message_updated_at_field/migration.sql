/*
  Warnings:

  - You are about to drop the column `createdAtb` on the `review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."messages" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."review" DROP COLUMN "createdAtb",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
