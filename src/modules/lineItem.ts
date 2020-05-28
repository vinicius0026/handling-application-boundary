import Decimal from "decimal.js"
import Product from "@/modules/product"

function parse(data?: Types.Partial<Types.LineItem>): Types.LineItem {
  return {
    product: Product.parse(data!.product || {}),
    rate: new Decimal(data!.rate || 0),
    quantity: data!.quantity || 0,
  }
}

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
  parse,
}
