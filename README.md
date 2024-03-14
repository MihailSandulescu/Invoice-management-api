## Invoice Management API

The Invoice Management API is a backend system built with NestJS and TypeScript. It provides endpoints for managing invoices, including creation, update, payment status management, storno invoice generation, retrieval, and listing.

## Getting Started

Follow these steps to set up and run the project on your local machine:

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

- Node.js and npm (Node Package Manager)
- PostgreSQL

## Installation
Clone the repository:
- git clone https://github.com/MihailSandulescu/invoice-management-api.git
Navigate to the project directory:
- cd invoice-management-api
Install dependencies:
- npm install
Set up environment variables:
Create a .env file in the root directory and add the following environment variables:
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_DATABASE=invoice_management_db
Make sure to replace your_database_username and your_database_password with your PostgreSQL credentials.
## Create the database:
Run the following command to create the database specified in your .env file:
npm run db:create

## Start the server:
- npm run start:dev
This command will start the server in development mode.

## Usage
Once the server is running, you can interact with the API using GraphQL Playground. The GraphQL Playground can be accessed by navigating to http://localhost:3000/graphql in your web browser.

## GraphQL Queries and Mutations
The following are the available queries and mutations that you can run in the GraphQL Playground:

1. Queries

- invoices: Retrieves a list of all invoices.
query {
  invoices {
    id
    description
    date
    paymentTerm
    currency
    amount
    isPaid
    isStorno
  }
}
- invoice(number: Int!): Looks up an invoice by its number.
query {
  invoice(number: 1337) {
    id
    description
    date
    paymentTerm
    currency
    amount
    isPaid
    isStorno
  }
}

2. Mutations

- createInvoice: Creates invoice
mutation {
  createInvoice(input: {
    description: "Test Invoice"
    date: "2024-03-15"
    paymentTerm: "Net 30"
    currency: "USD"
    amount: 100.00
  }) {
    id
    description
    date
    paymentTerm
    currency
    amount
  }
}
- updateInvoice: updates existing invoice
mutation {
  updateInvoice(id: 5, input: {
    description: "Updated Invoice",
    paymentTerm: "term",
    amount: 5800
  }) {
    id
    description
    date
    paymentTerm
    currency
    amount
    customer {
      id
      name
    }
    project {
      id
      name
    }
  }
}
- markAsPaid(id: Int!): Marks an invoice as paid.
mutation {
  markAsPaid(id: 5) {
    id
    description
    date
    paymentTerm
    currency
    amount
    isPaid
    isStorno
  }
}
- markAsUnpaid(id: Int!): Marks an invoice as unpaid.mutation {
  markAsUnpaid(id: 5) {
    id
    description
    date
    paymentTerm
    currency
    amount
    isPaid
    isStorno
  }
}
- generateStornoInvoice(id: Int!): Generates a storno invoice from an existing standardized invoice.
mutation {
  generateStornoInvoice(id: 17) {
    id
    number
    description
    date
    paymentTerm
    currency
    amount
    isPaid
    isStorno
  }
}
