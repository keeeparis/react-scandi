query examples:

Get categories:

```
const categoriesQuery = new Query('categories', true).addField(
    new Field('name')
)

const { categories } = await client.post(categoriesQuery)
```

Get Product in selected Category:

```
const newQuery = new Query('category')
    .addArgument('input', 'CategoryInput', {
        title: input,
    })
    .addField(new Field('products', true).addField('name'))

const { category: { products } } = await client.post(newQuery)
```
