import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProjectDto } from './dtos/add-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projetctsRepository: Repository<Project>,
  ) {}

  async add(body: AddProjectDto): Promise<Project> {
    try {
      const project = this.projetctsRepository.create(body);
      if (project !== null) {
        const response = await this.projetctsRepository.save(project);
        if (response) {
          return response;
        }
        throw new BadRequestException(
          'Ocorreu um erro ao tentar adicionar o projeto. Tente novamente!',
        );
      }
      throw new BadRequestException('Erro inesperado!');
    } catch (erro) {
      throw new BadRequestException(erro);
    }
  }
}
