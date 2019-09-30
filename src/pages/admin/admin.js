import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import '@less/admin.less'
import LeftNav from '@components/leftNav';
import HeaderNav from '@components/header';

import { Route, Redirect, Switch } from 'react-router-dom';

import Home from '@pages/home/home';
import Income from '@pages/income/income';
import Bar from '@pages/charts/bar';
import Line from '@pages/charts/line';
import Pie from '@pages/charts/pie';
import User from '@pages/data/user';
import Role from '@pages/data/role';
import Prop from '@pages/form/prop';
import Model from '@pages/form/model';

const { Header, Sider, Content } = Layout;

function Admin(props) {
    const { userReducer, history, globalReducer } = props;

    if (!userReducer.info) {
        history.replace("/login")
    }

    useEffect(() => {
        console.log("In admin")
        return () => {
            console.log("Out admin")
        }
    }, [])

    return (
        <Fragment>
            <Layout style={{ height: "100%" }}>
                <Sider className="main-sider" collapsed={globalReducer.isCollapsed}>
                    <LeftNav pathname={props.location.pathname}></LeftNav>
                </Sider>
                <Layout>
                    <Header className="main-header">
                      <HeaderNav></HeaderNav>
                    </Header>
                    <Content className="main-content">
                        <Switch>
                            <Route path="/home" exact component={Home}></Route>
                            <Route path="/income"  exact component={Income}></Route>

                            <Route path="/form/model"  exact component={Model}></Route>
                            <Route path="/form/prop"  exact component={Prop}></Route>

                            <Route path="/data/user"  exact component={User}></Route>
                            <Route path="/data/role"  exact component={Role}></Route>

                            <Route path="/charts/bar"  exact component={Bar}></Route>
                            <Route path="/charts/line"  exact component={Line}></Route>
                            <Route path="/charts/Pie"  exact component={Pie}></Route>

                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    )
}

export default connect((state, props) => Object.assign({}, props, state))(Admin);