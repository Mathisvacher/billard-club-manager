/*
  Warnings:

  - The values [DEUX_POINT_HUIT_ZERO] on the enum `MatchType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MatchType_new" AS ENUM ('TROIS_BANDES', 'BANDES', 'TROIS_BANDES_2_80', 'LIBRE', 'CADRE');
ALTER TABLE "Match" ALTER COLUMN "type" TYPE "MatchType_new" USING ("type"::text::"MatchType_new");
ALTER TYPE "MatchType" RENAME TO "MatchType_old";
ALTER TYPE "MatchType_new" RENAME TO "MatchType";
DROP TYPE "public"."MatchType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "date" DROP NOT NULL;
