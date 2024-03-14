npm run start:dev
localhost:3000/graphql

// Retrieve and List all Invoices
query {
  invoices {
    id
    description
    date
    paymentTerm
    currency
    amount
    customerId
    projectId
  }
}

// Retrieve an invoice by its number
query {
  invoice(number: 1337) {
    id
    description
    date
    paymentTerm
    currency
    amount
    customerId
    projectId
  }
}

// Create or update an invoice
mutation {
  createOrUpdateInvoice(input: {
    description: "Test Invoice"
    date: "2024-03-15"
    paymentTerm: "Net 30"
    currency: "USD"
    amount: 100.00
    customerId: 1
    projectId: 1
  }) {
    id
    description
    date
    paymentTerm
    currency
    amount
    customerId
    projectId
  }
}

// Mark an invoice as paid
mutation {
  markAsPaid(id: 1) {
    id
    isPaid
  }
}

// Mark an invoice as unpaid
mutation {
  markAsUnpaid(id: 1) {
    id
    isPaid
  }
}

// Generate a Storno invoice
mutation {
  generateStornoInvoice(id: 1) {
    id
    isStorno
  }
}



