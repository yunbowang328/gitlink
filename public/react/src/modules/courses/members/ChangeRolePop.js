import React, { useState, useEffect, memo } from 'react'
import { trigger, WordsBtn } from 'educoder'
import { Input, Checkbox, Popconfirm } from "antd";
import axios from 'axios'

/** 
    角色数组, CREATOR: 创建者, PROFESSOR: 教师, ASSISTANT_PROFESSOR: 助教, STUDENT: 学生
*/
function ChangeRolePop({ member_roles = [], record, courseId, onChangeRoleSuccess, showNotification, getUserId, fetchUser, style }) {
    const [checkBoxRoles, setCheckBoxRoles] = useState(member_roles)
    // useEffect(() => {
        // if (checkBoxRoles.length != member_roles.length) {  // 死循环
            // setCheckBoxRoles(member_roles)
        // }
    // }, [member_roles])
    function onCheckBoxChange(val) {
        console.log(val)

        const isTeacher = checkBoxRoles.indexOf('PROFESSOR') 
        const isAssitant = checkBoxRoles.indexOf('ASSISTANT_PROFESSOR') 
        const isTeacherNew = val.indexOf('PROFESSOR')
        const isAssitantNew = val.indexOf('ASSISTANT_PROFESSOR')
        if (isTeacherNew > -1 && isTeacher == -1 && isAssitantNew > -1) {
            val.splice(isAssitantNew, 1)
        }
        if (isAssitantNew > -1 && isAssitant == -1 && isTeacherNew > -1) {
            val.splice(isTeacherNew, 1)
        }
        
        setCheckBoxRoles(val)
    }
    function onCancel() {
        setCheckBoxRoles(member_roles)
    }
    const onConfirm = async () => {
        if (checkBoxRoles && checkBoxRoles.length == 0) {
            showNotification('请至少选择一个角色');
            setCheckBoxRoles(member_roles);
            return;
        }
        const url = `/courses/${courseId}/change_member_role.json`
        const response = await axios.post(url, {
            roles: checkBoxRoles,
            user_id: record.user_id
        })
        if (response.data.status == 0) {
            showNotification('保存成功')
            onChangeRoleSuccess()

            trigger('updatabanner')
            if (fetchUser && record.user_id == getUserId) {
                fetchUser()
            }
            
        }

    }
    const isAdmin = checkBoxRoles.indexOf('CREATOR') != -1
    const isTeacher = checkBoxRoles.indexOf('PROFESSOR') != -1
    const isAssitant = checkBoxRoles.indexOf('ASSISTANT_PROFESSOR') != -1
    const isStudent = checkBoxRoles.indexOf('STUDENT') != -1
    return (
        <Popconfirm 
            overlayClassName="changeRolePop"
            placement="bottom"
            icon={null}
            onConfirm={onConfirm}
            onCancel={onCancel}
            title={
                <Checkbox.Group style={{ width: '100%' }} onChange={onCheckBoxChange} value={checkBoxRoles}>     
                    {isAdmin && <Checkbox disabled={isAdmin} value="CREATOR">管理员</Checkbox>}
                    {!isAdmin && <Checkbox value="PROFESSOR">教师</Checkbox>}
                    <Checkbox disabled={isAdmin} value="ASSISTANT_PROFESSOR">助教</Checkbox>
                    <Checkbox value="STUDENT">学生</Checkbox>
                </Checkbox.Group>
            }
            >
            <WordsBtn style={'blue'} style2={style}>修改角色</WordsBtn>
        </Popconfirm>
    )
}
export default memo(ChangeRolePop)