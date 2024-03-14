import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Project } from '../entities/project.entity';
import { ProjectService } from '../services/project.service';
import { ProjectInput } from './project.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Mutation(() => Project)
  async createProject(@Args('input') input: ProjectInput): Promise<Project> {
    return this.projectService.create(input);
  }
}
