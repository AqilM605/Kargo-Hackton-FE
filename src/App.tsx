import "bootstrap/dist/css/bootstrap.min.css";
import "styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from "pages";
import GraphQLPage from "pages/example/graphql";
import GraphQLPage2 from "pages/example/graphql2";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/api/graphiql',
  // uri: 'https://another-massive-boilweevil.gigalixirapp.com',
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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <GraphQLPage />
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
