import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class ProjectInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field()
  name: string;
}
