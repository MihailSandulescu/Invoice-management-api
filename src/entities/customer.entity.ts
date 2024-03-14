import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Invoice } from './invoice.entity';
import { ObjectType, Field } from '@nestjs/graphql'; // Import decorators

@ObjectType()
@Entity()
export class Customer {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Invoice], { nullable: true }) // Specify the return type as an array of invoices
  @OneToMany(() => Invoice, invoice => invoice.customer)
  invoices: Invoice[]; // Define the type as Invoice[]
}
