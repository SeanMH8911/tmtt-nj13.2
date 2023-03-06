/*
  Warnings:

  - You are about to drop the column `Area` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `Country` on the `Venue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "Area",
DROP COLUMN "Country",
ADD COLUMN     "area" TEXT,
ADD COLUMN     "country" TEXT;
