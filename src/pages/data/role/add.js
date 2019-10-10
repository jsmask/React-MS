
import React, { useEffect } from 'react';
import { Form, Input, Button, Slider, message } from 'antd';
import { reqRoleRevise } from '@request/api';


const Item = Form.Item;
const { TextArea } = Input;

function Add(props) {

    const { form, closeFn, info } = props;
    const { getFieldDecorator, validateFields } = form;

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const formItemLayout2 = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
    };

    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12, offset: 4 },
    };

    useEffect(() => {
        
        return () => {

        }
    }, [])

    function check() {
        validateFields((err, values) => {
            if (!err) {
                reqRoleRevise({
                    data: values
                }).then(res => {
                    if (res.status === 1) {
                        message.success(res.text);
                        closeFn();
                    } else {
                        message.error(res.text);
                    }
                })
            }
        });
    }

    function close() {
        closeFn();
    }

    return (
        <div>
            <Item {...formItemLayout} label="Name">
                {getFieldDecorator('name', {
                    initialValue: info ? info.name : "",
                    rules: [
                        {
                            required: true,
                            message: "Please input role's name",
                        },
                    ],
                })(<Input placeholder="Please input role's name" />)}
            </Item>
            <Item {...formItemLayout} label="Describe">
                {getFieldDecorator('describe', {
                    initialValue: info ? info.describe : "",
                    rules: [
                        {
                            required: true,
                            message: "Please input role's describe",
                        },
                    ],
                })(<TextArea placeholder="Please input role's describe" autosize={{ minRows: 3, maxRows: 3 }} />)}
            </Item>
            <Item {...formItemLayout2} label="ATK">
                {getFieldDecorator('ATK', { initialValue: info ? info.attribute.ATK : 0 })(
                    <Slider
                        max={10}
                        min={-10}
                        tooltipVisible={true}
                        marks={{
                            "-10": -10,
                            "-5": -5,
                            "0": 0,
                            "5": 5,
                            "10": 10
                        }}
                    />,
                )}
            </Item>
            <Item {...formItemLayout2} label="DEF">
                {getFieldDecorator('DEF', { initialValue: info ? info.attribute.DEF : 0 })(
                    <Slider
                        max={10}
                        min={-10}
                        tooltipVisible={true}
                        marks={{
                            "-10": -10,
                            "-5": -5,
                            "0": 0,
                            "5": 5,
                            "10": 10
                        }}
                    />,
                )}
            </Item>
            <Item {...formItemLayout2} label="SPD">
                {getFieldDecorator('SPD', { initialValue: info ? info.attribute.SPD : 0 })(
                    <Slider
                        max={10}
                        min={-10}
                        tooltipVisible={true}
                        marks={{
                            "-10": -10,
                            "-5": -5,
                            "0": 0,
                            "5": 5,
                            "10": 10
                        }}
                    />,
                )}
            </Item>
            <Item {...formItemLayout2} label="LUCK">
                {getFieldDecorator('LUCK', { initialValue: info ? info.attribute.LUCK : 0 })(
                    <Slider
                        max={10}
                        min={-10}
                        tooltipVisible={true}
                        marks={{
                            "-10": -10,
                            "-5": -5,
                            "0": 0,
                            "5": 5,
                            "10": 10
                        }}
                    />,
                )}
            </Item>
            <Item {...formTailLayout}>
                <Button type="primary" onClick={check} style={{ marginRight: 20 }}>Save</Button>
                <Button type="default" htmlType="submit" onClick={close}>Close</Button>
            </Item>
        </div>
    )
}

export default Form.create()(Add);