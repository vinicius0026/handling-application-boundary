function create(name: string = "", avatar: string = ""): Types.User {
  return {
    name,
    avatar,
  }
}

export default {
  create,
}
