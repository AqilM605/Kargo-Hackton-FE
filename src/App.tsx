import "bootstrap/dist/css/bootstrap.min.css";
import "styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import Home from "pages";
import GraphQLPage from "pages/example/graphql";

const client = new ApolloClient({
  uri: 'http://localhost:4000/api/graphiql',
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
