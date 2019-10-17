import React, { Fragment, useState, useEffect } from 'react';
import { Card, Button, Table, Divider, Icon, message, Input, Select, Switch } from 'antd'
import { reqPropList, reqPropChangeStatus, reqPropDelete, reqPropInfo } from '@request/api';
import { queryOArr, change0To1 } from '@utils/utils';
import { withRouter } from 'react-router-dom';

const { Option } = Select;

function PropList(props) {

    const { history, location } = props;

    const historyPage = location && location.query ? location.query.page : 1;
    const historySearchData = location && location.query ? location.query.searchData : null;
    const historySearchValue = historySearchData ? historySearchData["value"] : "";
    const historySearchType = historySearchData ? historySearchData["type"] : "";

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(historyPage);
    const [data, setData] = useState([]);

    const [searchData, setSearchData] = useState(null);
    const [typeValue, setTypeValue] = useState(historySearchValue);
    const [searchValue, setSearchValue] = useState(historySearchType);

    const btnsRender = () => {
        return (
            <Fragment>
                <Button type="primary" className="no-margin-top" onClick={onEditProp.bind(this, null)}>
                    <Icon type="plus-circle" /> Add
                </Button>
            </Fragment>
        )
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: "name",
            key: 'name',
            width: 150
        },
        {
            title: 'Image',
            dataIndex: "image",
            key: 'image',
            width: 100,
            render: text => (
                <img style={{ width: 50, height: 50, objectFit: "cover" }} src={text} alt="" />
            )
        },
        {
            title: 'Price',
            dataIndex: "price",
            key: 'price',
            render: text => (
                `￥${text}`
            )
        },
        {
            title: 'Type',
            dataIndex: "type",
            key: 'type'
        },
        {
            title: 'Status',
            dataIndex: "status",
            key: 'status',
            render: (text, obj) => (
                <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="close" />}
                    checked={text === 1 ? true : false}
                    onChange={statusChange.bind(this, obj)}
                />
            )
        },
        {
            title: 'Describe',
            dataIndex: "describe",
            key: 'describe',
            width: '20%',
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: obj => (
                <>
                    <span className="tab-revise-btn" onClick={onEditProp.bind(this, obj)}>revise</span>
                    <Divider type="vertical" />
                    <span className="tab-delete-btn" onClick={deleteProp.bind(this, obj)}>delete</span>
                </>
            ),
        },
    ];

    const handleTableChange = event => {
        const { current } = event;
        setPage(current);
    }

    async function deleteProp(obj) {
        if (loading) return;
        setLoading(true);
        const res = await reqPropDelete({
            id: obj._id
        }, false);
        if (res.status === 1) {
            message.success(res.text);
        } else {
            message.error(res.text);
        }
        setLoading(false);
        getListData();
    }

    async function getListData() {
        if (loading) return;
        setLoading(true);

        const res = await reqPropList({
            page,
            ...searchData
        });
        setLoading(false);
        if (res.status === 1) {
            setData([...res.data.list]);
            setPagination({
                total: res.data.total,
                pageSize: 5,
                current: page
            })
        } else {
            message.error(res.text);
        }
    }

    function statusChange(obj) {
        if (loading) return;
        setLoading(true);
        const status = change0To1(obj.status)
        reqPropChangeStatus({
            id: obj._id,
            status
        }).then(res => {
            let _arr = queryOArr(data, "_id", obj);
            if (res.status === 1) {
                message.success(res.text);
                _arr[0].obj.status = status;
            } else {
                message.error(res.text);
                _arr[0].obj.status = change0To1(status);
            }
            setLoading(false);
        })
    }

    async function onEditProp(obj) {
        if (!obj) {
            history.replace({
                pathname: "/form/prop/edit",
                query: {
                    page,
                    searchData
                }
            });
            return false;
        }
        let res = await reqPropInfo({
            id: obj._id,
        });
        if (res.status !== 1) {
            message.error(res.text);
            return false;
        }
        history.replace({
            pathname: "/form/prop/edit",
            query: {
                page,
                searchData,
                info: res.data
            }
        });
    }

    function onSearch() {
        setSearchData({
            value: searchValue,
            type: typeValue
        })
        setPage(1);
    }



    /* eslint-disable */
    useEffect(() => {
        getListData();
        return () => {

        };
    }, [page, searchData]);
    /* eslint-disable */

    return (
        <>
            <Card title={
                (
                    <>
                        <Select defaultValue="" value={typeValue} style={{ width: 150, marginRight: 10 }} onChange={e => setTypeValue(e)}>
                            <Option value="">All</Option>
                            <Option value="Armor">Armor</Option>
                            <Option value="Weapon">Weapon</Option>
                            <Option value="Medicine">Medicine</Option>
                            <Option value="Other">Other</Option>
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
                />
            </Card>
        </>
    )
}

export default withRouter(PropList);