import React from 'react';
import ReactDOM from 'react-dom';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';

import { App } from './App';
import { customTheme } from './utils/theme';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include',
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]),
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
