import Decimal from "decimal.js"

import User from "@/modules/user"
import Product from "@/modules/product"
import LineItem from "@/modules/lineItem"
import Invoice from "@/modules/invoice"

describe("Invoice Module tests", () => {
  it("create function generates an empty invoice", () => {
    const { user } = testData()
    const invoice = Invoice.create(user)

    expect(invoice.createdBy).toBe(user)
    expect(invoice.lineItems).toStrictEqual([])
    expect(invoice.totalAmount).toStrictEqual(new Decimal(0))
  })

  it("addLineItem adds item to invoice and recalculates total", () => {
    const { user, product1, product2 } = testData()
    const lineItem1 = LineItem.create(product1, new Decimal(10), 1)
    let invoice = Invoice.create(user)

    invoice = Invoice.addLineItem(invoice, lineItem1)
    expect(invoice.lineItems).toStrictEqual([lineItem1])
    expect(invoice.totalAmount).toStrictEqual(new Decimal(10))

    const lineItem2 = LineItem.create(product2, new Decimal(3), 2)
    invoice = Invoice.addLineItem(invoice, lineItem2)
    expect(invoice.lineItems).toStrictEqual([lineItem1, lineItem2])
    expect(invoice.totalAmount).toStrictEqual(new Decimal(16))
  })

  it("removeLineItem removes the item and recalculates the total", () => {
    const { user, product1, product2 } = testData()
    const lineItem1 = LineItem.create(product1, new Decimal(10), 1)
    const lineItem2 = LineItem.create(product2, new Decimal(3), 2)
    let invoice = Invoice.create(user)
    invoice = Invoice.addLineItem(invoice, lineItem1)
    invoice = Invoice.addLineItem(invoice, lineItem2)

    const invoiceAfterRemoving = Invoice.removeLineItem(invoice, 1)
    expect(invoiceAfterRemoving.lineItems).toStrictEqual([lineItem1])
    expect(invoiceAfterRemoving.totalAmount).toStrictEqual(new Decimal(10))

    const emptyInvoice = Invoice.removeLineItem(invoiceAfterRemoving, 0)
    expect(emptyInvoice.lineItems).toStrictEqual([])
    expect(emptyInvoice.totalAmount).toStrictEqual(new Decimal(0))
  })

  it("changeLineItem replaces the line item at the given position", () => {
    const { user, product1, product2 } = testData()
    const lineItem1 = LineItem.create(product1, new Decimal(10), 1)
    const lineItem2 = LineItem.create(product2, new Decimal(3), 2)
    let invoice = Invoice.create(user)
    invoice = Invoice.addLineItem(invoice, lineItem1)

    const updatedInvoice = Invoice.changeLineItem(invoice, 0, lineItem2)
    expect(updatedInvoice.lineItems).toStrictEqual([lineItem2])
    expect(updatedInvoice.totalAmount).toStrictEqual(new Decimal(6))
  })
})

function testData() {
  const user = User.create()
  const product1 = Product.create("product1")
  const product2 = Product.create("product2")
  return {
    user,
    product1,
    product2,
  }
}
