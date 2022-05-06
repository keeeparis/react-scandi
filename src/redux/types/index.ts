import { DeepReadonlyArray } from '@tilework/opus'

export interface Category {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any // type unknown comes from server response
}

export interface CategoryType {
  status: string
  categories: DeepReadonlyArray<Category>
  current_category: Category // | null
}

export interface Currency {
  label: string
  symbol: string
}

export interface Price {
  currency: Currency
  amount: number
}

export interface Attribute {
  displayValue: string
  value: string
  id: string
}
/* TODO: */
export type a = (keyof Attribute)[]

export interface AttributeSet {
  id: string
  name: string
  type: string
  items: Attribute[]
}
/* TODO: */
export type b = (keyof AttributeSet)[]

export interface Product {
  id: string
  name: string
  inStock: boolean
  gallery: DeepReadonlyArray<string>
  description: string
  category: string
  attributes: DeepReadonlyArray<AttributeSet>
  prices: DeepReadonlyArray<Price>
  brand: string
}
/* TODO: */
export type c = (keyof Product)[]

export interface ProductsType {
  products: DeepReadonlyArray<Product>
  status: string
}
