import React, { Fragment, useState, useEffect } from 'react';
import { Card, Button, Table, Divider, Tag, Icon, message } from 'antd'
import { reqRoleList } from '@request/api';


function Role() {

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const atrRender = atr => {
        const colorArr = ["cyan", "blue", "geekblue", "purple"];
        return Object.entries(atr).map((item, index) => {
            return item[1] !== 0 ?
                (
                    <Tag key={item[0]} color={colorArr[index]}>{item[0] + ":" + item[1]}</Tag>
                ) : null;
        })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: "name",
            key: 'name',
            width: '20%',
        },
        {
            title: 'Attribute',
            dataIndex: "attribute",
            key: 'attribute',
            render: atr => (
                (
                    atrRender(atr)
                )
            )
        },
        {
            title: 'Describe',
            dataIndex: "describe",
            key: 'describe',
            width: '35%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <span className="tab-revise-btn">revise</span>
                    <Divider type="vertical" />
                    <span className="tab-delete-btn">delete</span>
                </>
            ),
        },
    ];

    const handleTableChange = event => {
        const { current } = event;
        setPage(current)
    }

    async function getListData() {
        if (loading) return;
        setLoading(true);
        const res = await reqRoleList({
            page: page
        });
        setLoading(false);
        if (res.status === 1) {
            setData([...res.data.list]);
            setPagination({
                total: res.data.total,
                pageSize: 10
            })
        } else {
            message.error(res.text);
        }
    }



    const btnsRender = () => {
        return (
            <Fragment>
                <Button type="primary" className="no-margin-top">
                    <Icon type="plus-circle" /> Add
            </Button>
            </Fragment>
        )
    }

    /* eslint-disable */
    useEffect(() => {
        getListData();
        return () => {

        };
    }, [page]);
    /* eslint-disable */

    return (
        <Card title="Role Management" bordered={false} extra={btnsRender()}>
            <Table className="main-table"
                bordered={false}
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </Card>
    )
}

export default Role;