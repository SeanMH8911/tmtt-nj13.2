/*
  Warnings:

  - You are about to drop the column `addressId` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Area` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Country` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressOne` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressTwo` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_addressId_fkey";

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "addressId",
ADD COLUMN     "Area" TEXT NOT NULL,
ADD COLUMN     "Country" TEXT NOT NULL,
ADD COLUMN     "addressOne" TEXT NOT NULL,
ADD COLUMN     "addressTwo" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
