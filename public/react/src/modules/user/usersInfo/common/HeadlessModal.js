import React, { useState, useEffect, useContext, useRef, memo } from 'react';
import {Link} from 'react-router-dom';

import { getUrl2, isDev, ThemeContext } from 'educoder'
import { Modal } from 'antd'


function HeadlessModal (props) { 
    // const [ visible, setVisible ] = useState(false)
    const theme = useContext(ThemeContext);
    const { category, visible, setVisible, className, width } = props;
    
    
    useEffect(() => {

    }, [])

    return (
        <Modal 
            visible={visible}
            className={`headless ${className}`}
            title={null}
            footer={null}
            width={width}
        >
            <style>{`
                .headless .ant-modal-close {
                    display:none;
                }
                .headless .ant-modal-body {
                    padding: 0px;
                }
                .headless .closeBtn {
                    position: absolute;
                    color: ${theme.foreground_select};
                    top: -8px;
                    right: -10px;
                    font-size: 24px !important;
                    background: #fff;
                    width: 14px;
                    height: 8px;
                    margin-right: 0px;
                    z-index: 9;
                }
                .headless .icon-htmal5icon19:before {
                    left: -4px;
                    position: absolute;
                    top: -13px;
                }
            `}</style>
            <i className="iconfont icon-htmal5icon19 closeBtn" onClick={ () => setVisible(false) }></i>
            {props.children}
        </Modal>
    )
}

export default HeadlessModal
