import Decimal from "decimal.js"
import LineItem from "@/modules/lineItem"
import User from "@/modules/user"

function parse(data?: Types.Partial<Types.Invoice>): Types.Invoice {
  return {
    id: data!.id || null,
    createdBy: User.parse(data!.createdBy || {}),
    lineItems: data!.lineItems ? data!.lineItems.map(LineItem.parse) : [],
    totalAmount: new Decimal(data!.totalAmount || 0),
  }
}

function calculateTotal(invoice: Types.Invoice): decimal.Decimal {
  return invoice.lineItems
    .map(LineItem.calculateLineTotal)
    .reduce((sum, curr) => sum.plus(curr), new Decimal(0))
}

function setLineItems(
  invoice: Types.Invoice,
  lineItems: Types.LineItem[]
): Types.Invoice {
  const updatedInvoice = {
    ...invoice,
    lineItems,
  }
  return {
    ...updatedInvoice,
    totalAmount: calculateTotal(updatedInvoice),
  }
}

function create(user: Types.User): Types.Invoice {
  return {
    id: null,
    createdBy: user,
    lineItems: [],
    totalAmount: new Decimal(0),
  }
}

function addLineItem(
  invoice: Types.Invoice,
  lineItem: Types.LineItem
): Types.Invoice {
  const lineItems = [...invoice.lineItems, lineItem]
  return setLineItems(invoice, lineItems)
}

function removeLineItem(invoice: Types.Invoice, index: number): Types.Invoice {
  const lineItems = invoice.lineItems.filter((val, i) => i !== index)
  return setLineItems(invoice, lineItems)
}

function changeLineItem(
  invoice: Types.Invoice,
  index: number,
  newLineItem: Types.LineItem
): Types.Invoice {
  const lineItems = invoice.lineItems.map((item, i) =>
    i === index ? newLineItem : item
  )
  return setLineItems(invoice, lineItems)
}

export default {
  parse,
  create,
  addLineItem,
  removeLineItem,
  changeLineItem,
}
