import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { ProjectInput } from '../graphql/project.input';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async create(input: ProjectInput): Promise<Project> {
    const newProject = this.projectRepository.create(input);
    return this.projectRepository.save(newProject);
  }
}
