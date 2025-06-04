import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Post('signup')
  async signupUser(@Body() userData: Prisma.UserCreateInput,
  ): Promise<User> {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUsers() : Promise<User[]>{
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById({ id: Number(id) });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Body() userData: Prisma.UserUpdateInput,
    @Param('id') id: string
  ) {
    return this.userService.updateUser({ where : { id : Number(id) }, data: userData });
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
