import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Invoice } from './invoice.entity';
import { ObjectType, Field } from '@nestjs/graphql'; // Import decorators

@ObjectType() // Decorate with ObjectType
@Entity()
export class Project {
  @Field() // Decorate with Field
  @PrimaryGeneratedColumn()
  id: number;

  @Field() // Decorate with Field
  @Column()
  name: string;

  @Field(() => [Invoice], { nullable: true }) // Specify the return type as an array of invoices
  @OneToMany(() => Invoice, invoice => invoice.project)
  invoices: Invoice[]; // Define the type as Invoice[]
}
