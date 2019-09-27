import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
import { connect } from 'react-redux'
import Loading from '@components/Loading';

function App(props) {
  let isLoading = props.globalReducer.isLoading;


  useEffect(() => {

    return () => {

    }
  }, []);

  return (
    <>
      <Switch>
        <Route path="/" exact component={Admin} />
        <Route path="/login" component={Login} />
      </Switch>
      {
        isLoading ? <Loading /> : null
      }
    </>
  );
}

export default connect((state, props) => Object.assign({}, props, state))(App);
