/*
  Warnings:

  - Added the required column `lastName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable Migration
-- 1. Ajout colonne nullable
ALTER TABLE "user" ADD COLUMN "lastName" TEXT;

-- 2. Backfill
UPDATE "user"
SET "lastName" = 'Inconnu'
WHERE "lastName" IS NULL;

-- 3. Contrainte NOT NULL
ALTER TABLE "user" ALTER COLUMN "lastName" SET NOT NULL;