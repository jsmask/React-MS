
import React, { Fragment, useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import ReactEcarts from 'echarts-for-react'
import { reqEchartsData } from '@request/api';

function Pie() {
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [title, setTitle] = useState([]);

    useEffect(()=>{
        getData()
    },[])

    async function getData() {
        let res = await reqEchartsData({}, false);

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
        angleAxis: {
            type: 'category',
            data: title,
            z: 10
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}"
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: true, readOnly: false },
                saveAsImage: { show: true }
            }
        },
        color: ['#753a88', '#cc2b5e'],
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: income,
            coordinateSystem: 'polar',
            name: 'Income',
            stack: 'a'
        }, {
            type: 'bar',
            data: expense,
            coordinateSystem: 'polar',
            name: 'Expense',
            stack: 'a'
        }],
        legend: {
            orient: 'vertical',
            x: 'left',
            y:80,
            show: true,
            data: ["Income",'Expense']
        }
    };

    return (
        <Fragment>
            <Card style={{ margin: 20 }}>
                {
                    title.length === 0 ?
                        <Spin size="large" style={{ margin: "150px auto", display: "block" }} /> :
                        <ReactEcarts option={option} style={{ height: 600 }}></ReactEcarts>
                }


            </Card>

        </Fragment>
    )
}

export default Pie;