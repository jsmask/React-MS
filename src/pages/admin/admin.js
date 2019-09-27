import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

function Admin(props) {
    const { userReducer,history } = props;

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
        <>
        <Layout style={{height:"100%"}}>
            <Sider style={{background:"#753a88"}}>Sider</Sider>
            <Layout>
                <Header style={{backgroundImage:"-webkit-gradient(linear,right top,left top,from(#cc2b5e),to(#753a88))"}}>Header</Header>
                <Content>Content</Content>
            </Layout>
        </Layout>
        </>
    )
}

export default connect((state, props) => Object.assign({}, props, state))(Admin);