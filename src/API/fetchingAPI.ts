import { client, Field, Query } from '@tilework/opus'
import { Category, CategoryType, ProductsType, a, b, c } from '../redux/types'

/* Class FetchingAPI => in order to handle api request functions */
class FetchingAPI {
  #createCategoriesQuery() {
    const query = new Query('categories', true).addField(new Field('name'))
    return query
  }

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
    /* TODO: better naming of readonly types */
    /* TODO: exclude non-primitive types */
    const productFields: Readonly<c> = [
      'name',
      'id',
      'inStock',
      'gallery',
      'description',
      'category',
      'brand',
    ]
    const attributesFields: Readonly<b> = ['id', 'name', 'type']
    const attributeFields: Readonly<a> = ['id', 'value', 'displayValue']

    const query = new Query('category')
      .addArgument('input', 'CategoryInput', {
        title: currentCategory,
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

  async fetchProducts(currentCategory: Category) {
    const query = this.#createProductsQuery(currentCategory)

    const {
      category: { products },
    }: {
      category: { products: ProductsType['products'] }
    } = await client.post(query)

    return products
  }
}

export default new FetchingAPI()
