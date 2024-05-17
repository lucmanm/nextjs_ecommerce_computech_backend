/*
  Warnings:

  - You are about to drop the column `languageId` on the `Slider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "languageCode" DROP DEFAULT,
ALTER COLUMN "languageName" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Slider" DROP COLUMN "languageId";
