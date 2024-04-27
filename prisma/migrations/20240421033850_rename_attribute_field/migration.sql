/*
  Warnings:

  - You are about to drop the column `shortDescription` on the `Product` table. All the data in the column will be lost.
  - Added the required column `shortDescriptionAr` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescriptionEn` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "shortDescription",
ADD COLUMN     "shortDescriptionAr" TEXT NOT NULL,
ADD COLUMN     "shortDescriptionEn" TEXT NOT NULL;
