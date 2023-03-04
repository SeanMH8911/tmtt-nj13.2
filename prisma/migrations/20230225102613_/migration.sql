-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_addressId_fkey";

-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
