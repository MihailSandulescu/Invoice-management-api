import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Customer } from '../entities/customer.entity';
import { CustomerService } from '../services/customer.service';
import { CustomerInput } from './customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Mutation(() => Customer)
  async createCustomer(@Args('input') input: CustomerInput): Promise<Customer> {
    return this.customerService.create(input);
  }
}
