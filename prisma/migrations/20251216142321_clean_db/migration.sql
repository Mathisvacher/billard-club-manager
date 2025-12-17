/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "image",
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "currentHandicap" DROP NOT NULL;
