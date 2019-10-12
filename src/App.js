import React, { useEffect, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import Loading from '@components/Loading';

import { Login, Error, Admin } from '@config/pageComponents';


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
