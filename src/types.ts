export type ValueOf<T> = T[keyof T]
export type KeyofOnlyString<T> = keyof T & string
