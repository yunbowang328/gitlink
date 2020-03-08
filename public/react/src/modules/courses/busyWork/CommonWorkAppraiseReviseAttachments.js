import React, { useState }  from 'react'
import moment from 'moment'
// import Example from './TestHooks'
function CommonWorkAppraiseReviseAttachments(props) {
    const { revise_attachments, revise_reason, atta_update_time, atta_update_user} = props
    if (!revise_attachments) return ''
    return (
        <React.Fragment>
        {/* {Example()} */}
        {revise_attachments.length===0?"":<div className={"stud-class-set bor-top-greyE padding20-30 edu-back-white"}>
            <style>{`
            .color-grey:hover i {
                display: inline !important;
            }
            `}</style>
            <div className={"color-grey-6 mb10 font-16"}>
            补交附件
            </div>
            
            {/* {age} */}

            <div className={"ml20"}>
            {revise_reason}
            </div>
            {revise_attachments.map((item,key)=>{
            return(
                <div className="color-grey" key={key}>
                <a className="color-grey ml20">
                    <i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>
                </a>
                <a href={item.url}
                    className="mr12 color9B9B imageTarget" length="58">
                    {item.title}
                </a>
                <span className="color656565 mt2 color-grey-6 font-12 mr8">{item.filesize}</span>
                {item.delete===true?<i className="font-14 iconfont  icon-guanbi " style={{display: 'none'}} id={item.id} aria-hidden="true" onClick={()=>props.onAttachmentRemove(item.id)}></i>:""}
                </div>
            )
            })}
            <div className={"color-grey-6 clearfix lineh-25 ml20"}>
            <span className={"color9B9B fr"}>更新</span>
            <span className={"fr font-13 mr10 ml10"}>{atta_update_user}</span>
            <span className={"color9B9B fr"}>
                {moment(atta_update_time).format('YYYY-MM-DD HH:mm')==="Invalid date"?"":moment(atta_update_time).format('YYYY-MM-DD HH:mm')}
            </span>
            </div>
        </div>}
        </React.Fragment>
    )
    
}
export default CommonWorkAppraiseReviseAttachments;