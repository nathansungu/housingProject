/*
  Warnings:

  - A unique constraint covering the columns `[houseId]` on the table `housePictures` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "housePictures_houseId_key" ON "public"."housePictures"("houseId");
