/*
  Warnings:

  - Added the required column `languageId` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Slider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "languageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "languageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Slider" ADD COLUMN     "languageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slider" ADD CONSTRAINT "Slider_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
