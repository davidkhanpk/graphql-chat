import React from 'react';
import './App.scss';
import ApolloProvider from './apolloProvider';
import { Container } from 'react-bootstrap';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import DynamicRoute from './utils/DynamicRoute';

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
        <Container style={{height: "100%"}}>
          <Switch>
            <DynamicRoute path="/" exact component={Home} authenticated/>
            <DynamicRoute path="/login" exact component={Login} guest/>
            <DynamicRoute path="/register" exact component={Register} guest />
          </Switch>
        </Container>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
