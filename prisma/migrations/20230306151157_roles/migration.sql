-- AlterTable
ALTER TABLE "OpeningTime" ADD COLUMN     "artistId" TEXT;

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "stageName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactNumber" INTEGER NOT NULL,
    "facebookLink" TEXT NOT NULL,
    "instagramLink" TEXT NOT NULL,
    "twitterLink" TEXT NOT NULL,
    "websiteLink" TEXT NOT NULL,
    "avaiableForHire" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpeningTime" ADD CONSTRAINT "OpeningTime_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
