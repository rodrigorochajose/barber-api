import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, AppointmentModule]
})
export class AppModule {}
