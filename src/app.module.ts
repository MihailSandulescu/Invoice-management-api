import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { Invoice } from './entities/invoice.entity';
import { InvoiceResolver } from './graphql/invoice.resolver';
import { InvoiceService } from './services/invoice.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CustomerResolver } from './graphql/customer.resolver';
import { ProjectResolver } from './graphql/project.resolver';
import { CustomerService } from './services/customer.service';
import { ProjectService } from './services/project.service';
import { Customer } from './entities/customer.entity';
import { Project } from './entities/project.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Invoice, Project, Customer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Invoice, Project, Customer]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [
    ProjectResolver,
    ProjectService,
    InvoiceResolver,
    InvoiceService,
    CustomerResolver,
    CustomerService,
  ],
})
export class AppModule {}
