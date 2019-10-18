import React, { Fragment, useState, useEffect } from 'react';
import { Card, Button, Table, Divider, Icon, message, Modal, Select,Input } from 'antd'
import { reqModelList, reqModelDelete, reqModelInfo } from '@request/api';
import Add from './add';

const { Option } = Select;

function Model() {

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState(null);
    const [title, setTitle] = useState("");

    const [searchData, setSearchData] = useState(null);
    const [typeValue, setTypeValue] = useState("");
    const [searchValue, setSearchValue] = useState("");


    function onSearch() {
        setSearchData({
            value: searchValue,
            type: typeValue
        })
        setPage(1);
    }

    const onDeleteHandler = obj => {
        const id = obj._id;
        Modal.confirm({
            title: 'Are you sure you want to delete it?',
            centered: true,
            onOk() {
                reqModelDelete({
                    ids: id
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

    function onDeleteAll() {
        if (selectedRowKeys.length <= 0) {
            message.info("Please select the data to delete!");
            return false;
        }
        Modal.confirm({
            title: 'Are you sure you want to delete it?',
            centered: true,
            onOk() {
                reqModelDelete({
                    ids: selectedRowKeys.join(',')
                }).then(res => {
                    if (res.status === 1) {
                        message.success(res.text);
                        getListData();
                        setSelectedRowKeys([])
                    } else {
                        message.error(res.text);
                    }
                })
            }
        });
    }

    const onReviseHandler = async obj => {
        const id = obj._id;
        let res = await reqModelInfo({ id });
        if (res.status === 1) {
            setTitle("Revise Model");
            setInfo(res.data);
            setVisible(true);
        } else {
            message.error(res.text);
        }
    }

    const onAddHandler = () => {
        setTitle("Add Model");
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
            title: 'Type',
            dataIndex: "type",
            key: 'type'
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
        const res = await reqModelList({
            page,
            ...searchData
        });
        setLoading(false);
        if (res.status === 1) {
            setData([...res.data.list]);
            setPagination({
                total: res.data.total,
                pageSize: 10,
                current: page
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
                <Button type="danger" className="no-margin-top top-btn" onClick={onDeleteAll}>
                    <Icon type="close-circle" /> Delete
                </Button>
                <Button type="primary" className="no-margin-top top-btn" onClick={onAddHandler}>
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
    }, [page, searchData]);
    /* eslint-disable */

    const rowSelection = {
        type: "checkbox",
        selectedRowKeys,
        onChange: function (selectedRowKeys) {
            setSelectedRowKeys(selectedRowKeys)
        }
    }

    const closeModal = (refresh = true) => {
        if (refresh) getListData();
        setVisible(false)
    }


    return (
        <>
            <Card title={
                (
                    <>
                        <Select defaultValue="" value={typeValue} style={{ width: 150, marginRight: 10 }} onChange={e => setTypeValue(e)}>
                            <Option value="">All</Option>
                            <Option value="statics">Statics</Option>
                            <Option value="dynamic">Dynamic</Option>
                        </Select>
                        <Input value={searchValue} style={{ width: 200, marginRight: 10 }}
                            placeholder="input search text"
                            onChange={e => setSearchValue(e.target.value)}
                        />
                        <Button type="primary" onClick={onSearch}>Search</Button>
                    </>
                )
            } bordered={false} extra={btnsRender()}>
                <Table className="main-table"
                    bordered={false}
                    rowKey="_id"
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange}
                    rowSelection={rowSelection}
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
                afterClose={() => setInfo(null)}
            >

                <Add info={info} closeFn={closeModal}></Add>

            </Modal>
        </>
    )
}

export default Model;