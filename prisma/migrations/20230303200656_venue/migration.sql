/*
  Warnings:

  - You are about to drop the column `addressOne` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `addressTwo` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Venue` table. All the data in the column will be lost.
  - Added the required column `fullAddress` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "addressOne",
DROP COLUMN "addressTwo",
DROP COLUMN "zipCode",
ADD COLUMN     "fullAddress" TEXT NOT NULL,
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "streetName" TEXT;
