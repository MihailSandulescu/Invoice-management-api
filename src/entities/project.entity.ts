import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Invoice } from './invoice.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() 
@Entity()
export class Project {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Invoice], { nullable: true }) 
  @OneToMany(() => Invoice, invoice => invoice.project)
  invoices: Invoice[]; 
}
