/*
  Warnings:

  - The `imgUrl` column on the `housePictures` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."housePictures" DROP COLUMN "imgUrl",
ADD COLUMN     "imgUrl" TEXT[];
