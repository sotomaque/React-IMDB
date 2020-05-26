import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/client';

import AuthProvider from './auth';

ReactDOM.render(
    <AuthProvider>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </AuthProvider>
, document.getElementById('root'));
