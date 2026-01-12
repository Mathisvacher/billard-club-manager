/*
  Warnings:

  - Added the required column `isActive` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;
