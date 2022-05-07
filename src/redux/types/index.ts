import { DeepReadonlyArray } from '@tilework/opus'

export type Status = 'idle' | 'pending' | 'failed' | 'success'

export interface Category {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any // type unknown comes from server response
}

export interface CategoryType {
  status: Status
  categories: DeepReadonlyArray<Category>
  current_category: Category // | null
}

export interface Currency {
  label: string
  symbol: string
}

export type CurrencyKeys = (keyof Currency)[]

export interface Price {
  currency: Currency
  amount: number
}

export interface Attribute {
  displayValue: string
  value: string
  id: string
}

export type AttributeKeys = (keyof Attribute)[]

export interface AttributeSet {
  id: string
  name: string
  type: string
  items: Attribute[]
}

export type AttributeSetKeys = (keyof AttributeSet)[]

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

export type ProductKeys = (keyof Product)[]

export interface ProductsType {
  products: DeepReadonlyArray<Product>
  status: Status
}

export interface BaseSliceType {
  currencies: DeepReadonlyArray<Currency>
  currentCurrency: Currency
  status: Status
}
