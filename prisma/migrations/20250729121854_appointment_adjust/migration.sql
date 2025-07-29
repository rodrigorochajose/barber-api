/*
  Warnings:

  - A unique constraint covering the columns `[datetime]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_datetime_key" ON "Appointment"("datetime");
