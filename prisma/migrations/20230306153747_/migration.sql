/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `website` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "website" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_userId_key" ON "Artist"("userId");
