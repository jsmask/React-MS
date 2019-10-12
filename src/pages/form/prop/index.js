import React from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import PropList from './prop';
import PropEdit from './edit';

function Prop() {
    return (
        <Router>
            <Switch>
                <Route path="/form/prop" component={PropList} exact></Route>
                <Route path="/form/prop/edit" component={PropEdit}></Route>
                <Redirect to="/form/prop/edit"></Redirect>
            </Switch>
        </Router>
    )
}

export default Prop;