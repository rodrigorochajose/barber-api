import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;


  async signIn(params: Prisma.UserCreateInput) : Promise<{ access_token: string }> {
    const user = await this.userService.getUserById({ email: params.email });

    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(params.password, user.password)

    if (!passwordMatch) throw new UnauthorizedException('Invalid Credentials');

    const payload = { sub: user.id };
    
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
