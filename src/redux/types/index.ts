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

export interface AttributeSet {
  id: string
  name: string
  type: string
  items: Attribute[]
}

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

export interface ProductsType {
  products: DeepReadonlyArray<Product>
  status: string
}
