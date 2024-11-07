import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // URL of your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;

