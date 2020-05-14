namespace Types {
  export interface LineItem {
    product: Product
    rate: number
    quantity: number
  }

  export interface Invoice {
    createdBy: User
    lineItems: LineItem[]
    totalAmount: number
  }
}
