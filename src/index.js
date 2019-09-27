import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/reset.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from '@store/store'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getLocalUser } from '@utils/local';
import { setUserInfo } from '@store/action';

const localUser = getLocalUser();
if (localUser) {
    store.dispatch(setUserInfo(localUser));
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
