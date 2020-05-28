function create(name: string = "", description: string = ""): Types.Product {
  return {
    name,
    description,
  }
}

function parse(data?: Types.Partial<Types.Product>): Types.Product {
  return {
    name: data!.name || "",
    description: data!.description || "",
  }
}

export default {
  create,
  parse,
}
