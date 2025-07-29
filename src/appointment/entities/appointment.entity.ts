import { Appointment as PrismaAppointment } from 'generated/prisma';

export class Appointment implements PrismaAppointment {
  id: number;
  datetime: Date;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
