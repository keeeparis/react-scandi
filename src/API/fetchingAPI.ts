import { client, Field, Query } from '@tilework/opus'
import {
  AttributeKeys,
  AttributeSetKeys,
  CurrencySliceType,
  Category,
  CategoryType,
  CurrencyKeys,
  ProductKeys,
  ProductsType,
} from '../redux/types'

/**
 * Class FetchingAPI handles api requests
 */
class FetchingAPI {
  productFields: Readonly<ProductKeys>

  attributesFields: Readonly<AttributeSetKeys>

  attributeFields: Readonly<AttributeKeys>

  constructor() {
    this.productFields = [
      'name',
      'id',
      'inStock',
      'gallery',
      'description',
      'category',
      'brand',
    ]
    this.attributesFields = ['id', 'name', 'type']
    this.attributeFields = ['id', 'value', 'displayValue']
  }

  #createCategoriesQuery() {
    const query = new Query('categories', true).addField(new Field('name'))
    return query
  }

  /**
   * Get categories from API.
   */
  async fetchCategories() {
    const query = this.#createCategoriesQuery()

    const {
      categories,
    }: {
      categories: CategoryType['categories']
    } = await client.post(query)

    return categories
  }

  #createProductsQuery(currentCategory: Category) {
    const query = new Query('category')
      .addArgument('input', 'CategoryInput', {
        title: currentCategory.name,
      })
      .addField(
        new Field('products', true)
          .addFieldList(this.productFields)
          .addField(
            new Field('attributes', true)
              .addFieldList(this.attributesFields)
              .addField(
                new Field('items', true).addFieldList(this.attributeFields)
              )
          )
          .addField(
            new Field('prices', true)
              .addField('amount')
              .addField(
                new Field('currency').addField('label').addField('symbol')
              )
          )
      )
    return query
  }

  /**
   * Get products for current catagory from API.
   */
  async fetchProducts(currentCategory: Category) {
    const query = this.#createProductsQuery(currentCategory)

    const {
      category: { products },
    }: {
      category: { products: ProductsType['products'] }
    } = await client.post(query)

    return products
  }

  #createCurrenciesQuery() {
    const currenciesFields: Readonly<CurrencyKeys> = ['label', 'symbol']
    const query = new Query('currencies', true).addFieldList(currenciesFields)
    return query
  }

  /**
   * Get currencies from API.
   */
  async fetchCurrencies() {
    const query = this.#createCurrenciesQuery()

    const {
      currencies,
    }: {
      currencies: CurrencySliceType['currencies']
    } = await client.post(query)

    return currencies
  }

  #createProductQuery(id: string) {
    const query = new Query('product')
      .addArgument('id', 'String!', id)
      .addFieldList(this.productFields)
      .addField(
        new Field('attributes', true)
          .addFieldList(this.attributesFields)
          .addField(new Field('items', true).addFieldList(this.attributeFields))
      )
      .addField(
        new Field('prices', true)
          .addField('amount')
          .addField(new Field('currency').addField('label').addField('symbol'))
      )

    return query
  }

  /**
   * Get product by Id from API.
   */
  async fetchProductById(id: string) {
    const query = this.#createProductQuery(id)

    const { product } = await client.post(query)
    return product
  }
}

export default new FetchingAPI()
