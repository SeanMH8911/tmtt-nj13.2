-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'VenueOwner', 'Artist', 'Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';
