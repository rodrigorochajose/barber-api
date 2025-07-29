import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { mapUserToDto } from './mappers/user.mapper';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  async getUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(mapUserToDto);
  }

  async getUserForAuth(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getUserByUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserDto> | null {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    return user ? mapUserToDto(user) : null;
  }

  async createUser(data: Prisma.UserCreateInput) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashPassword },
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
