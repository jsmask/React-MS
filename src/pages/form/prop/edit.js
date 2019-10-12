import React from 'react';
import { withRouter } from 'react-router-dom';

function PropEdit(props) {
    const { history, location } = props;
    const { query } = location;
    console.log(history, query)
    return (
        <>
            <h2>edit</h2>
        </>
    )
}

export default withRouter(PropEdit);