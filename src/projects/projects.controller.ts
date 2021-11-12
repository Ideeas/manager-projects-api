import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AddProjectDto } from './dtos/add-project.dto';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async list(): Promise<Project[]> {
    return await this.projectsService.list();
  }

  @Post('add')
  async add(@Body() body: AddProjectDto): Promise<Project> {
    return await this.projectsService.add(body);
  }
}
