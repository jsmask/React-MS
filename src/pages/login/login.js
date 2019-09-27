import React, { useState, useEffect } from 'react';
import "@assets/less/login.less"
import { Icon, Input, Button, Checkbox, Form, message } from 'antd';
import { reqLogin } from '@request/api';
import { connect } from 'react-redux';
import { setUserInfo } from '@store/action';
import { setLocalUser } from '@utils/local';

function Login(props) {

    const [checked, setChecked] = useState(true);

    const passwordMinLength = 6;
    const passwordMaxLength = 18;

    useEffect(() => {

        return () => {

        }
    }, [])



    const changeCheckBox = e => {
        setChecked(e.target.checked)
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                const res = await reqLogin(values);
                if (res) {
                    const { status, msg, data } = res;

                    const userinfo = {
                        username:data.username,
                        id:data._id,
                        role:data.role
                    }

                    if(checked) setLocalUser(userinfo);

                    if (status === 1) {
                        props.setUserInfo(userinfo);
                        props.history.replace("/");
                        message.success(msg)
                    } else {
                        message.error(msg)
                    }
                }

            }
        });
    }

    const { getFieldDecorator } = props.form;

    return (

        <div className="login">
            <section className="login-main">
                <h5 className="login-title">
                    React Management System
                </h5>
                <Form className="login-content" onSubmit={handleSubmit}>
                    <Form.Item>
                        {
                            getFieldDecorator("username", {
                                rules: [
                                    { required: true, message: 'Please input your username!' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: "Please enter English or numbers or underlines!" }
                                ],

                            })(
                                <Input className="login-input-item"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username" />
                            )

                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator("password", {
                                rules: [
                                    { required: true, message: 'Please input your password!' },
                                    { min: passwordMinLength, message: "Minimum six digits!" },
                                    { max: passwordMaxLength, message: "Maximum eighteen digits!" },
                                ]
                            })(
                                <Input.Password className="login-input-item" maxLength={passwordMaxLength} minLength={passwordMinLength}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Password" />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Checkbox className="login-checkbox-item" onChange={changeCheckBox} checked={checked}>Remember me</Checkbox>
                        <Button className="login-button-item" htmlType="submit" type="primary" block>Login</Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    )
}

const WrapLogin = Form.create({ name: 'login' })(Login);


export default connect((state, props) => Object.assign({}, props, state), {
    setUserInfo
})(WrapLogin);