import React from 'react';
import ReactDOM from 'react-dom';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, from, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { App } from './App';
import { customTheme } from './utils/theme';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token') || null;
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: from([
    authMiddleware,
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    ),
  ]),
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
