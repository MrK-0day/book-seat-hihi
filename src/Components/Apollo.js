import ApolloClient from 'apollo-boost'

export const Client = new ApolloClient({
  uri: 'http://172.16.10.134:4000/graphql'
})
