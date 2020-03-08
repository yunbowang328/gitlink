import React, { useState, useEffect } from 'react'

import { Input,Checkbox,Table, Pagination, Modal,Menu ,Spin, Tooltip , Badge, Popconfirm, Result } from "antd";
import axios from 'axios'

import { WordsBtn, trigger, on, off, getUrl, downloadFile , sortDirections } from 'educoder'
import ClipboardJS from 'clipboard'
import './studentsList.css';
/** 
    角色数组, CREATOR: 创建者, PROFESSOR: 教师, ASSISTANT_PROFESSOR: 助教, STUDENT: 学生
    course_members_count: 0
    id: 2441
    invite_code: "WUNX9K"
    member_manager: "全部教师"
    name: "e'e'e"
*/

const clipboardMap = {}
function CourseGroupListTable(props) {
    const [serachValue, setSerachValue] = useState('')

    const courseId = props.match.params.coursesId    

    useEffect(() => {
        const course_groups = props.course_groups
        if (!course_groups) {
            return;
        }
        course_groups.forEach((record) => {
            const id = record.id
            let _clipboard = new ClipboardJS(`.copyBtn_${id}`);
            _clipboard.on('success', (e) => {
                props.showNotification('复制成功')
            });    
            clipboardMap[id] = _clipboard
        })
        return () => {
            course_groups.forEach((record) => {
                const id = record.id

                if (clipboardMap[id]) {
                    clipboardMap[id].destroy();
                    clipboardMap[id] = null;
                }
            })
        }
    }, [props.course_groups])
    function buildColumns() {
        const columns=[{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            align:'center',
            width:"5%",
            className:"color-grey-6",
            render: (id, record, index) => {
                return index + 1
            }
        },
        {
            title: '分班名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width:"25%",
            className:"color-grey-6",
            render: (name, record, index) => {
                return <WordsBtn title={name.length > 11 ? name : ''} onClick={() => onGoDetail(record)} style={''}
                    className="overflowHidden1" style2={{maxWidth: '180px', verticalAlign: 'bottom'}}>
                {name}</WordsBtn>
            }
        },
        
        {
            title: '学生成员',
            dataIndex: 'course_members_count',
            key: 'course_members_count',
            align:'center',
            width:"8%",
            className:"color-grey-6",
            render: (course_members_count, record, index) => {
                return course_members_count
            }
        }
        ];
        if (!isNotMember) {
            columns.push({
                title: '管理教师',
                dataIndex: 'member_manager',
                key: 'member_manager',
                align:'center',
                width:"27%",
                className:"color-grey-6",
                render: (member_manager, record, index) => {
                    // 加title 文本太长会出现卡死 https://www.trustie.net/issues/24950
                    // title={record.subStringOfMember_manager ? member_manager : ''}
                    return <span className=""
                    >{record.subStringOfMember_manager || member_manager}</span>
                }
            })
            const aCol = (isAdmin ? {
                title: '邀请码',
                dataIndex: 'invite_code',
                key: 'invite_code',
                align:'center',
                width:"21%",
                className:"color-grey-6",
                render: (invite_code, record, index) => {
                    return <React.Fragment>
                        <span>{invite_code}</span>
                        {
                            record.edit_auth ?
                                <span onClick={()=>changeInviteCode(record.id,record.invite_code_halt)} className={record.invite_code_halt ?"codeBtnStyle codeBtn_green ml10":"codeBtnStyle codeBtn_blue ml10"}>
                                    {record.invite_code_halt ?"启用":"停用"}
                                </span>
                            :""
                        }
                        {isAdmin && !record.invite_code_halt &&
                            <Tooltip title={
                                <div>
                                    <div>成员可以通过邀请码主动加入分班</div>
                                    <div>点击复制邀请码</div>
                                </div>
                            }>
                                <WordsBtn data-clipboard-text={record.invite_code} 
                                    className={`copyBtn_${record.id} codeBtnStyle codeBtn_yellow ml10`} style={''}>复制</WordsBtn>    
                            </Tooltip>
                            }
                    </React.Fragment>
                }
            } : {
                title: '你当前所在分班',
                dataIndex: 'group',
                key: 'group',
                align:'center',
                width:"20%",
                className:"color-grey-6",
                render: (invite_code, record, index) => {
                    return props.current_group_id == record.id && <Badge status="processing" text="" />
                }
            })
            columns.push( aCol );
        }

        columns.push({
            title: '操作',
            dataIndex: 'setting',
            key: 'setting',
            align:'center',
            width:"14%",
            className:"color-grey-6",
            render: (none, record, index) => {
                return <React.Fragment>
                    {!isCourseEnd && isAdmin && <WordsBtn style2={{ marginRight: '12px' }} onClick={() => onDelete(record)} style={'grey'}>删除分班</WordsBtn>}
                      
                    {isStudent && <WordsBtn style2={{ marginRight: '12px' }} onClick={() => addToDir(record)} style={''}>加入分班</WordsBtn>}        
                    <WordsBtn  onClick={() => onGoDetail(record)} style={''}>查看</WordsBtn>              
                </React.Fragment>
            }
        })
        
        return columns 
    }
    const doAddToDir = async (record) => {
        const courseId = props.match.params.coursesId    
        const url = `/courses/${courseId}/join_course_group.json`
        const course_group_id = record.id

        const response = await axios.post(url, {
            course_group_id
        })
        if (response && response.data.status == 0) {
            props.showNotification(`已加入分班：${record.name}`)
            props.updataleftNavfun()
            props.onOperationSuccess && props.onOperationSuccess()
        }
    }
    const addToDir = (record) => {
        props.confirm({
        
            content: `是否确认加入分班: ${record.name}?`,

            okText: '确认',
            cancelText: '取消',
            
            onOk: () => {
                doAddToDir(record)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    
    function onDelete(record) {
        props.confirm({
            content: <div>
                <div>该分班的学生将被移动到“未分班”</div>
                <div>是否确认删除?</div>
                </div>,
            onOk: () => {
                // const cid = this.props.match.params.coursesId

                const url = `/course_groups/${record.id}.json`
                axios.delete(url)
                    .then((response) => {
                        if (response.data.status == 0) {
                            props.showNotification('删除成功')
                            props.onOperationSuccess && props.onOperationSuccess()
                            // props.history.push(response.data.right_url)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });    
            }
        })
    }    
    function onGoDetail(record) {
        props.history.push(`/courses/${courseId}/course_groups/${record.id}`)
    }
    // 停用和启用邀请码
    function changeInviteCode(id,flag){
        if(flag){
            changeInviteCodeFunc(id,flag);
        }else{
            props.confirm({
                content:"分班邀请码停用后，用户不能主动加入该分班了",
                subContent:'您是否确认停用？',
                onOk:() => {
                    changeInviteCodeFunc(id,flag)
                }
            })
        }
    }

    function changeInviteCodeFunc(id,flag){
        const url= `/course_groups/${id}/set_invite_code_halt.json`;
        axios.post(url).then(result=>{
            if(result){
                props.showNotification(`邀请码${flag?"启用":"停用"}成功！`);
                props.onOperationSuccess && props.onOperationSuccess();
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    const isAdmin = props.isAdmin();
    const isSuperAdmin = props.isSuperAdmin();
    const isStudent = props.isStudent()
    const isNotMember = props.isNotMember()
    

    const isParent = true;
    const isCourseEnd= props.isCourseEnd();

    const course_groups = props.course_groups
    const columns = buildColumns()
    const dataSource = course_groups.map(item => {
        return {
            ...item,
            subStringOfMember_manager : (item.member_manager && item.member_manager.length > 92)
                ? item.member_manager.substring(0, 92) + '...' : null
        }
    })
    return (
        <React.Fragment>
            <style>{`
                .groupListTable .ant-badge-status-processing {
                    width: 10px;
                    height: 10px;
                }
            `}</style>
            {/* onChange={onTableChange}  */}
            <Table columns={columns} dataSource={dataSource} pagination={false} className="groupListTable"></Table>
           
        </React.Fragment>
    )
}
export default CourseGroupListTable