import { User } from 'generated/prisma';
import { UserDto } from '../dto/user.dto';

export function mapUserToDto(user: User): UserDto {
  const { id, name, email, createdAt, updatedAt } = user;
  return { id, name, email, createdAt, updatedAt };
}
