import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

// interface RequestData {}

// interface Response {}

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: graphqlRequestBaseQuery({
    url: 'http://localhost:4000/',
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        document: gql`
          query {
            categories {
              name
            }
          }
        `,
        variables: {},
      }),
    }),
  }),
})

export const { useGetCategoriesQuery } = mainApi
