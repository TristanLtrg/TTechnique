import { IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class TaskResponseDto {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdDate: Date;
  updatedAt: Date;
}