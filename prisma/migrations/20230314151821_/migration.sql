/*
  Warnings:

  - You are about to drop the column `twitterLink` on the `Artist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "twitterLink",
ADD COLUMN     "youtubeLink" TEXT;
