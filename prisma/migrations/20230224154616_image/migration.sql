/*
  Warnings:

  - You are about to drop the column `imageId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_imageId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageId",
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "Image";
