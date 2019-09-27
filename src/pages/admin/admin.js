import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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
            <h5>Hi~ {userReducer.info && userReducer.info.username}</h5>
        </>
    )
}

export default connect((state, props) => Object.assign({}, props, state))(Admin);