import React, { useState, useEffect } from 'react';
import { Card, Button, Table, message, DatePicker, Select } from 'antd'
import { reqIncomeList } from '@request/api';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

function Income() {

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const [searchData, setSearchData] = useState(null);
    const [searchStart, setSearchStart] = useState("");
    const [searchEnd, setSearchEnd] = useState("");
    const [searchType, setSearchType] = useState("");

    const columns = [
        {
            title: 'Name',
            dataIndex: "name",
        },
        {
            title: 'Money',
            dataIndex: "number",
            render: text => (
                <span style={{ color: ~~text >= 0 ? 'red' : 'green' }}>{text}</span>
            )
        },
        {
            title: "Source",
            dataIndex: "source",
        },
        {
            title: 'Type',
            dataIndex: "type",
        },
        {
            title: 'Describe',
            dataIndex: "describe",
        },
        {
            title: 'Date',
            dataIndex: "date",
            width: 200,
            render: text => (
                < span > {moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
            ),
        },
    ];

    const handleTableChange = event => {
        const { current } = event;
        setPage(current);
    }

    async function getListData() {
        if (loading) return;
        setLoading(true);

        const res = await reqIncomeList({
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

    function onSearch() {
        setSearchData({
            start: moment(searchStart).format('YYYY-MM-DD'),
            end: moment(searchEnd).format('YYYY-MM-DD'),
            type: searchType
        })
        setPage(1);
    }

    function setRange(value) {
        setSearchStart(value[0]);
        setSearchEnd(value[1]);
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
                        <Select style={{ marginRight: 20, width: 200 }}
                            defaultValue=""
                            value={searchType}
                            onChange={value => setSearchType(value)}>
                            <Option value="">All</Option>
                            <Option value="income">Income</Option>
                            <Option value="expense">Expense</Option>
                        </Select>
                        <RangePicker style={{ marginRight: 20 }} onChange={value => setRange(value)} />
                        <Button type="primary" onClick={onSearch}>Search</Button>
                    </>
                )
            } bordered={false}>
                <Table className="main-table"
                    bordered={false}
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

export default Income;