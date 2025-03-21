import { Injectable } from '@nestjs/common';
import { PrismaClient, Task, TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  private prisma = new PrismaClient();

  async createTask(title: string, description: string, createdDate?: string, status?: TaskStatus) {
    return this.prisma.task.create({
      data: {
        title,
        description,
        createdDate: createdDate ? new Date(createdDate) : undefined,
        status: status || TaskStatus.A_FAIRE,
      },
    });
  }

  async getTasks() {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: number) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async updateTask(id: number, data: { title?: string; description?: string; status?: TaskStatus }) {
    return this.prisma.task.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      },
    });
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
