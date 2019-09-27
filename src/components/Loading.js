import React from 'react'
import { Spin, Icon } from 'antd';

function Loading() {
    return (
        <div className="loading-white-mask">
            <Spin className="loading" tip="Loading..." indicator={<Icon type="loading" style={{ fontSize: 42 }} spin />} />
        </div>
    )
}

export default Loading;