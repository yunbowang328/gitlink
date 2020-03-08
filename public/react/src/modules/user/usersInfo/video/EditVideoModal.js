import React, { useState, useEffect, useContext, useRef, memo } from 'react';
import { Progress, Input, Tooltip, Form } from 'antd'
import { getUrl2, isDev, CBreadcrumb, ActionBtn, ThemeContext, ModalWrapper } from 'educoder'
import axios from 'axios'
const MAX_LENGTH = 30

function EditVideoModal (props) {
    const modalEl = useRef(null);
    const theme = useContext(ThemeContext);
    const { history, videoId, cover_url, title, created_at, isReview, onEditVideo, visible, setVisible,
            form, editSuccess } = props;
    const getFieldDecorator = form.getFieldDecorator
    let username = props.match.params.username
    const _title = form.getFieldsValue().title;

    if(props.CourseUser){
        username = props.CourseUser;
    }

    function toList() {
        history.push(`/users/${username}/videos`)
    }
    function toUpload() {
        history.push(`/users/${username}/videos/upload`)
    }
    function onOk() {
        form.validateFieldsAndScroll((err, values) => {
            
            if (!err) {
                const url = `/users/${username}/videos/${videoId}.json`
                axios.put(url, {
                    title: _title
                }).then((response) => {
                    if (response.data) {
                        onCancel()
                        editSuccess()
                    }
                }).catch((e) => {

                })
            } else {
                // $("html").animate({ scrollTop: $('html').scrollTop() - 100 })
            }
        })

        // setVisible(false)

    }
    function onCancel() {
        setVisible(false)
    }
    useEffect(() => {
        modalEl.current.setVisible(visible)
    }, [visible])
    useEffect(() => {
        visible && form.setFieldsValue({
            title,
        })
    }, [visible])
    return (
        <ModalWrapper 
            ref={modalEl}
            width="600px"
            
            { ...props }
            title={`视频标题编辑`}
            onOk={onOk}
            onCancel={onCancel}
            className="editVideoModal"
        >     <style>
            {
                `
                .exercicenewinputysl .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																		}
                
                `
            }
        </style>
            <Form.Item
                label="视频标题"
                className="title formItemInline"
            >
                
                {getFieldDecorator('title', {
                    rules: [{
                        required: true, message: '请输入标题',
                    }, {
                        max: MAX_LENGTH, message: '最大限制为30个字符',
                    }],
                })(
                    <Input placeholder="" className="titleInput exercicenewinputysl" maxLength={MAX_LENGTH}
                           addonAfter={String(_title ? `${String(_title.length)}/${MAX_LENGTH}` : 0)} />
                )}
            </Form.Item>
        </ModalWrapper>
    )
}
const WrappedEditVideoModal = Form.create({ name: 'editVideoModal' })(EditVideoModal);
export default WrappedEditVideoModal
