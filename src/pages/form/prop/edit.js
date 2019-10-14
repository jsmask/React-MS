import React, { } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Card, Button, Select, InputNumber, Switch, Icon, message } from 'antd';
import UploadImages from '@components/uploadImages';
import { reqPropRevise, reqPropAdd } from '@request/api';
import { change0To1 } from '@utils/utils';
import { reqPropDeleteImg } from '../../../request/api';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        sm: { span: 4 },
    },
    wrapperCol: {
        sm: { span: 20 },
    },
};

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12, offset: 4 },
};

function PropEdit(props) {
    const { history, location, form } = props;
    const { query } = location;
    const { page, info, searchData } = query
    const { getFieldDecorator, validateFields } = form;

    const isEdit = query.hasOwnProperty("info");

    function handleSubmit(e) {
        e.preventDefault();
        validateFields(async (err, values) => {
            if (!err) {
                const data = {
                    ...values,
                    status: change0To1(values.status)
                }
                let res = isEdit ? await reqPropRevise({ data }) : await reqPropAdd({ data });
                if (res.status === 1) {
                    message.success(res.text);
                    goBack();
                } else {
                    message.error(res.text);
                }
            }
        });
    }

    function goBack() {
        history.replace({
            pathname: "/form/prop",
            query: {
                page,
                searchData
            }
        })
    }

    return (
        <div>
            <Card style={{ margin: 20 }}
                title={isEdit ? 'Edit Prop' : 'Add Prop'}
                extra={<Button type="link" onClick={goBack}>Back</Button>}
            >
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Item {...formItemLayout} label="name">
                        {getFieldDecorator('name', {
                            initialValue: isEdit ? info.name : "",
                            rules: [{ required: true, message: "Please input prop's name!" }],
                        })(
                            <Input placeholder="Please input prop's name!" />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Type">
                        {getFieldDecorator('type', {
                            initialValue: isEdit ? info.type : "",
                            rules: [{ required: true, message: "Please select prop's type!" }],
                        })(
                            <Select>
                                <Option value="Armor">Armor</Option>
                                <Option value="Weapon">Weapon</Option>
                                <Option value="Medicine">Medicine</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="price">
                        {getFieldDecorator('price', {
                            initialValue: isEdit ? info.price : "",
                            rules: [{ required: true, message: "Please input prop's price!" }],
                        })(
                            <InputNumber
                                style={{ width: 200 }} min={1} max={999999}
                                placeholder="Please input prop's price!"

                            />
                        )}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="image">
                        <UploadImages isEdit={isEdit} query={info} deleteFn={reqPropDeleteImg} />
                    </Form.Item>


                    <Form.Item {...formItemLayout} label="status">
                        {getFieldDecorator('status', {
                            valuePropName: "checked",
                            initialValue: isEdit && info.status === 0 ? false : true
                        })(
                            <Switch
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="close" />}
                            />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="describe">
                        {getFieldDecorator('describe', {
                            initialValue: isEdit ? info.describe : ""
                        })(
                            <TextArea placeholder="Please input role's describe" autosize={{ minRows: 3, maxRows: 3 }} />
                        )}
                    </Form.Item>
                    <Form.Item {...formTailLayout} label="">
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Form.create()(withRouter(PropEdit));