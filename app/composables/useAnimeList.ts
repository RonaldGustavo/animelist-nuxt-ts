import { useNuxtApp } from '#app'
import { gql } from '@apollo/client/core'

export default async function fetchAnimeList(search = 'doraemon', perPage = 20) {
  const app = useNuxtApp()
  const $apollo = app.$apollo
  if (!$apollo) {
    console.error('Apollo client is not available. Make sure you are calling this function on the client side and after plugin initialization.')
    return null
  }
  const query = gql`
    query ($perPage: Int!, $search: String!) {
      Page(perPage: $perPage) {
        media(search: $search, type: ANIME) {
          id
          title {
            english
            romaji
            native
            __typename
          }
          coverImage {
            large
            __typename
          }
          __typename
        }
        __typename
      }
    }
  `
  const variables = { search, perPage }
  const { data } = await $apollo.query({ query, variables })
  return data
}
