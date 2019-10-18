
import React, { Fragment, useState, useEffect } from 'react';
import { Card, Button, Table, message, Icon, Modal, Input } from 'antd'
import { reqUserList, reqUserInfo } from '@request/api';
import moment from 'moment';
import Set from './set';

function User() {

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState(null);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [searchData, setSearchData] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const rowSelection = {
        type: "radio",
        selectedRowKeys,
        onChange: function (selectedRowKeys) {
            setSelectedRowKeys(selectedRowKeys)
        }
    }

    const columns = [
        {
            title: 'Nickname',
            dataIndex: "nickname",
            key: 'nickname'
        },
        {
            title: 'Avatar',
            dataIndex: "avatar",
            key: 'avatar',
            render: text => {
                return (
                    <img style={{ width: 50, height: 50, objectFit: "cover", cursor: "pointer" }}
                        alt="" src={text}
                        onClick={showPreview.bind(this, text)} />
                )
            }
        },
        {
            title: 'Gender',
            dataIndex: "gender",
            key: 'gender'
        },
        {
            title: 'Email',
            dataIndex: "email",
            key: 'email'
        },
        {
            title: 'Bags',
            dataIndex: "bags",
            key: 'bags',
            align: "center",
            render: text => {
                return text.length <= 0 ? '空' :
                    text.map(item => {
                        return item.name + " ";
                    });
            }
        },
        {
            title: 'Create Date',
            dataIndex: "create_date",
            key: 'create_date',
            width: 180,
            render: text => {
                return (
                    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            }
        }
    ];

    const handleTableChange = event => {
        const { current } = event;
        setPage(current)
    }

    async function getListData() {
        if (loading) return;
        setLoading(true);
        const res = await reqUserList({
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
            });
            setSelectedRowKeys([])
        } else {
            message.error(res.text);
        }
    }

    const btnsRender = () => {
        return (
            <Fragment>
                <Button type="primary"
                    onClick={onSetBags}
                    className="no-margin-top"
                    disabled={selectedRowKeys.length <= 0}>
                    <Icon type="setting" />
                    Set Bags
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

    function onSearch() {
        setSearchData({
            value: searchValue,
        });
        setPage(1);
        setSelectedRowKeys([]);
    }

    function showPreview(src) {
        setPreviewImage(src);
        setPreviewVisible(true)
    }

    function previewHandleCancel() {
        setPreviewVisible(false);
    }

    async function onSetBags() {
        if (selectedRowKeys.length <= 0) return;
        const res = await reqUserInfo({
            id: selectedRowKeys[0]
        });
        if (res.status === 1) {
            setVisible(true);
            setInfo(res.data);
        } else {
            message.error(res.text)
        }
    }

    function closeModal(refresh = true) {
        if (refresh) getListData();
        setVisible(false)
    }

    function modelCloseHandler() {
        setVisible(false)
    }

    return (
        <>
            <Card title={
                <>
                    <Input value={searchValue} style={{ width: 200, marginRight: 10 }}
                        placeholder="input search text"
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    <Button type="primary" onClick={onSearch}>Search</Button>
                </>
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
                title="Set Bags"
                icon={(<Icon type="form" />)}
                centered={true}
                footer={[]}
                onCancel={modelCloseHandler}
                width={720}
                destroyOnClose={true}
                afterClose={() => setInfo(null)}
            >
                {
                    <Set info={info} closeFn={closeModal}></Set>
                }
            </Modal>

            <Modal visible={previewVisible} footer={null} centered onCancel={previewHandleCancel}>
                <img alt="" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}

export default User;