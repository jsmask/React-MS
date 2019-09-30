import React, { useEffect,Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
import Error from './pages/error/error';
import { connect } from 'react-redux'
import Loading from '@components/Loading';


function App(props) {
  let isLoading = props.globalReducer.isLoading;


  useEffect(() => {

    return () => {

    }
  }, []);

  return (
    <Fragment>
      <Switch>
        
        <Route path="/login" component={Login} />

        <Route path="/404" exact component={Error} />

        <Route path="/" component={Admin} />

        

      </Switch>
      {
        isLoading ? <Loading /> : null
      }
    </Fragment>
  );
}

export default connect((state, props) => Object.assign({}, props, state))(App);
