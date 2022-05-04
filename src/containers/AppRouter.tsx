import React, { useEffect, useState } from 'react'
import { Query, Field, client } from '@tilework/opus'

client.setEndpoint('http://localhost:4000/')

const AppRouter = () => {
  const [categoryList, setCategoryList] = useState<any>()
  const [data, setData] = useState<any>([])

  const categoriesQuery = new Query('categories', true).addField(
    new Field('name')
  )

  const handleDataRequest = (input: string) => async () => {
    const newQuery = new Query('category')
      .addArgument('input', 'CategoryInput', {
        title: input,
      })
      .addField(new Field('products', true).addField('name'))

    const {
      category: { products },
    } = await client.post(newQuery)

    setData(products)
  }

  useEffect(() => {
    const fetch = async () => {
      const { categories } = await client.post(categoriesQuery)
      setCategoryList(categories)
    }
    fetch()
  }, [])

  return (
    <div>
      {categoryList &&
        categoryList.map((el: any) => <div key={el.name}>{el.name}</div>)}
      <div>
        <button type="button" onClick={handleDataRequest('all')}>
          Все
        </button>
        <button type="button" onClick={handleDataRequest('clothes')}>
          Вещи
        </button>
        <button type="button" onClick={handleDataRequest('tech')}>
          Гаджеты
        </button>
        {data.length
          ? data.map((el: any) => <div key={el.name}>{el.name}</div>)
          : null}
      </div>
    </div>
  )
}

export default AppRouter
