-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "Area" DROP NOT NULL,
ALTER COLUMN "Country" DROP NOT NULL,
ALTER COLUMN "addressOne" DROP NOT NULL,
ALTER COLUMN "addressTwo" DROP NOT NULL,
ALTER COLUMN "lat" DROP NOT NULL,
ALTER COLUMN "lng" DROP NOT NULL,
ALTER COLUMN "zipCode" DROP NOT NULL;
