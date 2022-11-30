import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Header from './components/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UserInfo/UsersList';
import User from './components/UserInfo/User';
import LandingPage from './components/LandingPage';
import InterfaceContainer from './components/InterfaceContainer';
import CreateQuestion from './components/CreateQuestion';
import EditQuestion from './components/EditQuestion';
import Footer from './components/Footer';

import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <LandingPage/>
        </Route>
        <Route path={`/questions/:questionId/edit`}>
          <EditQuestion/>
        </Route>
        <Route path='/questions/new' exact={true}>
          <CreateQuestion/>
        </Route>
        <Route path='/questions'>
          <InterfaceContainer/>
        </Route>
        <Route path='/answers'>
          <InterfaceContainer/>
        </Route>
        <Route path='/about'>
          <InterfaceContainer/>
        </Route>
        <Route>
          <h1>Hey this page wasn't found, sorry!</h1>
        </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
