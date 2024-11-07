import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://54.153.204.110/graphql', // URL of your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;

