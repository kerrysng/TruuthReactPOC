import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: process.env.REACT_APP_OKTA_ORG_URL + '/oauth2/default',
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
});

const Home = () => <h1>Home Page</h1>;
const Protected = () => <h1>Protected Page</h1>;

const Login = () => {
  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };
  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Login with Okta</button>
    </div>
  );
};

const App = () => (
  <Router>
    <Security oktaAuth={oktaAuth}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login/callback' element={<LoginCallback />} />
        <Route path='/protected' element={<SecureRoute><Protected /></SecureRoute>} />
      </Routes>
    </Security>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

export default App;


