import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const httpEndpoint = 'https://graphql.anilist.co'

export default defineNuxtPlugin(() => {
  const apolloClient = new ApolloClient({
    uri: httpEndpoint,
    cache: new InMemoryCache(),
  })

  return {
    provide: {
      apollo: apolloClient,
    },
  }
})
