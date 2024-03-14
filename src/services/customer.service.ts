import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CustomerInput } from '../graphql/customer.input';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async create(input: CustomerInput): Promise<Customer> {
    const newCustomer = this.customerRepository.create(input);
    return this.customerRepository.save(newCustomer);
  }
}
