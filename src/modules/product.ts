function create(name: string = "", description: string = ""): Types.Product {
  return {
    name,
    description,
  }
}

export default {
  create,
}
