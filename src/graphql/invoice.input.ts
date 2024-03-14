import { InputType, Field, ID } from '@nestjs/graphql';
import { CustomerInput } from './customer.input';
import { ProjectInput } from './project.input';

@InputType()
export class InvoiceInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field()
  description: string;

  @Field({ nullable: true })
  date: Date;

  @Field()
  paymentTerm: string;

  @Field({ nullable: true })
  currency: string;

  @Field()
  amount: number;

  @Field(() => CustomerInput, { nullable: true })
  customer?: CustomerInput;

  @Field(() => ProjectInput, { nullable: true })
  project?: ProjectInput;
}
