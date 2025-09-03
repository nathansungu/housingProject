/*
  Warnings:

  - Added the required column `password` to the `auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."auth" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';
