/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_categoryId_fkey";

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "categoryId",
ADD COLUMN     "venueCategory" TEXT;

-- DropTable
DROP TABLE "category";
