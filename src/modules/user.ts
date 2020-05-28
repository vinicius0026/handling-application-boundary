function create(name: string = "", avatar: string = ""): Types.User {
  return {
    name,
    avatar,
  }
}

function parse(data?: Types.Partial<Types.User>): Types.User {
  return {
    name: data!.name || "",
    avatar: data!.avatar || "",
  }
}

export default {
  create,
  parse,
}
