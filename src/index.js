import React from 'react';
import ReactDOM from 'react-dom';
import '@css/index.css';
import '@css/reset.css';
import App from './App';
import { Provider } from 'react-redux'
import store from '@store/store'
import { BrowserRouter as Router } from 'react-router-dom';
import { getLocalUser } from '@utils/local';
import { setUserInfo } from '@store/action';

import * as serviceWorker from './serviceWorker';

const localUser = getLocalUser();
if (localUser) {
    store.dispatch(setUserInfo(localUser));
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
