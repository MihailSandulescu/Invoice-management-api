import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated } from 'typeorm';
import { Project } from './project.entity';
import { Customer } from './customer.entity';
import { ObjectType, Field } from '@nestjs/graphql'; // Import decorators

@ObjectType() // Decorate with ObjectType
@Entity()
export class Invoice {
  @Field() // Decorate each field with Field
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  number: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  date: Date;

  @Field()
  @Column()
  paymentTerm: string;

  @Field()
  @Column()
  currency: string;

  @Field()
  @Column()
  amount: number;

  @Field()
  @Column({ default: false })
  isPaid: boolean;

  @Field()
  @Column({ default: false })
  isStorno: boolean;

  // Many invoices can be associated with one customer
  @ManyToOne(() => Customer, customer => customer.invoices)
  @Field(() => Customer, { nullable: true }) // Specify the return type for customer field
  customer: Customer;

  // Many invoices can be associated with one project
  @ManyToOne(() => Project, project => project.invoices)
  @Field(() => Project, { nullable: true }) // Specify the return type for project field
  project: Project;

  constructor(data: Partial<Invoice> = {}) {
    Object.assign(this, data);
  }
}
