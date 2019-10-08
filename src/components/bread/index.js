import React from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import MenuConfig from '@config/menuConfig.json';

function Bread(props) {
    const { history } = props;

    const breadListReader = (list) => {
        let arr = [];
        const path = history.location.pathname;
        list.forEach(item => {

            if (item.key === path) {
                arr.push(
                    <Breadcrumb.Item key={item.key}>
                        {item.title}
                    </Breadcrumb.Item>
                );
            }

            else if (item.children && item.children.length > 0) {
                let children = item.children.find(child => {
                    if (child.key === path) return true;
                    return false;
                });
                if (children) {
                    arr.push(
                        <Breadcrumb.Item key={item.key}>
                            {item.title}
                        </Breadcrumb.Item>
                    );
                    arr.push(
                        <Breadcrumb.Item key={children.key}>
                            {children.title}
                        </Breadcrumb.Item>
                    );
                }
            }
        });
        return arr;
    }

    return (
        <Breadcrumb style={{margin: "18px 22px 18px 22px"}}>
            {
                breadListReader(MenuConfig)
            }
        </Breadcrumb>
    )
}


export default withRouter(Bread);