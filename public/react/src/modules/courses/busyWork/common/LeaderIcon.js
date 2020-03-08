import React,{Component} from "react";

export default function LeaderIcon(props = {}) {
    let icon = null;
    const { className, style } = props;
    const _className = `font-8 blueFull Actionbtn ${className}`
    if (props.small) {
        icon = <div className={_className} style={{
            height: '14px',
            'line-height': '14px',
            // width: '24px',
            transform: 'scale(0.833)',
            padding: '0px 5px',
            'margin-top': '-2px',
            'margin-left': '2px',
            'vertical-align': 'middle', }}>组长</div>
    } else {
        icon = <div className={_className} style={{ height: '16px', 'line-height': '16px', transform: 'scale(0.833)'}}>组长</div>

    }
    return icon
}
