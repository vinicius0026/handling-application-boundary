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

export default {
  create,
}
