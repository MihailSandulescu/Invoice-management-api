// src/services/invoice.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceInput } from '../graphql/invoice.input';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }

  async create(input: InvoiceInput): Promise<Invoice> {
    // Get the last invoice
    const lastInvoice = await this.invoiceRepository.find({
      order: { number: 'DESC' },
      take: 1, // Limit to one result
    });

    // Calculate the next invoice number
    const newInvoiceNumber = lastInvoice.length > 0 ? lastInvoice[0].number + 1 : 1337;
    const newInvoice = this.invoiceRepository.create({ ...input, number: newInvoiceNumber });
    return this.invoiceRepository.save(newInvoice);
  }

  async update(id: number, input: InvoiceInput): Promise<Invoice> {
    const existingInvoice = await this.invoiceRepository.findOne({where: {id}});
    if (!existingInvoice) {
      throw new Error(`Invoice with ID ${id} not found.`);
    }
    Object.assign(existingInvoice, input);
    return this.invoiceRepository.save(existingInvoice);
  }

  async markAsPaid(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    if (!invoice) {
      throw new Error(`Invoice with ID ${id} not found.`);
    }
    invoice.isPaid = true;
    return this.invoiceRepository.save(invoice);
  }

  async markAsUnpaid(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    if (!invoice) {
      throw new Error(`Invoice with ID ${id} not found.`);
    }
    invoice.isPaid = false;
    return this.invoiceRepository.save(invoice);
  }

  async generateStornoInvoice(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    if (!invoice) {
      throw new Error(`Invoice with ID ${id} not found.`);
    }
  
    const stornoInvoiceNumber = await this.generateUniqueStornoInvoiceNumber();
  
    const stornoInvoice = this.invoiceRepository.create({
      description: `Storno of invoice ${invoice.number}`,
      date: new Date(), // Set the date to current date or any appropriate date for storno invoice
      paymentTerm: invoice.paymentTerm,
      currency: invoice.currency,
      amount: -invoice.amount, // Set the amount as negative to indicate storno
      number: stornoInvoiceNumber,
      isPaid: false, // By default, storno invoices are not paid
      isStorno: true,
    });
  
    return this.invoiceRepository.save(stornoInvoice);
  }

  private async generateUniqueStornoInvoiceNumber(): Promise<number> {
    let stornoInvoiceNumber: number;
    do {
      stornoInvoiceNumber = this.generateRandomInvoiceNumber();
    } while (await this.isInvoiceNumberExists(stornoInvoiceNumber));
    return stornoInvoiceNumber;
  }
  
  private generateRandomInvoiceNumber(): number {
    // Generate a random invoice number based on your requirements
    return Math.floor(Math.random() * 1000000) + 1;
  }
  
  private async isInvoiceNumberExists(invoiceNumber: number): Promise<boolean> {
    // Check if the invoice number exists in the database
    const existingInvoice = await this.invoiceRepository.findOne({ where: { number: invoiceNumber } });
    return !!existingInvoice;
  }

  async findByNumber(number: number): Promise<Invoice> {
    return this.invoiceRepository.findOne({ where: { number } });
  }
}
