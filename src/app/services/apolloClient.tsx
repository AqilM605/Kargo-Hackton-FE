import { ApolloClient, createHttpLink, InMemoryCache, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`, networkError);
});

const httpLink = createHttpLink({
  // uri: 'http://localhost:4000/api/graphql',
  // uri: 'http://localhost:4000/api/graphiql',
  uri: 'https://another-massive-boilweevil.gigalixirapp.com/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: concat(errorLink, concat(authLink, httpLink)),
  cache: new InMemoryCache(),
});

export default client;
