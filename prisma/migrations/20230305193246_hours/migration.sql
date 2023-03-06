-- CreateTable
CREATE TABLE "OpeningTime" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "openTime" TIMESTAMP(3) NOT NULL,
    "closeTime" TIMESTAMP(3) NOT NULL,
    "midOpenTime" TIMESTAMP(3),
    "midCloseTime" TIMESTAMP(3),
    "venueId" TEXT NOT NULL,
    "BookableSlots" TIMESTAMP(3)[],

    CONSTRAINT "OpeningTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpeningTime" ADD CONSTRAINT "OpeningTime_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
