namespace Types {
  export type Partial<T> = {
    [P in keyof T]?: T[P] | null
  }
}
