import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une tâche' })
  @ApiResponse({ status: 201, description: 'Tâche créée.' })
  async create(@Body() body: { title: string; description: string; createdDate?: string; status?: TaskStatus }) {
    return this.tasksService.createTask(body.title, body.description, body.createdDate, body.status);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les tâches' })
  @ApiResponse({ status: 200, description: 'Liste des tâches récupérée.' })
  async findAll() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une tâche par ID' })
  @ApiResponse({ status: 200, description: 'Tâche trouvée.' })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée.' })
  async findOne(@Param('id') id: string) {
    return this.tasksService.getTaskById(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  @ApiResponse({ status: 200, description: 'Tâche mise à jour.' })
  async update(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; status?: TaskStatus }
  ) {
    return this.tasksService.updateTask(Number(id), body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une tâche' })
  @ApiResponse({ status: 200, description: 'Tâche supprimée.' })
  async remove(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id));
  }
}
