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
    const productFields: Readonly<ProductKeys> = [
      'name',
      'id',
      'inStock',
      'gallery',
      'description',
      'category',
      'brand',
    ]
    const attributesFields: Readonly<AttributeSetKeys> = ['id', 'name', 'type']
    const attributeFields: Readonly<AttributeKeys> = [
      'id',
      'value',
      'displayValue',
    ]

    const query = new Query('category')
      .addArgument('input', 'CategoryInput', {
        title: currentCategory.name,
      })
      .addField(
        new Field('products', true)
          .addFieldList(productFields)
          .addField(
            new Field('attributes', true)
              .addFieldList(attributesFields)
              .addField(new Field('items', true).addFieldList(attributeFields))
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
}

export default new FetchingAPI()
