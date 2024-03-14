import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceInput } from './invoice.input'; 

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Query(() => [Invoice])
  async invoices(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Mutation(() => Invoice) 
  async createInvoice(@Args('input') input: InvoiceInput): Promise<Invoice> {
    return this.invoiceService.create(input);
  }

  @Mutation(() => Invoice)
  async updateInvoice(@Args('id') id: number, @Args('input') input: InvoiceInput): Promise<Invoice> {
    return this.invoiceService.update(id, input);
  }

  @Mutation(() => Invoice)
  async markAsPaid(@Args('id') id: number): Promise<Invoice> {
    return this.invoiceService.markAsPaid(id);
  }

  @Mutation(() => Invoice)
  async markAsUnpaid(@Args('id') id: number): Promise<Invoice> {
    return this.invoiceService.markAsUnpaid(id);
  }

  @Mutation(() => Invoice)
  async generateStornoInvoice(@Args('id') id: number): Promise<Invoice> {
    return this.invoiceService.generateStornoInvoice(id);
  }

  @Query(() => Invoice)
  async invoice(@Args('number') number: number): Promise<Invoice> {
    return this.invoiceService.findByNumber(number);
  }
}
