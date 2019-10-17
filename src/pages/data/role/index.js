import React, { Fragment, useState, useEffect } from 'react';
import { Card, Button, Table, Divider, Tag, Icon, message, Modal } from 'antd'
import { reqRoleList, reqRoleDelete, reqRoleInfo } from '@request/api';
import Add from './add'

function Role() {

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState(null);
    const [title, setTitle] = useState("");

    const atrRender = atr => {
        const colorArr = ["cyan", "blue", "geekblue", "purple"];
        return Object.entries(atr).map((item, index) => {
            return item[1] !== 0 ?
                (
                    <Tag key={item[0]} color={colorArr[index]}>{item[0] + ":" + item[1]}</Tag>
                ) : null;
        })
    }

    const onDeleteHandler = obj => {
        const id = obj._id;
        Modal.confirm({
            title: 'Are you sure you want to delete it?',
            centered: true,
            onOk() {
                reqRoleDelete({
                    id
                }).then(res => {
                    if (res.status === 1) {
                        message.success(res.text);
                        getListData();
                    } else {
                        message.error(res.text);
                    }
                })
            }
        });

    }

    const onReviseHandler = async obj => {
        const id = obj._id;
        let res = await reqRoleInfo({ id });
        if (res.status === 1) {
            setTitle("Revise Role");
            setInfo(res.data);
            setVisible(true);
        } else {
            message.error(res.text);
        }
    }

    const onAddHandler = () => {
        setTitle("Add Role");
        setVisible(true)
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
            width: '30%',
        },
        {
            title: 'Action',
            key: 'action',
            render: text => (
                <>
                    <span className="tab-revise-btn" onClick={onReviseHandler.bind(this, text)}>revise</span>
                    <Divider type="vertical" />
                    <span className="tab-delete-btn" onClick={onDeleteHandler.bind(this, text)}>delete</span>
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
            page
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

    function modelCloseHandler() {
        setVisible(false)
    }

    const btnsRender = () => {
        return (
            <Fragment>
                <Button type="primary" className="no-margin-top" onClick={onAddHandler}>
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

    const closeModal = (refresh = true) => {
        if (refresh) getListData();
        setVisible(false)
    }

    return (
        <>
            <Card title="Role Management" bordered={false} extra={btnsRender()}>
                <Table className="main-table"
                    bordered={false}
                    rowKey="_id"
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange}
                />
            </Card>
            <Modal
                visible={visible}
                title={title}
                icon={(<Icon type="form" />)}
                centered={true}
                footer={[]}
                onCancel={modelCloseHandler}
                width={720}
                destroyOnClose={true}
                afterClose={()=>setInfo(null)}
            >
                <Add info={info} closeFn={closeModal}></Add>
            </Modal>
        </>
    )
}

export default Role;