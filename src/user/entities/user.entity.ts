import { User as PrismaUser } from "generated/prisma";

export class User implements PrismaUser {
  name: string;
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}