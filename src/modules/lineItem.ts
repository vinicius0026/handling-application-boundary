function create(
  product: Types.Product,
  rate: decimal.Decimal,
  quantity: number
): Types.LineItem {
  return {
    product,
    rate,
    quantity,
  }
}

function calculateLineTotal(lineItem: Types.LineItem): decimal.Decimal {
  return lineItem.rate.times(lineItem.quantity)
}

export default {
  create,
  calculateLineTotal,
}
