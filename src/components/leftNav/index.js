
import React, { useEffect } from 'react';
import '@less/left-nav.less';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { setMenuCollapsed } from '@store/action';
const { SubMenu } = Menu;

function LeftNav(props) {
    const { setMenuCollapsed, globalReducer } = props;

    useEffect(() => {
        return () => {

        }
    }, [])

    const changeCollapsed = () => {
        setMenuCollapsed(!globalReducer.isCollapsed);
    }

    return (
        <div className="left-nav">

            <Icon onClick={changeCollapsed} className="left-nav-close" type={!globalReducer.isCollapsed ? "left" : "right"} />

            <div className="left-nav-title">
                <i className="logo-icon"></i>
                React MS
            </div>


            <div className="left-nav-menu-box">
                <Menu mode="inline" theme="dark">
                    <Menu.Item key="1">
                        <Icon type="bank" />
                        <span>Home</span>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <Icon type="account-book" />
                        <span>Income</span>
                    </Menu.Item>

                    <SubMenu key="3"
                        title={
                            <span>
                                <Icon type="profile" />
                                <span>Form</span>
                            </span>
                        }
                    >
                        <Menu.Item key="3-1">Model</Menu.Item>
                        <Menu.Item key="3-2">Prop</Menu.Item>
                    </SubMenu>

                    <SubMenu key="4"
                        title={
                            <span>
                                <Icon type="database" />
                                <span>Data</span>
                            </span>
                        }
                    >
                        <Menu.Item key="4-1">User</Menu.Item>
                        <Menu.Item key="4-2">Role</Menu.Item>
                    </SubMenu>

                    <SubMenu key="5"
                        title={
                            <span>
                                <Icon type="pie-chart" />
                                <span>Charts</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5-1">Bar</Menu.Item>
                        <Menu.Item key="5-2">Line</Menu.Item>
                        <Menu.Item key="5-3">Pie</Menu.Item>
                    </SubMenu>
                </Menu>

            </div>

        </div>
    )
}

export default connect((state, props) => Object.assign({}, props, state), {
    setMenuCollapsed
})(LeftNav);