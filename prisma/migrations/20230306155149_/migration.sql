-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "stageName" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "contactNumber" DROP NOT NULL,
ALTER COLUMN "facebookLink" DROP NOT NULL,
ALTER COLUMN "instagramLink" DROP NOT NULL,
ALTER COLUMN "twitterLink" DROP NOT NULL,
ALTER COLUMN "websiteLink" DROP NOT NULL,
ALTER COLUMN "avaiableForHire" DROP NOT NULL;
