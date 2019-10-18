
import React, { useEffect, useState } from 'react';
import { TreeSelect, Form, Input, Button, message } from 'antd';
import { reqSetBags } from '@request/api';

const { SHOW_PARENT } = TreeSelect;

const Item = Form.Item;


const treeData = [
    {
        title: '全武器',
        value: 'wq',
        key: 'wq',
        children: [
            {
                title: '剑类',
                value: 'wq01',
                key: 'wq01'
            },
            {
                title: '刀类',
                value: 'wq02',
                key: 'wq02'
            },
            {
                title: '棍类',
                value: 'wq03',
                key: 'wq03'
            },
        ],
    },
    {
        title: '全防具',
        value: 'fj',
        key: 'fj',
        children: [
            {
                title: '头部',
                value: 'fj01',
                key: 'fj01'
            },
            {
                title: '身体',
                value: 'fj02',
                key: 'fj02'
            },
            {
                title: '脚部',
                value: 'fj03',
                key: 'fj03'
            },
        ],
    },
];

function Set(props) {

    const { info, closeFn } = props;

    const [nickname, setNickname] = useState("");
    const [value, setValue] = useState([]);

    useEffect(() => {
        if (info) {
            setNickname(info.nickname);
            setValue(info.bags.map(item => {
                return item.key;
            }));
        }
    }, [info])

    // const nickname = info.nickname || "";
    //

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12, offset: 4 },
    };

    async function check() {
        const res = await reqSetBags({
            id: info.id,
            bags: value.join(',')
        });

        if (res.status === 1) {
            closeFn(true);
            message.success(res.text);
        } else {
            message.error(res.text);
        }
    }

    function close() {
        closeFn(false);
    }

    const tProps = {
        treeData,
        value,
        onChange: onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        searchPlaceholder: 'Please select',
        style: {
            width: "100%",
        },
    };


    function onChange(value) {
        setValue(value);
    };

    return (
        <div>
            <Item {...formItemLayout} label="Nickname">
                <Input value={nickname} disabled readOnly />
            </Item>
            <Item {...formItemLayout} label="Bags">
                <TreeSelect {...tProps} />
            </Item>
            <Item {...formTailLayout}>
                <Button type="primary" onClick={check} style={{ marginRight: 20 }}>Save</Button>
                <Button type="default" htmlType="submit" onClick={close}>Cancel</Button>
            </Item>
        </div>
    )
}

export default Set;