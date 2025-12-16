/*
  Warnings:

  - Added the required column `currentHandicap` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable Migration
-- 1. Ajout colonne nullable
ALTER TABLE "user" ADD COLUMN "currentHandicap" INTEGER;

-- 2. Backfill
UPDATE "user"
SET "currentHandicap" = '100'
WHERE "currentHandicap" IS NULL;

-- 3. Contrainte NOT NULL
ALTER TABLE "user" ALTER COLUMN "currentHandicap" SET NOT NULL;
