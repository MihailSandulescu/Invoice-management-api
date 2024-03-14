import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CustomerInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field()
  name: string;
}
