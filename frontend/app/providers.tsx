// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: (process.env.API_URL || 'http://localhost:8000') + '/graphql',
  cache: new InMemoryCache(),
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
  <ApolloProvider client={client}>
    <ChakraProvider>{children}</ChakraProvider>
  </ApolloProvider>
  )
}
