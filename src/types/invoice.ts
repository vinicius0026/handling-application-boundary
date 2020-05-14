namespace Types {
  export interface LineItem {
    product: Product
    rate: decimal.Decimal
    quantity: number
  }

  export interface Invoice {
    createdBy: User
    lineItems: LineItem[]
    totalAmount: decimal.Decimal
  }
}
