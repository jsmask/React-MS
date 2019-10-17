
import React, { useEffect } from 'react';
import { Form, Input, Button, message,Select } from 'antd';
import { reqModelRevise,reqModelAdd } from '@request/api';


const Item = Form.Item;
const { TextArea } = Input;

function Add(props) {

    const { form, closeFn, info } = props;
    const { getFieldDecorator, validateFields } = form;

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
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
        validateFields(async (err, values) => {
            if (!err) {
                let res = info ? await reqModelRevise({ data: values }) : await reqModelAdd({ data: values });
                if (res.status === 1) {
                    message.success(res.text);
                    closeFn();
                } else {
                    message.error(res.text);
                }
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

            <Item {...formItemLayout} label="Type">
                {getFieldDecorator('type', {
                    initialValue: info ? info.type : "",
                    rules: [
                        {
                            required: true,
                            message: "Please select model's type",
                        },
                    ],
                })(
                    <Select style={{width:"100%"}}>
                        <Select.Option value="statics">statics</Select.Option>
                        <Select.Option value="dynamic">dynamic</Select.Option>
                    </Select>
                )}
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
            
            <Item {...formTailLayout}>
                <Button type="primary" onClick={check} style={{ marginRight: 20 }}>Save</Button>
                <Button type="default" htmlType="submit" onClick={close}>Close</Button>
            </Item>
        </div>
    )
}

export default Form.create()(Add);