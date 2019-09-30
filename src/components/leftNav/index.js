
import React, { useEffect } from 'react';
import '@less/left-nav.less';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { setMenuCollapsed } from '@store/action';
import MenuConfig from "@config/menuConfig.json"

const { SubMenu, Item } = Menu;

function LeftNav(props) {
    const { setMenuCollapsed, globalReducer } = props;

    console.log(MenuConfig)

    useEffect(() => {
        return () => {

        }
    }, [])

    const changeCollapsed = () => {
        setMenuCollapsed(!globalReducer.isCollapsed);
    }

    const createMenuItem=(obj)=>{
        const { key, icon, title, children } = obj;

        return (
            children&&children.length>0?
            <SubMenu key={key}
                title={
                    <span>
                        <Icon type={icon} />
                        <span>{title}</span>
                    </span>
                }
            >
            {
                children.map(child =>createMenuItem(child))
            }
            </SubMenu>
            :
            <Item key={key}>
                <Link to={key} replace>
                    {
                        icon&&icon!==""?<Icon type={icon} />:null
                    }
                    <span>{title}</span>
                </Link>
            </Item>
        )
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

                    {
                        MenuConfig.map(item => {
                            return createMenuItem(item)
                        })
                    }

                </Menu>

            </div>

        </div>
    )
}

export default connect((state, props) => Object.assign({}, props, state), {
    setMenuCollapsed
})(LeftNav);