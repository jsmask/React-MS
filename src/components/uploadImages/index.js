

import React, { useState } from 'react';
import { getBase64 } from '@utils/utils';
import { IMAGESURL } from '@config/config';
import { Upload, Modal, message, Icon } from 'antd';

function UploadImages(props) {

    const { isEdit, query, deleteFn } = props;

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const [fileList, setFileList] = useState(isEdit ? [{
        uid: -1,
        name: 'image.png',
        status: 'done',
        url: query.image
    }] : []);

    async function handlePreview(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewVisible(true);
        setPreviewImage(file.url || file.preview);
    }

    function handleCancel() {
        setPreviewVisible(false);
    }


    async function handleChange({ file, fileList }) {
        if (file.status === "removed") {
            let res = await deleteFn({ file })
            if (res.status !== 1) {
                message.error(res.text)
            } else {
                setFileList(fileList);
            }
        }
        if (file.status === 'done') {
            const result = file.response;
            if (result.status === 1) {
                setFileList([{ uid: -1, ...result.data }]);
            } else {
                message.error(result.text)
            }
        }
        if (file.status === 'uploading') {
            setFileList(fileList);
        }
    }


    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }


    return (
        <>
            <Upload
                action={IMAGESURL}
                listType="picture-card"
                fileList={fileList}
                showUploadList={true}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
            >
                {
                    fileList.length >= 1 ? null : (
                        <div>
                            <Icon type="plus" style={{ fontSize: 24 }} />
                            <div style={{ marginTop: 8, color: "#666" }}>Upload</div>
                        </div>
                    )
                }
            </Upload>
            <Modal visible={previewVisible} footer={null} centered onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}

export default UploadImages;
