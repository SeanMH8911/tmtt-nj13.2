-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "area" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "streetName" TEXT;

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "contactNumber" TEXT;
