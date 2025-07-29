import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class AppointmentService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createAppointmentDto: CreateAppointmentDto, userId: number) {
    try {
      return await this.prisma.appointment.create({
        data: { ...createAppointmentDto, userId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Horário já agendado');
        }
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.appointment.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.appointment.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return await this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.appointment.delete({
      where: { id },
    });
  }
}
