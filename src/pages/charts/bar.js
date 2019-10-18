
import React, { Fragment, useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import ReactEcarts from 'echarts-for-react'
import { reqEchartsData } from '@request/api';

function Bar() {

    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [title, setTitle] = useState([]);

    useEffect(()=>{
        getData()
    },[])

    async function getData() {
        let res = await reqEchartsData({},false);

        if (res.status === 1) {
            const { income, expense, title } = res.data;
            setIncome(income);
            setExpense(expense);
            setTitle(title)
        }

    }

    const option = {
        title: {
            text: 'Income and expenditure statistics',
            subtext: 'For reference only'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['income', 'expense']
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: true, readOnly: false },
                saveAsImage: { show: true }
            }
        },
        color: ['#753a88', '#cc2b5e'],
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: title
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'income',
                type: 'bar',
                data: income,
                markPoint: {
                    data: [
                        { type: 'max', name: 'maximum' },
                        { type: 'min', name: 'minimun' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: 'average' }
                    ]
                }
            },
            {
                name: 'expense',
                type: 'bar',
                data: expense,
                markPoint: {
                    data: [
                        { type: 'max', name: 'maximum' },
                        { type: 'min', name: 'minimun' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: 'average' }
                    ]
                }
            }
        ]
    };

    return (
        <Fragment>
            <Card style={{ margin: 20 }}>
                {
                    title.length === 0 ?
                        <Spin size="large" style={{margin:"150px auto",display:"block"}} /> :
                        <ReactEcarts option={option} style={{ height: 600 }}></ReactEcarts>
                }
            </Card>

        </Fragment>
    )
}

export default Bar;