import React from 'react';
import './App.scss';
import ApolloProvider from './apolloProvider';
import { Container } from 'react-bootstrap';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <ApolloProvider>
      <BrowserRouter>
      <Container className="pt-5">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
