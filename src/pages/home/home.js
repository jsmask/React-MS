import React, { Fragment, useEffect, useState } from 'react';
import { Descriptions, Badge, Tag, Icon, Row, Col } from 'antd';
import { reqHomeInfo } from '@request/api';

function Home() {

    const [addNum, setAddNum] = useState(0);   
    const [totalUser, setTotalUser] = useState(0);
    const [totalIncome, setTotalIncome] = useState("$0");
    const [visitsNum, setVisitsNum] = useState(0);

    async function getHomeInfo() {
        let res = await reqHomeInfo();
        if (res.status === 1) {
            setAddNum(res.data.add_num)
            setTotalIncome(res.data.total_income)
            setTotalUser(res.data.total_user)
            setVisitsNum(res.data.visits_num)
        }
    }

    useEffect(() => {
        getHomeInfo();

        return () => {

        }
    }, [])

    return (
        <Fragment>

            <div className="home-top-cardbox">
                <Row gutter={20} align="middle">
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{ backgroundColor: "#f7a482" }}>
                            <Icon type="user-add" className="home-top-icon" />
                            <h5>Add Users</h5>
                            <h6>{addNum}</h6>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{ backgroundColor: "#96c4e6" }}>
                            <Icon type="usergroup-add" className="home-top-icon" />
                            <h5>Total Users</h5>
                            <h6>{totalUser}</h6>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{ backgroundColor: "#ffb44a" }}>
                            <Icon type="property-safety" className="home-top-icon" />
                            <h5>Total Income</h5>
                            <h6>{totalIncome}</h6>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{ backgroundColor: "#194b5d" }}>
                            <Icon type="global" className="home-top-icon" />
                            <h5>Total Visits</h5>
                            <h6>{visitsNum}</h6>
                        </div>
                    </Col>
                </Row>
            </div>


            <Descriptions title="Project information" bordered style={{ margin: 20 }}>
                <Descriptions.Item label="Product" span={3}>React MS</Descriptions.Item>
                <Descriptions.Item label="Start date" span={3}>2019-09-28</Descriptions.Item>
                <Descriptions.Item label="Completion date" span={3}>-- -- --</Descriptions.Item>
                <Descriptions.Item label="Status" span={3}><Badge status="processing" text="Developing" /></Descriptions.Item>
                <Descriptions.Item label="Main technology" span={3}>
                    <Tag color="#108ee9">React</Tag>
                    <Tag color="#333f50">Rudex</Tag>
                    <Tag color="#2db7f5">antd</Tag>
                    <Tag color="#1db725">Less</Tag>
                    <Tag color="#f26e63">axios</Tag>
                    <Tag color="#f25e23">echarts</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Other Info" span={3}></Descriptions.Item>
            </Descriptions>
        </Fragment>
    )
}

export default Home;