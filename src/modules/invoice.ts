import Decimal from "decimal.js"

function create(user: Types.User): Types.Invoice {
  return {
    createdBy: user,
    lineItems: [],
    totalAmount: new Decimal(0),
  }
}

function addLineItem(
  invoice: Types.Invoice,
  lineItem: Types.LineItem
): Types.Invoice {
  // TODO: implement
  return invoice
}

function removeLineItem(invoice: Types.Invoice, index: number): Types.Invoice {
  // TODO: implement
  return invoice
}

function changeLineItem(
  invoice: Types.Invoice,
  index: number,
  lineItem: Types.LineItem
): Types.Invoice {
  // TODO: implement
  return invoice
}

export default {
  create,
  addLineItem,
  removeLineItem,
  changeLineItem,
}
