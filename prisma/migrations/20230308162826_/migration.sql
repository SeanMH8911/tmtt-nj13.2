/*
  Warnings:

  - Changed the type of `openTime` on the `OpeningTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `closeTime` on the `OpeningTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OpeningTime" DROP COLUMN "openTime",
ADD COLUMN     "openTime" TIME(0) NOT NULL,
DROP COLUMN "closeTime",
ADD COLUMN     "closeTime" TIME(0) NOT NULL;
