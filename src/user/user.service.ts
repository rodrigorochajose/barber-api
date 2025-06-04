import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService

  async getUsers() : Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> | null {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput
    });
  }

  async createUser(data: Prisma.UserCreateInput){
    const hashPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({ 
      data: { ...data, password: hashPassword }
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
